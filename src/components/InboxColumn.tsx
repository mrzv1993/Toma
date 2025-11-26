import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Plus, Inbox, Trash2, Check } from 'lucide-react';
import { Task } from '../types';

export function InboxColumn() {
  const { 
    categories, 
    tasks, 
    createCategory, 
    deleteCategory, 
    createTask, 
    updateTask, 
    deleteTask,
    draggedTask,
    setDraggedTask,
    hooks
  } = useApp();
  const [newCategoryTitle, setNewCategoryTitle] = useState('');
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [addingTaskToCategoryId, setAddingTaskToCategoryId] = useState<string | null>(null);
  const [quickInboxTaskTitle, setQuickInboxTaskTitle] = useState('');
  const [isSubmittingQuickTask, setIsSubmittingQuickTask] = useState(false);
  const [dropIndicator, setDropIndicator] = useState<{ taskId: string; position: 'top' | 'bottom' } | null>(null);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editTaskTitle, setEditTaskTitle] = useState('');

  function handleStartEditingTask(task: Task) {
    setEditingTaskId(task.id);
    setEditTaskTitle(task.title);
  }

  async function handleSaveEditingTask() {
    if (!editingTaskId || !editTaskTitle.trim()) {
        setEditingTaskId(null);
        return;
    }
    try {
        await updateTask(editingTaskId, { title: editTaskTitle });
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

  // ... rest of the code ...

  function handleDragStart(task: Task) {
    setDraggedTask(task);
  }

  function handleDragEnd() {
    setDraggedTask(null);
    setDropIndicator(null);
  }

  async function handleDrop(categoryId: string) {
    if (!draggedTask) return;

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
      await createCategory(newCategoryTitle);
      setNewCategoryTitle('');
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

  function handleDragStart(task: Task) {
    setDraggedTask(task);
  }

  function handleDragEnd() {
    setDraggedTask(null);
  }

  async function handleDrop(categoryId: string) {
    if (!draggedTask) return;

    try {
      await updateTask(draggedTask.id, { categoryId });
      setDraggedTask(null);
    } catch (error) {
      console.error('Failed to move task:', error);
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

  return (
    <div className="flex flex-col h-full bg-[var(--color-surface)] border-r border-[var(--color-border)]">
      {/* Header */}
      <div className="p-4 border-b border-[var(--color-border)] flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <h2>Входящие</h2>
          <button
            onClick={() => setIsAddingCategory(true)}
            className="p-2 hover:bg-[var(--color-surface-hover)] rounded transition-colors"
            title="Добавить категорию"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <div className="flex gap-2 mb-4">
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
          <div className="flex gap-2">
            <input
              type="text"
              value={newCategoryTitle}
              onChange={(e) => setNewCategoryTitle(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()}
              placeholder="Название категории"
              autoFocus
              className="flex-1 px-3 py-2 bg-[var(--color-background)] border border-[var(--color-border)] rounded focus:outline-none focus:border-[var(--color-primary)]"
            />
            <button
              onClick={handleAddCategory}
              className="px-3 py-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white rounded transition-colors"
            >
              +
            </button>
            <button
              onClick={() => {
                setIsAddingCategory(false);
                setNewCategoryTitle('');
              }}
              className="px-3 py-2 hover:bg-[var(--color-surface-hover)] rounded transition-colors"
            >
              ✕
            </button>
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

                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  updateTask(task.id, { isDone: !task.isDone });
                                }}
                                className={`w-5 h-5 rounded-[4px] border ${
                                  task.isDone 
                                    ? 'bg-[var(--color-primary)] border-[var(--color-primary)]' 
                                    : 'border-[var(--color-text-tertiary)] hover:border-[var(--color-text-secondary)]'
                                } flex items-center justify-center flex-shrink-0 transition-colors`}
                              >
                                {task.isDone && <Check className="w-3 h-3 text-white" />}
                              </button>

                              <div 
                                className="flex-1 min-w-0"
                                onDoubleClick={(e) => {
                                  e.stopPropagation();
                                  handleStartEditingTask(task);
                                }}
                              >
                                {editingTaskId === task.id ? (
                                    <input 
                                        autoFocus
                                        type="text"
                                        value={editTaskTitle}
                                        onChange={e => setEditTaskTitle(e.target.value)}
                                        onBlur={handleSaveEditingTask}
                                        onKeyDown={e => {
                                            if(e.key === 'Enter') handleSaveEditingTask();
                                            if(e.key === 'Escape') setEditingTaskId(null);
                                        }}
                                        className="w-full bg-transparent border-none p-0 focus:ring-0 text-sm"
                                        onClick={e => e.stopPropagation()}
                                    />
                                ) : (
                                    <p className={`text-sm ${task.isDone ? 'line-through text-[var(--color-text-tertiary)]' : 'text-[var(--color-text-primary)]'}`}>
                                        {task.title}
                                    </p>
                                )}
                              </div>

                              <div className="flex items-center gap-3 text-xs text-[var(--color-text-tertiary)] flex-shrink-0">
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
    </div>
  );
}