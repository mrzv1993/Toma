import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';
import { Button } from './ui/button';
import { useTelegram } from '../hooks/useTelegram';
import { Send, CheckCircle2, XCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface ProfileSettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProfileSettingsDialog({ isOpen, onClose }: ProfileSettingsDialogProps) {
  const { user } = useApp();
  const { status, isLoading, connect, disconnect, refreshStatus } = useTelegram();

  // Refresh status when dialog opens
  React.useEffect(() => {
    if (isOpen) {
      refreshStatus();
    }
  }, [isOpen, refreshStatus]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Настройки профиля</DialogTitle>
          <DialogDescription>
            Управление аккаунтом и интеграциями
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium leading-none text-muted-foreground">Аккаунт</h3>
            <div className="p-4 rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="text-sm font-medium">{user?.email}</div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
             <h3 className="text-sm font-medium leading-none text-muted-foreground">Интеграции</h3>
             <div className="p-4 rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Send className="w-5 h-5 text-[#2AABEE]" />
                    <span className="font-medium">Telegram</span>
                  </div>
                  {status?.connected ? (
                    <div className="flex items-center gap-1.5 text-sm text-green-600 bg-green-50 px-2 py-1 rounded-full">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Подключено</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground bg-muted px-2 py-1 rounded-full">
                      <XCircle className="w-4 h-4" />
                      <span>Не подключено</span>
                    </div>
                  )}
                </div>

                <p className="text-sm text-muted-foreground mb-4">
                  Подключите бота, чтобы отправлять задачи во "Входящие" прямо из Telegram.
                </p>
                
                {status?.connected ? (
                   <div className="flex flex-col gap-2">
                     <div className="text-xs text-muted-foreground">
                        Подключен аккаунт: <span className="font-medium text-foreground">@{status.username}</span>
                     </div>
                     <Button 
                        variant="outline" 
                        onClick={disconnect} 
                        disabled={isLoading}
                        className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                     >
                        {isLoading ? 'Отключение...' : 'Отключить'}
                     </Button>
                   </div>
                ) : (
                   <Button 
                      onClick={connect} 
                      disabled={isLoading}
                      className="w-full bg-[#2AABEE] hover:bg-[#229ED9] text-white"
                   >
                      {isLoading ? 'Подключение...' : 'Подключить Telegram'}
                   </Button>
                )}
             </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
