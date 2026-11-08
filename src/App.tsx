import { Task } from './types/task';
import { Header } from './components/Header';
import { TaskList } from './components/TaskList';
import { TaskForm } from './components/TaskForm';
import { TaskFilters } from './components/TaskFilters';
import { TaskStats } from './components/TaskStats';
import { TaskEditModal } from './components/TaskEditModal';
import { TaskProvider } from './context/TaskContext';
import { useTaskContext } from './hooks/useTaskContext';

function MainContent() {
  const { 
    tasks, 
    filter, 
    search, 
    editingTask, 
    setFilter, 
    setSearch, 
    setEditingTask, 
    addTask, 
    updateTask, 
    toggleTask, 
    requestDelete 
  } = useTaskContext();

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
        onAddTask={addTask}
        onEditTask={updateTask}
      />

      <TaskStats tasks={tasks} />

      <TaskFilters 
        currentFilter={filter}
        currentSearch={search}
        changeFilter={setFilter}
        changeSearch={setSearch}
      />

      <TaskList 
        tasks={filterTasks()} 
        currentFilter={filter}
        onToggle={toggleTask} 
        onDelete={requestDelete}
        onEdit={(task) => setEditingTask(task)}
      />

      <TaskEditModal 
        isOpen={editingTask !== null}
        taskToEdit={editingTask}
        onClose={() => setEditingTask(null)}
        onEditTask={updateTask}
      />
    </div>
  );
}

export function App() {
  return (
    <TaskProvider>
      <MainContent />
    </TaskProvider>
  );
}

export default App;