import React from 'react';

type ButtonProps = {
  children: React.ReactNode;          // Button label or content
  onClick?: () => void;              // Optional click handler
  className?: string;                // Additional CSS classes for customization
};

/**
 * Reusable button component with default styling.
 * Accepts children, onClick handler, and optional additional class names.
 */
const Button: React.FC<ButtonProps> = ({ children, onClick, className = '' }) => {
  return (
    <button
      type="button"                  // Explicit button type to prevent form submission issues
      onClick={onClick}
      className={`px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${className}`}
      aria-pressed="false"           // ARIA attribute for better accessibility (can be enhanced if button is toggle)
    >
      {children}
    </button>
  );
};

export default Button;
