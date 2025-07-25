import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string) => void;
  defaultValue?: string;
  isEditing?: boolean;
}

const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  defaultValue = '',
  isEditing = false,
}) => {
  const [title, setTitle] = useState(defaultValue);

  useEffect(() => {
    setTitle(defaultValue);
  }, [defaultValue]);

  const handleSubmit = () => {
    if (title.trim()) {
      onSubmit(title.trim());
      setTitle('');
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-50 p-4">
        <Dialog.Panel className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md shadow-lg">
          <Dialog.Title className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
            {isEditing ? 'Edit Task' : 'Add New Task'}
          </Dialog.Title>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400 dark:bg-gray-700 dark:text-white"
          />

          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
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
