import { useTaskContext } from '../hooks/useTaskContext';
import { TaskForm } from './TaskForm';



interface TaskEditModalProps {
  isOpen: boolean;                
}

export function TaskEditModal({ isOpen }: TaskEditModalProps) {
  const {setEditingTask} = useTaskContext();
  if (!isOpen) return null; 

  return (
    <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Task</h5>
            <button type="button" className="btn-close" onClick={() => setEditingTask(null)}></button>
          </div>
          <div className="modal-body">
            <TaskForm 
            />
          </div>
        </div>
      </div>
    </div>
  );
}