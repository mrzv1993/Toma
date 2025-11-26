import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { api } from '../utils/api';
import { Task, Hook, Category, Sprint, TimerState, HookGroup } from '../types';

interface AppContextType {
  // Auth
  user: any | null;
  accessToken: string | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;

  // Data
  hooks: Hook[];
  hookGroups: HookGroup[];
  categories: Category[];
  tasks: Task[];
  activeSprint: Sprint | null;
  sprintHistory: Sprint[];
  timer: TimerState;

  // Actions
  refreshData: () => Promise<void>;
  createHook: (title: string, groupId?: string) => Promise<void>;
  updateHook: (id: string, updates: any) => Promise<void>;
  deleteHook: (id: string) => Promise<void>;
  createHookGroup: (title: string) => Promise<void>;
  deleteHookGroup: (id: string) => Promise<void>;
  createCategory: (title: string) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  createTask: (title: string, hookId?: string | null, categoryId?: string) => Promise<void>;
  updateTask: (id: string, updates: any) => Promise<void>;
  moveTaskToSprint: (id: string, priorityLevel: number) => Promise<void>;
  moveTaskToInbox: (id: string) => Promise<void>;
  completeTask: (id: string) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  startTimer: (taskId: string) => Promise<void>;
  pauseTimer: (elapsedTime: number) => Promise<void>;
  stopTimer: (elapsedTime: number) => Promise<void>;

  // UI State
  viewMode: 'current' | 'history';
  setViewMode: (mode: 'current' | 'history') => void;
  selectedHistorySprint: Sprint | null;
  setSelectedHistorySprint: (sprint: Sprint | null) => void;
  draggedTask: Task | null;
  setDraggedTask: (task: Task | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [hooks, setHooks] = useState<Hook[]>([]);
  const [hookGroups, setHookGroups] = useState<HookGroup[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeSprint, setActiveSprint] = useState<Sprint | null>(null);
  const [sprintHistory, setSprintHistory] = useState<Sprint[]>([]);
  const [timer, setTimer] = useState<TimerState>({
    taskId: null,
    isRunning: false,
    startedAt: null,
    elapsedTime: 0,
  });

  const [viewMode, setViewMode] = useState<'current' | 'history'>('current');
  const [selectedHistorySprint, setSelectedHistorySprint] = useState<Sprint | null>(null);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);

