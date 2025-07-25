import React from 'react';
import TaskCard from './TaskCard';

interface ColumnProps {
  title: string;
  tasks: any[];
}

const Column = ({ title, tasks }: ColumnProps) => {
  return (
    <div className="w-full md:w-1/3 p-2">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <div className="space-y-2">
        {tasks.map((task, index) => (
          <TaskCard key={index} {...task} />
        ))}
      </div>
    </div>
  );
};

export default Column;
