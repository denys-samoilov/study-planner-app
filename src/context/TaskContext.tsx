import React, { createContext, useReducer, useState, useEffect } from 'react';
import { Task } from '../types/task';
import { taskReducer } from '../reducers/taskReducer';
import { type FilterType } from '../components/TaskFilters';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { ToastType } from '../components/Toast';
import { taskRepository } from '../repositories/taskRepository';


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
  viewingTask: Task | null;
  editingTask: Task | null;
  deletingTask: Task | undefined;
  toast: ToastState | null;
  isLoading: boolean;
  error: string | null;
  fetchTasksForPage: () => void;
  nextPage: () => void;
  prevPage: () => void;
  setViewingTask: (task: Task | null) => void;
  setFilter: (filter: FilterType) => void;
  setSearch: (search: string) => void;
  setEditingTask: (task: Task | null) => void;
  filterTasks: () => Task[];
  hideToast: () => void;
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  toggleTask: (id: number) => void;
  requestDelete: (id: number | string) => void;
  undoDelete: () => void; 
  clearCompleted: () => void;
  resetTasks: () => void;
}

export const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, dispatch] = useReducer(taskReducer, []);
  const [viewingTask, setViewingTask] = useState<Task | null>(null);
  const [filter, setFilter] = useLocalStorage<FilterType>('study_planner_filter', 'all');
  const [search, setSearch] = useLocalStorage<string>('study_planner_search', '');
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

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

  const fetchTasksForPage = async (signal?: AbortSignal) => {
    setIsLoading(true);
    setError(null);
    try {
      const skip = (page - 1) * limit;
      const serverTasks = await taskRepository.getAll(limit, skip, signal);
      dispatch({ type: 'setTasks', payload: serverTasks });
    } 
    catch (error: any) {
      if(error.name == 'AbortError'){
        console.log('Fetch aborted');
        return;
      }
      console.error('Failed to load tasks from API:', error);
      setError('Failed to load tasks. Please try again later.');
    }

    setIsLoading(false);
    
  }

  useEffect(() => {
    const controller = new AbortController();

    fetchTasksForPage(controller.signal); 

    return () => {
      controller.abort();
    };
  }, [page]);


  useEffect(() => {
    const deletingTaskId = deletingTask?.id;
    if (deletingTaskId === undefined) return;

    const timer = setTimeout(async () => {
      await taskRepository.delete(deletingTaskId);
      dispatch({ type: 'confirmDelete', payload: deletingTaskId });
      showToast('Task deleted permanently', 'error');
    }, 5000);

    return () => clearTimeout(timer);
  }, [deletingTask]);

  useEffect(() => {
      
        document.title = "Study Planner - Page " + page;
      
      
  }, [page]);

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

  const addTask = async (newTaskData: Task) => {
    try {
      const createdTask = await taskRepository.create(newTaskData);
      dispatch({ type: 'add', payload: createdTask });
      showToast('Task created successfully!', 'success');
    } 
    catch (err) {
      console.error('Failed to create task:', err);
      showToast('Failed to create task.', 'error');
    }
  };

  const updateTask = async (updatedTask: Task) => {
    try {
      const data = await taskRepository.update(updatedTask.id, updatedTask);

      dispatch({ type: 'update', payload: data });
      setEditingTask(null);
      showToast('Task updated successfully!', 'success');
    } 
    catch (err) {
      console.error('Failed to update task:', err);
      showToast('Failed to update task. Please try again.', 'error');
    }
  };

  const toggleTask = async (id: number) => {
    const taskToToggle = tasks.find(task => task.id === id);
    if (!taskToToggle) return;

    const updatedTask: Task = {
      ...taskToToggle,
      completed: !taskToToggle.completed,
    };

    try {
      dispatch({ type: 'toggle', payload: id });
      await taskRepository.update(id, updatedTask);

      showToast(
        updatedTask.completed ? 'Task marked as completed' : 'Task marked as active',
        'info'
      );
    } 
    catch (err) {
      dispatch({ type: 'toggle', payload: id });
      console.error('Failed to toggle task status:', err);
      showToast('Failed to update task status.', 'error');
    }
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
        viewingTask,
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
        setViewingTask,
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