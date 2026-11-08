import { Task } from '../types/task';

interface TaskItemProps {
  task: Task;
  isDeleting?: boolean | null;

  onToggle: (id: number | string) => void;
  onDelete: (id: number | string) => void;
  onEdit: (taskToEdit: Task) => void
  onUndo: (id: number | string) => void;

}

export function TaskItem({ task, isDeleting, onToggle, onDelete, onEdit, onUndo}: TaskItemProps) {
  const getPriorityBadgeClass = (priority: string): string => {
    switch (priority) {
      case 'high': return 'bg-danger';
      case 'medium': return 'bg-warning text-dark';
      case 'low': return 'bg-success';
      default: return 'bg-secondary';
    }
  };

  return (
    <div className={`card mb-3 shadow-sm ${isDeleting ? 'border-danger' : task.completed ? 'bg-light border-success' : ''}`}>
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h5 className={`card-title m-0 ${task.completed ? 'text-decoration-line-through text-muted' : ''}`}>
            {task.title}
          </h5>
          <div className="d-flex gap-2">
            <span className="badge bg-light text-dark border">{task.category}</span>
            <span className={`badge ${getPriorityBadgeClass(task.priority)} text-uppercase`}>
              {task.priority}
            </span>
          </div>
        </div>

        <p className={`card-text small ${task.completed ? 'text-muted' : 'text-secondary'}`}>
          {task.description}
        </p>

        <div className="d-flex justify-content-between align-items-center border-top pt-2 mt-2">
          <small className={`fw-bold ${task.completed ? 'text-success' : 'text-warning'}`}>
            {task.completed ? 'Complete!' : 'Active...'}
          </small>

          <div className="d-flex gap-2">
            {!isDeleting && (
              <button 
              onClick={() => onToggle(task.id)}
              className={`btn btn-sm ${ task.completed ? 'btn-outline-warning' : 'btn-outline-success'}`}
            >
              {task.completed ? 'Return' : 'Finish'}
            </button>
          )}
            

            <button 
              onClick={isDeleting ? () => onUndo(task.id) : () => onDelete(task.id)}
              className={`btn btn-sm btn-danger`}
            >
              {isDeleting ? "Undo" : "Delete Task"}
            </button>

            {!isDeleting && (
            <button 
              onClick={() => onEdit(task)}
              className={`btn btn-sm btn-outline-primary`}
            >
              Edit Task
            </button>
          )}
            
          </div>
        </div>
      </div>
    </div>
  );
}
          