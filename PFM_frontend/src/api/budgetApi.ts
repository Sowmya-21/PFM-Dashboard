import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/budgets"; // ✅ define base URL here

// 🧩 Fetch all budgets
export const getBudgets = async (token: string) => {
  const res = await axios.get(API_BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// 🧩 Create a new budget
export const createBudget = async (budgetData: any, token: string) => {
  const res = await axios.post(API_BASE_URL, budgetData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// 🧩 Update a budget’s spent value (used when assigning unmatched expense)
export const updateBudgetExpense = async (
  budgetId: string,
  amount: number,
  token: string
) => {
  const res = await axios.post(
    `${API_BASE_URL}/${budgetId}/add-expense`,
    { amount },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};

export const deleteBudget = async (id: string, token: string) => {
  const res = await axios.delete(`http://localhost:5000/api/budgets/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

