import { httpClient } from '../utils/httpClient';

export const AuthRepository = {
  async signUp(email: string, password: string) {
    return httpClient.requestUnauth('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }
};