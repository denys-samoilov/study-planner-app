import { useState } from 'react';
import { useTaskContext } from '../hooks/useTaskContext';
import { Header } from '../components/Header';
import { TaskList } from '../components/TaskList';
import { TaskFilters } from '../components/TaskFilters';
import { TaskStats } from '../components/TaskStats';
import { TaskEditModal } from '../components/TaskEditModal';
import { Toast } from '../components/Toast';
import { Pagination } from '../components/Pagination';
import { TaskDetailModal } from '../components/TaskDetailModal';
import { TaskFormDialog } from '../components/TaskFormDialog';
import { Task } from '../types/task';
import type { TaskFormData } from '../schemas/taskSchema';

export function TasksPage() {
  const {
    tasks,
    filter,
    search,
    editingTask,
    deletingTask,
    toast,
    viewingTask,
    addTask,
    filterTasks,
    undoDelete,
  } = useTaskContext();

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

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

      <div className="d-flex justify-content-end mb-3">
        <button
          type="button"
          className="btn btn-primary"
          aria-label="Create task"
          onClick={() => setIsCreateDialogOpen(true)}
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