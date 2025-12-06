import { projectId, publicAnonKey } from './supabase/info';

const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/server`;

// Log the API base URL for debugging
console.log('');
console.log('╔═══════════════════════════════════════════════════════════════════╗');
console.log('║                        🍅 TOMA WEB APP                            ║');
console.log('╠═══════════════════════════════════════════════════════════════════╣');
console.log('║  Initializing connection to Edge Function...                     ║');
console.log('║  API Base URL:', API_BASE_URL.padEnd(47), '║');
console.log('╚═══════════════════════════════════════════════════════════════════╝');
console.log('');

// Check server health on startup
let serverHealthy = false;
let healthCheckPromise: Promise<boolean> | null = null;

async function checkServerHealth(): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
    
    console.log('[HttpClient] Attempting to reach:', `${API_BASE_URL}/health`);
    
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
      }
    });
    
    clearTimeout(timeoutId);
    
    console.log('[HttpClient] Health check response status:', response.status);
    console.log('[HttpClient] Health check response headers:', Object.fromEntries(response.headers.entries()));
    
    if (response.ok) {
      const data = await response.json();
      console.log('[HttpClient] Server health check passed:', data);
      return true;
    } else {
      const text = await response.text();
      console.error('[HttpClient] Server health check failed with status:', response.status);
      console.error('[HttpClient] Response body:', text);
      console.error('[HttpClient] ');
      console.error('╔═══════════════════════════════════════════════════════════════════╗');
      console.error('║               🚨 EDGE FUNCTION NOT DEPLOYED!                     ║');
      console.error('╠═══════════════════════════════════════════════════════════════════╣');
      console.error('║  Error: "Requested function was not found"                       ║');
      console.error('║  This means the function is NOT deployed on Supabase at all!     ║');
      console.error('║  The code is ready - you just need to deploy it.                 ║');
      console.error('╠═══════════════════════════════════════════════════════════════════╣');
      console.error('║  🚀 DEPLOY NOW (choose one method):                              ║');
      console.error('║                                                                   ║');
      console.error('║  ⭐ Method 1 - Automatic script (RECOMMENDED):                    ║');
      console.error('║     chmod +x deploy-edge-function.sh && ./deploy-edge-function.sh║');
      console.error('║                                                                   ║');
      console.error('║  📝 Method 2 - Manual deploy:                                     ║');
      console.error('║     1. Install CLI: npm install -g supabase                      ║');
      console.error('║     2. Login: supabase login                                     ║');
      console.error('║     3. Deploy: supabase functions deploy server \\\\                ║');
      console.error('║                  --project-ref ' + projectId.substring(0, 20) + '      ║');
      console.error('║                                                                   ║');
      console.error('║  🌐 Method 3 - Via Supabase Dashboard:                           ║');
      console.error('║     Visit: https://supabase.com/dashboard/project/' + projectId.substring(0, 12) + '...   ║');
      console.error('║     Go to Edge Functions → Deploy new function                   ║');
      console.error('╠═══════════════════════════════════════════════════════════════════╣');
      console.error('║  📖 STEP-BY-STEP GUIDE: /STEP_BY_STEP_DEPLOY.md                  ║');
      console.error('║  ⏱️  Time needed: 2-3 minutes (first time), 30s (next times)     ║');
      console.error('║  📚 Quick fix: /README_QUICK_FIX.md                               ║');
      console.error('╚═══════════════════════════════════════════════════════════════════╝');
      console.error('[HttpClient] ');
      return false;
    }
  } catch (error) {
    console.error('[HttpClient] Server health check failed:', error);
    console.error('[HttpClient] This usually means the Edge Function is not deployed or not responding.');
    console.error('[HttpClient] Please check:');
    console.error('[HttpClient]   1. Edge Function is deployed at /supabase/functions/server/');
    console.error('[HttpClient]   2. Function is accessible at:', `${API_BASE_URL}/health`);
    console.error('[HttpClient]   3. CORS is properly configured');
    console.error('[HttpClient]   4. Environment variables are set (SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)');
    console.error('[HttpClient] ');
    console.error('[HttpClient] 🔧 QUICK FIX:');
    console.error('[HttpClient]   supabase functions deploy server --project-ref', projectId);
    console.error('[HttpClient] ');
    console.error('[HttpClient] 📖 See /DEPLOYMENT_CHECKLIST.md for detailed instructions');
    console.error('[HttpClient] 🧪 Run test script: fetch("/test-server.js").then(r=>r.text()).then(eval)');
    console.error('[HttpClient] ');
    return false;
  }
}

// Start health check immediately
healthCheckPromise = checkServerHealth().then(healthy => {
  serverHealthy = healthy;
  return healthy;
});

export async function waitForHealthCheck(): Promise<boolean> {
  if (healthCheckPromise) {
    return await healthCheckPromise;
  }
  return serverHealthy;
}

export function isServerHealthy(): boolean {
  return serverHealthy;
}

export class HttpClient {
  private accessToken: string | null = null;

  setAccessToken(token: string | null) {
    this.accessToken = token;
  }

  hasAccessToken(): boolean {
    return !!this.accessToken;
  }

  async request<T>(
    endpoint: string,
    options: RequestInit & { retries?: number } = {}
  ): Promise<T> {
    const { retries = 3, ...fetchOptions } = options;
    
    // Don't make authenticated requests without a token
    if (!this.accessToken) {
      throw new Error('No access token available');
    }
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.accessToken}`,
      ...options.headers,
    };

    return this._makeRequest<T>(endpoint, { ...fetchOptions, headers, retries });
  }

  async requestUnauth<T>(
    endpoint: string,
    options: RequestInit & { retries?: number } = {}
  ): Promise<T> {
    const { retries = 3, ...fetchOptions } = options;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${publicAnonKey}`,
      ...options.headers,
    };

    return this._makeRequest<T>(endpoint, { ...fetchOptions, headers, retries });
  }

  private async _makeRequest<T>(
    endpoint: string,
    options: RequestInit & { retries?: number; headers: HeadersInit }
  ): Promise<T> {
    const { retries = 3, headers, ...fetchOptions } = options;
    
    let lastError: any;

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const fullUrl = `${API_BASE_URL}${endpoint}`;
        
        if (attempt === 0) {
          console.log(`[HttpClient] Fetching: ${fullUrl}`);
        }
        
        const response = await fetch(fullUrl, {
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