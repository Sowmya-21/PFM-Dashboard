// routes/plaidRoutes.js
import express from "express";
import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";
import dotenv from "dotenv";

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

// For testing, storing in-memory (sandbox only)
let accessToken = null;

// 1️⃣ Create Link Token
router.post("/create_link_token", async (req, res) => {
  try {
    const response = await client.linkTokenCreate({
      user: { client_user_id: "sandbox_user_1" },
      client_name: "PFM Dashboard",
      products: ["auth", "transactions"],
      country_codes: ["US"],  // Only US sandbox accounts
      language: "en",
    });
    res.json({ link_token: response.data.link_token });
  } catch (err) {
    console.error("Plaid Link Token Error:", err.response?.data || err);
    res.status(500).json({ error: "Unable to create link token" });
  }
});

// 2️⃣ Exchange Public Token
router.post("/exchange_public_token", async (req, res) => {
  try {
    const { public_token } = req.body;
    if (!public_token) return res.status(400).json({ error: "Missing public_token" });

    const response = await client.itemPublicTokenExchange({ public_token });
    accessToken = response.data.access_token;
    res.json({ message: "Token exchanged successfully!" });
  } catch (err) {
    console.error("Plaid Token Exchange Error:", err.response?.data || err);
    res.status(500).json({ error: "Token exchange failed" });
  }
});

// 3️⃣ Get Accounts
router.get("/accounts", async (req, res) => {
  try {
    if (!accessToken) return res.status(400).json({ error: "No access token found" });

    const response = await client.accountsGet({ access_token: accessToken });
    res.json(response.data.accounts);
  } catch (err) {
    console.error("Plaid Accounts Error:", err.response?.data || err);
    res.status(500).json({ error: "Unable to fetch accounts" });
  }
});

// 4️⃣ Get Transactions
router.get("/transactions", async (req, res) => {
  try {
    if (!accessToken) return res.status(400).json({ error: "No access token found" });

    const response = await client.transactionsGet({
      access_token: accessToken,
      start_date: "2024-01-01",
      end_date: "2025-12-31",
    });
    res.json(response.data.transactions);
  } catch (err) {
    console.error("Plaid Transactions Error:", err.response?.data || err);
    res.status(500).json({ error: "Unable to fetch transactions" });
  }
});

export default router;
