
import React, { useMemo, useState, useEffect } from 'react';
import { useTaskStore, Task } from '../context/taskStore';
import ChartCard from '../components/common/ChartCard';

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend,
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A569BD'];

const Dashboard: React.FC = () => {
  // Local states for loading and error
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get tasks from Zustand store
  const tasks = useTaskStore((state) => state.tasks);

  // Simulate loading (replace with real async if needed)
  useEffect(() => {
    setLoading(true);
    setError(null);
    try {
      // Simulate data fetch delay
      const timer = setTimeout(() => {
        setLoading(false);
      }, 500);

      return () => clearTimeout(timer);
    } catch (err) {
      setError('Failed to load task data.');
      setLoading(false);
    }
  }, [tasks]);

  // Memoized data transformations
  const tasksPerStatus = useMemo(() => {
    const counts: Record<string, number> = { todo: 0, inprogress: 0, done: 0 };
    tasks.forEach((task) => {
      counts[task.status] = (counts[task.status] || 0) + 1;
    });
    return Object.entries(counts).map(([status, count]) => ({
      status: status.charAt(0).toUpperCase() + status.slice(1),
      count,
    }));
  }, [tasks]);

  const tasksCompletedPerDay = useMemo(() => {
    const doneTasks = tasks.filter((task) => task.status === 'done');
    const countsByDate: Record<string, number> = {};
    doneTasks.forEach((task) => {
      countsByDate[task.dueDate] = (countsByDate[task.dueDate] || 0) + 1;
    });
    const sortedDates = Object.keys(countsByDate).sort();
    return sortedDates.map((date) => ({
      date,
      completed: countsByDate[date],
    }));
  }, [tasks]);

  const tasksByPriority = useMemo(() => {
    const counts: Record<string, number> = {};
    tasks.forEach((task) => {
      counts[task.priority] = (counts[task.priority] || 0) + 1;
    });
    return Object.entries(counts).map(([priority, count]) => ({
      name: priority.charAt(0).toUpperCase() + priority.slice(1),
      value: count,
    }));
  }, [tasks]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <svg
          className="animate-spin -ml-1 mr-3 h-10 w-10 text-blue-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-label="Loading"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
        <p className="text-blue-600 text-lg font-semibold">Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 text-center py-10">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Bar Chart: Tasks per Status */}
        <ChartCard title="Tasks per Status">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={tasksPerStatus}>
              <XAxis dataKey="status" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Line Chart: Completed Tasks Per Day */}
        <ChartCard title="Tasks Completed Per Day">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={tasksCompletedPerDay}>
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line type="monotone" dataKey="completed" stroke="#10B981" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Pie Chart: Tasks by Priority */}
        <ChartCard title="Tasks by Priority">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={tasksByPriority}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={({ name, percent }) =>
                  `${name}: ${(percent! * 100).toFixed(0)}%`
                }
              >
                {tasksByPriority.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend verticalAlign="bottom" height={36} />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
};

export default Dashboard;
