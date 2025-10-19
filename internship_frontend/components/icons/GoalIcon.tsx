import React from 'react';

const GoalIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 3v1.5M3 21v-1.5M21 3v1.5M21 21v-1.5M3 12h18M12 3v18"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 18a6 6 0 100-12 6 6 0 000 12z"
    />
  </svg>
);

export default GoalIcon;
