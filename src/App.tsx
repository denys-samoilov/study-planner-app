import { Header } from './components/Header';
import { TaskList } from './components/TaskList';
import { TaskForm } from './components/TaskForm';
import { TaskFilters } from './components/TaskFilters';
import { TaskStats } from './components/TaskStats';
import { TaskEditModal } from './components/TaskEditModal';
import { TaskProvider } from './context/TaskContext';
import { useTaskContext } from './hooks/useTaskContext';
import { Toast } from './components/Toast';
import { Pagination } from './components/Pagination';

function MainContent() {
  const { 
    tasks, 
    filter, 
    search, 
    editingTask, 
    deletingTask,
    toast, 
    filterTasks,
    undoDelete
  } = useTaskContext();

  

  return (
    <div className="container py-5" style={{ maxWidth: '700px' }}>
      <Header />

      <TaskForm />

      <TaskStats tasks={tasks} />

      <TaskFilters 
        currentFilter={filter}
        currentSearch={search}
      />

      <TaskList 
        tasks={filterTasks()} 
        currentFilter={filter}
      />
      <Pagination/>

      <TaskEditModal 
        isOpen={editingTask !== null}
      />

      <Toast
        isOpen={toast !== null}
        message={toast?.message || ''}
        type={toast?.type}
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