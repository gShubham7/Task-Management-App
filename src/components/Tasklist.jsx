import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask, toggleStatus, editTask } from "../redux/actions";

const Tasklist = () => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editedTask, setEditedTask] = useState({});
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedDueDate, setUpdatedDueDate] = useState("");
  const [error, setError] = useState("");

  const handleDelete = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  const handleToggleStatus = (taskId) => {
    dispatch(toggleStatus(taskId));
  };

  const handleOpenEditModal = (task) => {
    setEditedTask(task);
    setUpdatedTitle(task.title);
    setUpdatedDescription(task.description);
    setUpdatedDueDate(task.dueDate);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setError("");
  };

  const handleEditTask = () => {
    if (
      !updatedTitle.trim() ||
      !updatedDescription.trim() ||
      !updatedDueDate.trim()
    ) {
      setError("All fields are required");
      return;
    }
    const updatedTask = {
      ...editedTask,
      title: updatedTitle,
      description: updatedDescription,
      dueDate: updatedDueDate,
    };
    dispatch(editTask(editedTask.id, updatedTask));
    handleCloseEditModal();
  };

  const todayDate = new Date().toISOString().split("T")[0];

  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-4">Task List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 ease-in-out transform hover:scale-105"
          >
            <div className="px-4 py-3 bg-gray-200 border-b flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-800">{task.title}</h3>{" "}
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
                <span className="text-sm text-gray-600">{task.dueDate}</span>
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
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Edit Task</h2>
            {error && <div className="text-red-600 mb-2">{error}</div>}
            <input
              type="text"
              placeholder="Title"
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
              className="border border-gray-300 px-2 py-1 mb-2 w-full rounded transition duration-300 ease-in-out focus:outline-none focus:border-blue-500"
            />
            <textarea
              placeholder="Description"
              value={updatedDescription}
              onChange={(e) => setUpdatedDescription(e.target.value)}
              className="border border-gray-300 px-2 py-1 mb-2 w-full rounded transition duration-300 ease-in-out focus:outline-none focus:border-blue-500"
            ></textarea>
            <input
              type="date"
              value={updatedDueDate}
              onChange={(e) => setUpdatedDueDate(e.target.value)}
              min={todayDate}
              className="border border-gray-300 px-2 py-1 mb-2 w-full rounded transition duration-300 ease-in-out focus:outline-none focus:border-blue-500"
            />
            <div className="flex justify-end">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2 transition duration-300 ease-in-out hover:bg-blue-600"
                onClick={handleEditTask}
              >
                Save
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded transition duration-300 ease-in-out hover:bg-gray-600"
                onClick={handleCloseEditModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasklist;
