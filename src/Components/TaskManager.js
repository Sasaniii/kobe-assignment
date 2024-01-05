import React, { useState } from 'react';
import TaskModal from './TaskModal';
import TaskList from './TaskList';

function TaskManager() {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  return (
    <div>
      <TaskModal addTask={addTask} />
      <TaskList tasks={tasks} />
    </div>
  );
}

export default TaskManager;
