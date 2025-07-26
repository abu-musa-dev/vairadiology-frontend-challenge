import React from 'react';
import Column from './Column';

interface Task {
  id: string;
  title: string;
  priority: string;
  dueDate: string;
  tags: string[];
  status: string;
}

interface BoardProps {
  tasksByStatus: Record<string, Task[]>;
}

/**
 * Board Component
 * Displays columns for task statuses with their respective tasks.
 */
const Board: React.FC<BoardProps> = ({ tasksByStatus }) => {
  const statuses = ['To Do', 'In Progress', 'Done'];

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {statuses.map((status) => (
        <Column
          key={status}
          title={status}
          tasks={tasksByStatus[status] || []}
        />
      ))}
    </div>
  );
};

export default Board;
