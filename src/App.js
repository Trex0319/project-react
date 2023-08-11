import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Add from "./pages/add_task";
// import Task from "./pages/task";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/task" element={<Task />} /> */}
        <Route path="/add" element={<Add />} />
      </Routes>
    </Router>
  );
}

export default App;
