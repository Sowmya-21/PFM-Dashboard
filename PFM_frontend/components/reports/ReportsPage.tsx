import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { useTheme } from '../../context/ThemeContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const ReportCard: React.FC<{title: string, children: React.ReactNode}> = ({title, children}) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{title}</h3>
        {children}
    </div>
);

const ReportsPage: React.FC = () => {
    const { theme } = useTheme();

    const textColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(55, 65, 81, 1)';
    const gridColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

    const barChartData = {
        labels: ['May', 'June', 'July'],
        datasets: [
          {
            label: 'Income',
            data: [5000, 5200, 4730],
            backgroundColor: 'rgba(59, 130, 246, 0.7)',
            borderColor: 'rgba(59, 130, 246, 1)',
            borderWidth: 1,
          },
          {
            label: 'Expenses',
            data: [3200, 2800, 3053],
            backgroundColor: 'rgba(239, 68, 68, 0.7)',
            borderColor: 'rgba(239, 68, 68, 1)',
            borderWidth: 1,
          },
        ],
    };

    const barChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
                labels: {
                    color: textColor
                }
            },
            title: {
                display: false,
            },
        },
        scales: {
            x: {
                ticks: { color: textColor },
                grid: { color: gridColor },
            },
            y: {
                ticks: { color: textColor },
                grid: { color: gridColor },
            }
        }
    };

    const doughnutChartData = {
        labels: ['Groceries', 'Shopping', 'Utilities', 'Entertainment', 'Transport'],
        datasets: [
          {
            label: 'Spending',
            data: [800, 500, 200, 150, 250],
            backgroundColor: [
              'rgba(59, 130, 246, 0.8)',
              'rgba(16, 185, 129, 0.8)',
              'rgba(245, 158, 11, 0.8)',
              'rgba(239, 68, 68, 0.8)',
              'rgba(139, 92, 246, 0.8)',
            ],
            borderColor: [
              'rgba(59, 130, 246, 1)',
              'rgba(16, 185, 129, 1)',
              'rgba(245, 158, 11, 1)',
              'rgba(239, 68, 68, 1)',
              'rgba(139, 92, 246, 1)',
            ],
            borderWidth: 1,
          },
        ],
    };
    
    const doughnutChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'right' as const,
                 labels: {
                    color: textColor
                }
            },
            title: {
                display: false,
            },
        },
    };


  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Financial Reports</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Analyze your spending and income trends.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ReportCard title="Income vs. Expense">
            <div className="h-80">
                <Bar options={barChartOptions} data={barChartData} />
            </div>
        </ReportCard>

        <ReportCard title="Spending by Category">
             <div className="h-80 flex items-center justify-center">
                <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
            </div>
        </ReportCard>
      </div>
    </div>
  );
};

export default ReportsPage;