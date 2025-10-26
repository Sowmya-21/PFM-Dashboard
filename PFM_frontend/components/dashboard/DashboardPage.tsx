import React, { useState, useEffect } from 'react';
import InfoCard from './InfoCard';
import UpcomingBills from './UpcomingBills';
import PlaidLinkButton from './PlaidLinkButton';

interface PlaidAccount {
  account_id: string;
  name: string;
  balances: {
    available: number;
    current: number;
    limit?: number;
    iso_currency_code: string;
  };
  type: string;
  mask?: string;
}

const DashboardPage: React.FC = () => {
  const [linkedAccounts, setLinkedAccounts] = useState<PlaidAccount[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch accounts on component mount
  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No auth token found');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/plaid/accounts', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setLinkedAccounts(data);
      } else {
        console.error('Failed to fetch accounts');
      }
    } catch (error) {
      console.error('Error fetching accounts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAccountsLinked = (accounts: PlaidAccount[]) => {
    setLinkedAccounts(accounts);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome Back!</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Here's your financial overview for today.</p>
        </div>
        <PlaidLinkButton onAccountsLinked={handleAccountsLinked} />
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

          {loading ? (
            <div className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 text-center">
              <p className="text-gray-500 dark:text-gray-400">Loading accounts...</p>
            </div>
          ) : linkedAccounts.length > 0 ? (
            linkedAccounts.map(acc => (
              <div key={acc.account_id} className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{acc.name}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{acc.type}</p>
                    {acc.mask && <p className="text-sm text-gray-500 dark:text-gray-400">•••• {acc.mask}</p>}
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      ${acc.balances.current.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{acc.balances.iso_currency_code}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 text-center">
              <p className="text-gray-500 dark:text-gray-400">No accounts linked yet. Click "Connect a bank account" to get started.</p>
            </div>
          )}
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