  // Check for existing session and subscribe to auth changes
  useEffect(() => {
    let mounted = true;

    const initSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (mounted && session?.user && session?.access_token) {
          setUser(session.user);
          setAccessToken(session.access_token);
          api.setAccessToken(session.access_token);
          await refreshData();
        }
      } catch (error) {
        console.error('Session check error:', error);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    initSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;

      if (session?.access_token) {
        setAccessToken(session.access_token);
        api.setAccessToken(session.access_token);
        setUser(session.user);
        
        // Refresh data on explicit sign in
        if (event === 'SIGNED_IN') {
          await refreshData();
        }
      } else if (event === 'SIGNED_OUT') {
        setAccessToken(null);
        api.setAccessToken(null);
        setUser(null);
        setHooks([]);
        setHookGroups([]);
        setCategories([]);
        setTasks([]);
        setActiveSprint(null);
        setSprintHistory([]);
        setTimer({
          taskId: null,
          isRunning: false,
          startedAt: null,
          elapsedTime: 0,
        });
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  async function signIn(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data?.session?.user && data?.session?.access_token) {
        setUser(data.session.user);
        setAccessToken(data.session.access_token);
        api.setAccessToken(data.session.access_token);
        await refreshData();
      }
    } catch (error: any) {
      console.error('Sign in error:', error);
      throw new Error(error.message || 'Failed to sign in');
    }
  }

  async function signUp(email: string, password: string) {
    try {
      // Call our backend to create user
      await api.signUp(email, password);

      // Then sign in
      await signIn(email, password);
    } catch (error: any) {
      console.error('Sign up error:', error);
      throw new Error(error.message || 'Failed to sign up');
    }
  }

  async function signOut() {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setAccessToken(null);
      api.setAccessToken(null);
      setHooks([]);
      setHookGroups([]);
      setCategories([]);
      setTasks([]);
      setActiveSprint(null);
      setSprintHistory([]);
      setTimer({
        taskId: null,
        isRunning: false,
        startedAt: null,
        elapsedTime: 0,
      });
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  }

  async function refreshData() {
    try {
      const results = await Promise.allSettled([
        api.getHooks(),
        api.getHookGroups(),
        api.getCategories(),
        api.getTasks(),
        api.getActiveSprint(),
        api.getSprintHistory(),
        api.getTimer(),
      ]);

      const [hooksRes, hookGroupsRes, categoriesRes, tasksRes, sprintRes, historyRes, timerRes] = results;

      if (hooksRes.status === 'fulfilled') setHooks(hooksRes.value.data || []);
      if (hookGroupsRes.status === 'fulfilled') setHookGroups(hookGroupsRes.value.data || []);
      if (categoriesRes.status === 'fulfilled') setCategories(categoriesRes.value.data || []);
      if (tasksRes.status === 'fulfilled') setTasks(tasksRes.value.data || []);
      if (sprintRes.status === 'fulfilled') setActiveSprint(sprintRes.value.data || null);
      
      if (historyRes.status === 'fulfilled') {
        setSprintHistory(historyRes.value.data || []);
      } else {
        console.error('Refresh data warning: Failed to fetch sprint history');
      }

      if (timerRes.status === 'fulfilled') {
        setTimer(timerRes.value.data || {
            taskId: null,
            isRunning: false,
            startedAt: null,
            elapsedTime: 0,
        });
      }
    } catch (error) {
      console.error('Refresh data fatal error:', error);
    }
  }

  async function createHook(title: string, groupId?: string) {
    // Optimistic update
    const tempId = `temp-hook-${Date.now()}`;
    const tempHook: Hook = {
      id: tempId,
      title,
      groupId: groupId || 'default',
      userId: user?.id || 'temp',
      taskCount: 0,
      createdAt: new Date().toISOString(),
    };
    setHooks((prev) => [tempHook, ...prev]);

    try {
      const res = await api.createHook(title, groupId);
      if (res && res.success && res.data) {
        setHooks((prev) => prev.map((h) => (h.id === tempId ? res.data : h)));
      } else {
        // Fallback if no data returned (shouldn't happen)
        await refreshData();
      }
    } catch (error) {
      console.error('Create hook error:', error);
      setHooks((prev) => prev.filter((h) => h.id !== tempId));
      throw error;
    }
  }

  async function updateHook(id: string, updates: any) {
    try {
      // Optimistic update
      setHooks((prev) => prev.map((h) => 
        h.id === id ? { ...h, ...updates } : h
      ));

      await api.updateHook(id, updates);
      await refreshData();
    } catch (error) {
      console.error('Update hook error:', error);
      await refreshData(); // Revert on error
      throw error;
    }
  }

  async function deleteHook(id: string) {
    try {
      await api.deleteHook(id);
      await refreshData();
    } catch (error) {
      console.error('Delete hook error:', error);
      throw error;
    }
  }

  async function createHookGroup(title: string) {
    try {
      await api.createHookGroup(title);
      await refreshData();
    } catch (error) {
      console.error('Create hook group error:', error);
      throw error;
    }
  }

  async function deleteHookGroup(id: string) {
    try {
      await api.deleteHookGroup(id);
      await refreshData();
    } catch (error) {
      console.error('Delete hook group error:', error);
      throw error;
    }
  }

  async function createCategory(title: string) {
    try {
      await api.createCategory(title);
      await refreshData();
    } catch (error) {
      console.error('Create category error:', error);
      throw error;
    }
  }

  async function deleteCategory(id: string) {
    try {
      await api.deleteCategory(id);
      await refreshData();
    } catch (error) {
      console.error('Delete category error:', error);
      throw error;
    }
  }

  async function createTask(title: string, hookId?: string | null, categoryId?: string) {
    // Optimistic update
    const tempId = `temp-task-${Date.now()}`;
    const tempTask: Task = {
      id: tempId,
      title,
      hookId: hookId || null,
      categoryId: categoryId || 'default',
      spentTime: 0,
      isDone: false,
      sprintId: null,
      priorityLevel: null,
      priorityPosition: null,
      userId: user?.id || 'temp',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      history: [],
    };
    setTasks((prev) => [tempTask, ...prev]);
    
    if (hookId) {
      setHooks((prev) => prev.map((h) => h.id === hookId ? { ...h, taskCount: h.taskCount + 1 } : h));
    }

    try {
      const res = await api.createTask(title, hookId, categoryId);
      if (res && res.success && res.data) {
        setTasks((prev) => prev.map((t) => (t.id === tempId ? res.data : t)));
      } else {
        await refreshData();
      }
    } catch (error) {
      console.error('Create task error:', error);
      setTasks((prev) => prev.filter((t) => t.id !== tempId));
      if (hookId) {
        setHooks((prev) => prev.map((h) => h.id === hookId ? { ...h, taskCount: Math.max(0, h.taskCount - 1) } : h));
      }
      throw error;
    }
  }

  async function updateTask(id: string, updates: any) {
    const originalTask = tasks.find(t => t.id === id);
    if (!originalTask) return;

    // Optimistic update
    setTasks((prev) => prev.map((t) => 
      t.id === id ? { ...t, ...updates, updatedAt: new Date().toISOString() } : t
    ));

    try {
      const res = await api.updateTask(id, updates);
      if (res && res.success && res.data) {
        setTasks((prev) => prev.map((t) => (t.id === id ? res.data : t)));
      }
    } catch (error) {
      console.error('Update task error:', error);
      setTasks((prev) => prev.map((t) => t.id === id ? originalTask : t));
      throw error;
    }
  }

  async function moveTaskToSprint(id: string, priorityLevel: number) {
    const originalTask = tasks.find(t => t.id === id);
    if (!originalTask) return;

    // Need to know sprint id to update properly, but activeSprint is global state
    if (!activeSprint) return;

    // Optimistic update
    setTasks((prev) => prev.map((t) => 
      t.id === id ? { 
        ...t, 
        sprintId: activeSprint.id, 
        priorityLevel, 
        updatedAt: new Date().toISOString() 
        // Note: priorityPosition calculation is complex here, server handles it or client does.
        // If we use this function, we rely on server logic for capacity.
        // For drag n drop, we use updateTask directly usually.
      } : t
    ));

    try {
      const res = await api.moveTaskToSprint(id, priorityLevel);
      if (res && res.success && res.data) {
        setTasks((prev) => prev.map((t) => (t.id === id ? res.data : t)));
      } else {
        // Fallback
        await refreshData();
      }
    } catch (error) {
      console.error('Move task to sprint error:', error);
      setTasks((prev) => prev.map((t) => t.id === id ? originalTask : t));
      throw error;
    }
  }

  async function moveTaskToInbox(id: string) {
    const originalTask = tasks.find(t => t.id === id);
    if (!originalTask) return;

    // Optimistic update
    setTasks((prev) => prev.map((t) => 
      t.id === id ? { 
        ...t, 
        sprintId: null, 
        priorityLevel: null, 
        priorityPosition: null,
        updatedAt: new Date().toISOString() 
      } : t
    ));

    try {
      const res = await api.moveTaskToInbox(id);
      if (res && res.success && res.data) {
        setTasks((prev) => prev.map((t) => (t.id === id ? res.data : t)));
      }
    } catch (error) {
      console.error('Move task to inbox error:', error);
      setTasks((prev) => prev.map((t) => t.id === id ? originalTask : t));
      throw error;
    }
  }

  async function completeTask(id: string) {
    const originalTask = tasks.find(t => t.id === id);
    if (!originalTask) return;

    // Optimistic update
    setTasks((prev) => prev.map((t) => 
      t.id === id ? { ...t, isDone: true, updatedAt: new Date().toISOString() } : t
    ));

    // Also stop timer locally if running
    if (timer.taskId === id && timer.isRunning) {
      setTimer(prev => ({ ...prev, isRunning: false, taskId: null, startedAt: null, elapsedTime: 0 }));
    }

    try {
      const res = await api.completeTask(id);
      if (res && res.success && res.data) {
        setTasks((prev) => prev.map((t) => (t.id === id ? res.data : t)));
      } else {
        // Fallback if side effects (like sprint completion) happened
        await refreshData();
      }
    } catch (error) {
      console.error('Complete task error:', error);
      setTasks((prev) => prev.map((t) => t.id === id ? originalTask : t));
      throw error;
    }
  }

  async function deleteTask(id: string) {
    const originalTask = tasks.find(t => t.id === id);
    if (!originalTask) return;

    // Optimistic update
    setTasks((prev) => prev.filter((t) => t.id !== id));
    
    // Update hook count locally
    if (originalTask.hookId) {
      setHooks((prev) => prev.map((h) => 
        h.id === originalTask.hookId ? { ...h, taskCount: Math.max(0, h.taskCount - 1) } : h
      ));
    }

    try {
      await api.deleteTask(id);
      // Success, no data needed
    } catch (error) {
      console.error('Delete task error:', error);
      // Rollback
      setTasks((prev) => [...prev, originalTask]);
      if (originalTask.hookId) {
         setHooks((prev) => prev.map((h) => 
          h.id === originalTask.hookId ? { ...h, taskCount: h.taskCount + 1 } : h
        ));
      }
      throw error;
    }
  }

  async function startTimer(taskId: string) {
    const task = tasks.find(t => t.id === taskId);
    const previousTimer = { ...timer };
    const now = new Date().toISOString();

    // Optimistic update
    setTimer({
      taskId,
      isRunning: true,
      startedAt: now,
      elapsedTime: task?.spentTime || 0,
    });

    try {
      const res = await api.startTimer(taskId);
      
      if (res && res.success && res.data) {
        setTimer({
          taskId: res.data.taskId,
          isRunning: true,
          startedAt: res.data.startTime,
          elapsedTime: task?.spentTime || 0,
        });
      }

      // Only refresh tasks to update spent times of other tasks
      const tasksRes = await api.getTasks();
      setTasks(tasksRes.data || []);
    } catch (error) {
      console.error('Start timer error:', error);
      setTimer(previousTimer);
      throw error;
    }
  }

  async function pauseTimer(elapsedTime: number) {
    const previousTimer = { ...timer };
    
    // Optimistic update
    setTimer(prev => ({
        ...prev,
        isRunning: false,
        elapsedTime
    }));

    try {
      await api.pauseTimer(elapsedTime);
      
      const tasksRes = await api.getTasks();
      setTasks(tasksRes.data || []);
    } catch (error) {
      console.error('Pause timer error:', error);
      setTimer(previousTimer);
      throw error;
    }
  }

  async function stopTimer(elapsedTime: number) {
    const previousTimer = { ...timer };

    // Optimistic update
    setTimer({
        taskId: null,
        isRunning: false,
        startedAt: null,
        elapsedTime: 0
    });

    try {
      await api.stopTimer(elapsedTime);
      
      const tasksRes = await api.getTasks();
      setTasks(tasksRes.data || []);
    } catch (error) {
      console.error('Stop timer error:', error);
      setTimer(previousTimer);
      throw error;
    }
  }

  const value: AppContextType = {
    user,
    accessToken,
    isLoading,
    signIn,
    signUp,
    signOut,
    hooks,
    hookGroups,
    categories,
    tasks,
    activeSprint,
    sprintHistory,
    timer,
    refreshData,
    createHook,
    updateHook,
    deleteHook,
    createHookGroup,
    deleteHookGroup,
    createCategory,
    deleteCategory,
    createTask,
    updateTask,
    moveTaskToSprint,
    moveTaskToInbox,
    completeTask,
    deleteTask,
    startTimer,
    pauseTimer,
    stopTimer,
    viewMode,
    setViewMode,
    selectedHistorySprint,
    setSelectedHistorySprint,
    draggedTask,
    setDraggedTask,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
