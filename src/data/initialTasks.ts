import { Task } from '../types/task';

export const initialTasks: Task[] = [
  new Task(
    1,
    'React Components',
    'Опрацювати базові принципи компонентів React',
    false,
    'high',
    'React',
    false,
    '1',
    new Date().toISOString()
  ),
  new Task(
    2,
    'TypeScript Exercises',
    'Виконати практичні вправи',
    true,
    'medium',
    'TypeScript',
    false,
    '1',
    new Date().toISOString()
  ),
];