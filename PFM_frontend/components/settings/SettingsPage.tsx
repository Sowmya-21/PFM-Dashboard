import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import Button from '../ui/Button';

const SettingsPage: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Settings</h2>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-md">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Appearance</h3>
        <div className="flex items-center justify-between">
          <p className="text-gray-600 dark:text-gray-300">
            Theme: <span className="font-semibold capitalize">{theme}</span>
          </p>
          <Button onClick={toggleTheme} variant="secondary">
            Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
