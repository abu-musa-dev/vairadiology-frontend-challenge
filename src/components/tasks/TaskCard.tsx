import React from 'react';

interface TaskProps {
  title: string;
  priority: string;
  dueDate: string;
  tags: string[];
}

/**
 * TaskCard Component
 * Displays individual task details: title, priority, due date, and tags.
 * Added accessibility features, animation, and keyboard focus support.
 */
const TaskCard: React.FC<TaskProps> = ({ title, priority, dueDate, tags }) => {
  return (
    <div
      className="bg-white dark:bg-gray-900 rounded p-3 shadow transition-colors duration-300 hover:bg-gray-100 focus:bg-gray-100 outline-none"
      tabIndex={0} // Keyboard focus support
      role="article"
      aria-label={`Task: ${title}, priority: ${priority}, due date: ${dueDate}`} // ARIA label for screen readers
    >
      {/* Task Title */}
      <h3 className="font-semibold text-base">{title}</h3>

      {/* Task Priority */}
      <p className="text-sm text-gray-500 dark:text-gray-400">Priority: {priority}</p>

      {/* Due Date */}
      <p className="text-sm text-gray-500 dark:text-gray-400">Due: {dueDate}</p>

      {/* Tags */}
      <div className="flex gap-1 flex-wrap mt-1" aria-label="Task tags">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100 text-xs font-medium px-2 py-0.5 rounded"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TaskCard;
