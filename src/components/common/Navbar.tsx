// src/components/common/Navbar.tsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

/**
 * Responsive Navbar component with desktop and mobile menu.
 * Highlights active route, toggles mobile menu on small screens.
 */
const Navbar: React.FC = () => {
  const location = useLocation(); // Get current path for active link styling
  const [menuOpen, setMenuOpen] = useState(false); // Mobile menu toggle state

  // Navigation links data
  const links = [
    { path: "/tasks", label: "Tasks" },
    { path: "/dashboard", label: "Dashboard" },
    { path: "/annotate", label: "Annotate" },
  ];

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-3">
        {/* Logo / Brand Name */}
        <h1 className="text-lg sm:text-xl font-bold">Task Manager</h1>

        {/* Desktop Menu - hidden on small screens */}
        <ul className="hidden md:flex gap-6">
          {links.map(({ path, label }) => (
            <li key={path}>
              <Link
                to={path}
                className={`hover:underline ${
                  location.pathname === path ? "font-bold underline" : ""
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile menu toggle button (hamburger / close icons) */}
        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden bg-blue-500">
          <ul className="flex flex-col gap-2 p-3">
            {links.map(({ path, label }) => (
              <li key={path}>
                <Link
                  to={path}
                  className={`block py-2 px-3 rounded hover:bg-blue-700 ${
                    location.pathname === path ? "bg-blue-800 font-bold" : ""
                  }`}
                  onClick={() => setMenuOpen(false)} // Close menu on link click
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
