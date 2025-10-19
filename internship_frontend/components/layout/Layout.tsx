import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import DashboardPage from '../dashboard/DashboardPage';
import TransactionsPage from '../transactions/TransactionsPage';
import BudgetsPage from '../budgets/BudgetsPage';
import InvestmentsPage from '../investments/InvestmentsPage';
import GoalsPage from '../goals/GoalsPage';
import ReportsPage from '../reports/ReportsPage';
import SettingsPage from '../settings/SettingsPage';

const pageComponents: { [key: string]: React.ComponentType } = {
  dashboard: DashboardPage,
  transactions: TransactionsPage,
  budgets: BudgetsPage,
  investments: InvestmentsPage,
  goals: GoalsPage,
  reports: ReportsPage,
  settings: SettingsPage,
};

const pageTitles: { [key: string]: string } = {
    dashboard: 'Dashboard',
    transactions: 'Transactions',
    budgets: 'Budgets',
    investments: 'Investments',
    goals: 'Financial Goals',
    reports: 'Reports',
    settings: 'Settings',
  };

const Layout: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const CurrentPageComponent = pageComponents[currentPage];
  const title = pageTitles[currentPage];

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Sidebar onNavigate={setCurrentPage} currentPage={currentPage} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header title={title} />
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-6">
          <CurrentPageComponent />
        </main>
      </div>
    </div>
  );
};

export default Layout;
