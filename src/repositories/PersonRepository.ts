import { httpClient } from '../utils/httpClient';

export const PersonRepository = {
  async getAll() {
    return httpClient.request('/people');
  },

  async create(firstName: string, lastName?: string, avatarUrl?: string, color?: string) {
    return httpClient.request('/people', {
      method: 'POST',
      body: JSON.stringify({ firstName, lastName, avatarUrl, color }),
    });
  },

  async update(id: string, updates: any) {
    return httpClient.request(`/people/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },

  async delete(id: string) {
    return httpClient.request(`/people/${id}`, {
      method: 'DELETE',
    });
  }
};
