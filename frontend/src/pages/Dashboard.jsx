import { useEffect, useState } from "react";
import API from "../api/axios";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const createTask = async () => {
    try {
      await API.post("/tasks", {
        title,
        description: "Created from frontend",
        status: "todo",
        priority: "medium",
      });

      setTitle("");
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>My Tasks</h2>

      <input
        type="text"
        placeholder="New task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={createTask}>Add Task</button>

      <hr />

      {tasks.length === 0 ? (
        <p>No tasks yet 🚀</p>
      ) : (
        tasks.map((task) => (
          <div key={task._id}>
            <h4>{task.title}</h4>
            <p>Status: {task.status}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;
