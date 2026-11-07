import { useReducer, useState } from 'react';
import { Header } from './components/Header';
import { Task } from './types/task';
import { TaskList } from './components/TaskList';
import { TaskForm } from './components/TaskForm';
import { initialTasks } from './data/initialTasks';
import { TaskFilters, type FilterType } from './components/TaskFilters';
import { TaskStats } from './components/TaskStats';
import { TaskEditModal } from './components/TaskEditModal';
import { taskReducer } from './reducers/taskReducer'; 

export function App() {
  const [tasks, dispatch] = useReducer(taskReducer, initialTasks);
  const [filter, setFilter] = useState<FilterType>('all'); 
  const [search, setSearch] = useState<string>('');
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  function handleAddTask(newTask: Task): void {
    dispatch({ type: 'add', payload: newTask });
  }

  function handleToggleTask(id: number | string): void {
    dispatch({ type: 'toggle', payload: id });
  }

  function handleEditTask(updatedTask: Task): void {
    dispatch({ type: 'update', payload: updatedTask });
  }
  
  function handleDeleteTask(id: number | string): void {
    dispatch({ type: 'confirmDelete', payload: id})
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

      <TaskForm 
      onAddTask={handleAddTask}
      onEditTask={handleEditTask}
      />

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
        onEdit={(task) => setEditingTask(task)}
      />

      <TaskEditModal 
        isOpen={editingTask !== null}
        taskToEdit={editingTask}
        onClose={() => setEditingTask(null)}
        onEditTask={(updatedTask) => {
          dispatch({ type: 'update', payload: updatedTask });
        }}
      />
    </div>
  );
}

export default App;