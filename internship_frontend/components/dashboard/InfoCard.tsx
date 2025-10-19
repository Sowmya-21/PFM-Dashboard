import React from 'react';

interface InfoCardProps {
  title: string;
  value: string;
  change?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, value, change }) => {
  const isPositive = change && change.startsWith('+');
  const isNegative = change && change.startsWith('-');

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-md">
      <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
      <div className="flex items-baseline space-x-2 mt-1">
        <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
        {change && (
          <span
            className={`text-sm font-semibold ${
              isPositive ? 'text-green-500 dark:text-green-400' : isNegative ? 'text-red-500 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            {change}
          </span>
        )}
      </div>
    </div>
  );
};

export default InfoCard;
