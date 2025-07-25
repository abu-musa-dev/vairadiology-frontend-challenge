import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { useDateStore } from '../context/dateStore';
import { useTaskStore, Task } from '../context/taskStore';
import DateSelector from '../components/common/DateSelector';
import Modal from '../components/common/Modal';

const statusColumns = [
  { id: 'todo', title: 'To Do' },
  { id: 'inprogress', title: 'In Progress' },
  { id: 'done', title: 'Done' },
];

const priorities = ['low', 'medium', 'high'] as const;

const Tasks: React.FC = () => {
  const selectedDate = useDateStore((state) => state.selectedDate);
  const setSelectedDate = useDateStore((state) => state.setSelectedDate);

  const tasks = useTaskStore((state) =>
    state.tasks.filter((task) => task.dueDate === selectedDate)
  );
  const addTask = useTaskStore((state) => state.addTask);
  const updateTask = useTaskStore((state) => state.updateTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Form state
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<typeof priorities[number]>('medium');
  const [tags, setTags] = useState('');

  // Open modal for new task
  const openNewTaskModal = () => {
    setEditingTask(null);
    setTitle('');
    setPriority('medium');
    setTags('');
    setModalOpen(true);
  };

  // Open modal for edit task
  const openEditTaskModal = (task: Task) => {
    setEditingTask(task);
    setTitle(task.title);
    setPriority(task.priority);
    setTags(task.tags.join(', '));
    setModalOpen(true);
  };

  // Save task (add or update)
  const handleSave = () => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      alert('Task title is required!');
      return;
    }

    const tagsArray = tags
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    if (editingTask) {
      // Update existing task (except dueDate stays same)
      updateTask(editingTask.id, {
        title: trimmedTitle,
        priority,
        tags: tagsArray,
      });
    } else {
      // Add new task with default status 'todo'
      addTask({
        id: Date.now().toString() + Math.random().toString().slice(2, 6),
        title: trimmedTitle,
        dueDate: selectedDate,
        status: 'todo',
        priority,
        tags: tagsArray,
      });
    }
    setModalOpen(false);
  };

  // Drag and drop handler
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;

    if (source.droppableId !== destination.droppableId) {
      updateTask(draggableId, { status: destination.droppableId as Task['status'] });
    }
  };

  // Group tasks by status
  const tasksByStatus: Record<string, Task[]> = {
    todo: [],
    inprogress: [],
    done: [],
  };
  tasks.forEach((task) => {
    tasksByStatus[task.status]?.push(task);
  });

  return (
    <div className="p-4">
      <DateSelector selectedDate={selectedDate} onChange={setSelectedDate} />

      <button
        onClick={openNewTaskModal}
        className="my-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Add Task
      </button>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-4">
          {statusColumns.map((column) => (
            <Droppable droppableId={column.id} key={column.id}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="bg-gray-100 dark:bg-gray-800 rounded p-4 flex-1 min-h-[300px]"
                >
                  <h2 className="font-semibold mb-3">{column.title}</h2>
                  {tasksByStatus[column.id].map((task, index) => (
                    <Draggable draggableId={task.id} index={index} key={task.id}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`mb-2 p-2 rounded border cursor-pointer bg-white dark:bg-gray-700 ${
                            snapshot.isDragging ? 'shadow-lg' : ''
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <div
                              onClick={() => openEditTaskModal(task)}
                              className="flex-1 cursor-pointer"
                            >
                              <div className="font-bold">{task.title}</div>
                              <div className="text-xs text-gray-500">
                                Priority: {task.priority} | Tags: {task.tags.join(', ')}
                              </div>
                            </div>
                            <button
                              onClick={() => deleteTask(task.id)}
                              className="ml-2 text-red-600 hover:underline text-sm"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingTask ? 'Edit Task' : 'Add New Task'}
        footer={
          <>
            <button
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {editingTask ? 'Update' : 'Add'}
            </button>
          </>
        }
      >
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Task Title"
            className="border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as typeof priorities[number])}
            className="border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
          >
            {priorities.map((p) => (
              <option key={p} value={p}>
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Tags (comma separated)"
            className="border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
      </Modal>
    </div>
  );
};

export default Tasks;
