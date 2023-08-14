import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Group } from "@mantine/core";
import { Link } from "react-router-dom";
import "./index.css";

export default function ManageTask() {
  // modal
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [date_end, setDate_end] = useState("");
  const [tasks, setTasks] = useState([]);
  const [opened, { open, close }] = useDisclosure(false);

  const submitForm = () => {
    let tasks = JSON.parse(localStorage.getItem("tasks"));

    if (!tasks) tasks = [];

    tasks.push({
      id: Math.floor(Math.random() * 100000),
      title: title,
      date: date,
      date_end: date_end,
      status: "review",
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
    setTitle("");
    setDate("");
    setDate_end("");
    setTasks(tasks);
    close();
  };
  // modal

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    setTasks(tasks);
  }, []);

  const deleteTask = (id) => {
    const newTasks = tasks.filter((p) => parseInt(p.id) !== parseInt(id));
    localStorage.setItem("tasks", JSON.stringify(newTasks));
    setTasks(newTasks);
  };

  return (
    <div className="container mx-auto my-5">
      {/* Modal */}
      <Modal opened={opened} onClose={close} withCloseButton={false}>
        <div>
          <div className="container mx-auto my-5">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h1 className="h1">Add New Task</h1>
            </div>
            <div className="card mb-2 p-4">
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  submitForm();
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
                    onChange={(event) => {
                      setTitle(event.target.value);
                    }}
                  />
                  <div className="date">
                    <label for="task-date" className="form-label">
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
                    <label for="task-date" className="form-label">
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
                <div className="text-end">
                  <button type="submit" className="btn btn-primary">
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h1 className="h1">Manage Tasks</h1>
        <div className="text-end">
          <div className="frame">
            <Group position="center">
              <button onClick={open} className="custom-btn btn-12">
                <span>Go it !!!!</span>
                <span>Add Task</span>
              </button>
            </Group>
          </div>
        </div>
      </div>
      <div className="card mb-2 p-4">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Date</th>
              <th scope="col">Status</th>
              <th scope="col" className="text-end">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {tasks
              ? tasks.map((task) => {
                  return (
                    <tr key={task.id}>
                      <td>{task.title}</td>
                      <td>
                        {task.date} - {task.date_end}
                      </td>
                      <td>
                        <span className="badge bg-warning">{task.status}</span>
                      </td>
                      <td className="text-end">
                        <div className="buttons">
                          <Link
                            to={`/manage-tasks-edit/${task.id}`}
                            className="btn btn-secondary btn-sm me-2"
                          >
                            <i className="bi bi-pencil"></i>
                          </Link>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => {
                              deleteTask(task.id);
                            }}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      </div>
      <div className="text-center">
        <div className="frame">
          <Link to="/">
            <button className="custom-btn btn-8 text-dark">Back</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
