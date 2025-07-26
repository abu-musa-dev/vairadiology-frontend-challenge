// src/components/tasks/AddTaskForm.tsx
import React, { useState } from 'react';
import { useTaskStore } from '../../context/taskStore';
import { useDateStore } from '../../context/dateStore';
import { v4 as uuidv4 } from 'uuid';

/**
 * AddTaskForm Component
 * Allows user to add a new task with a title for the selected date.
 */
const AddTaskForm: React.FC = () => {
  // Local state for task title input
  const [title, setTitle] = useState('');

  // Get selected date from global date store
  const selectedDate = useDateStore((state) => state.selectedDate);

  // Get addTask function from global task store to update tasks
  const addTask = useTaskStore((state) => state.addTask);

  // Form submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent adding empty titles
    if (!title.trim()) return;

    // Create new task object
    const newTask = {
      id: uuidv4(),         // Unique ID for task
      title,                // Task title from input
      dueDate: selectedDate, // Assign to selected date
      priority: 'Medium',   // Default priority
      tags: [],             // Empty tags initially
      status: 'To Do',      // Default status
    };

    // Add task to store
    addTask(newTask);

    // Reset input field after adding
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        placeholder="Add task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border px-2 py-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Task title"
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded transition"
        aria-label="Add task"
      >
        Add
      </button>
    </form>
  );
};

export default AddTaskForm;
