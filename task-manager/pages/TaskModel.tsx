import { useState } from 'react';
import axios from 'axios';

const TaskModal = ({ task, onClose, onSave }) => {
  const [title, setTitle] = useState(task ? task.title : '');
  const [description, setDescription] = useState(task ? task.description : '');
  const [status, setStatus] = useState(task ? task.status : 'todo');

  const handleSave = async () => {
    const taskData = { title, description, status };
    try {
      if (task) {
        await axios.put(`/api/tasks/${task.id}`, taskData);
      } else {
        await axios.post('/api/tasks', taskData);
      }
      onSave();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{task ? 'Edit Task' : 'Create Task'}</h2>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="todo">To-Do</option>
          <option value="in-progress">In Progress</option>
          <option value="under-review">Under Review</option>
          <option value="completed">Completed</option>
        </select>
        <button onClick={handleSave}>{task ? 'Save' : 'Create'}</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default TaskModal;
