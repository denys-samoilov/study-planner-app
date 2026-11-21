import { useCallback, useEffect, useState } from 'react';
import { Task } from '../types/task';
import { taskRepository } from '../repositories/taskRepository';
import { useTaskContext } from '../hooks/useTaskContext';

interface TaskDetailModalProps {
  isOpen: boolean;
}

export function TaskDetailModal({ isOpen }: TaskDetailModalProps) {
  const { viewingTask, setViewingTask } = useTaskContext();

  const [fetchedTask, setFetchedTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const viewingTaskId = viewingTask?.id;

  const fetchTaskDetails = useCallback(
    async (signal: AbortSignal, isCancelled: () => boolean) => {
      if (viewingTaskId === undefined) return;

      setIsLoading(true);
      setError(null);
      try {
        const result = await taskRepository.getById(viewingTaskId, signal);
        if (!isCancelled()) {
          setFetchedTask(result);
        }
      } catch (err: unknown) {
        if (err instanceof Error && err.name === 'AbortError') {
          console.log('Details fetch aborted');
          return;
        }
        if (!isCancelled()) {
          console.error('Failed to fetch task details:', err);
          setError('Failed to fetch task details.');
        }
      } finally {
        if (!isCancelled()) {
          setIsLoading(false);
        }
      }
    },
    [viewingTaskId]
  );

  useEffect(() => {
    if (viewingTaskId === undefined) return;

    const controller = new AbortController();
    let cancelled = false;

    void fetchTaskDetails(controller.signal, () => cancelled);

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [viewingTaskId, fetchTaskDetails]);

  if (!isOpen) return null;

  const task = viewingTask ? fetchedTask : null;

  return (
    <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Details</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setViewingTask(null)}
            />
          </div>

          <div className="modal-body">
            {isLoading && (
              <div className="text-center py-4 text-muted">
                <div className="spinner-border spinner-border-sm me-2" role="status" />
                Loading...
              </div>
            )}

            {error && (
              <div className="alert alert-danger text-center p-3 mb-0" role="alert">
                {error}
              </div>
            )}

            {!isLoading && !error && task && (
              <div className="d-flex flex-column gap-3">
                <div className="mb-3">
                  <span className="text-muted small text-uppercase fw-bold d-block">Name</span>
                  <p className="fs-5 fw-medium mb-0">{task.title}</p>
                </div>

                <div className="mb-3">
                  <span className="text-muted small text-uppercase fw-bold d-block">Description</span>
                  <p className="text-secondary mb-0">{task.description || 'No description'}</p>
                </div>

                <div className="row g-2 mb-3">
                  <div className="col-6">
                    <span className="text-muted small text-uppercase fw-bold d-block">Category</span>
                    <span className="badge bg-primary mt-1">{task.category}</span>
                  </div>

                  <div className="col-6">
                    <span className="text-muted small text-uppercase fw-bold d-block">Priority</span>
                    <span className="badge bg-warning text-dark mt-1">{task.priority}</span>
                  </div>

                  <div>
                    <span className="text-muted small text-uppercase fw-bold d-block">Status</span>
                    <p className="mt-1 mb-0">
                      {task.completed ? (
                        <span className="text-success fw-medium">Complete!</span>
                      ) : (
                        <span className="text-warning fw-medium">Active...</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => setViewingTask(null)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}