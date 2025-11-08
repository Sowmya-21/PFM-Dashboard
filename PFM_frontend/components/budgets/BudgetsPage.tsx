import React, { useEffect, useState } from "react";
import { getBudgets, createBudget, deleteBudget } from "../../src/api/budgetApi";
import { Budget } from "../../types";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import PlusIcon from "../icons/PlusIcon";
import ProgressBar from "../ui/ProgressBar";
import { Trash2 } from "lucide-react";

const BudgetsPage: React.FC = () => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ name: "", category: "", limit: "" });
  const token = localStorage.getItem("token");

  // ✅ Fetch budgets
  useEffect(() => {
    const fetchBudgets = async () => {
      if (!token) return;
      const data = await getBudgets(token);
      setBudgets(data);
    };
    fetchBudgets();
  }, [token]);

  // ✅ Create new budget
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.category || !form.limit)
      return alert("All fields required");

    const newBudget = await createBudget(
      { ...form, limit: parseFloat(form.limit) },
      token as string
    );

    setBudgets((prev) => [newBudget, ...prev]);
    setIsModalOpen(false);
    setForm({ name: "", category: "", limit: "" });
  };

  // 🗑️ Delete budget
  const handleDeleteBudget = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this budget?")) return;
    try {
      await deleteBudget(id, token!);
      setBudgets((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.error("Error deleting budget:", err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Your Budgets
        </h2>
        <Button onClick={() => setIsModalOpen(true)}>
          <PlusIcon className="w-5 h-5 mr-2" /> Create Budget
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {budgets.map((b) => {
          const remaining = b.limit - b.spent;
          const percent = (b.spent / b.limit) * 100;
          return (
            <div
              key={b._id}
              className="relative bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md"
            >
              <button
                onClick={() => handleDeleteBudget(b._id!)}
                className="absolute top-3 right-3 text-red-500 hover:text-red-700"
                title="Delete Budget"
              >
                <Trash2 size={18} />
              </button>

              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                {b.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                {b.category} — Remaining:{" "}
                <span className="font-medium text-gray-900 dark:text-white">
                  ${remaining.toFixed(2)}
                </span>
              </p>
              <ProgressBar value={b.spent} max={b.limit} />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>Spent: ${b.spent.toFixed(2)}</span>
                <span>Limit: ${b.limit.toFixed(2)}</span>
              </div>
              {percent > 100 && (
                <p className="text-red-500 text-xs mt-2 font-medium">
                  ⚠️ You’ve exceeded this budget!
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Create Budget Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Budget"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="name"
            label="Budget Name"
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <Input
            id="category"
            label="Category"
            type="text"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            required
          />
          <Input
            id="limit"
            label="Spending Limit"
            type="number"
            value={form.limit}
            onChange={(e) => setForm({ ...form, limit: e.target.value })}
            required
          />
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default BudgetsPage;
