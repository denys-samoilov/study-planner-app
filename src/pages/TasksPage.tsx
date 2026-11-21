import { useTaskContext } from '../hooks/useTaskContext';
import { Header } from '../components/Header';
import { TaskList } from '../components/TaskList';
import { TaskForm } from '../components/TaskForm';
import { TaskFilters } from '../components/TaskFilters';
import { TaskStats } from '../components/TaskStats';
import { TaskEditModal } from '../components/TaskEditModal';
import { Toast } from '../components/Toast';
import { Pagination } from '../components/Pagination';
import { TaskDetailModal } from '../components/TaskDetailModal';

export function TasksPage() {
  const {
    tasks,
    filter,
    search,
    editingTask,
    deletingTask,
    toast,
    viewingTask,
    filterTasks,
    undoDelete,
  } = useTaskContext();

  return (
    <div className="mx-auto" style={{ maxWidth: '700px' }}>
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

      <Pagination />

      <TaskEditModal
        isOpen={editingTask !== null}
      />

      <TaskDetailModal
        isOpen={viewingTask !== null}
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