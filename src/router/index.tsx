// src/router/index.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Tasks from '../pages/Tasks';
import Dashboard from '../pages/Dashboard';
import Annotate from '../pages/Annotate';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/tasks" replace />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/annotate" element={<Annotate />} />
        {/* 404 এর জন্য */}
        <Route path="*" element={<div className="p-4 text-center">Page Not Found</div>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
