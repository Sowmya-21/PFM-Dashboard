import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import SunIcon from '../icons/SunIcon';
import MoonIcon from '../icons/MoonIcon';

const Header: React.FC<{ title: string }> = ({ title }) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="bg-white dark:bg-gray-800 p-4 shadow-md text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">{title}</h1>
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800 focus:ring-blue-500"
                    aria-label="Toggle theme"
                >
                    {theme === 'light' ? (
                        <MoonIcon className="h-6 w-6" />
                    ) : (
                        <SunIcon className="h-6 w-6" />
                    )}
                </button>
            </div>
        </header>
    );
};

export default Header;
