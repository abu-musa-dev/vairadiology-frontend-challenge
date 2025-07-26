// src/context/taskStore.ts
import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

/**
 * Represents a single task item.
 */
export interface Task {
  id: string;
  title: string;
  dueDate: string; // Date format: YYYY-MM-DD
  status: "todo" | "inprogress" | "done";
  priority: "low" | "medium" | "high";
  tags: string[];
}

/**
 * Defines the state and actions for managing tasks.
 */
interface TaskStore {
  tasks: Task[];
  addTask: (task: Omit<Task, "id">) => void; // Add task, auto-generating id
  updateTask: (id: string, updatedFields: Partial<Omit<Task, "id" | "dueDate">>) => void; // Update fields except id and dueDate
  deleteTask: (id: string) => void; // Delete task by id
}

/**
 * Zustand store for task management with add, update, and delete operations.
 * Tasks are stored in an array with unique UUID ids.
 */
export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],

  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, { ...task, id: uuidv4() }], // Add new task with unique id
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
