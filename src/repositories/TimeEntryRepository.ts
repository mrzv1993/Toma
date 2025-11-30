import { httpClient } from '../utils/httpClient';

export const TimeEntryRepository = {
  async getAll() {
    return httpClient.request('/time-entries');
  }
};
