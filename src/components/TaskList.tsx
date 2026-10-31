import { Task } from '../types/task';
import { TaskItem } from './TaskItem';

class TaskListProps {
  tasks: Task[];

  constructor(tasks: Task[]){
    this.tasks = tasks;
  }
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
          key={task.id}
          task={task}
        />
      ))}
    </div>
  );
}