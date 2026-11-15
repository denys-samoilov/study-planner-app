import { useEffect, useState } from 'react';
import { Task } from '../types/task';
import { taskRepository } from '../repositories/taskRepository';
import { useTaskContext } from '../hooks/useTaskContext';

interface TaskDetailModalProps {
  isOpen: boolean;
}

export function TaskDetailModal({ isOpen }: TaskDetailModalProps) {
  const { viewingTask, setViewingTask } = useTaskContext();

  const [task, setTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);


  async function fetchTaskDetails(signal: AbortSignal) {

      setIsLoading(true);
      setError(null);
      try {
        const fetchedTask = await taskRepository.getById(viewingTask!.id, signal);
        setTask(fetchedTask);
      } 
      
      catch (err: any) {
        if(err.name == 'AbortError'){
          console.log('Details fetch aborted')
          return;
        }
        console.error('Failed to fetch task details:', err);
        setError('Failed to fetch task details.');
      } 
      
      finally {
        setIsLoading(false);
      }
    }


  useEffect(() => {
    if (!viewingTask) {
      setTask(null);
      return;
    }

    const controller = new AbortController();

    fetchTaskDetails(controller.signal);

    return () => {controller.abort()}
  }, [viewingTask]);

  if (!isOpen) return null;

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
            ></button>
          </div>

          <div className="modal-body">
            {isLoading && (
              <div className="text-center py-4 text-muted">
                <div className="spinner-border spinner-border-sm me-2" role="status"></div>
                Loading...
              </div>
            )}

            {error && (
              <div className="alert alert-danger text-center p-3 mb-0" role="alert">
                {error}
              </div>
            )}

            {!isLoading && !error && task && (
              <div className="space-y-3">
                <div className="mb-3">
                  <span className="text-muted small text-uppercase fw-bold d-block">Name</span>
                  <p className="fs-5 fw-medium mb-0">{task.title}</p>
                </div>

                <div className="mb-3">
                  <span className="text-muted small text-uppercase fw-bold d-block">Description</span>
                  <p className="text-secondary mb-0">{task.description || "No description"}</p>
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