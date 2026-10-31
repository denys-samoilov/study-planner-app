import { Task } from '../types/task';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
}

export function TaskList({ tasks }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="alert alert-secondary text-center" role="alert">
        List is empty.
      </div>
    );
  }

  return (
    <div>
      {tasks.map((task) => (
        <TaskItem 
          task={task} 
        />
      ))}
    </div>
  );
}