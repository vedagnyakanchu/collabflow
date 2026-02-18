import { useEffect, useState } from "react";
import API from "../api/axios"; // ✅ FIXED PATH

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!newTask.trim()) return;

    try {
      await API.post("/tasks", { title: newTask.trim() });
      setNewTask("");
      fetchTasks();
    } catch (err) {
      console.error("Add error:", err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await API.patch(`/tasks/${id}/status`, { status });
      fetchTasks();
    } catch (err) {
      console.error("Status update error:", err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const startEditing = (task) => {
    setEditingTask(task._id);
    setEditTitle(task.title);
  };

  const saveEdit = async (id) => {
    if (!editTitle.trim()) return;

    try {
      await API.patch(`/tasks/${id}`, {
        title: editTitle.trim(),
      });
      setEditingTask(null);
      fetchTasks();
    } catch (err) {
      console.error("Edit error:", err);
    }
  };

  const renderColumn = (status, title) => (
    <div className="flex-1 bg-slate-800 rounded-xl p-5 shadow-lg border border-slate-700">
      <h2 className="text-lg font-semibold mb-4 text-indigo-400 tracking-wide">
        {title}
      </h2>

      <div className="space-y-4">
        {tasks
          .filter((task) => task.status === status)
          .map((task) => (
            <div
              key={task._id}
              className="bg-slate-700 p-4 rounded-lg shadow hover:shadow-xl transition"
            >
              {editingTask === task._id ? (
                <>
                  <input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full mb-3 px-3 py-2 bg-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />

                  <div className="flex gap-2">
                    <button
                      onClick={() => saveEdit(task._id)}
                      className="text-xs bg-green-600 px-3 py-1 rounded-md hover:bg-green-700 transition"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingTask(null)}
                      className="text-xs bg-gray-500 px-3 py-1 rounded-md hover:bg-gray-600 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-sm mb-3">{task.title}</p>

                  <div className="flex flex-wrap gap-2 text-xs">
                    {status !== "todo" && (
                      <button
                        onClick={() =>
                          updateStatus(task._id, "todo")
                        }
                        className="px-2 py-1 bg-gray-600 rounded-md hover:bg-gray-700 transition"
                      >
                        Todo
                      </button>
                    )}

                    {status !== "in-progress" && (
                      <button
                        onClick={() =>
                          updateStatus(task._id, "in-progress")
                        }
                        className="px-2 py-1 bg-yellow-600 rounded-md hover:bg-yellow-700 transition"
                      >
                        In Progress
                      </button>
                    )}

                    {status !== "done" && (
                      <button
                        onClick={() =>
                          updateStatus(task._id, "done")
                        }
                        className="px-2 py-1 bg-green-600 rounded-md hover:bg-green-700 transition"
                      >
                        Done
                      </button>
                    )}

                    <button
                      onClick={() => startEditing(task)}
                      className="px-2 py-1 bg-blue-600 rounded-md hover:bg-blue-700 transition"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteTask(task._id)}
                      className="px-2 py-1 bg-red-600 rounded-md hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <h1 className="text-2xl font-bold mb-8 tracking-wide">
        Task Management
      </h1>

      <div className="flex gap-3 mb-8">
        <input
          type="text"
          placeholder="Enter new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={addTask}
          className="px-5 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
        >
          Add Task
        </button>
      </div>

      <div className="flex gap-6">
        {renderColumn("todo", "Todo")}
        {renderColumn("in-progress", "In Progress")}
        {renderColumn("done", "Done")}
      </div>
    </div>
  );
}

export default Tasks;
