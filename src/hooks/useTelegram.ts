import { useState, useEffect, useCallback } from 'react';
import { TelegramRepository } from '../repositories/TelegramRepository';
import { toast } from 'sonner@2.0.3';
import { useApp } from '../context/AppContext';

interface TelegramStatus {
  connected: boolean;
  chatId?: number;
  username?: string;
}

export function useTelegram() {
  const { accessToken } = useApp();
  const [status, setStatus] = useState<TelegramStatus | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchStatus = useCallback(async () => {
    if (!accessToken) return;
    
    try {
      const response = await TelegramRepository.getStatus();
      if (response.success) {
        setStatus(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch Telegram status', error);
    }
  }, [accessToken]);

  const connect = async () => {
    setIsLoading(true);
    try {
      const response = await TelegramRepository.connect();
      if (response.success && response.data.link) {
        window.open(response.data.link, '_blank');
        toast.success('Ссылка для подключения открыта в новой вкладке');
      } else {
        toast.error('Не удалось получить ссылку для подключения');
      }
    } catch (error) {
      toast.error('Ошибка при подключении Telegram');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const disconnect = async () => {
    setIsLoading(true);
    try {
      const response = await TelegramRepository.disconnect();
      if (response.success) {
        setStatus({ connected: false });
        toast.success('Telegram отключен');
      }
    } catch (error) {
      toast.error('Ошибка при отключении Telegram');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!accessToken) {
      setStatus(null);
      return;
    }

    let interval: any;
    if (status && !status.connected) {
      interval = setInterval(() => {
        fetchStatus();
      }, 3000); // Poll every 3 seconds while waiting for connection
    } else if (!status) {
      fetchStatus();
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [status?.connected, fetchStatus, accessToken]);

  return {
    status,
    isLoading,
    connect,
    disconnect,
    refreshStatus: fetchStatus
  };
}
