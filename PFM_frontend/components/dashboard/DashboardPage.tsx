import React from 'react';
import type { Account } from '../../types';
import AccountCard from './AccountCard';
import InfoCard from './InfoCard';
import UpcomingBills from './UpcomingBills';
import PlaidLinkButton from './PlaidLinkButton';

const mockAccounts: Account[] = [
  { id: 'acc1', name: 'Chase Checking', mask: '0123', type: 'depository', subtype: 'checking', balance: 5420.11, currency: 'USD' },
  { id: 'acc2', name: 'Chase Freedom Unlimited', mask: '4567', type: 'credit', subtype: 'credit card', balance: -780.50, currency: 'USD' },
  { id: 'acc3', name: 'Vanguard Brokerage', mask: '8901', type: 'investment', subtype: 'brokerage', balance: 112030.89, currency: 'USD' },
];

const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome Back!</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Here's your financial overview for today.</p>
        </div>
        <PlaidLinkButton />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <InfoCard title="Net Worth" value="$116,670.50" change="+1.2%" />
        <InfoCard title="Monthly Income" value="$4,730.14" />
        <InfoCard title="Monthly Expenses" value="$1,053.80" />
        <InfoCard title="Credit Score" value="780" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Your Accounts</h3>
          {mockAccounts.map(account => (
            <AccountCard key={account.id} account={account} />
          ))}
        </div>
        <div className="space-y-6">
           <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Upcoming Bills</h3>
            <UpcomingBills />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
