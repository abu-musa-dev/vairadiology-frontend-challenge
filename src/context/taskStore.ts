// src/context/taskStore.ts (উদাহরণ)
import create from 'zustand';

interface Task {
  id: string;
  title: string;
  status: 'To Do' | 'In Progress' | 'Done';
  dueDate: string;
  priority: string;
  tags: string[];
}

interface TaskState {
  tasks: Task[];
  // অন্য ফাংশন বা স্টেট
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  // অন্যান্য ফাংশন
}));
