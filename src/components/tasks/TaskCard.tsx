import React from 'react';

interface TaskProps {
  title: string;
  priority: string;
  dueDate: string;
  tags: string[];
}

const TaskCard = ({ title, priority, dueDate, tags }: TaskProps) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded p-3 shadow">
      <h3 className="font-semibold text-base">{title}</h3>
      <p className="text-sm text-gray-500">Priority: {priority}</p>
      <p className="text-sm text-gray-500">Due: {dueDate}</p>
      <div className="flex gap-1 flex-wrap mt-1">
        {tags.map((tag, i) => (
          <span
            key={i}
            className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TaskCard;
