import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Sprint } from '../types';
import { Settings } from 'lucide-react';

interface SprintSettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  activeSprint: Sprint | null;
  onSave: (settings: { sprintDuration?: number; maxLevels?: number }) => Promise<void>;
}

export function SprintSettingsDialog({ isOpen, onClose, activeSprint, onSave }: SprintSettingsDialogProps) {
  const [sprintDuration, setSprintDuration] = useState(activeSprint?.sprintDuration || 9);
  const [maxLevels, setMaxLevels] = useState(activeSprint?.maxLevels || 9);
  const [isSaving, setIsSaving] = useState(false);

  React.useEffect(() => {
    if (activeSprint) {
      setSprintDuration(activeSprint.sprintDuration || 9);
      setMaxLevels(activeSprint.maxLevels || 9);
    }
  }, [activeSprint]);

  async function handleSave() {
    setIsSaving(true);
    try {
      await onSave({ sprintDuration, maxLevels });
      onClose();
    } catch (error: any) {
      alert(error.message || 'Ошибка при сохранении настроек');
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-[var(--color-surface)] border-[var(--color-border)]">
        <DialogHeader>
          <DialogTitle className="text-[var(--color-text-primary)] flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Настройки спринта
          </DialogTitle>
          <DialogDescription className="text-[var(--color-text-secondary)]">
            Изменить настройки можно только в режиме подготовки
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Sprint Duration */}
          <div className="space-y-3">
            <Label className="text-[var(--color-text-primary)]">
              Длительность спринта (часов)
            </Label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="1"
                max="24"
                value={sprintDuration}
                onChange={(e) => setSprintDuration(parseInt(e.target.value))}
                className="flex-1 h-2 bg-[var(--color-surface-hover)] rounded-lg appearance-none cursor-pointer"
                style={{
                  accentColor: 'var(--color-primary)'
                }}
              />
              <div className="w-16 text-center px-3 py-2 bg-[var(--color-background)] border border-[var(--color-border)] rounded text-[var(--color-text-primary)]">
                {sprintDuration}ч
              </div>
            </div>
          </div>

          {/* Max Levels */}
          <div className="space-y-3">
            <Label className="text-[var(--color-text-primary)]">
              Количество уровней
            </Label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="1"
                max="9"
                value={maxLevels}
                onChange={(e) => setMaxLevels(parseInt(e.target.value))}
                className="flex-1 h-2 bg-[var(--color-surface-hover)] rounded-lg appearance-none cursor-pointer"
                style={{
                  accentColor: 'var(--color-primary)'
                }}
              />
              <div className="w-16 text-center px-3 py-2 bg-[var(--color-background)] border border-[var(--color-border)] rounded text-[var(--color-text-primary)]">
                {maxLevels}
              </div>
            </div>
            <p className="text-xs text-[var(--color-text-tertiary)]">
              Текущее: от уровня {maxLevels} (высший) до уровня 1 (низший)
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isSaving}
            className="bg-[var(--color-surface-hover)] hover:bg-[var(--color-border)] border-[var(--color-border)]"
          >
            Отмена
          </Button>
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white"
          >
            {isSaving ? 'Сохранение...' : 'Сохранить'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
