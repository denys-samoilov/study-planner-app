import { httpClient } from "../api/httpClient";
import type { ApiTodo } from "../types/apiTodo";
import type { Task } from "../types/task";
import type { TodosResponse } from "../types/todosResponse";

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

function toApiTodo(task: Task): ApiTodo {
  return {
    id: task.id,
    todo: task.title,
    completed: task.completed,
    userId: 1,
  };
}

export const taskRepository = {
  async getAll(limit = 10, skip = 0): Promise<Task[]> {
    const data = await httpClient<TodosResponse>(`/todos?limit=${limit}&skip=${skip}`);
    return data.todos.map(toTask);
  },

  async getById(id: number | string): Promise<Task> {
    const data = await httpClient<ApiTodo>(`/todos/${id}`);
    return toTask(data);
  },

  async create(task: Task): Promise<Task> {
    const data = await httpClient<ApiTodo>('/todos/add', {
      method: 'POST',
      body: JSON.stringify(toApiTodo(task)),
    });

    return {
      ...toTask(data),
      description: task.description,
      priority: task.priority,
      category: task.category,
    };
  },

  async update(id: number | string, task: Task): Promise<Task> {
    const data = await httpClient<ApiTodo>(`/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(toApiTodo(task)),
    });

    return {
      ...toTask(data),
      description: task.description,
      priority: task.priority,
      category: task.category,
    };
  },

  async delete(id: number | string): Promise<void> {
    await httpClient<void>(`/todos/${id}`, {
      method: 'DELETE',
    });
  },
};