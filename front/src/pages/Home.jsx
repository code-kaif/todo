import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import TodoItem from "../components/TodoItem";
import { Context } from "../main";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [task, setTask] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const { isAuthenticated } = useContext(Context);

  const updateHandler = async (id) => {
    try {
      const { data } = await axios.put(
        `http://localhost:5000/task/${id}`,
        {},
        { withCredentials: true }
      );
      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.success("Error");
    }
  };

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(`http://localhost:5000/task/${id}`, {
        withCredentials: true,
      });
      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.success("Error");
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:5000/task/new",
        {
          title,
          description,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(data.message);
      setLoading(false);
      setTitle("");
      setDescription("");
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error("Login Plz...");
      setLoading(false);
    }
  }

  useEffect(() => {
    axios
      .get("http://localhost:5000/task/all", { withCredentials: true })
      .then((res) => {
        setTask(res.data.task);
      })
      .catch((error) => {
        toast.error("Login Plz...");
      });
  }, [refresh]);

  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <div className="todo-container">
      <form className="todo-form" onSubmit={handleSubmit}>
        <h1>Task</h1>
        <div className="inputs">
          <input
            type="text"
            id="username"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="text"
            id="password"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button disabled={loading} className="todo-btn" type="submit">
          Add Task
        </button>
      </form>
      <div className="task-conatiner">
        {task.map((i) => (
          <TodoItem
            title={i.title}
            description={i.description}
            isCompleted={i.isCompleted}
            updateHandler={updateHandler}
            deleteHandler={deleteHandler}
            id={i._id}
            key={i._id}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
