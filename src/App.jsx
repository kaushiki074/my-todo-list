import React, { useState } from "react";
import "./App.css";

function Task(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [taskName, setTaskName] = useState(props.name);
  const [taskDescription, setTaskDescription] = useState(props.description);
  const [taskStatus, setTaskStatus] = useState(props.status);

  function saveTask() {
    props.onUpdate(taskName, taskDescription, taskStatus);
    setIsEditing(false);
  }

  function cancelEdit() {
    setTaskName(props.name);
    setTaskDescription(props.description);
    setTaskStatus(props.status);
    setIsEditing(false);
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending":
        return "⏳";
      case "In Progress":
        return "⚙️";
      case "Complete":
        return "✅";
      default:
        return "";
    }
  };

  if (isEditing) {
    return (
      <div className="edit-card">
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Task Name"
        />

        <input
          type="text"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          placeholder="Description"
        />

        <label>
          <input
            type="radio"
            value="Pending"
            checked={taskStatus === "Pending"}
            onChange={(e) => setTaskStatus(e.target.value)}
          />
          Pending
        </label>

        <label>
          <input
            type="radio"
            value="In Progress"
            checked={taskStatus === "In Progress"}
            onChange={(e) => setTaskStatus(e.target.value)}
          />
          In Progress
        </label>

        <label>
          <input
            type="radio"
            value="Complete"
            checked={taskStatus === "Complete"}
            onChange={(e) => setTaskStatus(e.target.value)}
          />
          Complete
        </label>

        <br />
        <br />

        <button className="save-btn" onClick={saveTask}>Save</button>
        <button className="cancel-btn" onClick={cancelEdit}>Cancel</button>
      </div>
    );
  }

  return (
    <div
      className="profile-card"
      onClick={() => setIsOpen(!isOpen)}
      style={{ cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "flex-start" }}
    >
      <h2>{props.name}</h2>

      <p style={{ margin: "5px 0 0 0", color: "#555", display: "flex", alignItems: "center", gap: "5px" }}>
        {getStatusIcon(props.status)} {props.status}
      </p>

      {isOpen && (
        <div
          className="task-details"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "15px",
            width: "100%"
          }}
        >
          <p style={{ margin: 0 }}>
            <strong>Description:</strong> {props.description}
          </p>

          <p
            className="date"
            style={{
              margin: 0,
              fontSize: "0.85rem",
              color: "#666",
              whiteSpace: "nowrap"
            }}
          >
            🕒 {props.createdAt}
          </p>
        </div>
      )}

      <div style={{ marginTop: "15px" }}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            props.onDelete();
          }}
        >
          Delete
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsEditing(true);
          }}
        >
          Edit
        </button>
      </div>
    </div>
  );
}

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: "Buy Groceries",
      description: "Milk, Bread, Eggs",
      status: "Pending",
      createdAt: "16 Jul 2026, 06:30 AM"
    },
    {
      id: 2,
      name: "Finish Project",
      description: "Complete React App",
      status: "Complete",
      createdAt: "16 Jul 2026, 03:30 PM"
    },
    {
      id: 3,
      name: "Read Book",
      description: "Complete 2 chapters of current book",
      status: "In Progress",
      createdAt: "17 Jul 2026, 03:30 PM"
    },
    {
      id: 4,
      name: "Learn React Hooks",
      description: "Practice useState and useEffect examples",
      status: "In Progress",
      createdAt: "17 Jul 2026, 06:00 PM"
    },
    {
      id: 5,
      name: "Prepare Assignment",
      description: "Complete FLAT module notes",
      status: "Complete",
      createdAt: "17 Jul 2026, 06:00 PM"
    },
    {
      id: 6,
      name: "Update Resume",
      description: "Add new projects and skills",
      status: "Pending",
      createdAt: "18 Jul 2026, 06:30 PM"
    }
  ]);

  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newStatus, setNewStatus] = useState("Pending");

  const [filter, setFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);

  function addTask() {
    if (newName.trim() === "") return;

    const task = {
      id: Date.now(),
      name: newName,
      description: newDescription,
      status: newStatus,
      createdAt: new Date().toLocaleString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    };

    setTasks([...tasks, task]);

    setNewName("");
    setNewDescription("");
    setNewStatus("Pending");
    setShowForm(false);
  }

  function deleteTask(id) {
    const updatedList = tasks.filter(task => task.id !== id);
    setTasks(updatedList);
  }

  function updateTask(id, name, description, status) {
    const updatedList = tasks.map(task => {
      if (task.id === id) {
        return {
          ...task,
          name,
          description,
          status
        };
      }
      return task;
    });

    setTasks(updatedList);
  }

  const filteredTasks =
    filter === "All"
      ? tasks
      : tasks.filter(task => task.status === filter);

  return (
    <div className="container">
      <h2>To Do List</h2>

      {!showForm ? (
        <button onClick={() => setShowForm(true)}>
          + Add Task
        </button>
      ) : (
        <div>
          <input
            type="text"
            placeholder="Task Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Description"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />

          <label>
            <input
              type="radio"
              value="Pending"
              checked={newStatus === "Pending"}
              onChange={(e) => setNewStatus(e.target.value)}
            />
            Pending
          </label>

          <label>
            <input
              type="radio"
              value="In Progress"
              checked={newStatus === "In Progress"}
              onChange={(e) => setNewStatus(e.target.value)}
            />
            In Progress
          </label>

          <label>
            <input
              type="radio"
              value="Complete"
              checked={newStatus === "Complete"}
              onChange={(e) => setNewStatus(e.target.value)}
            />
            Complete
          </label>

          <button onClick={addTask}>
            Add
          </button>

          <button
            onClick={() => {
              setShowForm(false);
              setNewName("");
              setNewDescription("");
              setNewStatus("Pending");
            }}
          >
            Cancel
          </button>
        </div>
      )}

      <br />

      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option>All</option>
        <option>Pending</option>
        <option>In Progress</option>
        <option>Complete</option>
      </select>

      {filteredTasks.map((task) => (
        <Task
          key={task.id}
          name={task.name}
          description={task.description}
          status={task.status}
          createdAt={task.createdAt}
          onDelete={() => deleteTask(task.id)}
          onUpdate={(name, description, status) =>
            updateTask(task.id, name, description, status)
          }
        />
      ))}

      {filteredTasks.length === 0 && (
        <p>No Tasks Found!</p>
      )}
    </div>
  );
}

export default App;