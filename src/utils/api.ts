import { projectId, publicAnonKey } from './supabase/info';

const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-9fa24130`;

class ApiClient {
  private accessToken: string | null = null;

  setAccessToken(token: string | null) {
    this.accessToken = token;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit & { retries?: number } = {}
  ): Promise<T> {
    const { retries = 3, ...fetchOptions } = options;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.accessToken || publicAnonKey}`,
      ...options.headers,
    };

    let lastError: any;

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
          ...fetchOptions,
          headers,
        });

        let data;
        const contentType = response.headers.get('content-type');
        
        try {
          if (contentType && contentType.includes('application/json')) {
            data = await response.json();
          } else {
            const text = await response.text();
            try {
               data = JSON.parse(text);
            } catch {
               if (!response.ok) {
                   // If 4xx (except 429), treat as client error and do not retry
                   if (response.status >= 400 && response.status < 500 && response.status !== 429) {
                       throw new Error(text || response.statusText);
                   }
                   // 5xx or 429 or other -> Throw to retry
                   throw new Error(text || response.statusText);
               }
               throw new Error('Invalid JSON response');
            }
          }
        } catch (parseError: any) {
           // If parsing failed, check status to decide on retry
           if (response.status >= 400 && response.status < 500 && response.status !== 429) {
               // Client error, unlikely to succeed on retry unless transient
               // But usually client error returns JSON. If text, maybe 404 page.
               // Throw to loop (and then check error type? No, checking below)
           }
           throw new Error(parseError.message || 'Failed to parse server response');
        }

        if (!response.ok) {
           if (response.status >= 400 && response.status < 500 && response.status !== 429) {
               const error = new Error(data.error || 'Request failed');
               (error as any).isClientError = true;
               throw error;
           }
           throw new Error(data.error || `Request failed with status ${response.status}`);
        }

        return data;
      } catch (error: any) {
        if (error.isClientError) {
            throw error;
        }
        
        lastError = error;
        if (attempt === retries) break;

        // Exponential backoff: 500, 1000, 2000 ms
        const delay = 500 * Math.pow(2, attempt);
        
        if (attempt === 0 && (error.message === 'Failed to fetch' || error.message.includes('NetworkError') || error.message.includes('Network connection lost'))) {
             // Less scary log for first failed fetch (common on cold start)
             console.log(`API [${endpoint}] cold start or network glitch. Retrying in ${delay}ms...`);
        } else {
             console.warn(`API Request Failed [${endpoint}]. Retrying in ${delay}ms...`, error);
        }
        
        await new Promise(r => setTimeout(r, delay));
      }
    }

    console.error(`API Request Error [${endpoint}] after ${retries + 1} attempts:`, lastError);
    throw lastError;
  }

  // Auth
  async signUp(email: string, password: string) {
    return this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  // Hook Groups
  async getHookGroups() {
    return this.request('/hook-groups');
  }

  async createHookGroup(title: string, type: 'standard' | 'people' = 'standard') {
    return this.request('/hook-groups', {
      method: 'POST',
      body: JSON.stringify({ title, type }),
    });
  }

  async updateHookGroup(id: string, updates: any) {
    return this.request(`/hook-groups/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async deleteHookGroup(id: string) {
    return this.request(`/hook-groups/${id}`, {
      method: 'DELETE',
    });
  }

  // Hooks
  async getHooks() {
    return this.request('/hooks');
  }

  async createHook(title: string, groupId?: string, personId?: string) {
    return this.request('/hooks', {
      method: 'POST',
      body: JSON.stringify({ title, groupId, personId }),
    });
  }

  async updateHook(id: string, updates: any) {
    return this.request(`/hooks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async deleteHook(id: string) {
    return this.request(`/hooks/${id}`, {
      method: 'DELETE',
    });
  }

  // People
  async getPeople() {
    return this.request('/people');
  }

  async createPerson(firstName: string, lastName?: string, avatarUrl?: string, color?: string) {
    return this.request('/people', {
      method: 'POST',
      body: JSON.stringify({ firstName, lastName, avatarUrl, color }),
    });
  }

  async updatePerson(id: string, updates: any) {
    return this.request(`/people/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async deletePerson(id: string) {
    return this.request(`/people/${id}`, {
      method: 'DELETE',
    });
  }

  // Categories
  async getCategories() {
    return this.request('/categories');
  }

  async createCategory(title: string, type: 'standard' | 'event' = 'standard') {
    return this.request('/categories', {
      method: 'POST',
      body: JSON.stringify({ title, type }),
    });
  }

  async deleteCategory(id: string) {
    return this.request(`/categories/${id}`, {
      method: 'DELETE',
    });
  }

  // Tasks
  async getTasks() {
    return this.request('/tasks');
  }

  async createTask(title: string, hookId?: string | null, categoryId?: string) {
    return this.request('/tasks', {
      method: 'POST',
      body: JSON.stringify({ title, hookId, categoryId }),
    });
  }

  async updateTask(id: string, updates: any) {
    return this.request(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async moveTaskToSprint(id: string, priorityLevel: number) {
    return this.request(`/tasks/${id}/move-to-sprint`, {
      method: 'POST',
      body: JSON.stringify({ priorityLevel }),
    });
  }

  async moveTaskToInbox(id: string) {
    return this.request(`/tasks/${id}/move-to-inbox`, {
      method: 'POST',
    });
  }

  async completeTask(id: string) {
    return this.request(`/tasks/${id}/complete`, {
      method: 'POST',
    });
  }

  async deleteTask(id: string) {
    return this.request(`/tasks/${id}`, {
      method: 'DELETE',
    });
  }

  // Time Entries
  async getTimeEntries() {
    return this.request('/time-entries');
  }

  // Timer
  async getTimer() {
    return this.request('/timer');
  }

  async startTimer(taskId: string) {
    return this.request('/timer/start', {
      method: 'POST',
      body: JSON.stringify({ taskId }),
    });
  }

  async pauseTimer(elapsedTime: number) {
    return this.request('/timer/pause', {
      method: 'POST',
      body: JSON.stringify({ elapsedTime }),
    });
  }

  async stopTimer(elapsedTime: number) {
    return this.request('/timer/stop', {
      method: 'POST',
      body: JSON.stringify({ elapsedTime }),
    });
  }

  // Sprint
  async getActiveSprint() {
    return this.request('/sprint/active');
  }

  async getSprintHistory() {
    return this.request('/sprint/history');
  }

  async startSprint() {
    return this.request('/sprint/start', {
        method: 'POST'
    });
  }

  async completeSprint(journalData: {
    mostImportant?: string;
    good?: string;
    better?: string;
    distractions?: string;
    insight?: string;
  }) {
    return this.request('/sprint/complete', {
        method: 'POST',
        body: JSON.stringify({ journal: journalData })
    });
  }

  async resetActiveSprintTimes() {
    return this.request('/admin/reset-active-sprint-times', {
        method: 'POST'
    });
  }
}

export const api = new ApiClient();
