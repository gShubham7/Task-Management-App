import Tasklist from "./components/Tasklist";
import Taskform from "./components/Taskform";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" exact element={<Tasklist />} />
          <Route path="/add-task" element={<Taskform />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
