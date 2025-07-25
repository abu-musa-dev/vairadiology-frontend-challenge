// src/pages/Dashboard.tsx
import React from 'react';
import { useTaskStore } from '../context/taskStore';  // TaskContext নয়

const Dashboard: React.FC = () => {
  const tasks = useTaskStore((state) => state.tasks);

  // এখানে চার্ট বা ডেটা ভিজুয়ালাইজেশন
  return (
    <div>
      <h1>Dashboard</h1>
      {/* tasks দিয়ে UI তৈরি করো */}
      <p>Total Tasks: {tasks.length}</p>
    </div>
  );
};

export default Dashboard;
