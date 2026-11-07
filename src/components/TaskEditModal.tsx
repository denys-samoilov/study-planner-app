import { Task } from '../types/task';
import { TaskForm } from './TaskForm';

interface TaskEditModalProps {
  isOpen: boolean;                
  taskToEdit: Task | null;        
  onClose: () => void;           
  onEditTask: (task: Task) => void;
}

export function TaskEditModal({ isOpen, taskToEdit, onClose, onEditTask }: TaskEditModalProps) {
  if (!isOpen) return null; 

  return (
    <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Task</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <TaskForm 
              onAddTask={() => {}} 
              onEditTask={(updatedTask) => {
                onEditTask(updatedTask);
                onClose();
              }}
              taskToEdit={taskToEdit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}