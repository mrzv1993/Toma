import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { Task, Subtask, Category } from '../types';
import { Plus, Trash2, X, Target, ChevronRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { ScrollArea } from './ui/scroll-area';
import { useApp } from '../context/AppContext';

interface TaskDetailsPanelProps {
    task: Task | null;
    onUpdate: (taskId: string, updates: Partial<Task>) => void;
    onClose: () => void;
}

export function TaskDetailsPanel({ task, onUpdate, onClose }: TaskDetailsPanelProps) {
    const { categories, tasks } = useApp();
    const [title, setTitle] = useState(task?.title || '');
    const [description, setDescription] = useState(task?.description || '');
    const [subtasks, setSubtasks] = useState<Subtask[]>(task?.subtasks || []);
    const [selectedGoalId, setSelectedGoalId] = useState<string | null>(task?.goalId || null);

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description || '');
            setSubtasks(task.subtasks || []);
            setSelectedGoalId(task.goalId || null);
        }
    }, [task]);

    // Get all goals (tasks from goal categories)
    const goalCategories = categories.filter(c => c.type === 'goal');
    const allGoals = tasks.filter(t => 
        t.categoryId && goalCategories.some(gc => gc.id === t.categoryId)
    );

    // Build goal hierarchy
    const buildGoalHierarchy = (goalId: string): Task[] => {
        const hierarchy: Task[] = [];
        const goal = allGoals.find(g => g.id === goalId);
        
        if (!goal) return hierarchy;
        
        hierarchy.push(goal);
        
        // Check if this goal has a parent goal (via relatedTaskIds)
        if (goal.relatedTaskIds && goal.relatedTaskIds.length > 0) {
            const parentGoalId = goal.relatedTaskIds[0];
            const parentHierarchy = buildGoalHierarchy(parentGoalId);
            hierarchy.push(...parentHierarchy);
        }
        
        return hierarchy;
    };

    const goalHierarchy = selectedGoalId ? buildGoalHierarchy(selectedGoalId) : [];

    // Get category name for a goal
    const getGoalCategoryName = (goalCategoryId: string | null): string => {
        if (!goalCategoryId) return '';
        const category = categories.find(c => c.id === goalCategoryId);
        return category?.title || '';
    };

    const handleTitleBlur = () => {
        if (task && title !== task.title) {
            onUpdate(task.id, { title });
        }
    };

    const handleDescriptionBlur = () => {
        if (task && description !== (task.description || '')) {
            onUpdate(task.id, { description });
        }
    };

    const handleGoalChange = (goalId: string | null) => {
        if (!task) return;
        setSelectedGoalId(goalId);
        onUpdate(task.id, { goalId });
    };

    const handleAddSubtask = () => {
        if (!task) return;
        const newSubtask: Subtask = {
            id: crypto.randomUUID(),
            title: '',
            isDone: false
        };
        const newSubtasks = [...subtasks, newSubtask];
        setSubtasks(newSubtasks);
        onUpdate(task.id, { subtasks: newSubtasks });
    };

    const handleUpdateSubtask = (id: string, updates: Partial<Subtask>) => {
        if (!task) return;
        const newSubtasks = subtasks.map(st => st.id === id ? { ...st, ...updates } : st);
        setSubtasks(newSubtasks);
        onUpdate(task.id, { subtasks: newSubtasks });
    };

    const handleDeleteSubtask = (id: string) => {
        if (!task) return;
        const newSubtasks = subtasks.filter(st => st.id !== id);
        setSubtasks(newSubtasks);
        onUpdate(task.id, { subtasks: newSubtasks });
    };

    return (
        <Dialog open={!!task} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-3xl bg-[var(--color-surface)] border-[var(--color-border)]">
                <DialogHeader>
                    <DialogTitle className="text-[var(--color-text-primary)]">
                        <Input 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            onBlur={handleTitleBlur}
                            className="border-none shadow-none p-0 h-auto focus-visible:ring-0 bg-transparent"
                            placeholder="Название задачи"
                        />
                    </DialogTitle>
                    <DialogDescription className="text-[var(--color-text-secondary)]">
                        Редактируйте детали задачи
                    </DialogDescription>
                </DialogHeader>

                <ScrollArea className="max-h-[60vh] pr-4">
                    <div className="space-y-6 py-4">
                        {/* Description */}
                        <div className="space-y-2">
                            <h3 className="text-sm font-medium text-[var(--color-text-secondary)]">Описание</h3>
                            <Textarea 
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                onBlur={handleDescriptionBlur}
                                placeholder="Добавьте описание задачи..."
                                className="min-h-[120px] resize-none bg-[var(--color-background)] border-[var(--color-border)]"
                            />
                        </div>

                        {/* Subtasks */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-medium text-[var(--color-text-secondary)]">Чеклист</h3>
                                <span className="text-xs text-[var(--color-text-tertiary)]">
                                    {subtasks.filter(st => st.isDone).length}/{subtasks.length}
                                </span>
                            </div>
                            
                            <div className="space-y-2">
                                {subtasks.map((subtask) => (
                                    <div key={subtask.id} className="flex items-center gap-2 group">
                                        <Checkbox 
                                            checked={subtask.isDone}
                                            onCheckedChange={(checked) => handleUpdateSubtask(subtask.id, { isDone: checked === true })}
                                        />
                                        <Input 
                                            value={subtask.title}
                                            onChange={(e) => handleUpdateSubtask(subtask.id, { title: e.target.value })}
                                            className={`flex-1 border-none shadow-none h-8 focus-visible:ring-0 px-2 bg-transparent ${subtask.isDone ? 'line-through text-[var(--color-text-tertiary)]' : ''}`}
                                            placeholder="Подзадача..."
                                        />
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-600 hover:bg-red-50/10"
                                            onClick={() => handleDeleteSubtask(subtask.id)}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>

                            <Button 
                                variant="outline" 
                                size="sm" 
                                className="w-full mt-2 text-[var(--color-text-secondary)] border-dashed bg-transparent border-[var(--color-border)] hover:bg-[var(--color-surface-hover)]"
                                onClick={handleAddSubtask}
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Добавить элемент
                            </Button>
                        </div>

                        {/* Goal */}
                        <div className="space-y-2">
                            <h3 className="text-sm font-medium text-[var(--color-text-secondary)]">Цель</h3>
                            <select
                                value={selectedGoalId || ''}
                                onChange={(e) => handleGoalChange(e.target.value || null)}
                                className="w-full bg-[var(--color-background)] border border-[var(--color-border)] px-3 py-2 rounded text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                            >
                                <option value="">Не привязана к цели</option>
                                {allGoals.map(goal => (
                                    <option key={goal.id} value={goal.id}>
                                        {goal.title} ({getGoalCategoryName(goal.categoryId)})
                                    </option>
                                ))}
                            </select>
                            
                            {/* Goal Hierarchy */}
                            {goalHierarchy.length > 0 && (
                                <div className="mt-3 p-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Target className="w-4 h-4 text-[var(--color-primary)]" />
                                        <h4 className="text-xs font-medium text-[var(--color-text-secondary)]">Иерархия целей</h4>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        {goalHierarchy.map((goal, index) => {
                                            const categoryName = getGoalCategoryName(goal.categoryId);
                                            const isFirst = index === 0;
                                            
                                            return (
                                                <div 
                                                    key={goal.id} 
                                                    className="flex items-start gap-2"
                                                >
                                                    {index > 0 && (
                                                        <ChevronRight className="w-4 h-4 text-[var(--color-text-tertiary)] mt-0.5 flex-shrink-0" />
                                                    )}
                                                    <div className={`flex-1 ${isFirst ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-secondary)]'}`}>
                                                        <span className="text-xs font-medium">{categoryName}</span>
                                                        <p className="text-sm">{goal.title}</p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}