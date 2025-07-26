import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface Props {
  // Data array where each item represents a day with number of completed tasks
  data: { date: string; completed: number }[];
}

/**
 * Line chart component showing number of tasks completed per day.
 * Fully responsive and uses Recharts library for smooth rendering.
 */
const TasksCompletedLineChart: React.FC<Props> = ({ data }) => {
  return (
    // ResponsiveContainer makes the chart adapt to container size
    <ResponsiveContainer width="100%" height={250}>
      <LineChart
        data={data}
        margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
      >
        {/* X axis showing dates */}
        <XAxis dataKey="date" />

        {/* Y axis showing number of tasks */}
        <YAxis />

        {/* Tooltip shows data on hover */}
        <Tooltip />

        {/* Line representing completed tasks, green stroke */}
        <Line
          type="monotone"
          dataKey="completed"
          stroke="#10b981" // Tailwind emerald-500 color
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TasksCompletedLineChart;
