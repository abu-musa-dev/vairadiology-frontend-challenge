import { create } from 'zustand';

export interface Task {
  id: string;
  title: string;
  dueDate: string;   // format: 'YYYY-MM-DD'
  status: 'todo' | 'inprogress' | 'done';
  priority: 'low' | 'medium' | 'high';
  tags: string[];
}

interface TaskStore {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (id: string, updatedFields: Partial<Omit<Task, 'id' | 'dueDate'>>) => void;
  deleteTask: (id: string) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],

  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, task],
    })),

  updateTask: (id, updatedFields) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, ...updatedFields } : task
      ),
    })),

  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
}));
