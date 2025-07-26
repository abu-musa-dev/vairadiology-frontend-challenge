import { create } from 'zustand'

// Define the shape of the state and actions in the store
interface CounterState {
  count: number             // Holds the current count value
  increment: () => void     // Function to increase the count by 1
  decrement: () => void     // Function to decrease the count by 1
}

// Create the Zustand store with initial state and actions
export const useStore = create<CounterState>((set) => ({
  count: 0,                 // Initial value of count is 0

  // Function to increment count by 1
  increment: () => set((state) => ({ count: state.count + 1 })),

  // Function to decrement count by 1
  decrement: () => set((state) => ({ count: state.count - 1 })),
}))
