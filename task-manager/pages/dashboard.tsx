import { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('/api/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <div className="task-board">
        <div className="column">
          <h2>To-Do</h2>
          {tasks.filter(task => task.status === 'todo').map(task => (
            <div key={task.id} className="task-card">
              {task.title}
            </div>
          ))}
        </div>
        <div className="column">
          <h2>In Progress</h2>
          {tasks.filter(task => task.status === 'in-progress').map(task => (
            <div key={task.id} className="task-card">
              {task.title}
            </div>
          ))}
        </div>
        <div className="column">
          <h2>Under Review</h2>
          {tasks.filter(task => task.status === 'under-review').map(task => (
            <div key={task.id} className="task-card">
              {task.title}
            </div>
          ))}
        </div>
        <div className="column">
          <h2>Completed</h2>
          {tasks.filter(task => task.status === 'completed').map(task => (
            <div key={task.id} className="task-card">
              {task.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
