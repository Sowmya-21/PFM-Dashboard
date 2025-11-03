import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/transactions";

// ✅ Get all transactions
export const getTransactions = async (token: string) => {
  const res = await axios.get(API_BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// ✅ Create new transaction
export const createTransaction = async (transactionData: any, token: string) => {
  const res = await axios.post(API_BASE_URL, transactionData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
