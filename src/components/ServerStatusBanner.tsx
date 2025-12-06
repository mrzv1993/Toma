import { useEffect, useState } from 'react';
import { waitForHealthCheck, isServerHealthy } from '../utils/httpClient';
import { AlertCircle, Wifi, WifiOff, RefreshCw } from 'lucide-react';

export function ServerStatusBanner() {
  const [status, setStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    checkHealth();
  }, []);

  async function checkHealth() {
    setStatus('checking');
    const healthy = await waitForHealthCheck();
    setStatus(healthy ? 'online' : 'offline');
    
    // Show banner only if offline
    setShowBanner(!healthy);
  }

  const handleRetry = () => {
    window.location.reload();
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-red-600 text-white px-4 py-3 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {status === 'checking' ? (
            <RefreshCw className="w-5 h-5 animate-spin" />
          ) : (
            <WifiOff className="w-5 h-5" />
          )}
          <div>
            <div className="font-medium">
              {status === 'checking' && 'Проверка соединения с сервером...'}
              {status === 'offline' && '🚨 Edge Function не развернута'}
            </div>
            <div className="text-sm opacity-90">
              {status === 'offline' && 'Откройте консоль (F12) для инструкций по деплою. Время: 2-3 минуты.'}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={handleRetry}
            className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded transition-colors whitespace-nowrap"
          >
            <RefreshCw className="w-4 h-4" />
            Проверить снова
          </button>
          <a
            href="https://supabase.com/dashboard/project/gyeavjcumghuiblzjwnx/functions"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded transition-colors whitespace-nowrap text-white no-underline"
          >
            Деплой →
          </a>
        </div>
      </div>
    </div>
  );
}