/**
 * Formats a date string into a more readable format.
 * 
 * @param date - The date string (e.g., "2025-07-26")
 * @returns The formatted date string (e.g., "Jul 26, 2025")
 */
export function formatDate(date: string): string {
  // Create a new Date object from the input string
  const dateObj = new Date(date);

  // Use toLocaleDateString to format the date according to 'en-US' locale
  // with options to display year, abbreviated month, and numeric day
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',   // full year, e.g., 2025
    month: 'short',   // abbreviated month name, e.g., Jul
    day: 'numeric',   // numeric day of the month, e.g., 26
  });
}
