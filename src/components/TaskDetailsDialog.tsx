import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { Task, Subtask } from '../types';
import { Plus, Trash2, X } from 'lucide-react';

interface TaskDetailsPanelProps {
    task: Task;
    onUpdate: (taskId: string, updates: Partial<Task>) => void;
    onClose: () => void;
}

export function TaskDetailsPanel({ task, onUpdate, onClose }: TaskDetailsPanelProps) {
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description || '');
    const [subtasks, setSubtasks] = useState<Subtask[]>(task.subtasks || []);

    useEffect(() => {
        setTitle(task.title);
        setDescription(task.description || '');
        setSubtasks(task.subtasks || []);
    }, [task]);

    const handleTitleBlur = () => {
        if (title !== task.title) {
            onUpdate(task.id, { title });
        }
    };

    const handleDescriptionBlur = () => {
        if (description !== (task.description || '')) {
            onUpdate(task.id, { description });
        }
    };

    const handleAddSubtask = () => {
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
        const newSubtasks = subtasks.map(st => st.id === id ? { ...st, ...updates } : st);
        setSubtasks(newSubtasks);
        onUpdate(task.id, { subtasks: newSubtasks });
    };

    const handleDeleteSubtask = (id: string) => {
        const newSubtasks = subtasks.filter(st => st.id !== id);
        setSubtasks(newSubtasks);
        onUpdate(task.id, { subtasks: newSubtasks });
    };

    return (
        <div className="h-full flex flex-col bg-[var(--color-surface)] border-l border-[var(--color-border)]">
            {/* Header */}
            <div className="p-4 border-b border-[var(--color-border)] flex items-start gap-4">
                <Input 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onBlur={handleTitleBlur}
                    className="text-xl font-bold border-none shadow-none p-0 h-auto focus-visible:ring-0 bg-transparent flex-1"
                />
                <Button variant="ghost" size="icon" onClick={onClose} className="shrink-0">
                    <X className="w-5 h-5" />
                </Button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {/* Description */}
                <div className="space-y-2">
                    <h3 className="text-sm font-medium text-[var(--color-text-secondary)]">Описание</h3>
                    <Textarea 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        onBlur={handleDescriptionBlur}
                        placeholder="Добавьте описание задачи..."
                        className="min-h-[100px] resize-none bg-[var(--color-background)] border-[var(--color-border)]"
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
            </div>
        </div>
    );
}
