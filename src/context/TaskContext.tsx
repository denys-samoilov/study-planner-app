import React, { createContext, useReducer, useState, useEffect } from 'react';
import { Task } from '../types/task';
import { taskReducer } from '../reducers/taskReducer';
import { type FilterType } from '../components/TaskFilters';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { ToastType } from '../components/Toast';
import { taskRepository } from '../repositories/taskRepository';

const tasksKey = 'study_planner_tasks';


interface ToastState {
  message: string;
  type: ToastType;
  onUndo?: () => void;
  duration?: number;
}

interface TaskContextType {
  page: number;
  limit: number;
  tasks: Task[];
  filter: FilterType;
  search: string;
  editingTask: Task | null;
  deletingTask: Task | undefined;
  toast: ToastState | null;
  isLoading: boolean;
  error: string | null;
  fetchTasksForPage: () => void;
  nextPage: () => void;
  prevPage: () => void;
  setFilter: (filter: FilterType) => void;
  setSearch: (search: string) => void;
  setEditingTask: (task: Task | null) => void;
  filterTasks: () => Task[];
  hideToast: () => void;
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  toggleTask: (id: number | string) => void;
  requestDelete: (id: number | string) => void;
  undoDelete: () => void; 
  clearCompleted: () => void;
  resetTasks: () => void;
}

export const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, dispatch] = useReducer(taskReducer, []);
  const [filter, setFilter] = useLocalStorage<FilterType>('study_planner_filter', 'all');
  const [search, setSearch] = useLocalStorage<string>('study_planner_search', '');
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [toast, setToast] = useState<ToastState | null>(null);

  const deletingTask = tasks.find(task => task.isDeleting);  

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const showToast = (message: string, type: ToastType = 'success', onUndo?: () => void, duration = 3000) => {
    setToast({ message, type, onUndo, duration });
  }

  const hideToast = () => {
    setToast(null);
  }

  const nextPage = () => setPage(prev => prev + 1);
  const prevPage = () => setPage(prev => Math.max(prev - 1, 1));

  const fetchTasksForPage = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const skip = (page - 1) * limit;
      const serverTasks = await taskRepository.getAll(limit, skip);
      dispatch({ type: 'setTasks', payload: serverTasks });
    } 
    catch (error) {
      console.error('Failed to load tasks from API:', error);
      setError('Failed to load tasks. Please try again later.');
    }
    finally {    
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchTasksForPage(); 
  }, [page]);



  useEffect(() => {
    const deletingTaskId = deletingTask?.id;
    if (deletingTaskId === undefined) return;

    const timer = setTimeout(() => {
      dispatch({ type: 'confirmDelete', payload: deletingTaskId });
      showToast('Task deleted permanently', 'error');
    }, 5000);

    return () => clearTimeout(timer);
  }, [deletingTask]);

  useEffect(() => {
      window.localStorage.setItem(tasksKey, JSON.stringify(tasks));

      const amountOfActiveTasks = tasks.filter(task => !task.completed).length;

      if (amountOfActiveTasks > 0) {
        document.title = "Study Planner - " + amountOfActiveTasks + " active task" + (amountOfActiveTasks !== 1 ? "s" : "");
      }
      else document.title = "Study Planner";
  }, [tasks]);

  const filterTasks = (): Task[] => {
        let filteredTasks = tasks;
        switch (filter) {
          case 'completed':
            filteredTasks = tasks.filter((task) => task.completed);
            break;
          case 'active':
            filteredTasks = tasks.filter((task) => !task.completed);
            break;
          default:
            filteredTasks = tasks;
        }
    
        if (search.trim() !== '') {
          filteredTasks = filteredTasks.filter((task) =>
            task.title.toLowerCase().includes(search.toLowerCase())
          );
        }
        return filteredTasks;
    };

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
      () => undoDelete(), 
      5000
    );
  };

  const undoDelete = () => {
    if (deletingTask) {
      dispatch({ type: 'undoDelete', payload: deletingTask.id });
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
        page,
        limit,
        tasks,
        filter,
        search,
        editingTask,
        deletingTask,
        toast,
        isLoading,
        error,
        fetchTasksForPage,
        nextPage,
        prevPage,
        setFilter,
        setSearch,
        setEditingTask,
        filterTasks,
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