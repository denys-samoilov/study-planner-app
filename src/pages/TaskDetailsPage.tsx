import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { taskRepository } from '../repositories/taskRepository';
import type { Task } from '../types/task';
import { useTaskContext } from '../hooks/useTaskContext';
import type { TaskFormData } from '../schemas/taskSchema';
import { TaskFormDialog } from '../components/TaskFormDialog';
import { Toast } from '../components/Toast';

export function TaskDetailsPage() {
  const { taskId } = useParams<{ taskId: string }>();

  const [task, setTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const createdBy = 'Current User (client-owned)';
  const createdAt = new Date().toLocaleString();

  const navigate = useNavigate();


  const {
    toast,
    editingTask,
    deletingTask,
    updateTask,
    deleteInstantly,
    undoDelete,
    setEditingTask
  } = useTaskContext();

  const isDeleting = deletingTask?.id === task?.id;

  useEffect(() => {
    const controller = new AbortController();
    let isCancelled = false;

    async function loadTask() {
      setIsLoading(true);
      setError(null);

      if (!taskId) {
        if (!isCancelled) {
          setTask(null);
          setError('Task ID is missing in URL.');
          setIsLoading(false);
        }
        return;
      }

      try {
        const fetchedTask = await taskRepository.getById(Number(taskId), controller.signal);
        if (!isCancelled) {
          setTask(fetchedTask);
        }
      } catch (err: unknown) {
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }
        if (!isCancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load task details.');
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    loadTask();

    return () => {
      isCancelled = true;
      controller.abort();
    };
  }, [taskId]);

  const handleDelete = async (currentTask: Task) => {
    await deleteInstantly(currentTask.id);
    navigate('/tasks');
};

  const handleSaveEdit = async (data: TaskFormData) => {
    if (!editingTask) return;
   

    const updatedTask: Task = {
      ...editingTask,
      title: data.title,
      description: data.description,
      category: data.category,
      priority: data.priority,
    };

      await updateTask(updatedTask);
      setTask(updatedTask);
      
    
  };

  return (
    <div>
      <div className="mb-3">
        <Link to="/tasks" className="btn btn-outline-secondary btn-sm">
          &larr; Back to Tasks
        </Link>
      </div>

      <div className="card shadow-sm">
        <div className="card-header bg-white">
          <h2 className="h5 mb-0">Task Details</h2>
        </div>

        <div className="card-body">
          {isLoading && (
            <div className="text-center py-4 text-muted">
              <div className="spinner-border spinner-border-sm me-2" role="status" />
              Loading...
            </div>
          )}

          {!isLoading && error && (
            <div className="alert alert-danger mb-0" role="alert">
              {error}
            </div>
          )}

          {!isLoading && !error && task && (
            <>
              <div className="mb-3">
                <span className="text-muted small text-uppercase fw-bold d-block">Name</span>
                <p className="fs-5 fw-semibold mb-0">{task.title}</p>
              </div>

              <div className="mb-3">
                <span className="text-muted small text-uppercase fw-bold d-block">Description</span>
                <p className="text-secondary mb-0">{task.description || 'No description'}</p>
              </div>

              <div className="row g-3 mb-3">
                <div className="col-sm-4">
                  <span className="text-muted small text-uppercase fw-bold d-block">Category</span>
                  <span className="badge bg-primary mt-1">{task.category || 'General'}</span>
                </div>

                <div className="col-sm-4">
                  <span className="text-muted small text-uppercase fw-bold d-block">Priority</span>
                  <span className="badge bg-warning text-dark text-uppercase mt-1">
                    {task.priority}
                  </span>
                </div>

                <div className="col-sm-4">
                  <span className="text-muted small text-uppercase fw-bold d-block">Status</span>
                  <span
                    className={`fw-semibold d-inline-block mt-1 ${
                      task.completed ? 'text-success' : 'text-warning'
                    }`}
                  >
                    {task.completed ? 'Complete!' : 'Active...'}
                  </span>
                </div>
              </div>

              <hr />

              <div className="row g-3 small">
                <div className="col-sm-6">
                  <span className="text-muted text-uppercase fw-bold d-block">
                    Created By (client-owned)
                  </span>
                  <span>{createdBy}</span>
                </div>

                <div className="col-sm-6">
                  <span className="text-muted text-uppercase fw-bold d-block">
                    Created At (client-owned)
                  </span>
                  <span>{createdAt}</span>
                </div>
                <button 
                  onClick={isDeleting ? () => undoDelete() : () => handleDelete(task)}
                  className="btn btn-sm btn-danger"
                >
                  {isDeleting ? "Undo" : "Delete Task"}
                </button>
                        
                {!isDeleting && (
                  <button 
                    onClick={() => setEditingTask(task)}
                    className="btn btn-sm btn-outline-primary"
                  >
                    Edit Task
                  </button>
                )}
              </div>
              <TaskFormDialog
                  key={editingTask ? `edit-${editingTask.id}` : 'edit-closed'}
                  open={Boolean(editingTask)}
                  mode="edit"
                  task={editingTask ?? undefined}
                  onClose={() => setEditingTask(null)}
                  onSubmit={handleSaveEdit}
                />

              <Toast
                isOpen={toast !== null}
                message={toast?.message || ''}
                type={toast?.type}
                duration={toast?.duration}
                onUndo={deletingTask !== undefined ? undoDelete : undefined}
              />
              
            </>
          )}
        </div>
      </div>
    </div>
  );
}