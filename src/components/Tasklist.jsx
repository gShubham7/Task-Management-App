import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask, toggleStatus, editTask } from "../redux/actions";
import EditTaskModal from "./EditTaskModal";

const Tasklist = () => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editedTask, setEditedTask] = useState({});
  const [updateTask, setUpdateTask] = useState({});
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState(""); // State for sorting by due date
  const [filterStatus, setFilterStatus] = useState("all"); // State for filtering by status

  const handleDelete = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  const handleToggleStatus = (taskId) => {
    dispatch(toggleStatus(taskId));
  };

  const handleOpenEditModal = (task) => {
    setEditedTask(task);
    setUpdateTask(task);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setError("");
  };

  const handleUpdateTask = (e) => {
    const { name, value } = e.target;
    setUpdateTask({ ...updateTask, [name]: value });
  };

  const handleEditTask = () => {
    if (
      !updateTask.title.trim() ||
      !updateTask.description.trim() ||
      !updateTask.dueDate.trim()
    ) {
      setError("All fields are required");
      return;
    }
    const updatedTask = {
      ...editedTask,
      title: updateTask.title,
      description: updateTask.description,
      dueDate: updateTask.dueDate,
    };
    dispatch(editTask(editedTask.id, updatedTask));
    handleCloseEditModal();
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortBy === "asc") return new Date(a.dueDate) - new Date(b.dueDate);
    else if (sortBy === "desc")
      return new Date(b.dueDate) - new Date(a.dueDate);
    return 0;
  });

  const filteredTasks = sortedTasks.filter((task) => {
    if (filterStatus === "all") return true;
    return task.status === filterStatus;
  });

  return (
    <div className="mt-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">
          {tasks && tasks.length ? "Task List" : "Add Some Tasks..."}
        </h2>
        <div>
          <label className="mr-2">Sort By Due Date:</label>
          <select
            data-testid="sort-by-due-date"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-2 py-1 border border-gray-300 rounded"
          >
            <option value="">None</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
          <label className="ml-4 mr-2">Filter By Status:</label>
          <select
            data-testid="filter-by-status"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-2 py-1 border border-gray-300 rounded"
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 ease-in-out transform hover:scale-105"
          >
            <div className="px-4 py-3 bg-gray-200 border-b flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-800">{task.title}</h3>
              <h3
                className={`text-sm font-bold ${
                  task.status === "completed"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {task.status === "completed" ? "Completed" : "Pending"}
              </h3>
            </div>
            <div className="p-4">
              <p className="text-gray-700 mb-2">{task.description}</p>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold text-gray-600">
                  Due Date: {task.dueDate}
                </span>
              </div>
            </div>
            <div className="p-4 flex justify-end">
              <button
                data-testid={`toggle-button-${task.id}`}
                className={`px-2 py-1 rounded ${
                  task.status === "completed" ? "bg-red-500" : "bg-green-500"
                } text-white`}
                onClick={() => handleToggleStatus(task.id)}
              >
                {task.status === "completed"
                  ? "Mark Incomplete"
                  : "Mark Complete"}
              </button>
              <button
                data-testid={`edit-button-${task.id}`}
                className="bg-yellow-500 text-white px-2 py-1 rounded ml-2"
                onClick={() => handleOpenEditModal(task)}
              >
                Edit
              </button>
              <button
                data-testid={`delete-button-${task.id}`}
                className="bg-red-500 text-white px-2 py-1 rounded ml-2"
                onClick={() => handleDelete(task.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {editModalOpen && (
        <EditTaskModal
          updateTask={updateTask}
          error={error}
          handleUpdateTask={handleUpdateTask}
          handleEditTask={handleEditTask}
          handleCloseEditModal={handleCloseEditModal}
        />
      )}
    </div>
  );
};

export default Tasklist;
