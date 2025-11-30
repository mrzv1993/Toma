import { httpClient } from '../utils/httpClient';

export const CategoryRepository = {
  async getAll() {
    return httpClient.request('/categories');
  },

  async create(title: string, type: 'standard' | 'event' = 'standard') {
    return httpClient.request('/categories', {
      method: 'POST',
      body: JSON.stringify({ title, type }),
    });
  },

  async delete(id: string) {
    return httpClient.request(`/categories/${id}`, {
      method: 'DELETE',
    });
  }
};
