// src/pages/Tasks.tsx
import React from 'react';
import { useTaskStore } from '../context/taskStore';  // Context নয়, Store নাম

const Tasks: React.FC = () => {
  const tasks = useTaskStore((state) => state.tasks);

  // rest of your component code...
  return (
    <div>
      {/* টাস্ক লিস্ট দেখানো */}
      {tasks.map((task) => (
        <div key={task.id}>{task.title}</div>
      ))}
    </div>
  );
};

export default Tasks;
