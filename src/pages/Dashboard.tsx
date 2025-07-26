// src/pages/Dashboard.tsx
import React, { useMemo } from 'react';
import { useTaskStore, Task } from '../context/taskStore';
import ChartCard from '../components/common/ChartCard';

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend,
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A569BD'];

const Dashboard: React.FC = () => {
  const tasks = useTaskStore((state) => state.tasks);

  // 1. Number of tasks per status (bar chart)
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

  // 2. Number of tasks completed per day (line chart)
  const tasksCompletedPerDay = useMemo(() => {
    const doneTasks = tasks.filter((task) => task.status === 'done');
    const countsByDate: Record<string, number> = {};
    doneTasks.forEach((task) => {
      countsByDate[task.dueDate] = (countsByDate[task.dueDate] || 0) + 1;
    });
    // Sort dates ascending
    const sortedDates = Object.keys(countsByDate).sort();
    return sortedDates.map((date) => ({
      date,
      completed: countsByDate[date],
    }));
  }, [tasks]);

  // 3. Pie chart of tasks by tag or priority
  // Let's do pie by priority here for simplicity, you can switch to tags similarly
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
