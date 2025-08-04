import React, { useState, useEffect } from "react";
import "./TaskForm.css";

const TaskForm = ({ onSubmit, initialData }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // When initialData changes (i.e., Edit button clicked), fill the form
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert("Please fill in both fields.");
      return;
    }

    const newTask = {
      title: title.trim(),
      description: description.trim(),
    };

    if (onSubmit) onSubmit(newTask);

    // Clear form after submit
    setTitle("");
    setDescription("");
  };

  return (
    <div className="task-form-container">
      <h2>{initialData ? "Edit Task" : "Create a New Task"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Enter task description"
          rows="5"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">
          {initialData ? "Update Task" : "Add Task"}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
