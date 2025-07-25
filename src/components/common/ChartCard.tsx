// src/components/common/ChartCard.tsx
import React from 'react';

type ChartCardProps = {
  title: string;
  children: React.ReactNode;
};

const ChartCard: React.FC<ChartCardProps> = ({ title, children }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col">
      <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">{title}</h3>
      <div className="flex-grow">{children}</div>
    </div>
  );
};

export default ChartCard;
