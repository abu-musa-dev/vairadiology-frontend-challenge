/**
 * Saves data to localStorage after serializing it to a JSON string.
 * 
 * @param key - The key under which data will be saved in localStorage.
 * @param data - The data to be saved. It can be any serializable value.
 */
export const saveToStorage = (key: string, data: any) => {
  // Convert data to JSON string and save it under the specified key
  localStorage.setItem(key, JSON.stringify(data));
};

/**
 * Retrieves and parses data from localStorage by key.
 * 
 * @template T - The expected type of the returned data.
 * @param key - The key to look up in localStorage.
 * @returns Parsed data of type T if found, otherwise null.
 */
export const getFromStorage = <T>(key: string): T | null => {
  // Retrieve the stored JSON string by key
  const item = localStorage.getItem(key);

  // If item exists, parse it to an object of type T, else return null
  return item ? JSON.parse(item) : null;
};
