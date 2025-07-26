import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface Props {
  // Array of task status objects, each with a status label and a count value
  data: { status: string; count: number }[];
};

/**
 * Bar chart component visualizing number of tasks per status.
 * Responsive and interactive with tooltips.
 */
const TaskStatusBarChart: React.FC<Props> = ({ data }) => {
  return (
    // ResponsiveContainer adjusts chart size to its parent container
    <ResponsiveContainer width="100%" height={250}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
      >
        {/* X axis uses task status as labels */}
        <XAxis dataKey="status" />

        {/* Y axis for counts */}
        <YAxis />

        {/* Tooltip to display details on hover */}
        <Tooltip />

        {/* Bar element represents counts, colored with blue */}
        <Bar dataKey="count" fill="#3b82f6" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TaskStatusBarChart;
