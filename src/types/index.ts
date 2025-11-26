// User Types
export interface User {
  id: string;
  email: string;
  createdAt: string;
}

// Hook Types
export interface HookGroup {
  id: string;
  title: string;
  userId: string;
  createdAt: string;
}

export interface Hook {
  id: string;
  title: string;
  groupId: string;
  userId: string;
  taskCount: number;
  createdAt: string;
  position?: number;
}

// Task Types
export interface Task {
  id: string;
  title: string;
  hookId: string | null;
  categoryId: string | null;
  spentTime: number; // in seconds
  isDone: boolean;
  sprintId: string | null;
  priorityLevel: number | null; // 1-9 or null
  priorityPosition: number | null; // position within priority level
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface TaskHistoryEntry {
  timestamp: string;
  duration: number; // in seconds
  sprintId: string | null;
}

export interface TaskWithHistory extends Task {
  history: TaskHistoryEntry[];
}

// Category Types
export interface Category {
  id: string;
  title: string;
  userId: string;
  order: number;
  createdAt: string;
}

// Sprint Types
export interface Sprint {
  id: string;
  userId: string;
  number: number;
  createdAt: string;
  completedAt: string | null;
  totalTime: number; // in seconds
  isCompleted: boolean;
  tasks: SprintTask[];
}

export interface SprintTask {
  taskId: string;
  title: string;
  hookId: string | null;
  priorityLevel: number;
  priorityPosition: number;
  spentTime: number;
  isDone: boolean;
  completedAt: string | null;
}

// Timer Types
export interface TimerState {
  taskId: string | null;
  isRunning: boolean;
  startedAt: string | null;
  elapsedTime: number; // in seconds
}

// Priority System
export const PRIORITY_LEVELS = {
  9: 1, // Level 9: 1 task
  8: 2, // Level 8: 2 tasks
  7: 3, // Level 7: 3 tasks
  6: 4, // Level 6: 4 tasks
  5: 5, // Level 5: 5 tasks
  4: 6, // Level 4: 6 tasks
  3: 7, // Level 3: 7 tasks
  2: 8, // Level 2: 8 tasks
  1: 9, // Level 1: 9 tasks
} as const;

export const SPRINT_DURATION_SECONDS = 9 * 60 * 60; // 9 hours in seconds

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Drag and Drop Types
export interface DragItem {
  type: 'task';
  task: Task;
  source: 'inbox' | 'sprint';
}
