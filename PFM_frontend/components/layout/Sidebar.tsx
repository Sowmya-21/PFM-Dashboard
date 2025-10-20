import React from 'react';
import DashboardIcon from '../icons/DashboardIcon';
import TransactionIcon from '../icons/TransactionIcon';
import BudgetIcon from '../icons/BudgetIcon';
import InvestmentIcon from '../icons/InvestmentIcon';
import GoalIcon from '../icons/GoalIcon';
import ChartIcon from '../icons/ChartIcon';
import SettingsIcon from '../icons/SettingsIcon';
import LogoutIcon from '../icons/LogoutIcon';
import { useAuth } from '../../context/AuthContext';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active, onClick }) => (
  <a
    href="#"
    onClick={(e) => { e.preventDefault(); onClick?.(); }}
    className={`flex items-center rounded-lg p-2 text-base font-normal transition-colors ${
      active 
        ? 'bg-blue-600 text-white' 
        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
    }`}
  >
    {icon}
    <span className="ml-3 flex-1 whitespace-nowrap">{label}</span>
  </a>
);


const Sidebar: React.FC<{ onNavigate: (page: string) => void, currentPage: string }> = ({ onNavigate, currentPage }) => {
    const { logout } = useAuth();
    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon className="h-6 w-6" /> },
        { id: 'transactions', label: 'Transactions', icon: <TransactionIcon className="h-6 w-6" /> },
        { id: 'budgets', label: 'Budgets', icon: <BudgetIcon className="h-6 w-6" /> },
        { id: 'investments', label: 'Investments', icon: <InvestmentIcon className="h-6 w-6" /> },
        { id: 'goals', label: 'Goals', icon: <GoalIcon className="h-6 w-6" /> },
        { id: 'reports', label: 'Reports', icon: <ChartIcon className="h-6 w-6" /> },
    ];
    return (
        <aside className="w-64" aria-label="Sidebar">
            <div className="flex h-full flex-col overflow-y-auto bg-white dark:bg-gray-800 px-3 py-4 border-r border-gray-200 dark:border-gray-700">
                <div className="mb-4 flex items-center pl-2.5">
                    <span className="self-center whitespace-nowrap text-xl font-semibold text-gray-900 dark:text-white">
                        FinancePal
                    </span>
                </div>
                <ul className="space-y-2 font-medium flex-grow">
                    {navItems.map(item => (
                         <li key={item.id}>
                            <NavItem 
                                icon={item.icon} 
                                label={item.label} 
                                active={currentPage === item.id}
                                onClick={() => onNavigate(item.id)}
                            />
                         </li>
                    ))}
                </ul>
                <div className="mt-auto space-y-2 font-medium border-t border-gray-200 dark:border-gray-700 pt-2">
                     <NavItem 
                        icon={<SettingsIcon className="h-6 w-6" />} 
                        label="Settings" 
                        active={currentPage === 'settings'}
                        onClick={() => onNavigate('settings')}
                    />
                    <NavItem icon={<LogoutIcon className="h-6 w-6" />} label="Log out" onClick={logout} />
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;