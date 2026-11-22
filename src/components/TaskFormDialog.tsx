import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { taskSchema, type TaskFormData } from '../schemas/taskSchema';
import type { Task } from '../types/task';

export type TaskFormDialogProps = {
  open: boolean;
  mode: 'create' | 'edit';
  task?: Task;
  onClose: () => void;
  onSubmit: (data: TaskFormData) => Promise<void>;
};

const DEFAULT_VALUES: TaskFormData = {
  title: '',
  description: '',
  category: '',
  priority: 'medium',
};

function getFormValues(mode: 'create' | 'edit', task?: Task): TaskFormData {
  if (mode === 'edit' && task) {
    return {
      title: task.title,
      description: task.description ?? '',
      category: task.category ?? '',
      priority: task.priority ?? 'medium',
    };
  }
  return DEFAULT_VALUES;
}

export function TaskFormDialog({ open, mode, task, onClose, onSubmit,}: TaskFormDialogProps) {

  const {
  register,
  handleSubmit,
  formState: { errors, isSubmitting },
} = useForm<TaskFormData>({
  resolver: zodResolver(taskSchema),
  defaultValues: getFormValues(mode, task),
});

  if(!open) return;


  const isLocked = isSubmitting;
  const headingText = mode === 'create' ? 'Add Task Form' : 'Edit Task Form';
  const submitButtonText = isSubmitting
    ? 'Saving...'
      : mode === 'create'
        ? 'Create Task'
        : 'Update Task';

  const onValidSubmit = async (data: TaskFormData) => {
    await onSubmit(data);
    onClose();
  };

  

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
      role="presentation"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1055 }}
    >
      <div
        className="card shadow w-100"
        style={{ maxWidth: '540px' }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-form-dialog-title"
      >
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 id="task-form-dialog-title" className="card-title mb-0">
              {headingText}
            </h4>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onClose}
              disabled={isLocked}
            />
          </div>

          <form onSubmit={handleSubmit(onValidSubmit)} noValidate>
            <div className="mb-3">
              <label htmlFor="task-title-input" className="form-label">
                Title
              </label>
              <input
                id="task-title-input"
                type="text"
                className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                placeholder="Task title..."
                disabled={isLocked}
                {...register('title')}
              />
              {errors.title && (
                <div className="invalid-feedback d-block">{errors.title.message}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="task-description-input" className="form-label">
                Description
              </label>
              <textarea
                id="task-description-input"
                className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                placeholder="Task description..."
                rows={3}
                disabled={isLocked}
                {...register('description')}
              />
              {errors.description && (
                <div className="invalid-feedback d-block">{errors.description.message}</div>
              )}
            </div>

            <div className="row mb-3">
              <div className="col-md-6 mb-3 mb-md-0">
                <label htmlFor="task-priority-select" className="form-label">
                  Priority
                </label>
                <select
                  id="task-priority-select"
                  className={`form-select ${errors.priority ? 'is-invalid' : ''}`}
                  disabled={isLocked}
                  {...register('priority')}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                {errors.priority && (
                  <div className="invalid-feedback d-block">{errors.priority.message}</div>
                )}
              </div>

              <div className="col-md-6">
                <label htmlFor="task-category-input" className="form-label">
                  Category
                </label>
                <input
                  id="task-category-input"
                  type="text"
                  className={`form-control ${errors.category ? 'is-invalid' : ''}`}
                  placeholder="e.g. React, TypeScript..."
                  disabled={isLocked}
                  {...register('category')}
                />
                {errors.category && (
                  <div className="invalid-feedback d-block">{errors.category.message}</div>
                )}
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isLocked}
              >
                {submitButtonText}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}