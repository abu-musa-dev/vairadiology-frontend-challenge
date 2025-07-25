import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <div className="text-xl font-bold">
        <Link to="/">MyApp</Link> {/* এখানে তোমার লোগো বা নাম দিবে */}
      </div>
      <div className="space-x-4">
        <NavLink
          to="/tasks"
          className={({ isActive }) =>
            isActive ? "underline font-semibold" : "hover:underline"
          }
        >
          Tasks
        </NavLink>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "underline font-semibold" : "hover:underline"
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/annotate"
          className={({ isActive }) =>
            isActive ? "underline font-semibold" : "hover:underline"
          }
        >
          Annotate
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
