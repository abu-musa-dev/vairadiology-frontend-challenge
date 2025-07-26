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
        {/* Layout এর মধ্যে সব পেজ */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/tasks" replace />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/annotate" element={<Annotate />} />
        </Route>

        {/* 404 Page */}
        <Route path="*" element={<div className="p-4 text-center">Page Not Found</div>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
