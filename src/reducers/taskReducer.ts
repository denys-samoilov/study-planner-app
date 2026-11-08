import { Task } from '../types/task';
import { initialTasks } from '../data/initialTasks';

export type TaskAction = 
  | { type: 'add'; payload: Task }
  | { type: 'toggle'; payload: number | string }
  | { type: 'update'; payload: Task }
  | { type: 'requestDelete'; payload: number | string }
  | { type: 'confirmDelete'; payload: number | string }
  | { type: 'undoDelete'; payload: number | string }
  | { type: 'clearCompleted' }
  | { type: 'reset' };

export function taskReducer(state: Task[], action: TaskAction): Task[] {
  switch (action.type) {
    case 'add':
      return [action.payload, ...state];

    case 'toggle':
      return state.map((task) =>
        task.id === action.payload
          ? new Task(
              task.id,
              task.title,
              task.description,
              !task.completed,
              task.priority,
              task.category,
              task.isDeleting
            )
          : task
      );

    case 'update':
      return state.map((task) =>
        task.id === action.payload.id ? action.payload : task
      );

    case 'requestDelete':
      return state.map((task) =>
        task.id === action.payload
          ? new Task(
              task.id,
              task.title,
              task.description,
              task.completed,
              task.priority,
              task.category,
              true
            )
          : task
      );

    case 'confirmDelete':
      return state.filter((task) => task.id !== action.payload);

    case 'undoDelete':
      return state.map((task) =>
        task.id === action.payload
          ? new Task(
              task.id,
              task.title,
              task.description,
              task.completed,
              task.priority,
              task.category,
              false
            )
          : task
      );

    case 'clearCompleted':
      return state.filter((task) => !task.completed);

    case 'reset':
      return initialTasks;

    default:
      return state;
  }
}