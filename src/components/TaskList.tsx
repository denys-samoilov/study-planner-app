import { Task } from '../types/task';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: number | string) => void;
  onDelete: (id: number | string) => void;
}

export function TaskList({ tasks, onToggle, onDelete}: TaskListProps) {
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
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}