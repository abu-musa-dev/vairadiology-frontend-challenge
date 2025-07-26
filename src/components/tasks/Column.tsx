import React from 'react';
import TaskCard from './TaskCard';

// Define the Task type for better type safety
interface Task {
  id: string;
  title: string;
  priority: string;
  dueDate: string;
  tags: string[];
  status: string;
}

interface ColumnProps {
  title: string;
  tasks: Task[];
}

/**
 * Column Component
 * Displays a list of tasks under a specific status column.
 */
const Column: React.FC<ColumnProps> = ({ title, tasks }) => {
  return (
    <div className="w-full md:w-1/3 p-2">
      {/* Column title */}
      <h2 className="text-lg font-semibold mb-2">{title}</h2>

      {/* Task cards container */}
      <div className="space-y-2">
        {tasks.map((task) => (
          // Use task.id as key instead of index for better React performance
          <TaskCard key={task.id} {...task} />
        ))}
      </div>
    </div>
  );
};

export default Column;
