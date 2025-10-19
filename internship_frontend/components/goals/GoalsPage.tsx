import React from 'react';
import type { Goal } from '../../types';
import ProgressBar from '../ui/ProgressBar';

const mockGoals: Goal[] = [
    { id: 'g1', name: 'Emergency Fund', targetAmount: 20000, currentAmount: 15500, deadline: '2025-12-31' },
    { id: 'g2', name: 'Vacation to Japan', targetAmount: 8000, currentAmount: 6200, deadline: '2025-06-01' },
    { id: 'g3', name: 'New Car Downpayment', targetAmount: 10000, currentAmount: 3400, deadline: '2026-01-01' },
];

const GoalsPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Financial Goals</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Track your progress towards your financial goals.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockGoals.map(goal => (
          <div key={goal.id} className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{goal.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Deadline: {new Date(goal.deadline).toLocaleDateString()}
            </p>
            <ProgressBar value={goal.currentAmount} max={goal.targetAmount} colorClass="bg-blue-500"/>
            <div className="flex justify-between items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
              <span>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(goal.currentAmount)}</span>
              <span>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(goal.targetAmount)}</span>
            </div>
             <p className="text-center text-gray-800 dark:text-white font-semibold mt-3">
                {((goal.currentAmount / goal.targetAmount) * 100).toFixed(1)}% Complete
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoalsPage;
