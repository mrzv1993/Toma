import { httpClient } from '../utils/httpClient';
import { Hook } from '../types';

export const HookRepository = {
  async getAll() {
    return httpClient.request<Hook[]>('/hooks');
  },

  async create(title: string, groupId?: string, personId?: string) {
    return httpClient.request<Hook>('/hooks', {
      method: 'POST',
      body: JSON.stringify({ title, groupId, personId }),
    });
  },

  async update(id: string, updates: Partial<Hook>) {
    return httpClient.request<Hook>(`/hooks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },

  async delete(id: string) {
    return httpClient.request<void>(`/hooks/${id}`, {
      method: 'DELETE',
    });
  }
};
