import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface Props {
  // Array of objects representing each slice with name and value
  data: { name: string; value: number }[];
}

// Define a palette of colors for pie slices, cycling through if more slices
const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

/**
 * Pie chart component visualizing tasks grouped by categories like tag or priority.
 * Responsive and interactive with tooltips and legend.
 */
const TasksPieChart: React.FC<Props> = ({ data }) => {
  return (
    // ResponsiveContainer ensures chart adapts to container size
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        {/* Pie element with dataKey for value and nameKey for slice labels */}
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%" // center X coordinate
          cy="50%" // center Y coordinate
          outerRadius={80} // radius size of pie
          fill="#3b82f6" // fallback fill color
          label // show labels on slices
        >
          {/* Map through data to assign slice colors */}
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]} // cycle through COLORS array
            />
          ))}
        </Pie>

        {/* Tooltip shows slice details on hover */}
        <Tooltip />

        {/* Legend displays color keys and labels */}
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default TasksPieChart;
