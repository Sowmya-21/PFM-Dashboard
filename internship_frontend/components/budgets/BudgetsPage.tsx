import React, { useState } from 'react';
import type { Budget } from '../../types';
import BudgetCard from './BudgetCard';
import Button from '../ui/Button';
import PlusIcon from '../icons/PlusIcon';
import Modal from '../ui/Modal';
import Input from '../ui/Input';

const mockBudgetsData: Budget[] = [
  { id: 'bud1', name: 'Groceries', category: 'Food & Drink', limit: 800, spent: 550.75 },
  { id: 'bud2', name: 'Shopping', category: 'Shopping', limit: 500, spent: 480.50 },
  { id: 'bud3', name: 'Utilities', category: 'Utilities', limit: 200, spent: 150.20 },
  { id: 'bud4', name: 'Entertainment', category: 'Entertainment', limit: 150, spent: 95.00 },
];

const BudgetsPage: React.FC = () => {
    const [budgets, setBudgets] = useState<Budget[]>(mockBudgetsData);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // State for the new budget form
    const [budgetName, setBudgetName] = useState('');
    const [budgetLimit, setBudgetLimit] = useState('');
    const [budgetCategory, setBudgetCategory] = useState('Groceries');

    const handleCreateBudget = (e: React.FormEvent) => {
        e.preventDefault();
        if (!budgetName || !budgetLimit) return;

        const newBudget: Budget = {
            id: `bud${Date.now()}`,
            name: budgetName,
            category: budgetCategory,
            limit: parseFloat(budgetLimit),
            spent: 0,
        };

        setBudgets([...budgets, newBudget]);
        
        // Reset form and close modal
        setIsModalOpen(false);
        setBudgetName('');
        setBudgetLimit('');
        setBudgetCategory('Groceries');
    };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Your Budgets</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Keep track of your spending limits.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
            <PlusIcon className="w-5 h-5 mr-2" />
            Create Budget
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {budgets.map(budget => (
          <BudgetCard key={budget.id} budget={budget} />
        ))}
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Budget">
          <form onSubmit={handleCreateBudget} className="space-y-4">
            <Input 
              id="name" 
              label="Budget Name" 
              type="text" 
              value={budgetName}
              onChange={(e) => setBudgetName(e.target.value)}
              required 
            />
            <Input 
              id="limit" 
              label="Monthly Limit" 
              type="number" 
              value={budgetLimit}
              onChange={(e) => setBudgetLimit(e.target.value)}
              min="0"
              step="0.01"
              required 
            />
             <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
              <select 
                id="category" 
                value={budgetCategory}
                onChange={(e) => setBudgetCategory(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option>Groceries</option>
                <option>Shopping</option>
                <option>Utilities</option>
                <option>Entertainment</option>
              </select>
            </div>
            <div className="flex justify-end pt-4 space-x-2">
                <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button type="submit">Create Budget</Button>
            </div>
        </form>
      </Modal>
    </div>
  );
};

export default BudgetsPage;