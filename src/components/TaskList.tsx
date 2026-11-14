import { useTaskContext } from '../hooks/useTaskContext';
import { Task } from '../types/task';
import type { FilterType } from './TaskFilters';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  currentFilter: FilterType;
}

export function TaskList({ tasks, currentFilter }: TaskListProps) {
  const { isLoading, error, fetchTasksForPage } = useTaskContext();

  if (isLoading) {
    return (
      <div className="text-center py-5 text-gray-500 dark:text-gray-400">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-current border-t-transparent text-primary mb-2" role="status"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 my-4" role="alert">
        <p className="font-medium mb-3">{error}</p>
        <button 
          onClick={fetchTasksForPage}
          className="btn btn-danger px-4 py-1.5 text-sm font-medium transition-colors shadow-sm"
        >
          Try Again
        </button>
      </div>
    );
  }

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