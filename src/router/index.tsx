// src/router/index.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Tasks from "../pages/Tasks";
import Dashboard from "../pages/Dashboard";
import Annotate from "../pages/Annotate";
import MainLayout from "../layouts/MainLayout";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Wrap all main pages inside the MainLayout */}
        <Route element={<MainLayout />}>
          {/* Redirect root path to /tasks */}
          <Route path="/" element={<Navigate to="/tasks" replace />} />
          
          {/* Define routes for main pages */}
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/annotate" element={<Annotate />} />
        </Route>

        {/* Fallback 404 page for unmatched routes */}
        <Route
          path="*"
          element={
            <div className="p-4 text-center text-red-600 font-semibold text-lg">
              404 - Page Not Found
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
