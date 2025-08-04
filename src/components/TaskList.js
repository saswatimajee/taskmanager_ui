import React, { useMemo } from "react";
import "./TaskList.css";

// Array of pastel background colors
const pastelColors = [
  "#FFE4E1", // Misty Rose
  "#E6E6FA", // Lavender
  "#FFFACD", // Lemon Chiffon
  "#E0FFFF", // Light Cyan
  "#F5F5DC", // Beige
  "#F0FFF0", // Honeydew
  "#FAFAD2", // Light Goldenrod Yellow
  "#D8BFD8", // Thistle
  "#FFF0F5", // Lavender Blush
  "#F0FFFF"  // Azure
];

// Helper to generate consistent pastel colors per task render
const getPastelColorMap = (length) => {
  const shuffled = pastelColors.sort(() => 0.5 - Math.random());
  const result = [];
  for (let i = 0; i < length; i++) {
    result.push(shuffled[i % pastelColors.length]);
  }
  return result;
};

const TaskList = ({ tasks, onEdit, onDelete }) => {
  // Memoize colors for stable rendering
  const pastelMap = useMemo(() => getPastelColorMap(tasks.length), [tasks.length]);

  return (
    <div className="task-list-container">
      <h3>Your Tasks</h3>
      {tasks.length === 0 ? (
        <p>No tasks added yet.</p>
      ) : (
        <ul>
          {tasks.map((task, index) => (
            <li
              key={index}
              className="task-item"
              style={{ backgroundColor: pastelMap[index] }}
            >
              <div>
                <h4>{task.title}</h4>
                <p>{task.description}</p>
              </div>
              <div className="task-actions">
                <button onClick={() => onEdit(index)}>Edit</button>
                <button onClick={() => onDelete(index)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
