import React from 'react';
import Column from './Column';

const Board = ({ tasksByStatus }: { tasksByStatus: Record<string, any[]> }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      {['To Do', 'In Progress', 'Done'].map((status) => (
        <Column key={status} title={status} tasks={tasksByStatus[status] || []} />
      ))}
    </div>
  );
};

export default Board;
