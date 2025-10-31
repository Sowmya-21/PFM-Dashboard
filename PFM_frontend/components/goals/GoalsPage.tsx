import React, { useState, useEffect } from "react";
import { Edit3, Trash2, PlusCircle, DollarSign } from "lucide-react";
import ProgressBar from "../ui/ProgressBar";

interface Goal {
  _id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
}

const GoalsPage: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editGoal, setEditGoal] = useState<Goal | null>(null);
  const [form, setForm] = useState({
    name: "",
    targetAmount: "",
    currentAmount: "",
    deadline: "",
  });

  const token = localStorage.getItem("token");

  // ✅ Fetch goals
  const fetchGoals = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/goals", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setGoals(data);
    } catch (err) {
      console.error("❌ Error fetching goals:", err);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  // ✅ Open Add/Edit Modal
  const openModal = (goal?: Goal) => {
    if (goal) {
      setEditGoal(goal);
      setForm({
        name: goal.name,
        targetAmount: goal.targetAmount.toString(),
        currentAmount: goal.currentAmount.toString(),
        deadline: goal.deadline.slice(0, 10),
      });
    } else {
      setEditGoal(null);
      setForm({ name: "", targetAmount: "", currentAmount: "", deadline: "" });
    }
    setShowModal(true);
  };

  // ✅ Save goal (Add or Edit)
  const handleSaveGoal = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editGoal ? "PUT" : "POST";
      const url = editGoal
        ? `http://localhost:5000/api/goals/${editGoal._id}`
        : "http://localhost:5000/api/goals";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: form.name,
          targetAmount: Number(form.targetAmount),
          currentAmount: Number(form.currentAmount),
          deadline: form.deadline,
        }),
      });

      const data = await res.json();
      if (method === "POST") setGoals([data, ...goals]);
      else setGoals(goals.map((g) => (g._id === data._id ? data : g)));

      setShowModal(false);
    } catch (err) {
      console.error("❌ Error saving goal:", err);
    }
  };

  // ✅ Add money to goal
  const handleAddMoney = async (goal: Goal) => {
    const amount = prompt("Enter amount to add:");
    if (!amount) return;
    const addAmount = parseFloat(amount);
    if (isNaN(addAmount) || addAmount <= 0) return alert("Invalid amount");

    const updated = {
      ...goal,
      currentAmount: goal.currentAmount + addAmount,
    };

    try {
      const res = await fetch(`http://localhost:5000/api/goals/${goal._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updated),
      });

      const data = await res.json();
      setGoals(goals.map((g) => (g._id === data._id ? data : g)));
    } catch (err) {
      console.error("❌ Error updating money:", err);
    }
  };

  // ✅ Delete goal
  const handleDeleteGoal = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this goal?")) return;
    await fetch(`http://localhost:5000/api/goals/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setGoals(goals.filter((g) => g._id !== id));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Financial Goals</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Track your progress towards your financial goals.
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
        >
          <PlusCircle size={18} /> Add Goal
        </button>
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map((goal) => (
          <div key={goal._id} className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{goal.name}</h3>
            <p className="text-sm text-gray-500 mb-4">
              Deadline: {new Date(goal.deadline).toLocaleDateString()}
            </p>

            <ProgressBar value={goal.currentAmount} max={goal.targetAmount} colorClass="bg-blue-600" />

            <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
              <span>${goal.currentAmount.toLocaleString()}</span>
              <span>${goal.targetAmount.toLocaleString()}</span>
            </div>

            <p className="text-center text-gray-800 dark:text-white font-semibold mt-3">
              {((goal.currentAmount / goal.targetAmount) * 100).toFixed(1)}% Complete
            </p>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => handleAddMoney(goal)}
                className="p-2 rounded-md text-blue-600 hover:text-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900"
                title="Add Money"
              >
                <DollarSign size={18} />
              </button>
              <button
                onClick={() => openModal(goal)}
                className="p-2 rounded-md text-blue-600 hover:text-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900"
                title="Edit Goal"
              >
                <Edit3 size={18} />
              </button>
              <button
                onClick={() => handleDeleteGoal(goal._id)}
                className="p-2 rounded-md text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900"
                title="Delete Goal"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}

        {goals.length === 0 && (
          <p className="text-gray-600 dark:text-gray-300 text-center col-span-full mt-6">
            No goals yet. Add your first goal to get started!
          </p>
        )}
      </div>

      {/* Modal for Add/Edit */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-[400px] shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              {editGoal ? "Edit Goal" : "Add New Goal"}
            </h3>

            <form onSubmit={handleSaveGoal} className="space-y-4">
              <input
                type="text"
                placeholder="Goal Name"
                className="w-full border rounded-lg p-2 dark:bg-gray-700"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
              <input
                type="number"
                placeholder="Target Amount"
                className="w-full border rounded-lg p-2 dark:bg-gray-700"
                value={form.targetAmount}
                onChange={(e) => setForm({ ...form, targetAmount: e.target.value })}
                required
              />
              <input
                type="number"
                placeholder="Current Amount"
                className="w-full border rounded-lg p-2 dark:bg-gray-700"
                value={form.currentAmount}
                onChange={(e) => setForm({ ...form, currentAmount: e.target.value })}
              />
              <input
                type="date"
                className="w-full border rounded-lg p-2 dark:bg-gray-700"
                value={form.deadline}
                onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                required
              />

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoalsPage;
