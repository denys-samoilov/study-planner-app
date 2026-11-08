import React, { createContext, useReducer, useState, useEffect } from 'react';
import { Task } from '../types/task';
import { initialTasks } from '../data/initialTasks';
import { taskReducer } from '../reducers/taskReducer';
import { type FilterType } from '../components/TaskFilters';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { ToastType } from '../components/Toast';

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

interface ToastState {
  message: string;
  type: ToastType;
  onUndo?: () => void;
  duration?: number;
}

interface TaskContextType {
  tasks: Task[];
  filter: FilterType;
  search: string;
  editingTask: Task | null;
  deletingTask: Task | undefined;
  toast: ToastState | null;
  setFilter: (filter: FilterType) => void;
  setSearch: (search: string) => void;
  setEditingTask: (task: Task | null) => void;
  hideToast: () => void;
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  toggleTask: (id: number | string) => void;
  requestDelete: (id: number | string) => void;
  undoDelete: (id?: number | string) => void; 
  clearCompleted: () => void;
  resetTasks: () => void;
}

export const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, dispatch] = useReducer(taskReducer, loadInitialTasks());
  const [filter, setFilter] = useLocalStorage<FilterType>('study_planner_filter', 'all');
  const [search, setSearch] = useLocalStorage<string>('study_planner_search', '');
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  
  const [toast, setToast] = useState<ToastState | null>(null);

  const deletingTask = tasks.find(task => task.isDeleting);  
  const deletingTaskId = deletingTask?.id;

  const showToast = (message: string, type: ToastType = 'success', onUndo?: () => void, duration = 3000) => {
    setToast({ message, type, onUndo, duration });
  }

  const hideToast = () => {
    setToast(null);
  }

  useEffect(() => {
    if (deletingTaskId === undefined) return;

    const timer = setTimeout(() => {
      dispatch({ type: 'confirmDelete', payload: deletingTaskId });
      showToast('Task deleted permanently', 'error');
    }, 5000);

    return () => clearTimeout(timer);
  }, [deletingTaskId]);

  useEffect(() => {
      window.localStorage.setItem(tasksKey, JSON.stringify(tasks));

      const amountOfActiveTasks = tasks.filter(task => !task.completed).length;

      if (amountOfActiveTasks > 0) {
        document.title = "Study Planner - " + amountOfActiveTasks + " active task" + (amountOfActiveTasks !== 1 ? "s" : "");
      }
      else document.title = "Study Planner";
  }, [tasks]);

  const addTask = (newTask: Task) => {
    dispatch({ type: 'add', payload: newTask });
    showToast('Task created successfully!', 'success');
  };

  const updateTask = (updatedTask: Task) => {
    dispatch({ type: 'update', payload: updatedTask });
    setEditingTask(null);
    showToast('Task updated successfully!', 'success');
  };

  const toggleTask = (id: number | string) => {
    dispatch({ type: 'toggle', payload: id });
    showToast('Task toggled', 'info');
  };

  const requestDelete = (id: number | string) => {
    const taskToDelete = tasks.find(task => task.id === id);
    if (!taskToDelete) return;

    dispatch({ type: 'requestDelete', payload: id });
    showToast(
      `Task "${taskToDelete.title}" will be deleted in 5 seconds`,
      'error',
      () => undoDelete(id), 
      5000
    );
  };

  const undoDelete = (_id?: number | string) => {
    if (deletingTask) {
      dispatch({ type: 'undoDelete', payload: deletingTask.id });
      hideToast();
      showToast('Deletion cancelled', 'info');
    }
  };

  const clearCompleted = () => {
    dispatch({ type: 'clearCompleted' });
    showToast('Completed tasks cleared', 'info');
  };

  const resetTasks = () => {
    dispatch({ type: 'reset' });
    showToast('Tasks reset to default', 'info');
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        filter,
        search,
        editingTask,
        deletingTask,
        toast,
        setFilter,
        setSearch,
        setEditingTask,
        hideToast,
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