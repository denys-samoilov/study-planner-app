import { useState } from 'react';
import { Header } from './components/Header';
import { Task } from './types/task';
import { TaskList } from './components/TaskList';
import { TaskForm } from './components/TaskForm';
import { initialTasks } from './data/initialTasks';
import { TaskFilters, type FilterType } from './components/TaskFilters';
import { TaskStats } from './components/TaskStats';

export function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState<FilterType>('all'); 
  const [search, setSearch] = useState<string>('');

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

  function filterTasks(): Task[] {
    let filteredTasks = tasks;
    switch (filter) {
      case 'completed':
        filteredTasks = tasks.filter((task) => task.completed);
        break;
      case 'active':
        filteredTasks = tasks.filter((task) => !task.completed);
        break;
      default:
        filteredTasks = tasks;
    }

    if (search.trim() !== '') {
      filteredTasks = filteredTasks.filter((task) =>
        task.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    return filteredTasks;
  }

  return (
    <div className="container py-5" style={{ maxWidth: '700px' }}>
      <Header />

      <TaskForm onAddTask={handleAddTask}></TaskForm>

      <TaskStats tasks={tasks}></TaskStats>

      <TaskFilters 
      currentFilter={filter}
      currentSearch={search}
      changeFilter={setFilter}
      changeSearch={setSearch}
      />

      <TaskList 
        tasks={filterTasks()} 
        currentFilter={filter}
        onToggle={handleToggleTask} 
        onDelete={handleDeleteTask}
      />
    </div>
  );
}

export default App;