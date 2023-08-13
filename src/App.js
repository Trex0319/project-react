import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import ManageTask from "./pages/manage-tasks";
import ManageTasksEdit from "./pages/manage-tasks-edit";
import Task from "./pages/task";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/manage-tasks" element={<ManageTask />} />
        <Route path="/manage-tasks-edit/:id" element={<ManageTasksEdit />} />
        <Route path="/task/:id" element={<Task />} />
      </Routes>
    </Router>
  );
}

export default App;
