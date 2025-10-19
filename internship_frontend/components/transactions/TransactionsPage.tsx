import React, { useState, useMemo } from 'react';
import type { Transaction } from '../../types';
import TransactionListItem from './TransactionListItem';
import Button from '../ui/Button';
import PlusIcon from '../icons/PlusIcon';
import Modal from '../ui/Modal';
import Input from '../ui/Input';

const mockTransactions: Transaction[] = [
  { id: 'txn1', description: 'Starbucks Coffee', amount: 5.75, date: '2024-07-29', category: 'Food & Drink', type: 'expense' },
  { id: 'txn2', description: 'Monthly Salary', amount: 4500, date: '2024-07-28', category: 'Salary', type: 'income' },
  { id: 'txn3', description: 'Amazon Purchase', amount: 89.99, date: '2024-07-27', category: 'Shopping', type: 'expense' },
  { id: 'txn4', description: 'Electricity Bill', amount: 75.20, date: '2024-07-25', category: 'Utilities', type: 'expense' },
  { id: 'txn5', description: 'Stock Dividend', amount: 120.00, date: '2024-07-24', category: 'Investment', type: 'income' },
  { id: 'txn6', description: 'Dinner with friends', amount: 65.00, date: '2024-07-23', category: 'Food & Drink', type: 'expense' },
];

type FilterType = 'all' | 'income' | 'expense';
type SortKey = 'date' | 'amount';
type SortOrder = 'asc' | 'desc';

const FilterButton: React.FC<{
  label: string;
  type: FilterType;
  currentFilter: FilterType;
  onClick: (type: FilterType) => void;
}> = ({ label, type, currentFilter, onClick }) => (
  <Button
    variant={currentFilter === type ? 'primary' : 'secondary'}
    onClick={() => onClick(type)}
  >
    {label}
  </Button>
);

const TransactionsPage: React.FC = () => {
  const [transactions] = useState<Transaction[]>(mockTransactions);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<FilterType>('all');
  const [sortKey, setSortKey] = useState<SortKey>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const processedTransactions = useMemo(() => {
    return transactions
      .filter(transaction => filter === 'all' || transaction.type === filter)
      .sort((a, b) => {
        let comparison = 0;
        if (sortKey === 'date') {
          comparison = new Date(b.date).getTime() - new Date(a.date).getTime();
        } else { // sortKey === 'amount'
          comparison = b.amount - a.amount;
        }
        return sortOrder === 'asc' ? -comparison : comparison;
      });
  }, [transactions, filter, sortKey, sortOrder]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Your Transactions</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">View and manage your recent transactions.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
            <PlusIcon className="w-5 h-5 mr-2" />
            Add Transaction
        </Button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div className="flex items-center gap-2">
            <span className="font-semibold text-sm text-gray-700 dark:text-gray-300">Filter by:</span>
            <FilterButton label="All" type="all" currentFilter={filter} onClick={setFilter} />
            <FilterButton label="Income" type="income" currentFilter={filter} onClick={setFilter} />
            <FilterButton label="Expense" type="expense" currentFilter={filter} onClick={setFilter} />
        </div>
        <div className="flex items-center gap-2">
            <span className="font-semibold text-sm text-gray-700 dark:text-gray-300">Sort by:</span>
            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value as SortKey)}
              className="py-2 px-3 text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="date">Date</option>
              <option value="amount">Amount</option>
            </select>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as SortOrder)}
              className="py-2 px-3 text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
        </div>
      </div>

      <div>
        {processedTransactions.length > 0 ? (
          processedTransactions.map(transaction => (
            <TransactionListItem key={transaction.id} transaction={transaction} />
          ))
        ) : (
          <div className="text-center py-10 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <p className="text-gray-500 dark:text-gray-400">No transactions match the current filter.</p>
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Transaction">
          <form className="space-y-4">
            <Input id="description" label="Description" type="text" required />
            <Input id="amount" label="Amount" type="number" required />
            <Input id="date" label="Date" type="date" required />
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
              <select id="category" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <option>Food & Drink</option>
                <option>Shopping</option>
                <option>Utilities</option>
                <option>Salary</option>
                <option>Investment</option>
                <option>Other</option>
              </select>
            </div>
             <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Type</label>
              <select id="type" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
            <div className="flex justify-end pt-4 space-x-2">
                <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button type="submit">Add Transaction</Button>
            </div>
        </form>
      </Modal>
    </div>
  );
};

export default TransactionsPage;