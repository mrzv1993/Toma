import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import { createClient } from 'jsr:@supabase/supabase-js@2';
import * as kv from './kv_store.tsx';

const app = new Hono();

app.use('*', cors());
app.use('*', logger(console.log));

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

// Helper function to get authenticated user
async function getAuthenticatedUser(request: Request) {
  const accessToken = request.headers.get('Authorization')?.split(' ')[1];
  if (!accessToken) {
    return null;
  }
  
  const { data: { user }, error } = await supabase.auth.getUser(accessToken);
  if (error) {
    console.log(`Auth error: ${error.message}`);
    return null;
  }
  if (!user) {
    console.log('Auth error: No user found');
    return null;
  }
  
  return user;
}

// ============================================
// AUTH ROUTES
// ============================================

// Sign Up
app.post('/make-server-9fa24130/auth/signup', async (c) => {
  try {
    const { email, password } = await c.req.json();
    
    if (!email || !password) {
      return c.json({ success: false, error: 'Email and password are required' }, 400);
    }
    
    // Create user with Supabase Auth
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm since email server is not configured
    });
    
    if (error) {
      console.log(`Sign up error: ${error.message}`);
      return c.json({ success: false, error: error.message }, 400);
    }
    
    // Initialize user data in KV store
    const userId = data.user.id;
    await kv.set(`user:${userId}:profile`, {
      id: userId,
      email,
      createdAt: new Date().toISOString(),
    });
    
    // Initialize empty data structures
    await kv.set(`user:${userId}:hooks`, []);
    await kv.set(`user:${userId}:hookGroups`, []); // Add hook groups
    await kv.set(`user:${userId}:categories`, [
      {
        id: 'default',
        title: 'Очередь',
        userId,
        order: 0,
        createdAt: new Date().toISOString(),
      }
    ]);
    await kv.set(`user:${userId}:tasks`, []);
    await kv.set(`user:${userId}:sprints`, []);
    
    // Create first sprint
    const firstSprint = {
      id: `sprint-${Date.now()}`,
      userId,
      number: 1,
      createdAt: new Date().toISOString(),
      completedAt: null,
      totalTime: 0,
      isCompleted: false,
      tasks: [],
    };
    
    await kv.set(`user:${userId}:activeSprint`, firstSprint);
    await kv.set(`user:${userId}:activeTimer`, {
      taskId: null,
      isRunning: false,
      startedAt: null,
      elapsedTime: 0,
    });
    
    return c.json({
      success: true,
      data: {
        user: { id: userId, email },
      },
    });
  } catch (error) {
    console.log(`Sign up error: ${error}`);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ============================================
// HOOK GROUPS ROUTES
// ============================================

// Get all hook groups
app.get('/make-server-9fa24130/hook-groups', async (c) => {
  const user = await getAuthenticatedUser(c.req.raw);
  if (!user) {
    return c.json({ success: false, error: 'Unauthorized' }, 401);
  }
  
  try {
    const hookGroups = await kv.get(`user:${user.id}:hookGroups`) || [];
    return c.json({ success: true, data: hookGroups });
  } catch (error) {
    console.log(`Get hook groups error: ${error}`);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Create hook group
app.post('/make-server-9fa24130/hook-groups', async (c) => {
  const user = await getAuthenticatedUser(c.req.raw);
  if (!user) {
    return c.json({ success: false, error: 'Unauthorized' }, 401);
  }
  
  try {
    const { title } = await c.req.json();
    
    const hookGroups = await kv.get(`user:${user.id}:hookGroups`) || [];
    const newGroup = {
      id: `group-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title,
      userId: user.id,
      createdAt: new Date().toISOString(),
    };
    
    hookGroups.push(newGroup);
    await kv.set(`user:${user.id}:hookGroups`, hookGroups);
    
    return c.json({ success: true, data: newGroup });
  } catch (error) {
    console.log(`Create hook group error: ${error}`);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Delete hook group
app.delete('/make-server-9fa24130/hook-groups/:id', async (c) => {
  const user = await getAuthenticatedUser(c.req.raw);
  if (!user) {
    return c.json({ success: false, error: 'Unauthorized' }, 401);
  }
  
  try {
    const groupId = c.req.param('id');
    
    const hookGroups = await kv.get(`user:${user.id}:hookGroups`) || [];
    const filteredGroups = hookGroups.filter((g: any) => g.id !== groupId);
    
    await kv.set(`user:${user.id}:hookGroups`, filteredGroups);
    
    // Move hooks from deleted group to default (or handle as needed)
    // For now, let's set their groupId to 'default'
    const hooks = await kv.get(`user:${user.id}:hooks`) || [];
    const updatedHooks = hooks.map((h: any) => {
      if (h.groupId === groupId) {
        return { ...h, groupId: 'default' };
      }
      return h;
    });
    await kv.set(`user:${user.id}:hooks`, updatedHooks);
    
    return c.json({ success: true });
  } catch (error) {
    console.log(`Delete hook group error: ${error}`);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ============================================
// HOOKS ROUTES
// ============================================

// Get all hooks
app.get('/make-server-9fa24130/hooks', async (c) => {
  const user = await getAuthenticatedUser(c.req.raw);
  if (!user) {
    return c.json({ success: false, error: 'Unauthorized' }, 401);
  }
  
  try {
    const hooks = await kv.get(`user:${user.id}:hooks`) || [];
    return c.json({ success: true, data: hooks });
  } catch (error) {
    console.log(`Get hooks error: ${error}`);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Create hook
app.post('/make-server-9fa24130/hooks', async (c) => {
  const user = await getAuthenticatedUser(c.req.raw);
  if (!user) {
    return c.json({ success: false, error: 'Unauthorized' }, 401);
  }
  
  try {
    const { title, groupId } = await c.req.json();
    
    const hooks = await kv.get(`user:${user.id}:hooks`) || [];
    const newHook = {
      id: `hook-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title,
      groupId: groupId || 'default',
      userId: user.id,
      taskCount: 0,
      createdAt: new Date().toISOString(),
    };
    
    hooks.push(newHook);
    await kv.set(`user:${user.id}:hooks`, hooks);
    
    return c.json({ success: true, data: newHook });
  } catch (error) {
    console.log(`Create hook error: ${error}`);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Update hook
app.put('/make-server-9fa24130/hooks/:id', async (c) => {
  const user = await getAuthenticatedUser(c.req.raw);
  if (!user) {
    return c.json({ success: false, error: 'Unauthorized' }, 401);
  }
  
  try {
    const hookId = c.req.param('id');
    const updates = await c.req.json();
    
    const hooks = await kv.get(`user:${user.id}:hooks`) || [];
    const hookIndex = hooks.findIndex((h: any) => h.id === hookId);
    
    if (hookIndex === -1) {
      return c.json({ success: false, error: 'Hook not found' }, 404);
    }
    
    hooks[hookIndex] = {
      ...hooks[hookIndex],
      ...updates,
    };
    await kv.set(`user:${user.id}:hooks`, hooks);
    
    return c.json({ success: true, data: hooks[hookIndex] });
  } catch (error) {
    console.log(`Update hook error: ${error}`);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Delete hook
app.delete('/make-server-9fa24130/hooks/:id', async (c) => {
  const user = await getAuthenticatedUser(c.req.raw);
  if (!user) {
    return c.json({ success: false, error: 'Unauthorized' }, 401);
  }
  
  try {
    const hookId = c.req.param('id');
    
    const hooks = await kv.get(`user:${user.id}:hooks`) || [];
    const filteredHooks = hooks.filter((h: any) => h.id !== hookId);
    
    await kv.set(`user:${user.id}:hooks`, filteredHooks);
    
    return c.json({ success: true });
  } catch (error) {
    console.log(`Delete hook error: ${error}`);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ============================================
// CATEGORIES ROUTES
// ============================================

// Get all categories
app.get('/make-server-9fa24130/categories', async (c) => {
  const user = await getAuthenticatedUser(c.req.raw);
  if (!user) {
    return c.json({ success: false, error: 'Unauthorized' }, 401);
  }
  
  try {
    const categories = await kv.get(`user:${user.id}:categories`) || [];
    return c.json({ success: true, data: categories });
  } catch (error) {
    console.log(`Get categories error: ${error}`);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Create category
app.post('/make-server-9fa24130/categories', async (c) => {
  const user = await getAuthenticatedUser(c.req.raw);
  if (!user) {
    return c.json({ success: false, error: 'Unauthorized' }, 401);
  }
  
  try {
    const { title } = await c.req.json();
    
    const categories = await kv.get(`user:${user.id}:categories`) || [];
    const newCategory = {
      id: `cat-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title,
      userId: user.id,
      order: categories.length,
      createdAt: new Date().toISOString(),
    };
    
    categories.push(newCategory);
    await kv.set(`user:${user.id}:categories`, categories);
    
    return c.json({ success: true, data: newCategory });
  } catch (error) {
    console.log(`Create category error: ${error}`);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Delete category
app.delete('/make-server-9fa24130/categories/:id', async (c) => {
  const user = await getAuthenticatedUser(c.req.raw);
  if (!user) {
    return c.json({ success: false, error: 'Unauthorized' }, 401);
  }
  
  try {
    const categoryId = c.req.param('id');
    
    if (categoryId === 'default') {
      return c.json({ success: false, error: 'Cannot delete default category' }, 400);
    }
    
    const categories = await kv.get(`user:${user.id}:categories`) || [];
    const filteredCategories = categories.filter((cat: any) => cat.id !== categoryId);
    
    await kv.set(`user:${user.id}:categories`, filteredCategories);
    
    // Move tasks from deleted category to default
    const tasks = await kv.get(`user:${user.id}:tasks`) || [];
    const updatedTasks = tasks.map((task: any) => {
      if (task.categoryId === categoryId) {
        return { ...task, categoryId: 'default' };
      }
      return task;
    });
    await kv.set(`user:${user.id}:tasks`, updatedTasks);
    
    return c.json({ success: true });
  } catch (error) {
    console.log(`Delete category error: ${error}`);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ============================================
// TASKS ROUTES
// ============================================

// Get all tasks
app.get('/make-server-9fa24130/tasks', async (c) => {
  const user = await getAuthenticatedUser(c.req.raw);
  if (!user) {
    return c.json({ success: false, error: 'Unauthorized' }, 401);
  }
  
  try {
    const tasks = await kv.get(`user:${user.id}:tasks`) || [];
    return c.json({ success: true, data: tasks });
  } catch (error) {
    console.log(`Get tasks error: ${error}`);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Create task
app.post('/make-server-9fa24130/tasks', async (c) => {
  const user = await getAuthenticatedUser(c.req.raw);
  if (!user) {
    return c.json({ success: false, error: 'Unauthorized' }, 401);
  }
  
  try {
    const { title, hookId, categoryId } = await c.req.json();
    
    const tasks = await kv.get(`user:${user.id}:tasks`) || [];
    const newTask = {
      id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title,
      hookId: hookId || null,
      categoryId: categoryId || 'default',
      spentTime: 0,
      isDone: false,
      sprintId: null,
      priorityLevel: null,
      priorityPosition: null,
      userId: user.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      history: [],
    };
    
    tasks.push(newTask);
    await kv.set(`user:${user.id}:tasks`, tasks);
    
    // Update hook task count
    if (hookId) {
      const hooks = await kv.get(`user:${user.id}:hooks`) || [];
      const hookIndex = hooks.findIndex((h: any) => h.id === hookId);
      if (hookIndex !== -1) {
        hooks[hookIndex].taskCount += 1;
        await kv.set(`user:${user.id}:hooks`, hooks);
      }
    }
    
    return c.json({ success: true, data: newTask });
  } catch (error) {
    console.log(`Create task error: ${error}`);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Update task
app.put('/make-server-9fa24130/tasks/:id', async (c) => {
  const user = await getAuthenticatedUser(c.req.raw);
  if (!user) {
    return c.json({ success: false, error: 'Unauthorized' }, 401);
  }
  
  try {
    const taskId = c.req.param('id');
    const updates = await c.req.json();
    
    const tasks = await kv.get(`user:${user.id}:tasks`) || [];
    const taskIndex = tasks.findIndex((t: any) => t.id === taskId);
    
    if (taskIndex === -1) {
      return c.json({ success: false, error: 'Task not found' }, 404);
    }
    
    tasks[taskIndex] = {
      ...tasks[taskIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    
    await kv.set(`user:${user.id}:tasks`, tasks);
    
    return c.json({ success: true, data: tasks[taskIndex] });
  } catch (error) {
    console.log(`Update task error: ${error}`);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Move task to sprint
app.post('/make-server-9fa24130/tasks/:id/move-to-sprint', async (c) => {
  const user = await getAuthenticatedUser(c.req.raw);
  if (!user) {
    return c.json({ success: false, error: 'Unauthorized' }, 401);
  }
  
  try {
    const taskId = c.req.param('id');
    const { priorityLevel } = await c.req.json();
    
    const tasks = await kv.get(`user:${user.id}:tasks`) || [];
    const activeSprint = await kv.get(`user:${user.id}:activeSprint`);
    
    if (!activeSprint || activeSprint.isCompleted) {
      return c.json({ success: false, error: 'No active sprint' }, 400);
    }
    
    // Check capacity for priority level
    const levelCapacity: { [key: number]: number } = {
      9: 1, 8: 2, 7: 3, 6: 4, 5: 5, 4: 6, 3: 7, 2: 8, 1: 9
    };
    
    const currentLevelTasks = tasks.filter(
      (t: any) => t.sprintId === activeSprint.id && t.priorityLevel === priorityLevel
    );
    
    if (currentLevelTasks.length >= levelCapacity[priorityLevel]) {
      return c.json({ 
        success: false, 
        error: 'Priority level is full. Need to implement cascading displacement.' 
      }, 400);
    }
    
    // Update task
    const taskIndex = tasks.findIndex((t: any) => t.id === taskId);
    if (taskIndex === -1) {
      return c.json({ success: false, error: 'Task not found' }, 404);
    }
    
    tasks[taskIndex] = {
      ...tasks[taskIndex],
      sprintId: activeSprint.id,
      priorityLevel,
      priorityPosition: currentLevelTasks.length,
      updatedAt: new Date().toISOString(),
    };
    
    await kv.set(`user:${user.id}:tasks`, tasks);
    
    return c.json({ success: true, data: tasks[taskIndex] });
  } catch (error) {
    console.log(`Move task to sprint error: ${error}`);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Move task out of sprint
app.post('/make-server-9fa24130/tasks/:id/move-to-inbox', async (c) => {
  const user = await getAuthenticatedUser(c.req.raw);
  if (!user) {
    return c.json({ success: false, error: 'Unauthorized' }, 401);
  }
  
  try {
    const taskId = c.req.param('id');
    
    const tasks = await kv.get(`user:${user.id}:tasks`) || [];
    const taskIndex = tasks.findIndex((t: any) => t.id === taskId);
    
    if (taskIndex === -1) {
      return c.json({ success: false, error: 'Task not found' }, 404);
    }
    
    tasks[taskIndex] = {
      ...tasks[taskIndex],
      sprintId: null,
      priorityLevel: null,
      priorityPosition: null,
      updatedAt: new Date().toISOString(),
    };
    
    await kv.set(`user:${user.id}:tasks`, tasks);
    
    return c.json({ success: true, data: tasks[taskIndex] });
  } catch (error) {
    console.log(`Move task to inbox error: ${error}`);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Complete task
app.post('/make-server-9fa24130/tasks/:id/complete', async (c) => {
  const user = await getAuthenticatedUser(c.req.raw);
  if (!user) {
    return c.json({ success: false, error: 'Unauthorized' }, 401);
  }
  
  try {
    const taskId = c.req.param('id');
    
    const tasks = await kv.get(`user:${user.id}:tasks`) || [];
    const taskIndex = tasks.findIndex((t: any) => t.id === taskId);
    
    if (taskIndex === -1) {
      return c.json({ success: false, error: 'Task not found' }, 404);
    }
    
    tasks[taskIndex] = {
      ...tasks[taskIndex],
      isDone: true,
      updatedAt: new Date().toISOString(),
    };
    
    await kv.set(`user:${user.id}:tasks`, tasks);
    
    // Stop timer if this task is running
    const timer = await kv.get(`user:${user.id}:activeTimer`);
    if (timer && timer.taskId === taskId && timer.isRunning) {
      await kv.set(`user:${user.id}:activeTimer`, {
        taskId: null,
        isRunning: false,
        startedAt: null,
        elapsedTime: 0,
      });
    }
    
    return c.json({ success: true, data: tasks[taskIndex] });
  } catch (error) {
    console.log(`Complete task error: ${error}`);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Delete task
app.delete('/make-server-9fa24130/tasks/:id', async (c) => {
  const user = await getAuthenticatedUser(c.req.raw);
  if (!user) {
    return c.json({ success: false, error: 'Unauthorized' }, 401);
  }
  
  try {
    const taskId = c.req.param('id');
    
    const tasks = await kv.get(`user:${user.id}:tasks`) || [];
    const task = tasks.find((t: any) => t.id === taskId);
    
    if (!task) {
      return c.json({ success: false, error: 'Task not found' }, 404);
    }
    
    const filteredTasks = tasks.filter((t: any) => t.id !== taskId);
    await kv.set(`user:${user.id}:tasks`, filteredTasks);
    
    // Update hook task count
    if (task.hookId) {
      const hooks = await kv.get(`user:${user.id}:hooks`) || [];
      const hookIndex = hooks.findIndex((h: any) => h.id === task.hookId);
      if (hookIndex !== -1) {
        hooks[hookIndex].taskCount = Math.max(0, hooks[hookIndex].taskCount - 1);
        await kv.set(`user:${user.id}:hooks`, hooks);
      }
    }
    
    return c.json({ success: true });
  } catch (error) {
    console.log(`Delete task error: ${error}`);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ============================================
// TIMELINE & TIMER ROUTES
// ============================================

// Get timer state (Legacy/Compat)
app.get('/make-server-9fa24130/timer', async (c) => {
  const user = await getAuthenticatedUser(c.req.raw);
  if (!user) return c.json({ success: false, error: 'Unauthorized' }, 401);
  
  try {
    let timer = null;
    try {
      timer = await kv.get(`user:${user.id}:activeTimer`);
    } catch (e) {
      console.log(`KV get timer error (recovering): ${e}`);
    }

    const safeTimer = timer || {
      taskId: null,
      isRunning: false,
      startedAt: null,
      elapsedTime: 0,
    };
    return c.json({ success: true, data: safeTimer });
  } catch (error) {
    console.log(`Get timer error: ${error}`);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Get time entries (timeline history)
app.get('/make-server-9fa24130/time-entries', async (c) => {
  const user = await getAuthenticatedUser(c.req.raw);
  if (!user) return c.json({ success: false, error: 'Unauthorized' }, 401);
  
  try {
    const entries = await kv.get(`user:${user.id}:timeEntries`) || [];
    // Optional: Filter by date if needed, currently returns all history
    // For MVP we might want to return only today's entries to keep payload small? 
    // Let's return all for now, client filters.
    return c.json({ success: true, data: entries });
  } catch (error) {
    console.log(`Get time entries error: ${error}`);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Start timer (Create new TimeEntry)
app.post('/make-server-9fa24130/timer/start', async (c) => {
  const user = await getAuthenticatedUser(c.req.raw);
  if (!user) return c.json({ success: false, error: 'Unauthorized' }, 401);
  
  try {
    const { taskId } = await c.req.json();
    
    const tasks = await kv.get(`user:${user.id}:tasks`) || [];
    const task = tasks.find((t: any) => t.id === taskId);
    
    if (!task) {
      return c.json({ success: false, error: 'Task not found' }, 404);
    }
    
    const entries = await kv.get(`user:${user.id}:timeEntries`) || [];
    
    // Safety: Close any currently running entries
    const now = new Date().toISOString();
    let tasksUpdated = false;
    
    entries.forEach((e: any) => {
        if (!e.endTime) {
            e.endTime = now;
            
            // Calculate duration and update previous task
            const duration = Math.floor((new Date(now).getTime() - new Date(e.startTime).getTime()) / 1000);
            
            const prevTaskIndex = tasks.findIndex((t: any) => t.id === e.taskId);
            if (prevTaskIndex !== -1) {
                tasks[prevTaskIndex].spentTime = (tasks[prevTaskIndex].spentTime || 0) + duration;
                tasksUpdated = true;
            }
        }
    });

    if (tasksUpdated) {
        await kv.set(`user:${user.id}:tasks`, tasks);
    }

    const activeSprint = await kv.get(`user:${user.id}:activeSprint`);

    const newEntry = {
      id: `entry-${Date.now()}`,
      userId: user.id,
      taskId,
      sprintId: activeSprint ? activeSprint.id : null,
      startTime: now,
      endTime: null,
      priorityLevel: task.priorityLevel, // Snapshot for color
    };
    
    entries.push(newEntry);
    await kv.set(`user:${user.id}:timeEntries`, entries);
    
    // We also update the legacy 'activeTimer' key for backward compatibility 
    // or simple "is running" checks, though the source of truth is now timeEntries.
    await kv.set(`user:${user.id}:activeTimer`, {
      taskId,
      isRunning: true,
      startedAt: now,
      elapsedTime: task.spentTime || 0,
    });
    
    return c.json({ success: true, data: newEntry });
  } catch (error) {
    console.log(`Start timer error: ${error}`);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Pause timer
app.post('/make-server-9fa24130/timer/pause', async (c) => {
  const user = await getAuthenticatedUser(c.req.raw);
  if (!user) return c.json({ success: false, error: 'Unauthorized' }, 401);
  
  try {
    const entries = await kv.get(`user:${user.id}:timeEntries`) || [];
    const activeEntry = entries.find((e: any) => !e.endTime);
    
    if (!activeEntry) {
      return c.json({ success: false, error: 'No active timer' }, 400);
    }

    const now = new Date();
    const endTime = now.toISOString();
    activeEntry.endTime = endTime;
    
    // Calculate duration in seconds
    const duration = Math.floor((now.getTime() - new Date(activeEntry.startTime).getTime()) / 1000);

    // Update task spent time
    const tasks = await kv.get(`user:${user.id}:tasks`) || [];
    const taskIndex = tasks.findIndex((t: any) => t.id === activeEntry.taskId);
    
    if (taskIndex !== -1) {
      tasks[taskIndex].spentTime = (tasks[taskIndex].spentTime || 0) + duration;
      await kv.set(`user:${user.id}:tasks`, tasks);
    }
    
    await kv.set(`user:${user.id}:timeEntries`, entries);
    
    // Clear legacy active timer
    await kv.set(`user:${user.id}:activeTimer`, {
      taskId: null,
      isRunning: false,
      startedAt: null,
      elapsedTime: 0,
    });
    
    return c.json({ success: true, data: activeEntry });
  } catch (error) {
    console.log(`Pause timer error: ${error}`);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Stop/Complete timer
app.post('/make-server-9fa24130/timer/stop', async (c) => {
  const user = await getAuthenticatedUser(c.req.raw);
  if (!user) return c.json({ success: false, error: 'Unauthorized' }, 401);
  
  try {
    // 1. Close the TimeEntry
    const entries = await kv.get(`user:${user.id}:timeEntries`) || [];
    const activeEntry = entries.find((e: any) => !e.endTime);
    
    let duration = 0;
    let taskId = null;

    if (activeEntry) {
        const now = new Date();
        activeEntry.endTime = now.toISOString();
        duration = Math.floor((now.getTime() - new Date(activeEntry.startTime).getTime()) / 1000);
        taskId = activeEntry.taskId;
        await kv.set(`user:${user.id}:timeEntries`, entries);
    } else {
        // If no active entry, maybe user just clicked "Done" without timer running?
        // Need taskId from body in that case? 
        // For now, assume we stop the RUNNING timer.
        // If the user wants to complete a task that isn't running, they likely use the checkbox in the card.
        // But the prompt says "STOP / Done" button in the timer column.
        return c.json({ success: false, error: 'No active timer to stop' }, 400);
    }

    // 2. Update Task (spentTime + isDone)
    const tasks = await kv.get(`user:${user.id}:tasks`) || [];
    const taskIndex = tasks.findIndex((t: any) => t.id === taskId);
    
    if (taskIndex !== -1) {
      const task = tasks[taskIndex];
      task.spentTime = (task.spentTime || 0) + duration;
      task.isDone = true;
      task.completedAt = new Date().toISOString();
      task.priorityLevel = null; // Remove from priority list
      task.sprintId = null; // Or keep it in sprint history? Usually completed tasks stay in sprint until sprint ends.
      // Prompt says "Task marked as done".
      // Usually we keep sprintId so we can calc total sprint time.
      
      await kv.set(`user:${user.id}:tasks`, tasks);
      
      // Update hook task count
      if (task.hookId) {
        const hooks = await kv.get(`user:${user.id}:hooks`) || [];
        const hookIndex = hooks.findIndex((h: any) => h.id === task.hookId);
        if (hookIndex !== -1) {
          // Assuming taskCount tracks active tasks? Or all? 
          // Usually active.
           hooks[hookIndex].taskCount = Math.max(0, hooks[hookIndex].taskCount - 1);
           await kv.set(`user:${user.id}:hooks`, hooks);
        }
      }
    }

    // 3. Clear legacy active timer
    await kv.set(`user:${user.id}:activeTimer`, {
      taskId: null,
      isRunning: false,
      startedAt: null,
      elapsedTime: 0,
    });
    
    return c.json({ success: true });
  } catch (error) {
    console.log(`Stop timer error: ${error}`);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ============================================
// SPRINT ROUTES
// ============================================

// Get active sprint
app.get('/make-server-9fa24130/sprint/active', async (c) => {
  const user = await getAuthenticatedUser(c.req.raw);
  if (!user) {
    return c.json({ success: false, error: 'Unauthorized' }, 401);
  }
  
  try {
    const activeSprint = await kv.get(`user:${user.id}:activeSprint`);
    return c.json({ success: true, data: activeSprint });
  } catch (error) {
    console.log(`Get active sprint error: ${error}`);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Get sprint history
app.get('/make-server-9fa24130/sprint/history', async (c) => {
  const user = await getAuthenticatedUser(c.req.raw);
  if (!user) {
    return c.json({ success: false, error: 'Unauthorized' }, 401);
  }
  
  try {
    const sprints = await kv.get(`user:${user.id}:sprints`) || [];
    return c.json({ success: true, data: sprints });
  } catch (error) {
    console.log(`Get sprint history error: ${error}`);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

Deno.serve(app.fetch);
