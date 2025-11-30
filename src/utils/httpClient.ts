import { projectId, publicAnonKey } from './supabase/info';

const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-9fa24130`;

export class HttpClient {
  private accessToken: string | null = null;

  setAccessToken(token: string | null) {
    this.accessToken = token;
  }

  async request<T>(
    endpoint: string,
    options: RequestInit & { retries?: number } = {}
  ): Promise<T> {
    const { retries = 3, ...fetchOptions } = options;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.accessToken || publicAnonKey}`,
      ...options.headers,
    };

    let lastError: any;

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
          ...fetchOptions,
          headers,
        });

        let data;
        const contentType = response.headers.get('content-type');
        
        try {
          if (contentType && contentType.includes('application/json')) {
            data = await response.json();
          } else {
            const text = await response.text();
            try {
               data = JSON.parse(text);
            } catch {
               if (!response.ok) {
                   if (response.status >= 400 && response.status < 500 && response.status !== 429) {
                       throw new Error(text || response.statusText);
                   }
                   throw new Error(text || response.statusText);
               }
               throw new Error('Invalid JSON response');
            }
          }
        } catch (parseError: any) {
           if (response.status >= 400 && response.status < 500 && response.status !== 429) {
               // Client error
           }
           throw new Error(parseError.message || 'Failed to parse server response');
        }

        if (!response.ok) {
           if (response.status >= 400 && response.status < 500 && response.status !== 429) {
               const error = new Error(data.error || 'Request failed');
               (error as any).isClientError = true;
               throw error;
           }
           throw new Error(data.error || `Request failed with status ${response.status}`);
        }

        return data;
      } catch (error: any) {
        if (error.isClientError) {
            throw error;
        }
        
        lastError = error;
        if (attempt === retries) break;

        const delay = 500 * Math.pow(2, attempt);
        
        if (attempt === 0 && (error.message === 'Failed to fetch' || error.message.includes('NetworkError') || error.message.includes('Network connection lost'))) {
             console.log(`API [${endpoint}] cold start or network glitch. Retrying in ${delay}ms...`);
        } else {
             console.warn(`API Request Failed [${endpoint}]. Retrying in ${delay}ms...`, error);
        }
        
        await new Promise(r => setTimeout(r, delay));
      }
    }

    console.error(`API Request Error [${endpoint}] after ${retries + 1} attempts:`, lastError);
    throw lastError;
  }
}

export const httpClient = new HttpClient();
