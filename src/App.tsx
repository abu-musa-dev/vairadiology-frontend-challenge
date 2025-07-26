// src/App.tsx
import React from 'react';
import AppRouter from './router'; // Import the main router component which handles page routing

const App: React.FC = () => {
  return (
    // Root container with full viewport height
    // Supports light and dark mode backgrounds and text colors using Tailwind CSS classes
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Render the application router which controls all page views */}
      <AppRouter />
    </div>
  );
};

export default App;
