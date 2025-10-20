import React from 'react';
import type { Budget } from '../../types';
import ProgressBar from '../ui/ProgressBar';

interface BudgetCardProps {
  budget: Budget;
}

const BudgetCard: React.FC<BudgetCardProps> = ({ budget }) => {
  const { name, limit, spent } = budget;
  const remaining = limit - spent;
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-md">
      <div className="flex justify-between items-center mb-2">
        <p className="font-semibold text-gray-900 dark:text-white">{name}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(remaining)} left
        </p>
      </div>
      <ProgressBar value={spent} max={limit} />
      <div className="flex justify-between items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
        <span>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(spent)}</span>
        <span>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(limit)}</span>
      </div>
    </div>
  );
};

export default BudgetCard;
