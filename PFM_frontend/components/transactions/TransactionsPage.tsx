import React, { useState, useMemo, useEffect } from "react";
import type { Transaction } from "../../types";
import TransactionListItem from "./TransactionListItem";
import Button from "../ui/Button";
import PlusIcon from "../icons/PlusIcon";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import { getTransactions, createTransaction } from "../../src/api/transactionApi";


type FilterType = "all" | "income" | "expense";
type SortKey = "date" | "amount";
type SortOrder = "asc" | "desc";

const FilterButton: React.FC<{
  label: string;
  type: FilterType;
  currentFilter: FilterType;
  onClick: (type: FilterType) => void;
}> = ({ label, type, currentFilter, onClick }) => (
  <Button
    variant={currentFilter === type ? "primary" : "secondary"}
    onClick={() => onClick(type)}
  >
    {label}
  </Button>
);

const TransactionsPage: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<FilterType>("all");
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    date: "",
    category: "Food & Drink",
    type: "expense",
  });

  const token = localStorage.getItem("token"); // assuming token stored after login

  // 🧠 Fetch transactions from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!token) return;
        const data = await getTransactions(token);
        setTransactions(data);
      } catch (err) {
        console.error("Error fetching transactions:", err);
      }
    };
    fetchData();
  }, [token]);

  const processedTransactions = useMemo(() => {
    return transactions
      .filter((transaction) => filter === "all" || transaction.type === filter)
      .sort((a, b) => {
        let comparison = 0;
        if (sortKey === "date") {
          comparison = new Date(b.date).getTime() - new Date(a.date).getTime();
        } else {
          comparison = b.amount - a.amount;
        }
        return sortOrder === "asc" ? -comparison : comparison;
      });
  }, [transactions, filter, sortKey, sortOrder]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!token) return;
      const newTxn = await createTransaction(formData, token);
      setTransactions((prev) => [newTxn, ...prev]);
      setIsModalOpen(false);
      setFormData({
        description: "",
        amount: "",
        date: "",
        category: "Food & Drink",
        type: "expense",
      });
    } catch (err) {
      console.error("Error adding transaction:", err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Your Transactions
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            View and manage your recent transactions.
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <PlusIcon className="w-5 h-5 mr-2" />
          Add Transaction
        </Button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm text-gray-700 dark:text-gray-300">
            Filter by:
          </span>
          <FilterButton
            label="All"
            type="all"
            currentFilter={filter}
            onClick={setFilter}
          />
          <FilterButton
            label="Income"
            type="income"
            currentFilter={filter}
            onClick={setFilter}
          />
          <FilterButton
            label="Expense"
            type="expense"
            currentFilter={filter}
            onClick={setFilter}
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm text-gray-700 dark:text-gray-300">
            Sort by:
          </span>
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as SortKey)}
            className="py-2 px-3 text-sm rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="date">Date</option>
            <option value="amount">Amount</option>
          </select>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as SortOrder)}
            className="py-2 px-3 text-sm rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
      </div>

      <div>
        {processedTransactions.length > 0 ? (
          processedTransactions.map((transaction) => (
            <TransactionListItem key={transaction._id} transaction={transaction} />
          ))
        ) : (
          <div className="text-center py-10 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <p className="text-gray-500 dark:text-gray-400">
              No transactions found.
            </p>
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Transaction"
      >
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            id="description"
            label="Description"
            type="text"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
          <Input
            id="amount"
            label="Amount"
            type="number"
            value={formData.amount}
            onChange={handleInputChange}
            required
          />
          <Input
            id="date"
            label="Date"
            type="date"
            value={formData.date}
            onChange={handleInputChange}
            required
          />
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Category
            </label>
            <select
              id="category"
              value={formData.category}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option>Food & Drink</option>
              <option>Shopping</option>
              <option>Utilities</option>
              <option>Salary</option>
              <option>Investment</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Type
            </label>
            <select
              id="type"
              value={formData.type}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
          <div className="flex justify-end pt-4 space-x-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Add Transaction</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default TransactionsPage;
