import React, { useState, useEffect } from 'react';

export default function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Load tasks from localStorage when the component mounts
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('todos')) || [];
    if (Array.isArray(savedTasks)) {
      setTasks(savedTasks); // Load tasks into state only if it's an array
    }
  }, []);

  // Persist tasks to localStorage
  function persistData(updatedTasks) {
    localStorage.setItem('todos', JSON.stringify(updatedTasks));
  }

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "") {
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      setNewTask("");
      persistData(updatedTasks); // Persist updated tasks to localStorage
    }
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      addTask(); // Call addTask when Enter is pressed
    }
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    persistData(updatedTasks); // Persist updated tasks to localStorage
  }

  function moveTaskUp(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
      setTasks(updatedTasks);
      persistData(updatedTasks); // Persist updated tasks to localStorage
    }
  }

  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
      setTasks(updatedTasks);
      persistData(updatedTasks); // Persist updated tasks to localStorage
    }
  }

  return (
    <div className='to-do-list'>
      <h1>Get It Done</h1>
      <div>
        <input
          type='text'
          placeholder='Enter a task'
          value={newTask}
          onChange={handleInputChange}
          onKeyUp={handleKeyPress}
        />
        <button className='add-button' onClick={addTask}>Add</button>
      </div>

      <ol>
        {tasks.map((task, index) =>
          <li key={index}>
            <span className='text'>{task}</span>
            <button className='delete-button' onClick={() => deleteTask(index)}>Delete</button>
            <button className='move-button' onClick={() => moveTaskUp(index)}>Up</button>
            <button className='move-button' onClick={() => moveTaskDown(index)}>Down</button>
          </li>
        )}
      </ol>
    </div>
  );
}
