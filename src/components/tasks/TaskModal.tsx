import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string) => void;
  defaultValue?: string;
  isEditing?: boolean;
}

/**
 * TaskModal Component
 * Modal dialog for adding or editing a task title.
 * Uses Headless UI Dialog for accessibility and animations.
 */
const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  defaultValue = '',
  isEditing = false,
}) => {
  // Local state for input field, synced with defaultValue on change
  const [title, setTitle] = useState(defaultValue);

  useEffect(() => {
    setTitle(defaultValue);
  }, [defaultValue]);

  // Handle submission, trim title and call parent's onSubmit handler
  const handleSubmit = () => {
    const trimmedTitle = title.trim();
    if (trimmedTitle) {
      onSubmit(trimmedTitle);
      setTitle(''); // Reset input after submission
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-modal="true"
      aria-labelledby="task-modal-title"
    >
      <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-50 p-4">
        <Dialog.Panel className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md shadow-lg">
          <Dialog.Title
            id="task-modal-title"
            className="text-lg font-semibold mb-4 text-gray-800 dark:text-white"
          >
            {isEditing ? 'Edit Task' : 'Add New Task'}
          </Dialog.Title>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
            autoFocus
          />

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:text-white transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              {isEditing ? 'Update' : 'Add'}
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default TaskModal;
