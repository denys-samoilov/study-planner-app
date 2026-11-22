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
    isDeleting: false,
    createdBy: todo.userId.toString(),
    createdAt: new Date().toISOString() + ' (client-owned metadata)'
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
  async getAll(limit = 10, skip = 0, signal?: AbortSignal): Promise<Task[]> {
    const data = await httpClient<TodosResponse>(`/todos?limit=${limit}&skip=${skip}`, {signal});
    return data.todos.map(toTask);
  },

  async getById(id: number, signal?: AbortSignal): Promise<Task> {
    const data = await httpClient<ApiTodo>(`/todos/${id}`, {signal});
    return toTask(data);
  },

  async create(task: Task, signal?: AbortSignal): Promise<Task> {
    const data = await httpClient<ApiTodo>('/todos/add', {
      signal,
      method: 'POST',
      body: JSON.stringify(toApiTodo(task)),
    }, true);

    return {
      ...toTask(data),
      description: task.description,
      priority: task.priority,
      category: task.category,
    };
  },

  async update(id: number, task: Task, signal?: AbortSignal): Promise<Task> {
    const data = await httpClient<ApiTodo>(`/todos/${id}`, {
      signal,
      method: 'PUT',
      body: JSON.stringify(toApiTodo(task)),
    }, true);

    return {
      ...toTask(data),
      description: task.description,
      priority: task.priority,
      category: task.category,
    };
  },

  async delete(id: number, signal?: AbortSignal): Promise<void> {
    await httpClient<void>(`/todos/${id}`, {
      signal,
      method: 'DELETE',
    }, true);
  },
};