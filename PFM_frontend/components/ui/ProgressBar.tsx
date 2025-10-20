import React from 'react';

interface ProgressBarProps {
  value: number;
  max: number;
  colorClass?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, max, colorClass }) => {
  const percentage = Math.min((value / max) * 100, 100);

  const getBarColor = () => {
    if (colorClass) return colorClass;
    if (percentage > 90) return 'bg-red-500';
    if (percentage > 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
      <div
        className={`h-2.5 rounded-full ${getBarColor()}`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
