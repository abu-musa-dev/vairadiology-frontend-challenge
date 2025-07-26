import React from 'react';

type DateSelectorProps = {
  value: string;                    // Date string in YYYY-MM-DD format
  onChange: (date: string) => void; // Handler when date changes
  label?: string;                   // Optional label for accessibility and UI
  minDate?: string;                 // Optional minimum date allowed (YYYY-MM-DD)
  maxDate?: string;                 // Optional maximum date allowed (YYYY-MM-DD)
};

/**
 * A reusable date picker input component with accessible label.
 * Supports min/max date restrictions and customizable label.
 */
const DateSelector: React.FC<DateSelectorProps> = ({
  value,
  onChange,
  label = 'Select Date',
  minDate,
  maxDate,
}) => {
  return (
    <div className="flex flex-col">
      <label
        htmlFor="date-selector"
        className="mb-1 font-medium text-gray-700 dark:text-gray-300"
      >
        {label}
      </label>
      <input
        id="date-selector"
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        min={minDate}
        max={maxDate}
        className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 
                   dark:bg-gray-800 dark:text-white dark:border-gray-600"
        aria-label={label}
      />
    </div>
  );
};

export default DateSelector;
