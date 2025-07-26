// src/context/dateStore.ts
import { create } from 'zustand';

/**
 * Interface defining the shape of the date store state and actions.
 */
interface DateStore {
  selectedDate: string;                   // Currently selected date in 'YYYY-MM-DD' format
  setSelectedDate: (date: string) => void; // Function to update the selected date
}

/**
 * Zustand store to manage the selected date state globally.
 * Initialized with today's date in ISO format (YYYY-MM-DD).
 */
export const useDateStore = create<DateStore>((set) => ({
  selectedDate: new Date().toISOString().split('T')[0],
  setSelectedDate: (date) => set({ selectedDate: date }),
}));
