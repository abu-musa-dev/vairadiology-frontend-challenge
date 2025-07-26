
import React from 'react';

type ChartCardProps = {
  title: string;              // Title text for the chart card header
  children: React.ReactNode;  // Chart component or any content passed inside the card
};

/**
 * A reusable card container for charts or data visualizations.
 * Provides consistent styling and layout for chart sections.
 */
const ChartCard: React.FC<ChartCardProps> = ({ title, children }) => {
  return (
    <section
      className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col"
      aria-labelledby="chartcard-title"
    >
      <h3
        id="chartcard-title"
        className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100"
      >
        {title}
      </h3>
      <div className="flex-grow">
        {children}
      </div>
    </section>
  );
};

export default ChartCard;
