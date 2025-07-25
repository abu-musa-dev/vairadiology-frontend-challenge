// src/components/tasks/AddTaskForm.tsx
import React, { useState } from 'react';
import { useTaskStore } from '../../context/taskStore';
import { useDateStore } from '../../context/dateStore';
import { v4 as uuidv4 } from 'uuid';

const AddTaskForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const selectedDate = useDateStore((state) => state.selectedDate);
  const addTask = useTaskStore((state) => state.addTask);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask = {
      id: uuidv4(),
      title,
      dueDate: selectedDate,
      priority: 'Medium',
      tags: [],
      status: 'To Do',
    };

    addTask(newTask);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        placeholder="Add task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border px-2 py-1 rounded w-full"
      />
      <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded">
        Add
      </button>
    </form>
  );
};

export default AddTaskForm;
