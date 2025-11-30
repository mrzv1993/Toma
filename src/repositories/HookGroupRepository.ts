import { httpClient } from '../utils/httpClient';

export const HookGroupRepository = {
  async getAll() {
    return httpClient.request('/hook-groups');
  },

  async create(title: string, type: 'standard' | 'people' = 'standard') {
    return httpClient.request('/hook-groups', {
      method: 'POST',
      body: JSON.stringify({ title, type }),
    });
  },

  async update(id: string, updates: any) {
    return httpClient.request(`/hook-groups/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },

  async delete(id: string) {
    return httpClient.request(`/hook-groups/${id}`, {
      method: 'DELETE',
    });
  }
};
