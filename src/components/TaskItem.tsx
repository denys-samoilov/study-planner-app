import { Task } from '../types/task';
import { useTaskContext } from '../hooks/useTaskContext';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

interface TaskItemProps {
  task: Task;
}

export function TaskItem({ task }: TaskItemProps) {
  const { toggleTask } = useTaskContext();
  const {isAuthenticated} = useAuthContext();

  const isDeleting = task.isDeleting;

  const navigate = useNavigate();

  const getPriorityBadgeClass = (priority: string): string => {
    switch (priority) {
      case 'high': return 'bg-danger';
      case 'medium': return 'bg-warning text-dark';
      case 'low': return 'bg-success';
      default: return 'bg-secondary';
    }
  };

  const handleToggleTask = () => {
    if(!isAuthenticated)
    {
      navigate('/login');
      return;
    }
    toggleTask(task.id); 
  }

  return (
    <div className={`card mb-3 shadow-sm ${isDeleting ? 'border-danger' : task.completed ? 'bg-light border-success' : ''}`}>
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h5
            className={`card-title m-0 ${task.completed ? 'text-decoration-line-through text-muted' : ''}`}
          >
            <Link
              to={`/tasks/${task.id}`}
              className={`text-decoration-none ${
                task.completed ? 'text-muted' : 'text-primary'
              }`}
            >
              {task.title}
            </Link>
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
                onClick={() => handleToggleTask()}
                className={`btn btn-sm ${task.completed ? 'btn-outline-warning' : 'btn-outline-success'}`}
              >
                {task.completed ? 'Return' : 'Finish'}
              </button>
            )}
          
          </div>
        </div>
      </div>
    </div>
  );
}