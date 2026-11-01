import { Task } from '../types/task';
import type { FilterType } from './TaskFilters';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  currentFilter: FilterType;
  
  onToggle: (id: number | string) => void;
  onDelete: (id: number | string) => void;
}

export function TaskList({ tasks, currentFilter, onToggle, onDelete}: TaskListProps) {
  if (tasks.length === 0 && currentFilter === 'all') {
    return (
      <div className="alert alert-secondary text-center" role="alert">
        List is empty. Please add a new task.
      </div>
    );
  }

  if (tasks.length === 0 && currentFilter !== 'all') {
    return (
      <div className="alert alert-secondary text-center" role="alert">
        No tasks with selected filter.
      </div>
    );
  }

  return (
    <div>
      {tasks.map((task) => (
        <TaskItem 
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}