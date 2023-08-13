import { Link } from "react-router-dom";
import "./index.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useState, useEffect, useMemo, useRef } from "react";
import { TextInput } from "@mantine/core";

export default function Home() {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  const [keywords, setKeywords] = useState("");
  const [incomeList, setIncomeList] = useState([]);
  const [filter, setFilter] = useState("");

  const filteredList = useMemo(() => {
    return incomeList.filter(
      (i) => i.name.toLowerCase().indexOf(keywords.toLowerCase()) >= 0
    );
  }, [filter, incomeList, keywords]);

  return (
    <div className="container mx-auto my-5">
      <h1 className="h1 mb-4 text-center">My Task</h1>
      {tasks
        ? tasks
            .filter((p) => p.status === "publish" || p.status === "private")
            .map((task) => {
              return (
                <div key={task.id} className="card mb-2">
                  <div className="card-body">
                    <h5 className="card-title">{task.title}</h5>
                    <div className="text-end">
                      <Link
                        to={`/task/${task.id}`}
                        className="btn btn-primary btn-sm"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })
        : null}

      <div className="frame">
        <Link to="/manage-tasks">
          <button className="custom-btn btn-9">Manage-Task</button>
        </Link>
      </div>
    </div>
  );
}
