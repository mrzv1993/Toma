import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Plus, Inbox, Trash2, Check, Calendar as CalendarIcon, Clock, RefreshCw } from 'lucide-react';
import { Task, RecurrenceSettings } from '../types';
import { PersonAvatar } from './people/PersonAvatar';
import { TaskRecurrenceDialog } from './TaskRecurrenceDialog';

function toLocalISOString(dateString: string) {
  const date = new Date(dateString);
  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
}

export function InboxColumn({ isCollapsed, onToggleCollapse }: { isCollapsed?: boolean; onToggleCollapse?: () => void }) {
  const { 
    categories, 
    tasks, 
    people,
    createCategory, 
    deleteCategory, 
    createTask, 
    updateTask, 
    deleteTask,
    draggedTask,
    setDraggedTask,
    hooks,
    activeSprint,
  } = useApp();
  const [newCategoryTitle, setNewCategoryTitle] = useState('');
  const [newCategoryType, setNewCategoryType] = useState<'standard' | 'event'>('standard');
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [addingTaskToCategoryId, setAddingTaskToCategoryId] = useState<string | null>(null);
  const [quickInboxTaskTitle, setQuickInboxTaskTitle] = useState('');
  const [isSubmittingQuickTask, setIsSubmittingQuickTask] = useState(false);
  const [dropIndicator, setDropIndicator] = useState<{ taskId: string; position: 'top' | 'bottom' } | null>(null);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [recurrenceTask, setRecurrenceTask] = useState<Task | null>(null);
  const [editTaskTitle, setEditTaskTitle] = useState('');
  const editInputRef = useRef<HTMLInputElement>(null);
  const editBackdropRef = useRef<HTMLDivElement>(null);

  function handleStartEditingTask(task: Task) {
    setEditingTaskId(task.id);
    let title = task.title;
    const hook = hooks.find(h => h.id === task.hookId);
    if (hook) {
        title += ` #${hook.title}`;
    }
    if (task.assignedPeopleIds && task.assignedPeopleIds.length > 0) {
        task.assignedPeopleIds.forEach(id => {
            const person = people.find(p => p.id === id);
            if (person) {
                title += ` @${person.firstName}`;
            }
        });
    }
    setEditTaskTitle(title);
  }

  async function handleSaveEditingTask() {
    if (!editingTaskId || !editTaskTitle.trim()) {
        setEditingTaskId(null);
        return;
    }
    try {
        let titleToSave = editTaskTitle;
        let hookIdToSave: string | undefined;
        const assignedPeopleIdsToSave: string[] = [];

        // Check for hook tags (e.g. #hookname)
        const hookTags = editTaskTitle.match(/#[\wа-яА-ЯёЁ]+/g);
        if (hookTags) {
            for (const tag of hookTags) {
                const tagName = tag.substring(1).toLowerCase();
                const hook = hooks.find(h => h.title.toLowerCase() === tagName);
                if (hook) {
                    hookIdToSave = hook.id;
                    titleToSave = titleToSave.replace(tag, '');
                    break; // Use the first matching hook
                }
            }
        }

        // Check for person tags (e.g. @name)
        const personTags = editTaskTitle.match(/@[\wа-яА-ЯёЁ]+/g);
        if (personTags) {
            for (const tag of personTags) {
                const personName = tag.substring(1).toLowerCase();
                const person = people.find(p => p.firstName.toLowerCase() === personName);
                if (person) {
                    if (!assignedPeopleIdsToSave.includes(person.id)) {
                        assignedPeopleIdsToSave.push(person.id);
                    }
                    titleToSave = titleToSave.replace(tag, '');
                }
            }
        }

        titleToSave = titleToSave.replace(/\s{2,}/g, ' ').trim();

        await updateTask(editingTaskId, { 
            title: titleToSave,
            ...(hookIdToSave ? { hookId: hookIdToSave } : {}),
            assignedPeopleIds: assignedPeopleIdsToSave
        });
        setEditingTaskId(null);
    } catch (error) {
        console.error('Failed to update task', error);
    }
  }

  // Helper to get sort key for tasks
  // New tasks (null priority) have negative timestamp (newest = smallest = top)
  // Manually positioned tasks usually have positive timestamp (bottom) or specific value
  const getTaskSortKey = (task: Task) => {
    if (task.priorityPosition !== null && task.priorityPosition !== undefined) return task.priorityPosition;
    const date = new Date(task.createdAt);
    return isNaN(date.getTime()) ? -Date.now() : -date.getTime();
  };

  // Get inbox tasks (not in sprint)
  const inboxTasks = tasks
    .filter((task) => !task.sprintId)
    .sort((a, b) => getTaskSortKey(a) - getTaskSortKey(b));

  async function handleQuickInboxAdd() {
    if (!quickInboxTaskTitle.trim() || isSubmittingQuickTask) return;
    
    setIsSubmittingQuickTask(true);
    try {
      await createTask(quickInboxTaskTitle, null, 'default');
      setQuickInboxTaskTitle('');
    } catch (error) {
      console.error('Failed to create task:', error);
    } finally {
      setIsSubmittingQuickTask(false);
    }
  }

  function handleDragStart(task: Task) {
    setDraggedTask(task);
  }

  function handleDragEnd() {
    setDraggedTask(null);
    setDropIndicator(null);
  }

  async function handleDrop(categoryId: string) {
    if (!draggedTask) return;
    
    // Prevent moving tasks from sprint back to inbox unless preparation mode
    if (draggedTask.sprintId && activeSprint?.startedAt) return;

    try {
      // If dropping into category container (append to end or move from sprint)
      const categoryTasks = inboxTasks.filter(t => t.categoryId === categoryId);
      const lastTask = categoryTasks[categoryTasks.length - 1];
      
      // Calculate new position:
      // If list has items, append after last item (+1000)
      // If list empty, we need a "start" value. 
      // If we want it to be at "bottom" of a new list, we can use Date.now() (positive)
      // which puts it after any potential "new" tasks (negative).
      const newPosition = lastTask 
        ? getTaskSortKey(lastTask) + 1000 
        : Date.now();

      await updateTask(draggedTask.id, { 
          categoryId, 
          sprintId: null,
          priorityLevel: null,
          priorityPosition: newPosition
      });
      setDraggedTask(null);
      setDropIndicator(null);
    } catch (error) {
      console.error('Failed to move task:', error);
    }
  }

  async function handleTaskDrop(e: React.DragEvent, targetTask: Task) {
    e.preventDefault();
    e.stopPropagation();
    
    if (!draggedTask || draggedTask.id === targetTask.id) return;

    // Prevent moving tasks from sprint back to inbox unless preparation mode
    if (draggedTask.sprintId && activeSprint?.startedAt) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const midpoint = rect.top + rect.height / 2;
    const position = e.clientY < midpoint ? 'top' : 'bottom';

    // Filter out the dragged task to determine neighbors in the "visual" list without it
    const tasksExcludingDragged = inboxTasks
        .filter(t => t.categoryId === targetTask.categoryId && t.id !== draggedTask.id);
    
    const targetIndex = tasksExcludingDragged.findIndex(t => t.id === targetTask.id);
    if (targetIndex === -1) return;

    let newPosition;
    if (position === 'top') {
        // Insert before targetTask
        if (targetIndex === 0) {
             const targetPos = getTaskSortKey(targetTask);
             newPosition = targetPos - 1000;
        } else {
             const prevTask = tasksExcludingDragged[targetIndex - 1];
             newPosition = (getTaskSortKey(prevTask) + getTaskSortKey(targetTask)) / 2;
        }
    } else {
        // Insert after targetTask
        if (targetIndex === tasksExcludingDragged.length - 1) {
            // Last item
            newPosition = getTaskSortKey(targetTask) + 1000;
        } else {
            const nextTask = tasksExcludingDragged[targetIndex + 1];
            newPosition = (getTaskSortKey(targetTask) + getTaskSortKey(nextTask)) / 2;
        }
    }

    try {
        await updateTask(draggedTask.id, {
            categoryId: targetTask.categoryId,
            sprintId: null,
            priorityLevel: null,
            priorityPosition: newPosition
        });
        setDraggedTask(null);
        setDropIndicator(null);
    } catch (error) {
        console.error('Failed to reorder task', error);
    }
  }

  function handleTaskDragOver(e: React.DragEvent, task: Task) {
    e.preventDefault();
    e.stopPropagation();
    if (draggedTask?.id === task.id) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const midpoint = rect.top + rect.height / 2;
    const position = e.clientY < midpoint ? 'top' : 'bottom';
    
    setDropIndicator({ taskId: task.id, position });
  }

  async function handleAddCategory() {
    if (!newCategoryTitle.trim()) return;

    try {
      await createCategory(newCategoryTitle, newCategoryType);
      setNewCategoryTitle('');
      setNewCategoryType('standard');
      setIsAddingCategory(false);
    } catch (error) {
      console.error('Failed to create category:', error);
    }
  }

  async function handleDeleteCategory(id: string) {
    if (!confirm('Удалить категорию? Задачи переместятся в "Очередь".')) return;

    try {
      await deleteCategory(id);
    } catch (error) {
      console.error('Failed to delete category:', error);
    }
  }

  async function handleAddTask(categoryId: string) {
    if (!newTaskTitle.trim()) return;

    try {
      await createTask(newTaskTitle, null, categoryId);
      setNewTaskTitle('');
      setAddingTaskToCategoryId(null);
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  }

  async function handleDeleteTask(taskId: string) {
    if (!confirm('Удалить задачу?')) return;

    try {
      await deleteTask(taskId);
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
  }

  function formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}ч ${minutes}м`;
    }
    return `${minutes}м`;
  }

  if (isCollapsed) {
    return (
      <div 
        className="flex flex-col h-full bg-[var(--color-surface)] border-r border-[var(--color-border)] items-center py-4 cursor-pointer hover:bg-[var(--color-surface-hover)] transition-colors"
        onClick={onToggleCollapse}
      >
        <div className="whitespace-nowrap font-medium text-sm text-[var(--color-text-secondary)] select-none" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
          Входящие
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[var(--color-surface)] border-r border-[var(--color-border)]">
      {/* Header */}
      <div 
        className="p-4 border-b border-[var(--color-border)] flex-shrink-0 cursor-pointer hover:bg-[var(--color-surface-hover)] transition-colors"
        onClick={onToggleCollapse}
      >
        <div className="flex items-center justify-between mb-4">
          <h2>Входящие</h2>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsAddingCategory(true);
            }}
            className="p-2 hover:bg-[var(--color-surface-hover)] rounded transition-colors"
            title="Добавить категорию"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <div className="flex gap-2 mb-4" onClick={(e) => e.stopPropagation()}>
          <input
            type="text"
            value={quickInboxTaskTitle}
            onChange={(e) => setQuickInboxTaskTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleQuickInboxAdd();
              }
            }}
            placeholder="Быстрая задача..."
            className="flex-1 px-3 py-2 bg-[var(--color-background)] border border-[var(--color-border)] rounded text-sm focus:outline-none focus:border-[var(--color-primary)]"
          />
          <button
            onClick={handleQuickInboxAdd}
            disabled={isSubmittingQuickTask || !quickInboxTaskTitle.trim()}
            className="px-3 py-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white rounded transition-colors disabled:opacity-50"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {isAddingCategory && (
          <div className="flex flex-col gap-2 mb-2 p-2 bg-[var(--color-background)] rounded border border-[var(--color-border)] shadow-sm" onClick={(e) => e.stopPropagation()}>
            <input
              type="text"
              value={newCategoryTitle}
              onChange={(e) => setNewCategoryTitle(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()}
              placeholder="Название категории"
              autoFocus
              className="px-3 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-primary)]"
            />
            <div className="flex gap-2 items-center">
               <span className="text-xs text-[var(--color-text-tertiary)]">Тип:</span>
               <select 
                  value={newCategoryType}
                  onChange={(e) => setNewCategoryType(e.target.value as 'standard' | 'event')}
                  className="flex-1 text-sm bg-[var(--color-surface)] border border-[var(--color-border)] rounded p-1 focus:outline-none"
               >
                   <option value="standard">Стандартная</option>
                   <option value="event">Событие</option>
               </select>
            </div>
            <div className="flex justify-end gap-2 pt-1">
                <button
                  onClick={handleAddCategory}
                  className="px-3 py-1 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white rounded transition-colors text-xs"
                >
                  Создать
                </button>
                <button
                  onClick={() => {
                    setIsAddingCategory(false);
                    setNewCategoryTitle('');
                    setNewCategoryType('standard');
                  }}
                  className="px-3 py-1 hover:bg-[var(--color-surface-hover)] rounded transition-colors text-xs"
                >
                  Отмена
                </button>
            </div>
          </div>
        )}
      </div>

      {/* Categories and Tasks */}
      <div className="flex-1 overflow-y-auto p-4 min-h-0">
        {categories.length === 0 ? (
          <div className="text-center py-8 text-[var(--color-text-tertiary)]">
            <Inbox className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>Нет категорий</p>
          </div>
        ) : (
          <div className="space-y-4">
            {categories.map((category) => {
              const categoryTasks = inboxTasks.filter((task) => task.categoryId === category.id);

              return (
                <div
                  key={category.id}
                  className="bg-[var(--color-background)] rounded border border-[var(--color-border)]"
                  onDragOver={handleDragOver}
                  onDrop={() => handleDrop(category.id)}
                >
                  {/* Category Header */}
                  <div className="flex items-center justify-between p-3 border-b border-[var(--color-border)]">
                    <div className="flex items-center gap-2">
                      {category.type === 'event' && <CalendarIcon className="w-4 h-4 text-blue-400" />}
                      <h4>{category.id === 'default' ? 'Список задач' : category.title}</h4>
                      <span className="text-[var(--color-text-tertiary)]">
                        ({categoryTasks.length})
                      </span>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => setAddingTaskToCategoryId(category.id)}
                        className="p-1 hover:bg-[var(--color-surface-hover)] rounded"
                        title="Добавить задачу"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      {category.id !== 'default' && (
                        <button
                          onClick={() => handleDeleteCategory(category.id)}
                          className="p-1 hover:bg-red-500/10 rounded text-red-500"
                          title="Удалить категорию"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Add Task Input */}
                  {addingTaskToCategoryId === category.id && (
                    <div className="p-3 border-b border-[var(--color-border)]">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newTaskTitle}
                          onChange={(e) => setNewTaskTitle(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleAddTask(category.id)}
                          placeholder="Название задачи"
                          autoFocus
                          className="flex-1 px-3 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded focus:outline-none focus:border-[var(--color-primary)]"
                        />
                        <button
                          onClick={() => handleAddTask(category.id)}
                          className="px-3 py-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white rounded transition-colors"
                        >
                          +
                        </button>
                        <button
                          onClick={() => {
                            setAddingTaskToCategoryId(null);
                            setNewTaskTitle('');
                          }}
                          className="px-3 py-2 hover:bg-[var(--color-surface-hover)] rounded transition-colors"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Tasks List */}
                  <div className="p-0">
                    {categoryTasks.length === 0 ? (
                      <div className="text-center py-4 text-[var(--color-text-tertiary)]">
                        <p>Нет задач</p>
                      </div>
                    ) : (
                      <div>
                        {categoryTasks.map((task) => {
                          const hook = hooks.find(h => h.id === task.hookId);
                          return (
                            <div
                              key={task.id}
                              draggable
                              onDragStart={() => handleDragStart(task)}
                              onDragEnd={handleDragEnd}
                              onDragOver={(e) => handleTaskDragOver(e, task)}
                              onDrop={(e) => handleTaskDrop(e, task)}
                              className={`group relative flex items-center gap-3 p-3 border-b border-[var(--color-border)] last:border-b-0 hover:bg-[var(--color-surface-hover)] cursor-grab active:cursor-grabbing transition-all ${
                                draggedTask?.id === task.id ? 'opacity-50' : ''
                              }`}
                            >
                              {dropIndicator?.taskId === task.id && dropIndicator.position === 'top' && (
                                <div className="absolute top-0 left-0 right-0 h-0.5 bg-[var(--color-primary)] z-10" />
                              )}
                              {dropIndicator?.taskId === task.id && dropIndicator.position === 'bottom' && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-primary)] z-10" />
                              )}

                              <div 
                                className="flex-1 min-w-0"
                                onDoubleClick={(e) => {
                                  e.stopPropagation();
                                  handleStartEditingTask(task);
                                }}
                              >
                                {editingTaskId === task.id ? (
                                    <div className="relative w-full grid grid-cols-1">
                                        <div 
                                            ref={editBackdropRef}
                                            className="col-start-1 row-start-1 w-full text-sm whitespace-pre font-normal pointer-events-none overflow-hidden"
                                            aria-hidden="true"
                                            style={{ fontFamily: 'inherit' }}
                                        >
                                            {editTaskTitle.split(/((?:#|@)[\wа-яА-ЯёЁ]+)/g).map((part, i) => (
                                                <span key={i} className={part.startsWith('#') ? 'text-blue-400' : part.startsWith('@') ? 'text-green-400' : 'text-[var(--color-text-primary)]'}>
                                                    {part}
                                                </span>
                                            ))}
                                        </div>
                                        <input 
                                            ref={editInputRef}
                                            autoFocus
                                            type="text"
                                            value={editTaskTitle}
                                            onChange={e => setEditTaskTitle(e.target.value)}
                                            onScroll={() => {
                                                if (editBackdropRef.current && editInputRef.current) {
                                                    editBackdropRef.current.scrollLeft = editInputRef.current.scrollLeft;
                                                }
                                            }}
                                            onBlur={handleSaveEditingTask}
                                            onKeyDown={e => {
                                                if(e.key === 'Enter') handleSaveEditingTask();
                                                if(e.key === 'Escape') setEditingTaskId(null);
                                            }}
                                            className="col-start-1 row-start-1 w-full bg-transparent border-none p-0 focus:ring-0 text-sm relative z-10"
                                            style={{ color: 'transparent', caretColor: 'var(--color-text-primary)' }}
                                            onClick={e => e.stopPropagation()}
                                        />
                                    </div>
                                ) : (
                                    <p 
                                      className={`text-sm ${task.isDone ? 'line-through text-[var(--color-text-tertiary)]' : 'text-[var(--color-text-primary)]'}`}
                                      style={{ 
                                        opacity: Math.max(0.08, 1 - (Math.max(0, Math.floor((Date.now() - new Date(task.createdAt).getTime()) / (1000 * 60 * 60 * 24))) * 0.01))
                                      }}
                                    >
                                        {task.title}
                                    </p>
                                )}
                                {category.type === 'event' && (
                                    <div className="flex flex-wrap items-center gap-1 mt-1" onClick={e => e.stopPropagation()}>
                                        <input 
                                            type="datetime-local"
                                            className="text-[10px] bg-[var(--color-background)] border border-[var(--color-border)] rounded px-1 py-0.5 text-[var(--color-text-secondary)] focus:border-[var(--color-primary)] focus:outline-none max-w-[130px]"
                                            value={task.plannedStartTime ? toLocalISOString(task.plannedStartTime) : ''}
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                // Create date object preserving local time but storing as ISO
                                                const date = val ? new Date(val).toISOString() : null;
                                                updateTask(task.id, { plannedStartTime: date });
                                            }}
                                            title="Начало события"
                                        />
                                        <span className="text-[10px] text-[var(--color-text-tertiary)]">→</span>
                                        <input 
                                            type="datetime-local"
                                            className="text-[10px] bg-[var(--color-background)] border border-[var(--color-border)] rounded px-1 py-0.5 text-[var(--color-text-secondary)] focus:border-[var(--color-primary)] focus:outline-none max-w-[130px]"
                                            value={task.plannedEndTime ? toLocalISOString(task.plannedEndTime) : ''}
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                const date = val ? new Date(val).toISOString() : null;
                                                updateTask(task.id, { plannedEndTime: date });
                                            }}
                                            title="Конец события"
                                        />
                                        <button
                                            onClick={() => setRecurrenceTask(task)}
                                            className={`ml-1 p-1 rounded hover:bg-[var(--color-surface-hover)] transition-colors ${task.recurrence ? 'text-blue-400' : 'text-[var(--color-text-tertiary)]'}`}
                                            title="Повторять задачу"
                                        >
                                            <RefreshCw className="w-3 h-3" />
                                        </button>
                                    </div>
                                )}
                              </div>

                              <div className="flex items-center gap-3 text-xs text-[var(--color-text-tertiary)] flex-shrink-0">
                                {/* People */}
                                <div className="flex items-center">
                                    <div className="flex -space-x-1.5 hover:space-x-0.5 transition-all mr-1">
                                        {(task.assignedPeopleIds || [])
                                            .map(id => people.find(p => p.id === id))
                                            .filter(Boolean)
                                            .slice(0, 3)
                                            .map((person) => (
                                                <PersonAvatar 
                                                    key={person!.id} 
                                                    person={person!} 
                                                    size="sm" 
                                                    className="w-5 h-5 border border-[var(--color-background)]" 
                                                />
                                            ))
                                        }
                                        {(task.assignedPeopleIds?.length || 0) > 3 && (
                                            <div className="w-5 h-5 rounded-full bg-[var(--color-surface-hover)] border border-[var(--color-background)] flex items-center justify-center text-[9px] text-[var(--color-text-secondary)]">
                                                +{(task.assignedPeopleIds?.length || 0) - 3}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {task.priorityLevel && (
                                  <div className="px-1.5 py-0.5 rounded bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-medium">
                                    {task.priorityLevel}
                                  </div>
                                )}

                                {hook && (
                                  <span className="max-w-[100px] truncate" title={hook.title}>
                                    {hook.title}
                                  </span>
                                )}
                              </div>

                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteTask(task.id);
                                }}
                                className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-500 transition-opacity"
                                title="Удалить"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {recurrenceTask && (
        <TaskRecurrenceDialog 
          task={recurrenceTask}
          isOpen={true}
          onClose={() => setRecurrenceTask(null)}
          onSave={(recurrence) => {
             updateTask(recurrenceTask.id, { recurrence });
          }}
        />
      )}
    </div>
  );
}
