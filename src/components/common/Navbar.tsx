// src/components/common/Navbar.tsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const location = useLocation();

  const links = [
    { path: "/tasks", label: "Tasks" },
    { path: "/dashboard", label: "Dashboard" },
    { path: "/annotate", label: "Annotate" },
  ];

  return (
    <nav className="bg-blue-600 text-white p-3 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Task Manager</h1>
        <ul className="flex gap-6">
          {links.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`hover:underline ${
                  location.pathname === link.path ? "font-bold underline" : ""
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
