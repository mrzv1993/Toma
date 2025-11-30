import { httpClient } from '../utils/httpClient';

export const TimerRepository = {
  async getTimer() {
    return httpClient.request('/timer');
  },

  async start(taskId: string) {
    return httpClient.request('/timer/start', {
      method: 'POST',
      body: JSON.stringify({ taskId }),
    });
  },

  async pause(elapsedTime: number) {
    return httpClient.request('/timer/pause', {
      method: 'POST',
      body: JSON.stringify({ elapsedTime }),
    });
  },

  async stop(elapsedTime: number) {
    return httpClient.request('/timer/stop', {
      method: 'POST',
      body: JSON.stringify({ elapsedTime }),
    });
  }
};
