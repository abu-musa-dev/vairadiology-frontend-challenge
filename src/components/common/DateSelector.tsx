import React from 'react';

type DateSelectorProps = {
  value: string;
  onChange: (date: string) => void;
};

const DateSelector: React.FC<DateSelectorProps> = ({ value, onChange }) => {
  return (
    <input
      type="date"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="p-2 border rounded"
    />
  );
};

export default DateSelector;
