import { useState } from 'react';
import { Task, type Priority } from '../types/task';
import { useTaskContext } from '../hooks/useTaskContext';


export function TaskForm() {
  const { addTask, updateTask, editingTask } = useTaskContext();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [category, setCategory] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title) return;

    if(editingTask){
      const editedTask = new Task(
      editingTask.id,
      title,
      description,
      editingTask.completed, 
      priority,
      category
      );
      updateTask(editedTask);
    }

    else{
      const newTask = new Task(
        Date.now(),
        title,
        description,
        false, 
        priority,
        category
      );
      addTask(newTask);
    }
    

    setTitle('');
    setDescription('');
    setPriority('medium');
    setCategory('');
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        {addTask === undefined ? <h4 className="card-title mb-3">Add Task Form</h4> : ""}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Task title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              placeholder="Task description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="row mb-3">
            <div className="col-md-6 mb-3 mb-md-0">
              <label className="form-label">Priority</label>
              <select
                className="form-select"
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label">Category</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. React, TypeScript..."
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            {addTask === undefined ? "Create Task" : "Update Task"}
          </button>
        </form>
      </div>
    </div>
  );
}