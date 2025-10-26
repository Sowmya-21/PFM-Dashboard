import express from "express";
import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";
import dotenv from "dotenv";
import authMiddleware from "../middleware/auth.js";
import User from "../models/User.js";
import PlaidAccount from "../models/PlaidAccount.js";

dotenv.config();
const router = express.Router();

// ✅ Plaid client setup
const config = new Configuration({
  basePath: PlaidEnvironments[process.env.PLAID_ENV],
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID,
      "PLAID-SECRET": process.env.PLAID_SECRET,
    },
  },
});
const client = new PlaidApi(config);

// 1️⃣ Create Link Token (Protected)
router.post("/create_link_token", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const response = await client.linkTokenCreate({
      user: { client_user_id: userId },
      client_name: "PFM Dashboard",
      products: ["auth", "transactions"],
      country_codes: ["US"],
      language: "en",
    });

    res.json({ link_token: response.data.link_token });
  } catch (err) {
    console.error("Plaid Link Token Error:", err.response?.data || err);
    res.status(500).json({ error: "Unable to create link token" });
  }
});

// 2️⃣ Exchange Public Token (Protected)
router.post("/exchange_public_token", authMiddleware, async (req, res) => {
  try {
    const { public_token } = req.body;
    const userId = req.user.id;

    if (!public_token) {
      return res.status(400).json({ error: "Missing public_token" });
    }

    // Exchange token
    const response = await client.itemPublicTokenExchange({ public_token });
    const accessToken = response.data.access_token;
    const itemId = response.data.item_id;

    // Save access token to user's account
    await User.findByIdAndUpdate(userId, {
      $push: {
        plaidAccessTokens: {
          accessToken: accessToken,
          itemId: itemId,
        },
      },
    });

    // Fetch and save accounts to PlaidAccount collection
    const accountsResponse = await client.accountsGet({ access_token: accessToken });
    const accounts = accountsResponse.data.accounts;

    // Save each account to database
    for (const account of accounts) {
      await PlaidAccount.findOneAndUpdate(
        { accountId: account.account_id, userId },
        {
          userId,
          accountId: account.account_id,
          name: account.name,
          officialName: account.official_name,
          mask: account.mask,
          type: account.type,
          subtype: account.subtype,
          balances: {
            available: account.balances.available,
            current: account.balances.current,
            limit: account.balances.limit,
            iso_currency_code: account.balances.iso_currency_code,
          },
        },
        { upsert: true, new: true }
      );
    }

    res.json({ message: "Token exchanged and accounts saved successfully!" });
  } catch (err) {
    console.error("Plaid Token Exchange Error:", err.response?.data || err);
    res.status(500).json({ error: "Token exchange failed" });
  }
});

// 3️⃣ Get Accounts (Protected) - Fetch from database
router.get("/accounts", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch accounts from database for this user
    const accounts = await PlaidAccount.find({ userId });

    if (!accounts || accounts.length === 0) {
      return res.json([]);
    }

    // Transform to match frontend interface
    const formattedAccounts = accounts.map((acc) => ({
      account_id: acc.accountId,
      name: acc.name,
      mask: acc.mask,
      type: acc.type,
      subtype: acc.subtype,
      balances: acc.balances,
    }));

    res.json(formattedAccounts);
  } catch (err) {
    console.error("Plaid Accounts Error:", err);
    res.status(500).json({ error: "Unable to fetch accounts" });
  }
});

// 4️⃣ Get Transactions (Protected)
router.get("/transactions", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    // Get user's access tokens
    const user = await User.findById(userId);
    if (!user || !user.plaidAccessTokens || user.plaidAccessTokens.length === 0) {
      return res.json([]);
    }

    let allTransactions = [];

    // Fetch transactions from all linked items
    for (const tokenData of user.plaidAccessTokens) {
      const response = await client.transactionsGet({
        access_token: tokenData.accessToken,
        start_date: "2024-01-01",
        end_date: "2025-12-31",
      });
      allTransactions = allTransactions.concat(response.data.transactions);
    }

    res.json(allTransactions);
  } catch (err) {
    console.error("Plaid Transactions Error:", err.response?.data || err);
    res.status(500).json({ error: "Unable to fetch transactions" });
  }
});

export default router;