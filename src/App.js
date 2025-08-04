import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  // Toggle dark mode class on body
  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  const toggleTheme = () => setDarkMode((prev) => !prev);

  const handleSubmit = (task) => {
    if (editIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = task;
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      setTasks([...tasks, task]);
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    setTasks((prev) => prev.filter((_, i) => i !== index));
    if (editIndex === index) setEditIndex(null);
  };

  return (
    <div className={`app ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="theme-toggle">
        <label className="switch">
          <input type="checkbox" onChange={toggleTheme} checked={darkMode} />
          <span className="slider round"></span>
        </label>
        <span>{darkMode ? 'Dark Mode 🌙' : 'Light Mode ☀️'}</span>
      </div>

      <h1 className="title">📝 My Task Notes</h1>

      <div className="task-layout">
        <TaskForm
          onSubmit={handleSubmit}
          initialData={editIndex !== null ? tasks[editIndex] : null}
        />
        <TaskList
          tasks={tasks}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}

export default App;
