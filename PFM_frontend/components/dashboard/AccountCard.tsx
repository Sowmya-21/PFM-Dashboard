import React from 'react';
import type { Account } from '../../types';
import BankIcon from '../icons/BankIcon';
import CardIcon from '../icons/CardIcon';

interface AccountCardProps {
  account: Account;
}

const getIconForAccountType = (type: string) => {
    if (type.toLowerCase().includes('credit')) {
        return <CardIcon className="w-8 h-8 text-blue-500" />
    }
    return <BankIcon className="w-8 h-8 text-blue-500" />
}

const AccountCard: React.FC<AccountCardProps> = ({ account }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md flex items-center space-x-4">
      <div className="bg-blue-100 dark:bg-gray-700 p-3 rounded-full">
          {getIconForAccountType(account.type)}
      </div>
      <div>
        <p className="font-semibold text-gray-900 dark:text-white">{account.name}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {account.subtype} &bull;&bull;&bull;&bull; {account.mask}
        </p>
      </div>
      <div className="ml-auto text-right">
        <p className="font-bold text-lg text-gray-900 dark:text-white">
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: account.currency,
          }).format(account.balance)}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">Current Balance</p>
      </div>
    </div>
  );
};

export default AccountCard;
