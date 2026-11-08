import { Task } from './types/task';
import { Header } from './components/Header';
import { TaskList } from './components/TaskList';
import { TaskForm } from './components/TaskForm';
import { TaskFilters } from './components/TaskFilters';
import { TaskStats } from './components/TaskStats';
import { TaskEditModal } from './components/TaskEditModal';
import { TaskProvider } from './context/TaskContext';
import { useTaskContext } from './hooks/useTaskContext';
import { Toast } from './components/Toast';

function MainContent() {
  const { 
    tasks, 
    filter, 
    search, 
    editingTask, 
    deletingTask,
    toast,
    setFilter, 
    setSearch, 
    setEditingTask, 
    hideToast,
    undoDelete
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
      />

      <TaskEditModal 
        isOpen={editingTask !== null}
        onClose={() => setEditingTask(null)}
      />

      <Toast
        isOpen={toast !== null}
        message={toast?.message || ''}
        type={toast?.type}
        onClose={hideToast}
        duration={toast?.duration}
        onUndo={deletingTask !== undefined ? undoDelete : undefined}
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