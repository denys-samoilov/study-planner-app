import type { ApiTodo } from "../types/apiTodo";
import type { Task } from "../types/task";

function toTask(todo: ApiTodo): Task {
  return {
    id: todo.id,
    title: todo.todo,
    description: '',
    completed: todo.completed,
    priority: 'medium',
    category: 'General',
    isDeleting: false
  };
}