import { useState, useEffect } from 'react';

/**
 * Custom React hook to sync state with localStorage.
 * 
 * @template T - The type of the state value.
 * @param {string} key - The localStorage key to store the value.
 * @param {T} initialValue - The initial value to use if no stored value exists.
 * @returns {[T, React.Dispatch<React.SetStateAction<T>>]} 
 *          Returns the stateful value and a setter function, like useState.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  // Initialize state from localStorage or fallback to initialValue
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Update localStorage whenever the key or value changes
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, value]);

  return [value, setValue] as const;
}
