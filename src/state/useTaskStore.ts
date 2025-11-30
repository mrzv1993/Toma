import { create } from 'zustand';

interface TaskState {
  tasks: any[];
  setTasks: (tasks: any[]) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  setTasks: (tasks) => set({ tasks }),
}));
