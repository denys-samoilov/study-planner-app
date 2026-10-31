import { useState } from 'react';
import { Header } from './components/Header';
import { Task } from './types/task';
import { TaskList } from './components/TaskList';
import { TaskForm } from './components/TaskForm';
import { initialTasks } from './data/initialTasks';
import { TaskFilters } from './components/TaskFilters';

export function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  function handleAddTask(newTask: Task): void {
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  }

  function handleToggleTask(id: number | string): void {
  setTasks((prevTasks) =>
    prevTasks.map((task) => {
      if (task.id === id) {
        return new Task(
          task.id,
          task.title,
          task.description,
          !task.completed,
          task.priority,
          task.category
        );
      } 
      else {
        return task;
      }
    })
  );
}
  
  function handleDeleteTask(id: number | string): void {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }



  return (
    <div className="container py-5" style={{ maxWidth: '700px' }}>
      <Header />

      <TaskForm onAddTask={handleAddTask} />
      <TaskFilters tasks={tasks} />

      <TaskList 
        tasks={tasks} 
        onToggle={handleToggleTask} 
        onDelete={handleDeleteTask}
      />
    </div>
  );
}

export default App;