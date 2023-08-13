import { Link, useParams } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { nanoid } from "nanoid";

export default function Task() {
  const [input, setInput] = useState("");
  const [list, setList] = useState([]);
  const { id } = useParams();
  const [input2, setInput2] = useState("");
  const [list2, setList2] = useState([]);
  const [input3, setInput3] = useState("");
  const [list3, setList3] = useState([]);
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [showForm, setShowForm] = useState(true);

  const morningListCount = useMemo(() => {
    return list.length;
  }, [list]);

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem("list"));
    if (list) {
      setList(list);
    }
  }, []);

  const noonListCount = useMemo(() => {
    return list2.length;
  }, [list2]);

  useEffect(() => {
    const list2 = JSON.parse(localStorage.getItem("list2"));
    if (list2) {
      setList2(list2);
    }
  }, []);

  const nightListCount = useMemo(() => {
    return list3.length;
  }, [list3]);

  useEffect(() => {
    const list3 = JSON.parse(localStorage.getItem("list3"));
    if (list3) {
      setList(list3);
    }
  }, []);

  const tasks = JSON.parse(localStorage.getItem("tasks"));
  let task = null;
  if (tasks) {
    task = tasks.find((t) => parseInt(t.id) === parseInt(id));
  }

  if (!task) return "task no found";

  const { title = "", date = "", date_end = "", status } = task;

  const addList = () => {
    const newList = [...list];

    newList.push({
      id: nanoid(),
      text: input,
      isCompleted: false,
    });

    setList(newList);
    localStorage.setItem("list", JSON.stringify(newList));

    setInput("");
  };

  const addList2 = () => {
    const newList2 = [...list2];

    newList2.push({
      id: nanoid(),
      text: input2,
      isCompleted: false,
    });

    setList2(newList2);
    localStorage.setItem("list2", JSON.stringify(newList2));

    setInput2("");
  };

  const addList3 = () => {
    const newList3 = [...list3];

    newList3.push({
      id: nanoid(),
      text: input3,
      isCompleted: false,
    });

    setList3(newList3);
    localStorage.setItem("list", JSON.stringify(newList3));

    setInput3("");
  };
  const checkPassword = () => {
    if (password === task.password) {
      setVisible(true);
      setShowForm(false);
    } else {
      setVisible(false);
      setShowForm(true);
    }
  };

  return (
    <div className="container mx-auto my-5">
      <h1 className="h1 mb-4 text-center">{title}</h1>
      <p>Task ID: {id}</p>
      {status === "private" ? (
        <div>
          {showForm ? (
            <div>
              <div className="mb-3">
                <label for="post-title" className="form-label">
                  Enter the Password to read the task
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="post-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              <button
                className="btn btn-primary btn-sm"
                onClick={(event) => {
                  event.preventDefault();
                  checkPassword();
                }}
              >
                Submit
              </button>
            </div>
          ) : null}
          {visible ? (
            <div>
              <div className="d-flex">
                <p>{date}</p>
                <p className="mx-3">To</p>
                <p>{date_end}</p>
              </div>
              <div>
                <div className="card rounded shadow-sm m-5">
                  <div className="card-body">
                    <h3 className="class-title">Morning</h3>
                    <p className="fw-bold">
                      Total Morning Tasks: {morningListCount}
                    </p>
                    <ul className="list-group">
                      {list.map((item, index) => (
                        <li
                          className="list-group-item d-flex justify-content-between align-items-center"
                          key={index}
                        >
                          <div>
                            <button
                              onClick={() => {
                                const newEditList = list.map((icon) => {
                                  if (icon.id === item.id) {
                                    const newIcon = { ...icon };
                                    if (icon.isCompleted === true) {
                                      newIcon.isCompleted = false;
                                    } else if (icon.isCompleted === false) {
                                      newIcon.isCompleted = true;
                                    }
                                    return newIcon;
                                  } else {
                                    return icon;
                                  }
                                });
                                setList(newEditList);
                                localStorage.setItem(
                                  "list",
                                  JSON.stringify(newEditList)
                                );
                              }}
                              className={`btn btn-sm ${
                                item.isCompleted ? "btn-success" : "btn-light"
                              }`}
                            >
                              <i
                                className={`bi ${
                                  item.isCompleted
                                    ? "bi-check-square"
                                    : "bi-square"
                                }`}
                              ></i>
                            </button>
                            {item.isCompleted ? (
                              <span className="ms-2 text-decoration-line-through">
                                {item.text}
                              </span>
                            ) : (
                              <span className="ms-2">{item.text}</span>
                            )}
                          </div>
                          <button
                            onClick={() => {
                              const newList = list.filter(
                                (listItem) => listItem.id !== item.id
                              );
                              setList(newList);
                              localStorage.setItem(
                                "list",
                                JSON.stringify(newList)
                              );
                            }}
                            className="btn btn-sm btn-danger"
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </li>
                      ))}
                      <div className="mt-4">
                        <form className="d-flex justify-content-between align-items-center">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Add new task..."
                            value={input}
                            onChange={(event) => {
                              setInput(event.target.value);
                            }}
                          />
                          <button
                            className="btn btn-primary btn-sm rounded ms-2"
                            onClick={(event) => {
                              event.preventDefault();
                              addList();
                            }}
                          >
                            Add
                          </button>
                        </form>
                      </div>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <div className="card rounded shadow-sm m-5">
                  <div className="card-body">
                    <h3 className="class-title">Noon</h3>
                    <p className="fw-bold">Total Noon Tasks: {noonListCount}</p>
                    <ul className="list-group">
                      {list2.map((item2, index) => (
                        <li
                          className="list-group-item d-flex justify-content-between align-items-center"
                          key={index}
                        >
                          <div>
                            <button
                              onClick={() => {
                                const newEditList2 = list2.map((icon2) => {
                                  if (icon2.id === item2.id) {
                                    const newIcon2 = { ...icon2 };
                                    if (icon2.isCompleted === true) {
                                      newIcon2.isCompleted = false;
                                    } else if (icon2.isCompleted === false) {
                                      newIcon2.isCompleted = true;
                                    }
                                    return newIcon2;
                                  } else {
                                    return icon2;
                                  }
                                });
                                setList2(newEditList2);
                                localStorage.setItem(
                                  "list2",
                                  JSON.stringify(newEditList2)
                                );
                              }}
                              className={`btn btn-sm ${
                                item2.isCompleted ? "btn-success" : "btn-light"
                              }`}
                            >
                              <i
                                className={`bi ${
                                  item2.isCompleted
                                    ? "bi-check-square"
                                    : "bi-square"
                                }`}
                              ></i>
                            </button>
                            {item2.isCompleted ? (
                              <span className="ms-2 text-decoration-line-through">
                                {item2.text}
                              </span>
                            ) : (
                              <span className="ms-2">{item2.text}</span>
                            )}
                          </div>
                          <button
                            onClick={() => {
                              const newList2 = list2.filter(
                                (listItem2) => listItem2.id !== item2.id
                              );
                              setList2(newList2);
                              localStorage.setItem(
                                "list2",
                                JSON.stringify(newList2)
                              );
                            }}
                            className="btn btn-sm btn-danger"
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </li>
                      ))}
                      <div className="mt-4">
                        <form className="d-flex justify-content-between align-items-center">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Add new task..."
                            value={input2}
                            onChange={(event) => {
                              setInput2(event.target.value);
                            }}
                          />
                          <button
                            className="btn btn-primary btn-sm rounded ms-2"
                            onClick={(event) => {
                              event.preventDefault();
                              addList2();
                            }}
                          >
                            Add
                          </button>
                        </form>
                      </div>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <div className="card rounded shadow-sm m-5">
                  <div className="card-body">
                    <h3 className="class-title">Night</h3>
                    <p className="fw-bold">
                      Total Night Tasks: {nightListCount}
                    </p>
                    <ul className="list-group">
                      {list3.map((item3, index) => (
                        <li
                          className="list-group-item d-flex justify-content-between align-items-center"
                          key={index}
                        >
                          <div>
                            <button
                              onClick={() => {
                                const newEditList3 = list3.map((icon3) => {
                                  if (icon3.id === item3.id) {
                                    const newIcon3 = { ...icon3 };
                                    if (icon3.isCompleted === true) {
                                      newIcon3.isCompleted = false;
                                    } else if (icon3.isCompleted === false) {
                                      newIcon3.isCompleted = true;
                                    }
                                    return newIcon3;
                                  } else {
                                    return icon3;
                                  }
                                });
                                setList3(newEditList3);
                                localStorage.setItem(
                                  "list3",
                                  JSON.stringify(newEditList3)
                                );
                              }}
                              className={`btn btn-sm ${
                                item3.isCompleted ? "btn-success" : "btn-light"
                              }`}
                            >
                              <i
                                className={`bi ${
                                  item3.isCompleted
                                    ? "bi-check-square"
                                    : "bi-square"
                                }`}
                              ></i>
                            </button>
                            {item3.isCompleted ? (
                              <span className="ms-2 text-decoration-line-through">
                                {item3.text}
                              </span>
                            ) : (
                              <span className="ms-2">{item3.text}</span>
                            )}
                          </div>
                          <button
                            onClick={() => {
                              const newList3 = list3.filter(
                                (listItem3) => listItem3.id !== item3.id
                              );
                              setList3(newList3);
                              localStorage.setItem(
                                "list3",
                                JSON.stringify(newList3)
                              );
                            }}
                            className="btn btn-sm btn-danger"
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </li>
                      ))}
                      <div className="mt-4">
                        <form className="d-flex justify-content-between align-items-center">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Add new task..."
                            value={input3}
                            onChange={(event) => {
                              setInput3(event.target.value);
                            }}
                          />
                          <button
                            className="btn btn-primary btn-sm rounded ms-2"
                            onClick={(event) => {
                              event.preventDefault();
                              addList3();
                            }}
                          >
                            Add
                          </button>
                        </form>
                      </div>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        <div>
          <div className="d-flex">
            <p>{date}</p>
            <p className="mx-3">To</p>
            <p>{date_end}</p>
          </div>
          <div>
            <div className="card rounded shadow-sm m-5">
              <div className="card-body">
                <h3 className="class-title">Morning</h3>
                <p className="fw-bold">
                  Total Morning Tasks: {morningListCount}
                </p>
                <ul className="list-group">
                  {list.map((item, index) => (
                    <li
                      className="list-group-item d-flex justify-content-between align-items-center"
                      key={index}
                    >
                      <div>
                        <button
                          onClick={() => {
                            const newEditList = list.map((icon) => {
                              if (icon.id === item.id) {
                                const newIcon = { ...icon };
                                if (icon.isCompleted === true) {
                                  newIcon.isCompleted = false;
                                } else if (icon.isCompleted === false) {
                                  newIcon.isCompleted = true;
                                }
                                return newIcon;
                              } else {
                                return icon;
                              }
                            });
                            setList(newEditList);
                            localStorage.setItem(
                              "list",
                              JSON.stringify(newEditList)
                            );
                          }}
                          className={`btn btn-sm ${
                            item.isCompleted ? "btn-success" : "btn-light"
                          }`}
                        >
                          <i
                            className={`bi ${
                              item.isCompleted ? "bi-check-square" : "bi-square"
                            }`}
                          ></i>
                        </button>
                        {item.isCompleted ? (
                          <span className="ms-2 text-decoration-line-through">
                            {item.text}
                          </span>
                        ) : (
                          <span className="ms-2">{item.text}</span>
                        )}
                      </div>
                      <button
                        onClick={() => {
                          const newList = list.filter(
                            (listItem) => listItem.id !== item.id
                          );
                          setList(newList);
                          localStorage.setItem("list", JSON.stringify(newList));
                        }}
                        className="btn btn-sm btn-danger"
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </li>
                  ))}
                  <div className="mt-4">
                    <form className="d-flex justify-content-between align-items-center">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Add new task..."
                        value={input}
                        onChange={(event) => {
                          setInput(event.target.value);
                        }}
                      />
                      <button
                        className="btn btn-primary btn-sm rounded ms-2"
                        onClick={(event) => {
                          event.preventDefault();
                          addList();
                        }}
                      >
                        Add
                      </button>
                    </form>
                  </div>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <div className="card rounded shadow-sm m-5">
              <div className="card-body">
                <h3 className="class-title">Noon</h3>
                <p className="fw-bold">Total Noon Tasks: {noonListCount}</p>
                <ul className="list-group">
                  {list2.map((item2, index) => (
                    <li
                      className="list-group-item d-flex justify-content-between align-items-center"
                      key={index}
                    >
                      <div>
                        <button
                          onClick={() => {
                            const newEditList2 = list2.map((icon2) => {
                              if (icon2.id === item2.id) {
                                const newIcon2 = { ...icon2 };
                                if (icon2.isCompleted === true) {
                                  newIcon2.isCompleted = false;
                                } else if (icon2.isCompleted === false) {
                                  newIcon2.isCompleted = true;
                                }
                                return newIcon2;
                              } else {
                                return icon2;
                              }
                            });
                            setList2(newEditList2);
                            localStorage.setItem(
                              "list2",
                              JSON.stringify(newEditList2)
                            );
                          }}
                          className={`btn btn-sm ${
                            item2.isCompleted ? "btn-success" : "btn-light"
                          }`}
                        >
                          <i
                            className={`bi ${
                              item2.isCompleted
                                ? "bi-check-square"
                                : "bi-square"
                            }`}
                          ></i>
                        </button>
                        {item2.isCompleted ? (
                          <span className="ms-2 text-decoration-line-through">
                            {item2.text}
                          </span>
                        ) : (
                          <span className="ms-2">{item2.text}</span>
                        )}
                      </div>
                      <button
                        onClick={() => {
                          const newList2 = list2.filter(
                            (listItem2) => listItem2.id !== item2.id
                          );
                          setList2(newList2);
                          localStorage.setItem(
                            "list2",
                            JSON.stringify(newList2)
                          );
                        }}
                        className="btn btn-sm btn-danger"
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </li>
                  ))}
                  <div className="mt-4">
                    <form className="d-flex justify-content-between align-items-center">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Add new task..."
                        value={input2}
                        onChange={(event) => {
                          setInput2(event.target.value);
                        }}
                      />
                      <button
                        className="btn btn-primary btn-sm rounded ms-2"
                        onClick={(event) => {
                          event.preventDefault();
                          addList2();
                        }}
                      >
                        Add
                      </button>
                    </form>
                  </div>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <div className="card rounded shadow-sm m-5">
              <div className="card-body">
                <h3 className="class-title">Night</h3>
                <p className="fw-bold">Total Night Tasks: {nightListCount}</p>
                <ul className="list-group">
                  {list3.map((item3, index) => (
                    <li
                      className="list-group-item d-flex justify-content-between align-items-center"
                      key={index}
                    >
                      <div>
                        <button
                          onClick={() => {
                            const newEditList3 = list3.map((icon3) => {
                              if (icon3.id === item3.id) {
                                const newIcon3 = { ...icon3 };
                                if (icon3.isCompleted === true) {
                                  newIcon3.isCompleted = false;
                                } else if (icon3.isCompleted === false) {
                                  newIcon3.isCompleted = true;
                                }
                                return newIcon3;
                              } else {
                                return icon3;
                              }
                            });
                            setList3(newEditList3);
                            localStorage.setItem(
                              "list3",
                              JSON.stringify(newEditList3)
                            );
                          }}
                          className={`btn btn-sm ${
                            item3.isCompleted ? "btn-success" : "btn-light"
                          }`}
                        >
                          <i
                            className={`bi ${
                              item3.isCompleted
                                ? "bi-check-square"
                                : "bi-square"
                            }`}
                          ></i>
                        </button>
                        {item3.isCompleted ? (
                          <span className="ms-2 text-decoration-line-through">
                            {item3.text}
                          </span>
                        ) : (
                          <span className="ms-2">{item3.text}</span>
                        )}
                      </div>
                      <button
                        onClick={() => {
                          const newList3 = list3.filter(
                            (listItem3) => listItem3.id !== item3.id
                          );
                          setList3(newList3);
                          localStorage.setItem(
                            "list3",
                            JSON.stringify(newList3)
                          );
                        }}
                        className="btn btn-sm btn-danger"
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </li>
                  ))}
                  <div className="mt-4">
                    <form className="d-flex justify-content-between align-items-center">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Add new task..."
                        value={input3}
                        onChange={(event) => {
                          setInput3(event.target.value);
                        }}
                      />
                      <button
                        className="btn btn-primary btn-sm rounded ms-2"
                        onClick={(event) => {
                          event.preventDefault();
                          addList3();
                        }}
                      >
                        Add
                      </button>
                    </form>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="frame">
        <Link to="/">
          <button className="custom-btn btn-9">Back</button>
        </Link>
      </div>
    </div>
  );
}
