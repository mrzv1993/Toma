import { httpClient } from '../utils/httpClient';

export const TelegramRepository = {
  async setupWebhook() {
    return httpClient.request('/telegram/setup', { method: 'POST' });
  },

  async getStatus() {
    return httpClient.request('/telegram/status');
  },

  async disconnect() {
    return httpClient.request('/telegram/disconnect', { method: 'POST' });
  }
};
