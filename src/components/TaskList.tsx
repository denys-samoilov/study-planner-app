import { Task } from '../types/task';
import type { FilterType } from './TaskFilters';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  currentFilter: FilterType;
}

export function TaskList({ tasks, currentFilter }: TaskListProps) {
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
        />
      ))}
    </div>
  );
}