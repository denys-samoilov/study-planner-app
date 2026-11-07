import { useState, useEffect } from 'react';
import { Task, type Priority } from '../types/task';

interface TaskFormProps {
  onAddTask: (task: Task) => void;
  onEditTask: (task: Task) => void;
  taskToEdit?: Task | null;         
}

export function TaskForm({ onAddTask, onEditTask, taskToEdit }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setPriority(taskToEdit.priority);
      setCategory(taskToEdit.category);
    } 
    
    else {
      setTitle('');
      setDescription('');
      setPriority('medium');
      setCategory('');
    }
  }, [taskToEdit]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title) return;

    if(taskToEdit){
      const editedTask = new Task(
      taskToEdit.id,
      title,
      description,
      taskToEdit.completed, 
      priority,
      category
      );
      onEditTask(editedTask);
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
      onAddTask(newTask);
    }
    

    setTitle('');
    setDescription('');
    setPriority('medium');
    setCategory('');
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h4 className="card-title mb-3">{taskToEdit === undefined ? "Add Task Form" : ""}</h4>
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
            {taskToEdit === undefined ? "Create Task" : "Update Task"}
          </button>
        </form>
      </div>
    </div>
  );
}