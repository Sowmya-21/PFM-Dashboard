import React from 'react';
import type { Bill } from '../../types';

const mockBills: Bill[] = [
  { id: 'bill1', name: 'Netflix Subscription', amount: 15.49, dueDate: '2024-08-01' },
  { id: 'bill2', name: 'Rent Payment', amount: 2200, dueDate: '2024-08-01' },
  { id: 'bill3', name: 'Electricity Bill', amount: 95.60, dueDate: '2024-08-15' },
];

const UpcomingBills: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
        <ul className="space-y-4">
            {mockBills.map(bill => (
                <li key={bill.id} className="flex justify-between items-center">
                    <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{bill.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Due: {new Date(bill.dueDate).toLocaleDateString()}</p>
                    </div>
                    <p className="font-bold text-gray-900 dark:text-white">
                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(bill.amount)}
                    </p>
                </li>
            ))}
        </ul>
    </div>
  );
};

export default UpcomingBills;
