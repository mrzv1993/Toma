import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { useApp } from '../context/AppContext';
import { Task } from '../types';
import { Check, Link } from 'lucide-react';

interface GoalRelationsDialogProps {
  task: Task;
  onClose: () => void;
}

export function GoalRelationsDialog({ task, onClose }: GoalRelationsDialogProps) {
  const { tasks, categories, updateTask } = useApp();
  const [selectedIds, setSelectedIds] = useState<string[]>(task.relatedTaskIds || []);

  // Filter goal tasks
  const goalCategoryIds = categories.filter(c => c.type === 'goal').map(c => c.id);
  const goalTasks = tasks.filter(t => 
    goalCategoryIds.includes(t.categoryId || '') && 
    t.id !== task.id &&
    t.categoryId !== task.categoryId
  );

  const handleSave = async () => {
    await updateTask(task.id, { relatedTaskIds: selectedIds });
    onClose();
  };

  const toggleSelection = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(sid => sid !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
       <DialogContent className="sm:max-w-[425px] bg-[var(--color-background)] border-[var(--color-border)]">
         <DialogHeader>
           <DialogTitle className="flex items-center gap-2 text-[var(--color-text-primary)]">
             <Link className="w-5 h-5" />
             Связанные цели
           </DialogTitle>
           <DialogDescription className="text-sm text-[var(--color-text-secondary)]">
             Выберите цели, которые связаны с "{task.title}"
           </DialogDescription>
         </DialogHeader>
         
         <div className="py-2">
            <div className="max-h-[50vh] overflow-y-auto space-y-2 pr-2">
                {goalTasks.length === 0 ? (
                    <div className="text-center py-8 text-[var(--color-text-tertiary)] border border-dashed border-[var(--color-border)] rounded">
                        Нет других целей
                    </div>
                ) : (
                    goalTasks.map(goal => {
                        const isSelected = selectedIds.includes(goal.id);
                        return (
                            <div 
                                key={goal.id}
                                className={`flex items-center gap-3 p-3 rounded border cursor-pointer transition-all ${
                                    isSelected 
                                    ? 'bg-[var(--color-primary)]/10 border-[var(--color-primary)]' 
                                    : 'bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] border-[var(--color-border)]'
                                }`}
                                onClick={() => toggleSelection(goal.id)}
                            >
                                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors flex-shrink-0 ${
                                    isSelected
                                    ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-white'
                                    : 'border-[var(--color-border)] bg-[var(--color-background)]'
                                }`}>
                                    {isSelected && <Check className="w-3 h-3" />}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className={`text-sm truncate ${isSelected ? 'text-[var(--color-primary)] font-medium' : 'text-[var(--color-text-primary)]'}`}>
                                        {goal.title}
                                    </p>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
         </div>

         <DialogFooter className="gap-2 sm:gap-0">
           <Button variant="outline" onClick={onClose} className="bg-transparent border-[var(--color-border)] text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]">
             Отмена
           </Button>
           <Button onClick={handleSave} className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white">
             Сохранить
           </Button>
         </DialogFooter>
       </DialogContent>
    </Dialog>
  );
}
