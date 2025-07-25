import React from 'react';

type ChartCardProps = {
  title: string;
  children: React.ReactNode;
};

const ChartCard: React.FC<ChartCardProps> = ({ title, children }) => {
  return (
    <div className="bg-white shadow rounded p-4 w-full">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      {children}
    </div>
  );
};

export default ChartCard;
