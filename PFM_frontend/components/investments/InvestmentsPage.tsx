import React from 'react';
import type { Investment } from '../../types';

const mockInvestments: Investment[] = [
    { id: 'inv1', name: 'Apple Inc.', ticker: 'AAPL', value: 45000, quantity: 210.2, price: 214.08, changePercent: 1.25 },
    { id: 'inv2', name: 'Microsoft Corp.', ticker: 'MSFT', value: 32000, quantity: 71.4, price: 448.18, changePercent: -0.5 },
    { id: 'inv3', name: 'Vanguard S&P 500 ETF', ticker: 'VOO', value: 35030.89, quantity: 67.5, price: 518.97, changePercent: 0.8 },
];

const InvestmentsPage: React.FC = () => {
    const totalValue = mockInvestments.reduce((acc, inv) => acc + inv.value, 0);

  return (
    <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Your Investments</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Total Portfolio Value: 
            <span className="font-bold text-gray-900 dark:text-white ml-2">
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalValue)}
            </span>
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <table className="w-full text-left">
                <thead className="bg-gray-100 dark:bg-gray-700 text-xs uppercase font-semibold text-gray-500 dark:text-gray-400">
                    <tr>
                        <th className="p-4">Name</th>
                        <th className="p-4">Ticker</th>
                        <th className="p-4 text-right">Market Value</th>
                        <th className="p-4 text-right">Price</th>
                        <th className="p-4 text-right">Day's Change</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {mockInvestments.map(inv => (
                        <tr key={inv.id}>
                            <td className="p-4 font-semibold text-gray-800 dark:text-white">{inv.name}</td>
                            <td className="p-4 text-gray-500 dark:text-gray-400">{inv.ticker}</td>
                            <td className="p-4 text-right font-semibold text-gray-800 dark:text-white">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(inv.value)}</td>
                            <td className="p-4 text-right text-gray-600 dark:text-gray-300">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(inv.price)}</td>
                            <td className={`p-4 text-right font-semibold ${inv.changePercent >= 0 ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                                {inv.changePercent > 0 ? '+' : ''}{inv.changePercent.toFixed(2)}%
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );
};

export default InvestmentsPage;
