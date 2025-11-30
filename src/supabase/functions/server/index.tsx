import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import { createClient } from 'jsr:@supabase/supabase-js@2';
import * as kv from './kv_store.tsx';

const SPRINT_DURATION_SECONDS = 9 * 60 * 60;

const app = new Hono();

app.get('/make-server-9fa24130/health', (c) => c.json({ status: 'ok' }));

app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));
app.use('*', logger(console.log));

let globalSupabaseClient: any = null;

function getSupabase() {
  if (!globalSupabaseClient) {
    const url = Deno.env.get('SUPABASE_URL');
    const key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    if (!url || !key) {
      console.error('Missing Supabase environment variables');
      throw new Error('Missing Supabase environment variables');
    }
    globalSupabaseClient = createClient(url, key);
  }
  return globalSupabaseClient;
}

// Helper function to get authenticated user
async function getAuthenticatedUser(request: Request) {
  try {
    const accessToken = request.headers.get('Authorization')?.split(' ')[1];
    if (!accessToken) {
      return null;
    }
    
    let supabase = getSupabase();
    let result;
    
    try {
      result = await supabase.auth.getUser(accessToken);
    } catch (netError) {
      console.log(`Network error with Supabase client: ${netError}. Retrying with new client...`);
      globalSupabaseClient = null;
      supabase = getSupabase();
      result = await supabase.auth.getUser(accessToken);
    }

    const { data: { user }, error } = result;
    if (error) {
      console.log(`Auth error: ${error.message}`);
      return null;
    }
    if (!user) {
      console.log('Auth error: No user found');
      return null;
    }
    
    return user;
  } catch (error) {
    console.log(`getAuthenticatedUser internal error: ${error}`);
    return null;
  }
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
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

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
    await kv.set(`user:${userId}:people`, []); // Initialize people
    await kv.set(`user:${userId}:tasks`, []);
    await kv.set(`user:${userId}:sprintHistory`, []);
    
    // Create first sprint
    const firstSprint = {
      id: `sprint-${Date.now()}`,
      userId,
      number: 1,
      createdAt: new Date().toISOString(),
      completedAt: null,
      totalTime: 0,
      isCompleted: false,
      startedAt: null,
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
    const { title, type } = await c.req.json();
    
    const hookGroups = await kv.get(`user:${user.id}:hookGroups`) || [];
    const newGroup = {
      id: `group-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title,
      type: type || 'standard',
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

// Update hook group
app.put('/make-server-9fa24130/hook-groups/:id', async (c) => {
  const user = await getAuthenticatedUser(c.req.raw);
  if (!user) {
    return c.json({ success: false, error: 'Unauthorized' }, 401);
  }
  
  try {
    const groupId = c.req.param('id');
    const updates = await c.req.json();
    
    const hookGroups = await kv.get(`user:${user.id}:hookGroups`) || [];
    const groupIndex = hookGroups.findIndex((g: any) => g.id === groupId);
    
    if (groupIndex === -1) {
      return c.json({ success: false, error: 'Hook group not found' }, 404);
    }
    
    hookGroups[groupIndex] = {
      ...hookGroups[groupIndex],
      ...updates,
    };
    
    await kv.set(`user:${user.id}:hookGroups`, hookGroups);
    
    return c.json({ success: true, data: hookGroups[groupIndex] });
  } catch (error) {
    console.log(`Update hook group error: ${error}`);
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
    const { title, groupId, personId } = await c.req.json();
    
    const hooks = await kv.get(`user:${user.id}:hooks`) || [];
    const newHook = {
      id: `hook-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title,
      groupId: groupId || 'default',
      personId: personId || null,
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
    const { title, type } = await c.req.json();
    
    const categories = await kv.get(`user:${user.id}:categories`) || [];
    const newCategory = {
      id: `cat-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title,
      type: type || 'standard',
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
// PEOPLE ROUTES
// ============================================

// Get all people
app.get('/make-server-9fa24130/people', async (c) => {
  const user = await getAuthenticatedUser(c.req.raw);
  if (!user) {
    return c.json({ success: false, error: 'Unauthorized' }, 401);
  }
  
  try {
    const people = await kv.get(`user:${user.id}:people`) || [];
    return c.json({ success: true, data: people });
  } catch (error) {
    console.log(`Get people error: ${error}`);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Create person
app.post('/make-server-9fa24130/people', async (c) => {
  const user = await getAuthenticatedUser(c.req.raw);
  if (!user) {
    return c.json({ success: false, error: 'Unauthorized' }, 401);
  }
  
  try {
    const { firstName, lastName, avatarUrl, color } = await c.req.json();
    
    if (!firstName) {
      return c.json({ success: false, error: 'First name is required' }, 400);
    }

    const people = await kv.get(`user:${user.id}:people`) || [];
    const newPerson = {
      id: `person-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      userId: user.id,
      firstName,
      lastName: lastName || null,
      avatarUrl: avatarUrl || null,
      color: color || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    people.push(newPerson);
    await kv.set(`user:${user.id}:people`, people);
    
    return c.json({ success: true, data: newPerson });
  } catch (error) {
    console.log(`Create person error: ${error}`);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Update person
app.put('/make-server-9fa24130/people/:id', async (c) => {
  const user = await getAuthenticatedUser(c.req.raw);
  if (!user) {
    return c.json({ success: false, error: 'Unauthorized' }, 401);
  }
  
  try {
    const personId = c.req.param('id');
    const updates = await c.req.json();
    
    const people = await kv.get(`user:${user.id}:people`) || [];
    const personIndex = people.findIndex((p: any) => p.id === personId);
    
    if (personIndex === -1) {
      return c.json({ success: false, error: 'Person not found' }, 404);
    }
    
    people[personIndex] = {
      ...people[personIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    await kv.set(`user:${user.id}:people`, people);
    
    return c.json({ success: true, data: people[personIndex] });
  } catch (error) {
    console.log(`Update person error: ${error}`);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Delete person
app.delete('/make-server-9fa24130/people/:id', async (c) => {
  const user = await getAuthenticatedUser(c.req.raw);
  if (!user) {
    return c.json({ success: false, error: 'Unauthorized' }, 401);
  }
  
  try {
    const personId = c.req.param('id');
    
    const people = await kv.get(`user:${user.id}:people`) || [];
    const filteredPeople = people.filter((p: any) => p.id !== personId);
    
    await kv.set(`user:${user.id}:people`, filteredPeople);
    
    // Remove person from all tasks
    const tasks = await kv.get(`user:${user.id}:tasks`) || [];
    let tasksUpdated = false;
    const updatedTasks = tasks.map((task: any) => {
      if (task.assignedPeopleIds && task.assignedPeopleIds.includes(personId)) {
        tasksUpdated = true;
        return {
          ...task,
          assignedPeopleIds: task.assignedPeopleIds.filter((id: string) => id !== personId),
        };
      }
      return task;
    });
    
    if (tasksUpdated) {
      await kv.set(`user:${user.id}:tasks`, updatedTasks);
    }
    
    return c.json({ success: true });
  } catch (error) {
    console.log(`Delete person error: ${error}`);
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
    const { title, hookId, categoryId, assignedPeopleIds } = await c.req.json();
    
    const tasks = await kv.get(`user:${user.id}:tasks`) || [];
    const newTask = {
      id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title,
      hookId: hookId || null,
      categoryId: categoryId || 'default',
      assignedPeopleIds: assignedPeopleIds || [],
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

    // Sanitize maxAllowedTime
    if (updates.maxAllowedTime !== undefined) {
       if (updates.maxAllowedTime !== null && updates.maxAllowedTime <= 0) {
           updates.maxAllowedTime = null;
       }
    }
    
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

    // Handle Recurrence
    const completedTask = tasks[taskIndex];
    if (completedTask.recurrence) {
      const r = completedTask.recurrence;
      
      // Determine baseline date
      let baselineDate = new Date();
      if (r.type !== 'after_completion' && completedTask.plannedStartTime) {
        baselineDate = new Date(completedTask.plannedStartTime);
      }
      
      // Calculate next date
      const nextDate = new Date(baselineDate);
      let shouldCreate = true;
      
      switch (r.type) {
        case 'daily':
          nextDate.setDate(nextDate.getDate() + (r.interval || 1));
          break;
        case 'weekly':
          nextDate.setDate(nextDate.getDate() + ((r.interval || 1) * 7));
          break;
        case 'monthly':
          nextDate.setMonth(nextDate.getMonth() + (r.interval || 1));
          break;
        case 'yearly':
          nextDate.setFullYear(nextDate.getFullYear() + (r.interval || 1));
          break;
        case 'after_completion':
          nextDate.setDate(nextDate.getDate() + (r.interval || 1));
          break;
      }
      
      // Check end conditions
      if (r.endDateMode === 'date' && r.endDate) {
         if (nextDate.getTime() > new Date(r.endDate).getTime()) shouldCreate = false;
      }
      
      let nextRecurrence = { ...r };
      if (r.endDateMode === 'after' && typeof r.endAfterOccurrences === 'number') {
         if (r.endAfterOccurrences <= 1) shouldCreate = false;
         else nextRecurrence.endAfterOccurrences = r.endAfterOccurrences - 1;
      }
      
      if (shouldCreate) {
         // Calculate duration
         let duration = 60 * 60 * 1000; // 1 hour default
         if (completedTask.plannedStartTime && completedTask.plannedEndTime) {
             duration = new Date(completedTask.plannedEndTime).getTime() - new Date(completedTask.plannedStartTime).getTime();
         }
         
         const nextStartTime = nextDate.toISOString();
         const nextEndTime = new Date(nextDate.getTime() + duration).toISOString();
         
         const newTask = {
            ...completedTask,
            id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            isDone: false,
            spentTime: 0,
            archivedTime: 0,
            sprintId: null, // Move to inbox/queue
            priorityLevel: null,
            priorityPosition: null,
            history: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            plannedStartTime: nextStartTime,
            plannedEndTime: nextEndTime,
            recurrence: nextRecurrence
         };
         
         tasks.push(newTask);
         await kv.set(`user:${user.id}:tasks`, tasks);
         
         // Update hook count
         if (newTask.hookId) {
             const hooks = await kv.get(`user:${user.id}:hooks`) || [];
             const hookIndex = hooks.findIndex((h: any) => h.id === newTask.hookId);
             if (hookIndex !== -1) {
                 hooks[hookIndex].taskCount += 1;
                 await kv.set(`user:${user.id}:hooks`, hooks);
             }
         }
      }
    }
    
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
    
    const activeSprint = await kv.get(`user:${user.id}:activeSprint`);
    const now = new Date().toISOString();

    // ==========================================
    // Validation: Min/Max Time Checks
    // ==========================================
    if (activeSprint && activeSprint.startedAt && !activeSprint.isCompleted) {
        const sprintDuration = SPRINT_DURATION_SECONDS;
        
        // Calculate TRUE sprint elapsed time: sum of spentTime for all sprint tasks (ignore archivedTime from previous sprints)
        const sprintTasks = tasks.filter((t: any) => t.sprintId === activeSprint.id);
        const sprintElapsed = sprintTasks.reduce((sum: number, t: any) => sum + (t.spentTime || 0), 0);
        
        const sprintRemaining = Math.max(0, sprintDuration - sprintElapsed);
        
        // 1. Check Max Allowed Time
        if (typeof task.maxAllowedTime === 'number' && task.maxAllowedTime > 0) {
            const maxSeconds = task.maxAllowedTime * 60;
            const spent = (task.spentTime || 0); // Only count time in CURRENT sprint
            if (spent >= maxSeconds) {
                const spentMinutes = Math.floor(spent / 60);
                return c.json({ 
                    success: false, 
                    error: `Лимит времени на задачу исчерпан. (Лимит: ${task.maxAllowedTime} мин, Затрачено в этом спринте: ${spentMinutes} мин)` 
                }, 400);
            }
        }

        // 2. Check Min Required Time Rule
        const unfinishedTasks = tasks.filter((t: any) => t.sprintId === activeSprint.id && !t.isDone);
        const totalMinTimeRequired = unfinishedTasks.reduce((sum: number, t: any) => sum + (t.minRequiredTime || 0), 0) * 60;
        
        if (sprintRemaining <= totalMinTimeRequired) {
            // We are in "Crunch Mode"
            if (!task.minRequiredTime) {
                return c.json({ 
                    success: false, 
                    error: 'Недостаточно времени. Сначала завершите задачи с минимальным временем.' 
                }, 400);
            }
        }
    }
    
    const entries = await kv.get(`user:${user.id}:timeEntries`) || [];
    
    // Safety: Close any currently running entries
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

// Start sprint
app.post('/make-server-9fa24130/sprint/start', async (c) => {
  const user = await getAuthenticatedUser(c.req.raw);
  if (!user) return c.json({ success: false, error: 'Unauthorized' }, 401);
  
  try {
    const activeSprint = await kv.get(`user:${user.id}:activeSprint`);
    if (!activeSprint) {
        return c.json({ success: false, error: 'No active sprint' }, 400);
    }
    
    if (activeSprint.startedAt) {
        return c.json({ success: false, error: 'Sprint already started' }, 400);
    }

    const startedSprint = {
        ...activeSprint,
        startedAt: new Date().toISOString(),
    };
    
    await kv.set(`user:${user.id}:activeSprint`, startedSprint);
    
    return c.json({ success: true, data: startedSprint });
  } catch (error) {
    console.log(`Start sprint error: ${error}`);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Complete sprint (with journal)
app.post('/make-server-9fa24130/sprint/complete', async (c) => {
  const user = await getAuthenticatedUser(c.req.raw);
  if (!user) return c.json({ success: false, error: 'Unauthorized' }, 401);
  
  try {
    const { journal } = await c.req.json();
    const now = new Date().toISOString();

    // 1. Get active sprint
    const activeSprint = await kv.get(`user:${user.id}:activeSprint`);
    if (!activeSprint) {
        return c.json({ success: false, error: 'No active sprint' }, 400);
    }

    // 2. Mark old sprint as completed
    const completedSprint = {
        ...activeSprint,
        isCompleted: true,
        completedAt: now,
    };
    
    // 3. Save journal
    if (journal) {
        const journalEntry = {
            id: `journal-${Date.now()}`,
            userId: user.id,
            sprintId: completedSprint.id,
            ...journal,
            createdAt: now
        };
        // We can store journals in a separate list or map
        const journals = await kv.get(`user:${user.id}:journals`) || [];
        journals.push(journalEntry);
        await kv.set(`user:${user.id}:journals`, journals);
    }

    // 4. Add to history
    const history = await kv.get(`user:${user.id}:sprintHistory`) || [];
    // Update task snapshots for history if needed (the current implementation stores tasks in the sprint object in history? 
    // No, the frontend reconstructs it. But 'sprintHistory' endpoint returns sprints.
    // Let's see how getSprintHistory works. It likely just returns the list of sprint objects.
    // We should probably attach the current state of tasks to the sprint object for historical snapshot?
    // The current KV structure keeps tasks separate.
    // If we want a snapshot, we should query tasks now.
    const allTasks = await kv.get(`user:${user.id}:tasks`) || [];
    const sprintTasks = allTasks.filter((t: any) => t.sprintId === activeSprint.id);
    
    // Attach tasks snapshot to history sprint object so we don't lose them if we change task sprintId
    completedSprint.tasks = sprintTasks; 
    
    history.push(completedSprint);
    await kv.set(`user:${user.id}:sprintHistory`, history);

    // 5. Create new sprint
    const newSprint = {
        id: `sprint-${Date.now()}`,
        userId: user.id,
        number: (activeSprint.number || 0) + 1,
        createdAt: now,
        completedAt: null,
        totalTime: 0,
        isCompleted: false,
        startedAt: null,
        tasks: [], // This is just for structure, tasks are stored separately
    };
    await kv.set(`user:${user.id}:activeSprint`, newSprint);

    // 6. Move unfinished tasks
    const unfinishedTasks = sprintTasks.filter((t: any) => !t.isDone);
    let tasksUpdated = false;
    
    const updatedAllTasks = allTasks.map((t: any) => {
        if (t.sprintId === activeSprint.id && !t.isDone) {
            tasksUpdated = true;
            return {
                ...t,
                sprintId: newSprint.id,
                archivedTime: (t.archivedTime || 0) + (t.spentTime || 0),
                spentTime: 0,
                // Keep priority level and position
                updatedAt: now
            };
        }
        return t;
    });

    if (tasksUpdated) {
        await kv.set(`user:${user.id}:tasks`, updatedAllTasks);
    }

    // 7. Stop any running timer
    const timer = await kv.get(`user:${user.id}:activeTimer`);
    if (timer && timer.isRunning) {
        await kv.set(`user:${user.id}:activeTimer`, {
            taskId: null,
            isRunning: false,
            startedAt: null,
            elapsedTime: 0,
        });
    }

    return c.json({ success: true, data: newSprint });
  } catch (error) {
    console.log(`Complete sprint error: ${error}`);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

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
    const sprints = await kv.get(`user:${user.id}:sprintHistory`) || [];
    const journals = await kv.get(`user:${user.id}:journals`) || [];

    const sprintsWithJournals = sprints.map((sprint: any) => {
      const journal = journals.find((j: any) => j.sprintId === sprint.id);
      return { ...sprint, journal };
    });

    return c.json({ success: true, data: sprintsWithJournals });
  } catch (error) {
    console.log(`Get sprint history error: ${error}`);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Admin: Reset active sprint times
app.post('/make-server-9fa24130/admin/reset-active-sprint-times', async (c) => {
  const user = await getAuthenticatedUser(c.req.raw);
  if (!user) {
    return c.json({ success: false, error: 'Unauthorized' }, 401);
  }
  
  try {
    const activeSprint = await kv.get(`user:${user.id}:activeSprint`);
    if (!activeSprint) {
      return c.json({ success: false, error: 'No active sprint' }, 400);
    }

    const tasks = await kv.get(`user:${user.id}:tasks`) || [];
    let tasksUpdated = false;
    
    const updatedTasks = tasks.map((t: any) => {
      if (t.sprintId === activeSprint.id && (t.spentTime || 0) > 0) {
        tasksUpdated = true;
        return {
          ...t,
          archivedTime: (t.archivedTime || 0) + (t.spentTime || 0),
          spentTime: 0,
          updatedAt: new Date().toISOString()
        };
      }
      return t;
    });

    if (tasksUpdated) {
      await kv.set(`user:${user.id}:tasks`, updatedTasks);
    }

    // Stop active timer
    const timer = await kv.get(`user:${user.id}:activeTimer`);
    if (timer && timer.isRunning) {
        await kv.set(`user:${user.id}:activeTimer`, {
            taskId: null,
            isRunning: false,
            startedAt: null,
            elapsedTime: 0,
        });
    }

    return c.json({ success: true, message: 'Active sprint task times reset' });
  } catch (error) {
    console.log(`Reset active sprint times error: ${error}`);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ============================================
// TELEGRAM ROUTES
// ============================================

const TELEGRAM_BOT_TOKEN = Deno.env.get('TELEGRAM_BOT_TOKEN');

// Generate connect link
app.post('/make-server-9fa24130/telegram/connect', async (c) => {
  const user = await getAuthenticatedUser(c.req.raw);
  if (!user) return c.json({ success: false, error: 'Unauthorized' }, 401);

  if (!TELEGRAM_BOT_TOKEN) {
      return c.json({ success: false, error: 'Telegram bot not configured' }, 500);
  }

  try {
      // Ensure Webhook is set (idempotent-ish)
      const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
      // Regex to extract project ID from https://<project_ref>.supabase.co
      const projectIdMatch = supabaseUrl.match(/https:\/\/(.*?)\.supabase\.co/);
      const projectId = projectIdMatch ? projectIdMatch[1] : null;
      
      if (projectId) {
           const webhookUrl = `https://${projectId}.supabase.co/functions/v1/make-server-9fa24130/telegram/webhook`;
           // Set webhook
           await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/setWebhook?url=${webhookUrl}`);
      }

      const token = crypto.randomUUID();
      // Store token -> userId mapping
      await kv.set(`telegram_token:${token}`, { userId: user.id, createdAt: Date.now() });

      const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getMe`);
      const data = await response.json();
      
      if (!data.ok) {
           return c.json({ success: false, error: 'Failed to get bot info' }, 500);
      }
      
      const botUsername = data.result.username;
      const link = `https://t.me/${botUsername}?start=${token}`;
      
      return c.json({ success: true, data: { link } });
  } catch (error) {
      return c.json({ success: false, error: String(error) }, 500);
  }
});

// Get connection status
app.get('/make-server-9fa24130/telegram/status', async (c) => {
    const user = await getAuthenticatedUser(c.req.raw);
    if (!user) return c.json({ success: false, error: 'Unauthorized' }, 401);

    try {
        const telegramData = await kv.get(`user:${user.id}:telegram`);
        return c.json({ success: true, data: { connected: !!telegramData, ...telegramData } });
    } catch (error) {
        return c.json({ success: false, error: String(error) }, 500);
    }
});

// Disconnect
app.post('/make-server-9fa24130/telegram/disconnect', async (c) => {
    const user = await getAuthenticatedUser(c.req.raw);
    if (!user) return c.json({ success: false, error: 'Unauthorized' }, 401);

    try {
        const telegramData = await kv.get(`user:${user.id}:telegram`);
        if (telegramData) {
            await kv.del(`user:${user.id}:telegram`);
            await kv.del(`telegram_chat:${telegramData.chatId}`);
        }
        return c.json({ success: true });
    } catch (error) {
        return c.json({ success: false, error: String(error) }, 500);
    }
});

// Webhook
app.post('/make-server-9fa24130/telegram/webhook', async (c) => {
    if (!TELEGRAM_BOT_TOKEN) return c.json({ error: 'No token' }, 500);

    try {
        const update = await c.req.json();
        
        if (update.message && update.message.text) {
            const chatId = update.message.chat.id;
            const text = update.message.text;
            const username = update.message.from.username || update.message.from.first_name;

            // Check for /start command
            if (text.startsWith('/start ')) {
                const token = text.split(' ')[1];
                if (token) {
                    const tokenData = await kv.get(`telegram_token:${token}`);
                    if (tokenData && tokenData.userId) {
                        // Link user
                        await kv.set(`user:${tokenData.userId}:telegram`, { chatId, username });
                        await kv.set(`telegram_chat:${chatId}`, tokenData.userId);
                        
                        // Cleanup token
                        await kv.del(`telegram_token:${token}`);
                        
                        // Send welcome message
                        await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                chat_id: chatId,
                                text: '✅ Вы усп��шно подключены к Toma! Теперь все ваши сообщения будут попадать во "Входящие".'
                            })
                        });
                        return c.json({ success: true });
                    }
                }
            } 
            
            // Check if user is linked
            const userId = await kv.get(`telegram_chat:${chatId}`);
            if (userId) {
                // Create task in Inbox
                const tasks = await kv.get(`user:${userId}:tasks`) || [];
                const newTask = {
                    id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                    title: text, 
                    hookId: null,
                    categoryId: 'default',
                    assignedPeopleIds: [],
                    spentTime: 0,
                    isDone: false,
                    sprintId: null,
                    priorityLevel: null,
                    priorityPosition: null,
                    userId: userId,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    history: [],
                };
                
                tasks.push(newTask);
                await kv.set(`user:${userId}:tasks`, tasks);
                
                // Send confirmation
                await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        chat_id: chatId,
                        text: 'Добавил задачу'
                    })
                });
            } else if (!text.startsWith('/start')) {
                 await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        chat_id: chatId,
                        text: '⚠️ Вы не подключены. Зайдите в настройки профиля Toma и подключите Telegram.'
                    })
                });
            }
        }
        
        return c.json({ success: true });
    } catch (error) {
        console.log('Telegram webhook error:', error);
        return c.json({ success: false, error: String(error) }, 500);
    }
});

Deno.serve(app.fetch);
