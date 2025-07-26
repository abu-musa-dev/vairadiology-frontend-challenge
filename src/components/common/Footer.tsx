import React from 'react';

/**
 * Footer component displays copyright info,
 * links to GitHub, portfolio, and contact email,
 * with support for dark mode styling.
 */
const Footer: React.FC = () => {
  const year = new Date().getFullYear(); // Get current year dynamically

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-6 mt-12 border-t border-gray-300 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-center md:text-left space-y-2 md:space-y-0">
        
        {/* Copyright text */}
        <p className="text-sm font-medium">
          &copy; {year} <span className="font-semibold text-blue-600 dark:text-blue-400">TaskManager</span>. All rights reserved.
        </p>

        {/* Built with love */}
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Built with <span aria-label="love" role="img">❤️</span> using React, Tailwind CSS, and TypeScript
        </p>

        {/* Navigation links */}
        <nav className="space-x-4">
          <a
            href="https://github.com/abu-musa-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            GitHub
          </a>
          <a
            href="https://abumusaportfolio.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Portfolio
          </a>
          <a
            href="mailto:abumusa.developer@gmail.com"
            className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Contact
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
