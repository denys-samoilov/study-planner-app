import React, { createContext, useContext, useReducer, useState } from 'react';
import { Task } from '../types/task';
import { initialTasks } from '../data/initialTasks';
import { taskReducer } from '../reducers/taskReducer';
import { type FilterType } from '../components/TaskFilters';

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

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, dispatch] = useReducer(taskReducer, initialTasks);
  const [filter, setFilter] = useState<FilterType>('all');
  const [search, setSearch] = useState<string>('');
  const [editingTask, setEditingTask] = useState<Task | null>(null);

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

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
}