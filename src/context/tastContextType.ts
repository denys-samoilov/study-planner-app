import { createContext } from "react";
import type { ToastType } from "../components/Toast";
import type { Task } from "../types/task";

export interface ToastState {
  message: string;
  type: ToastType;
  onUndo?: () => void;
  duration?: number;
}

interface TaskContextType {
  page: number;
  limit: number;
  tasks: Task[];
  filter: string;
  search: string;
  viewingTask: Task | null;
  editingTask: Task | null;
  deletingTask: Task | undefined;
  toast: ToastState | null;
  isLoading: boolean;
  error: string | null;
  totalTasksOnStart: number;
  fetchTasksForPage: () => void;
  nextPage: () => void;
  prevPage: () => void;
  setViewingTask: (task: Task | null) => void;
  setFilter: (filter: string) => void;
  setSearch: (search: string) => void;
  setEditingTask: (task: Task | null) => void;
  filterTasks: () => Task[];
  hideToast: () => void;
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  toggleTask: (id: number) => void;
  requestDelete: (id: number) => void;
  undoDelete: () => void;
  deleteInstantly: (id: number) => void;

  clearCompleted: () => void;
  resetTasks: () => void;
}

export const TaskContext = createContext<TaskContextType | undefined>(undefined);