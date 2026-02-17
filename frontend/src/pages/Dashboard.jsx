import { useEffect, useState } from "react";
import API from "../api/axios";

import {
  DndContext,
  closestCenter,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";

import { CSS } from "@dnd-kit/utilities";

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
    if (!title.trim()) return;

    try {
      await API.post("/tasks", {
        title,
        description: "Created from frontend",
      });

      setTitle("");
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await API.patch(`/tasks/${id}/status`, {
        status: newStatus,
      });

      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id;

    await updateStatus(taskId, newStatus);
  };

  const todoTasks = tasks.filter((task) => task.status === "todo");
  const inProgressTasks = tasks.filter(
    (task) => task.status === "in-progress"
  );
  const doneTasks = tasks.filter((task) => task.status === "done");

  return (
    <div style={{ padding: "20px" }}>
      <h2>CollabFlow Dashboard 🚀</h2>

      {/* Create Task */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="New task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={createTask}>Add Task</button>
      </div>

      <hr />

      {/* Drag & Drop Board */}
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
          <DroppableColumn id="todo" title="TODO" tasks={todoTasks} />
          <DroppableColumn
            id="in-progress"
            title="IN PROGRESS"
            tasks={inProgressTasks}
          />
          <DroppableColumn id="done" title="DONE" tasks={doneTasks} />
        </div>
      </DndContext>
    </div>
  );
}

/* ---------------- Draggable Task ---------------- */

function DraggableTask({ task }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task._id,
  });

  const style = {
    ...cardStyle,
    transform: CSS.Translate.toString(transform),
    cursor: "grab",
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <p>{task.title}</p>
    </div>
  );
}

/* ---------------- Droppable Column ---------------- */

function DroppableColumn({ id, title, tasks }) {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      style={{ flex: 1, background: "#f3f3f3", padding: "10px" }}
    >
      <h3>{title}</h3>
      {tasks.map((task) => (
        <DraggableTask key={task._id} task={task} />
      ))}
    </div>
  );
}

/* ---------------- Card Style ---------------- */

const cardStyle = {
  background: "white",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "8px",
};

export default Dashboard;
