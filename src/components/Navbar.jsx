import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white py-4 px-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-xl md:text-3xl font-bold tracking-wider hover:text-purple-400 transition duration-300"
        >
          Task Manager
        </Link>
        <div className="flex items-center">
          <Link
            to="/"
            className="mx-4 hover:text-purple-400 transition duration-300"
          >
            Task List
          </Link>
          <Link
            to="/add-task"
            className="mx-4 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md transition duration-300"
          >
            Add Task
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
