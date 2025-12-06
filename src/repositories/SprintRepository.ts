import { httpClient } from '../utils/httpClient';

export const SprintRepository = {
  async getActiveSprint() {
    return httpClient.request('/sprint/active');
  },

  async getHistory() {
    return httpClient.request('/sprint/history');
  },

  async start() {
    return httpClient.request('/sprint/start', {
        method: 'POST'
    });
  },

  async complete(journalData: {
    mostImportant?: string;
    good?: string;
    better?: string;
    distractions?: string;
    insight?: string;
  }) {
    return httpClient.request('/sprint/complete', {
        method: 'POST',
        body: JSON.stringify({ journal: journalData })
    });
  },

  async updateSettings(settings: {
    sprintDuration?: number;
    maxLevels?: number;
  }) {
    return httpClient.request('/sprint/update-settings', {
      method: 'POST',
      body: JSON.stringify(settings)
    });
  },

  async resetActiveSprintTimes() {
    return httpClient.request('/admin/reset-active-sprint-times', {
        method: 'POST'
    });
  }
};