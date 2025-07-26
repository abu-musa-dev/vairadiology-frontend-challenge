import React, { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { useDateStore } from "../context/dateStore";
import { useTaskStore, Task } from "../context/taskStore";
import DateSelector from "../components/common/DateSelector";
import Modal from "../components/common/Modal";

const statusColumns = [
  { id: "todo", title: "To Do" },
  { id: "inprogress", title: "In Progress" },
  { id: "done", title: "Done" },
];

// Define allowed priorities as a constant tuple
const priorities = ["low", "medium", "high"] as const;

const Tasks: React.FC = () => {
  // Zustand stores for selected date and tasks management
  const selectedDate = useDateStore((state) => state.selectedDate);
  const setSelectedDate = useDateStore((state) => state.setSelectedDate);

  const tasks = useTaskStore((state) =>
    // Filter tasks for the selected date
    state.tasks.filter((task) => task.dueDate === selectedDate)
  );
  const addTask = useTaskStore((state) => state.addTask);
  const updateTask = useTaskStore((state) => state.updateTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);

  // Modal & form state management
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<typeof priorities[number]>("medium");
  const [tags, setTags] = useState("");

  // Open modal for creating a new task
  const openNewTaskModal = () => {
    setEditingTask(null);
    setTitle("");
    setPriority("medium");
    setTags("");
    setModalOpen(true);
  };

  // Open modal to edit an existing task with prefilled data
  const openEditTaskModal = (task: Task) => {
    setEditingTask(task);
    setTitle(task.title);
    setPriority(task.priority);
    setTags(task.tags.join(", "));
    setModalOpen(true);
  };

  // Save task either by adding or updating
  const handleSave = () => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      alert("Task title is required!");
      return;
    }

    // Convert comma separated tags string to array of trimmed non-empty strings
    const tagsArray = tags
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    if (editingTask) {
      // Update existing task
      updateTask(editingTask.id, {
        title: trimmedTitle,
        priority,
        tags: tagsArray,
      });
    } else {
      // Add new task with unique ID and default status 'todo'
      addTask({
        id: crypto.randomUUID(),
        title: trimmedTitle,
        dueDate: selectedDate,
        status: "todo",
        priority,
        tags: tagsArray,
      });
    }
    setModalOpen(false);
  };

  // Handle drag and drop between columns
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination, draggableId } = result;

    // Update task status only if dropped in different column
    if (source.droppableId !== destination.droppableId) {
      updateTask(draggableId, {
        status: destination.droppableId as Task["status"],
      });
    }
  };

  // Group tasks by status for easy rendering per column
  const tasksByStatus: Record<string, Task[]> = {
    todo: [],
    inprogress: [],
    done: [],
  };
  tasks.forEach((task) => {
    tasksByStatus[task.status]?.push(task);
  });

  return (
    <div className="p-4 max-w-7xl mx-auto">
      {/* Top bar with date selector and add task button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <DateSelector value={selectedDate} onChange={setSelectedDate} />
        <button
          onClick={openNewTaskModal}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-full sm:w-auto"
        >
          Add Task
        </button>
      </div>

      {/* Kanban board with drag-and-drop context */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="mt-4 pb-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {statusColumns.map((column) => (
            <Droppable droppableId={column.id} key={column.id}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="bg-gray-100 dark:bg-gray-800 rounded p-4 flex flex-col min-h-[300px]"
                >
                  <h2 className="font-semibold mb-3 text-center sm:text-left text-sm sm:text-base">
                    {column.title}
                  </h2>
                  {tasksByStatus[column.id].map((task, index) => (
                    <Draggable
                      draggableId={task.id}
                      index={index}
                      key={task.id}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`mb-2 p-3 rounded border bg-white dark:bg-gray-700 cursor-pointer transition-all ${
                            snapshot.isDragging ? "shadow-xl scale-105" : ""
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <div
                              onClick={() => openEditTaskModal(task)}
                              className="flex-1"
                            >
                              <p className="font-bold text-xs sm:text-sm md:text-base">
                                {task.title}
                              </p>
                              <p className="text-[10px] sm:text-xs text-gray-500">
                                Priority: {task.priority} | Tags:{" "}
                                {task.tags.join(", ")}
                              </p>
                            </div>
                            <button
                              onClick={() => deleteTask(task.id)}
                              className="ml-2 text-red-600 hover:underline text-[10px] sm:text-xs md:text-sm"
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

      {/* Modal for add/edit task form */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingTask ? "Edit Task" : "Add New Task"}
        footer={
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 w-full sm:w-auto"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-full sm:w-auto"
            >
              {editingTask ? "Update" : "Add"}
            </button>
          </div>
        }
      >
        {/* Form inputs inside modal */}
        <div className="flex flex-col gap-3 w-full sm:w-[400px]">
          <input
            type="text"
            placeholder="Task Title"
            className="border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500 text-sm sm:text-base"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <select
            value={priority}
            onChange={(e) =>
              setPriority(e.target.value as typeof priorities[number])
            }
            className="border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500 text-sm sm:text-base"
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
            className="border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500 text-sm sm:text-base"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
      </Modal>
    </div>
  );
};

export default Tasks;
