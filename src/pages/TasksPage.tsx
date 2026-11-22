import { useState } from 'react';
import { useTaskContext } from '../hooks/useTaskContext';
import { Header } from '../components/Header';
import { TaskList } from '../components/TaskList';
import { TaskFilters } from '../components/TaskFilters';
import { Toast } from '../components/Toast';
import { Pagination } from '../components/Pagination';
import { TaskFormDialog } from '../components/TaskFormDialog';
import { Task } from '../types/task';
import type { TaskFormData } from '../schemas/taskSchema';
import { TaskStats } from '../components/TaskStats';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';

export function TasksPage() {
  const {
    filter,
    search,
    deletingTask,
    toast,
    addTask,
    filterTasks,
    undoDelete,
  } = useTaskContext();

  const {isAuthenticated} = useAuthContext();

  const navigate = useNavigate();

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const handleCreateDialogOpen = () => {
    if(!isAuthenticated)
    {
      navigate('/login');
      return;
    }
    setIsCreateDialogOpen(true);
  }

  const handleCreateTask = async (data: TaskFormData) => {
    const newTask = new Task(
      Date.now(),
      data.title,
      data.description,
      false,
      data.priority,
      data.category
    );
    await addTask(newTask);
  };

  return (
    <div className="mx-auto" style={{ maxWidth: '700px' }}>
      <Header />
      <TaskStats tasks={filterTasks()} />

      <div className="d-flex justify-content-end mb-3">
        <button
          type="button"
          className="btn btn-primary"
          aria-label="Create task"
          onClick={() => handleCreateDialogOpen()}
        >
          +
        </button>
      </div>

      <TaskFormDialog
        key={isCreateDialogOpen ? 'create-open' : 'create-closed'}
        open={isCreateDialogOpen}
        mode="create"
        onClose={() => setIsCreateDialogOpen(false)}
        onSubmit={handleCreateTask}
      />

      <TaskFilters
        currentFilter={filter}
        currentSearch={search}
      />

      <TaskList
        tasks={filterTasks()}
        currentFilter={filter}
      />

      <Pagination />

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