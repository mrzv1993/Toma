import { httpClient } from '../utils/httpClient';
import { Task } from '../types';

export const TaskRepository = {
  async getAll() {
    return httpClient.request<Task[]>('/tasks');
  },

  async create(title: string, hookId?: string | null, categoryId?: string) {
    return httpClient.request<Task>('/tasks', {
      method: 'POST',
      body: JSON.stringify({ title, hookId, categoryId }),
    });
  },

  async update(id: string, updates: Partial<Task>) {
    return httpClient.request<Task>(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },

  async moveToSprint(id: string, priorityLevel: number) {
    return httpClient.request<Task>(`/tasks/${id}/move-to-sprint`, {
      method: 'POST',
      body: JSON.stringify({ priorityLevel }),
    });
  },

  async moveToInbox(id: string) {
    return httpClient.request(`/tasks/${id}/move-to-inbox`, {
      method: 'POST',
    });
  },

  async complete(id: string) {
    return httpClient.request(`/tasks/${id}/complete`, {
      method: 'POST',
    });
  },

  async delete(id: string) {
    return httpClient.request(`/tasks/${id}`, {
      method: 'DELETE',
    });
  }
};
