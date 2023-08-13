import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

export default function ManageTasksEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [date_end, setDate_end] = useState("");
  const [status, setStatus] = useState("review");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    const task = tasks
      ? tasks.find((t) => parseInt(t.id) === parseInt(id))
      : null;

    if (task) {
      setTitle(task.title);
      setDate(task.date);
      setDate_end(task.date_end);
      setStatus(task.status);
      setPassword(task.password);
    }
  }, []);

  const updateTask = () => {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    const newTasks = tasks.map((t) => {
      if (parseInt(t.id) === parseInt(id)) {
        t.title = title;
        t.date = date;
        t.date_end = date_end;
        t.status = status;
        t.password = password;
      }
      return t;
    });
    localStorage.setItem("tasks", JSON.stringify(newTasks));
    navigate("/manage-tasks");
  };

  return (
    <div className="container mx-auto my-5">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h1 className="h1">Edit Task</h1>
      </div>
      <div className="card mb-2 p-4">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            updateTask();
          }}
        >
          <div className="mb-3">
            <label for="task-title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="task-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <div className="date">
              <label for="task-date" className="form-label col">
                Date Start
              </label>
              <input
                type="date"
                className="form-control"
                id="task-date"
                value={date}
                onChange={(event) => {
                  setDate(event.target.value);
                }}
              />
              <label for="task-date" className="form-label col">
                Date End
              </label>
              <input
                type="date"
                className="form-control"
                id="task-date"
                value={date_end}
                onChange={(event) => {
                  setDate_end(event.target.value);
                }}
              />
            </div>
          </div>

          <div className="mb-3">
            <label for="task-content" className="form-label">
              Status
            </label>
            <select
              className="form-control"
              id="task-status"
              value={status}
              onChange={(event) => {
                setStatus(event.target.value);
              }}
            >
              <option value="pending">Pending for Review</option>
              <option value="private">Private</option>
              <option value="publish">Publish</option>
            </select>
          </div>
          {status === "private" ? (
            <div className="mb-3">
              <label for="task-title" className="form-label">
                Password
              </label>
              <input
                type="text"
                className="form-control"
                id="task-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
          ) : null}
          <div className="text-end">
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </div>
        </form>
      </div>
      <div className="frame">
        <Link to="/manage-tasks">
          <button className="custom-btn btn-9">Back to tasks</button>
        </Link>
      </div>
    </div>
  );
}
