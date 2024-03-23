import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/actions";

const TaskForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !dueDate.trim()) {
      setError("All fields are required");
      return;
    }
    const task = {
      id: Math.floor(Math.random() * 100).toString(),
      title,
      description,
      dueDate,
      status: "pending",
    };
    dispatch(addTask(task));
    setTitle("");
    setDescription("");
    setDueDate("");
    setError("");
  };

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const today = new Date();
    if (selectedDate < today) {
      setError("Please select a date from today onwards");
      setDueDate("");
    } else {
      setError("");
      setDueDate(e.target.value);
    }
  };

  return (
    <div className="mt-4 w-1/2 m-auto">
      <h2 className="text-xl font-bold mb-4">Add New Task</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-6"
      >
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-bold mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 px-3 py-2 w-full rounded focus:outline-none focus:border-blue-500"
            placeholder="Enter title"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-bold mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-300 px-3 py-2 w-full rounded focus:outline-none focus:border-blue-500"
            placeholder="Enter description"
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="dueDate" className="block text-sm font-bold mb-1">
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={handleDateChange}
            min={new Date().toISOString().split("T")[0]}
            className="border border-gray-300 px-3 py-2 w-full rounded focus:outline-none focus:border-blue-500"
            placeholder="Due Date"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
