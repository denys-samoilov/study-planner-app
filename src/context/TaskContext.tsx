import React, { createContext, useContext, useReducer, useState, useEffect } from 'react';
import { Task } from '../types/task';
import { initialTasks } from '../data/initialTasks';
import { taskReducer } from '../reducers/taskReducer';
import { type FilterType } from '../components/TaskFilters';
import { useLocalStorage } from '../hooks/useLocalStorage';

const tasksKey = 'study_planner_tasks';

function loadInitialTasks(): Task[] {
  try {
    const saved = window.localStorage.getItem(tasksKey);
    if (!saved) return initialTasks;
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : initialTasks;
  }
  catch (error) {
    console.error('Error loading tasks from localStorage:', error);
    return initialTasks;
  }
}

interface TaskContextType {
  tasks: Task[];
  filter: FilterType;
  search: string;
  editingTask: Task | null;
  setFilter: (filter: FilterType) => void;
  setSearch: (search: string) => void;
  setEditingTask: (task: Task | null) => void;
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  toggleTask: (id: number | string) => void;
  requestDelete: (id: number | string) => void;
  undoDelete: (id: number | string) => void;
  clearCompleted: () => void;
  resetTasks: () => void;
}

export const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, dispatch] = useReducer(taskReducer, loadInitialTasks());
  const [filter, setFilter] = useLocalStorage<FilterType>('study_planner_filter', 'all');
  const [search, setSearch] = useLocalStorage<string>('study_planner_search', '');
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
      window.localStorage.setItem(tasksKey, JSON.stringify(tasks));

      const amountOfActiveTasks = tasks.filter(task => !task.completed).length;

      document.title = "Study Planner - " + amountOfActiveTasks + " active task" + (amountOfActiveTasks !== 1 ? "s" : "");
  }, [tasks]);

  const addTask = (newTask: Task) => {
    dispatch({ type: 'add', payload: newTask });
  };

  const updateTask = (updatedTask: Task) => {
    dispatch({ type: 'update', payload: updatedTask });
    setEditingTask(null);
  };

  const toggleTask = (id: number | string) => {
    dispatch({ type: 'toggle', payload: id });
  };

  const requestDelete = (id: number | string) => {
    dispatch({ type: 'confirmDelete', payload: id }); 
  };

  const undoDelete = (id: number | string) => {
    dispatch({ type: 'undoDelete', payload: id });
  };

  const clearCompleted = () => {
    dispatch({ type: 'clearCompleted' });
  };

  const resetTasks = () => {
    dispatch({ type: 'reset' });
  };

  

  return (
    <TaskContext.Provider
      value={{
        tasks,
        filter,
        search,
        editingTask,
        setFilter,
        setSearch,
        setEditingTask,
        addTask,
        updateTask,
        toggleTask,
        requestDelete,
        undoDelete,
        clearCompleted,
        resetTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
