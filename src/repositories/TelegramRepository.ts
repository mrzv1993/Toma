import { httpClient } from '../utils/httpClient';

export const TelegramRepository = {
  async setupWebhook() {
    return httpClient.request('/telegram/setup', { method: 'POST' });
  },

  async getStatus() {
    return httpClient.request('/telegram/status');
  },

  async connect() {
    return httpClient.request('/telegram/connect', { method: 'POST' });
  },

  async disconnect() {
    return httpClient.request('/telegram/disconnect', { method: 'POST' });
  }
};
