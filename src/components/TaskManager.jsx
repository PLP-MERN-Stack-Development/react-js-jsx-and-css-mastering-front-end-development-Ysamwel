import { useState } from "react";
import useLocalStorage from "../Hooks/useLocalStorage";
import Button from "./Button";

export default function TaskManager() {
  // State for tasks, persisted in localStorage
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("All"); // All, Active, Completed

  // Add a new task
  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
    setNewTask("");
  };

  // Toggle completion
  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    if (filter === "All") return true;
    if (filter === "Active") return !task.completed;
    if (filter === "Completed") return task.completed;
  });

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Task Manager</h2>

      {/* Input + Add Button */}
      <div className="flex mb-4 gap-2">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add new task..."
          className="flex-1 p-2 border rounded"
        />
        <Button onClick={addTask}>Add</Button>
      </div>

      {/* Filters */}
      <div className="flex justify-between mb-4">
        {["All", "Active", "Completed"].map((f) => (
          <Button
            key={f}
            variant={filter === f ? "primary" : "secondary"}
            onClick={() => setFilter(f)}
          >
            {f}
          </Button>
        ))}
      </div>

      {/* Task List */}
      <ul>
        {filteredTasks.length === 0 && <li className="text-gray-500">No tasks</li>}
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            className="flex justify-between items-center p-2 border-b last:border-none"
          >
            <span
              className={`flex-1 ${task.completed ? "line-through text-gray-500" : ""}`}
              onClick={() => toggleComplete(task.id)}
            >
              {task.text}
            </span>
            <Button variant="danger" onClick={() => deleteTask(task.id)}>
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
