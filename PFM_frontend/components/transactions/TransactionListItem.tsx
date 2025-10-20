import React from 'react';
import { Transaction } from '../../types';
import InvestmentIcon from '../icons/InvestmentIcon';
import ChartIcon from '../icons/ChartIcon';
import BankIcon from '../icons/BankIcon';
import PlusIcon from '../icons/PlusIcon';
import CardIcon from '../icons/CardIcon';
import LogoutIcon from '../icons/LogoutIcon';

const categoryIcons: { [key: string]: React.ReactNode } = {
    'Food & Drink': <CardIcon className="w-6 h-6" />,
    'Shopping': <ChartIcon className="w-6 h-6" />,
    'Utilities': <LogoutIcon className="w-6 h-6" />,
    'Salary': <BankIcon className="w-6 h-6" />,
    'Investment': <InvestmentIcon className="w-6 h-6" />,
    'default': <PlusIcon className="w-6 h-6" />
};

const TransactionListItem: React.FC<{ transaction: Transaction }> = ({ transaction }) => {
  const { description, category, date, amount, type } = transaction;
  const isIncome = type === 'income';

  return (
    <div className="flex items-center p-4 my-2 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full mr-4 text-blue-500">
        {categoryIcons[category] || categoryIcons['default']}
      </div>
      <div className="flex-grow">
        <p className="font-semibold text-gray-900 dark:text-white">{description}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{new Date(date).toLocaleDateString()}</p>
      </div>
      <div className={`text-lg font-bold ${isIncome ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
        {isIncome ? '+' : '-'}
        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)}
      </div>
    </div>
  );
};

export default TransactionListItem;
