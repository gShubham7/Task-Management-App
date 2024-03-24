const EditTaskModal = ({
  updateTask,
  error,
  handleUpdateTask,
  handleEditTask,
  handleCloseEditModal,
}) => {
  const todayDate = new Date().toISOString().split("T")[0];

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow-lg m-4">
        <h2 className="text-xl font-bold mb-4">Edit Task</h2>
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <input
          type="text"
          placeholder="Title"
          name="title"
          value={updateTask.title}
          onChange={(e) => handleUpdateTask(e)}
          className="border border-gray-300 px-2 py-1 mb-2 w-full rounded transition duration-300 ease-in-out focus:outline-none focus:border-blue-500"
        />
        <textarea
          placeholder="Description"
          name="description"
          value={updateTask.description}
          onChange={(e) => handleUpdateTask(e)}
          className="border border-gray-300 px-2 py-1 mb-2 w-full rounded transition duration-300 ease-in-out focus:outline-none focus:border-blue-500"
        ></textarea>
        <input
          type="date"
          name="dueDate"
          value={updateTask.dueDate}
          onChange={(e) => handleUpdateTask(e)}
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
  );
};

export default EditTaskModal;
