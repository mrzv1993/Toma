import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useApp } from '../context/AppContext';
import { Plus, Hash, Trash2, Folder, X, ChevronRight, ChevronDown } from 'lucide-react';
import { Hook } from '../types';

export function HooksColumn() {
  const { 
    hooks, 
    hookGroups,
    tasks, 
    createHook, 
    updateHook, 
    deleteHook, 
    createTask,
    createHookGroup,
    deleteHookGroup
  } = useApp();

  // State
  const [isAddingGroup, setIsAddingGroup] = useState(false);
  const [newGroupTitle, setNewGroupTitle] = useState('');
  const [isSubmittingGroup, setIsSubmittingGroup] = useState(false);
  
  const [addingHookToGroup, setAddingHookToGroup] = useState<string | null>(null);
  const [newHookTitle, setNewHookTitle] = useState('');
  const [isSubmittingHook, setIsSubmittingHook] = useState(false);
  
  const [editingHookId, setEditingHookId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  
  const [selectedHookId, setSelectedHookId] = useState<string | null>(null);
  
  const [quickTaskTitle, setQuickTaskTitle] = useState('');
  const [isSubmittingTask, setIsSubmittingTask] = useState(false);

  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set());
  
  // Drag and Drop State
  const [draggedHook, setDraggedHook] = useState<Hook | null>(null);
  const [dropIndicator, setDropIndicator] = useState<{ hookId: string, position: 'top' | 'bottom' } | null>(null);

  // Helper to get sort key for hooks
  const getHookSortKey = (hook: any) => {
    if (hook.position !== undefined && hook.position !== null) return hook.position;
    // Default: newest first (descending createdAt). 
    // We map this so smaller value = top.
    // Date.now() is large. -Date.now() is small (negative).
    // So newest (large date) -> small negative number -> Top.
    return -new Date(hook.createdAt).getTime();
  };

  // Derived Data
  const hooksWithCount = useMemo(() => hooks.map((hook) => ({
    ...hook,
    taskCount: tasks.filter((task) => task.hookId === hook.id).length,
  })), [hooks, tasks]);

  const groupedHooks = useMemo(() => {
    const groups: { [key: string]: typeof hooksWithCount } = {};
    
    // Sort hooks
    const sortedHooks = [...hooksWithCount].sort((a, b) => 
      getHookSortKey(a) - getHookSortKey(b)
    );

    sortedHooks.forEach(hook => {
      if (hook.groupId && hook.groupId !== 'default') {
        if (!groups[hook.groupId]) groups[hook.groupId] = [];
        groups[hook.groupId].push(hook);
      }
    });

    return { groups };
  }, [hooksWithCount]);

  // Handlers
  async function handleAddGroup() {
    if (!newGroupTitle.trim() || isSubmittingGroup) return;
    
    setIsSubmittingGroup(true);
    try {
      await createHookGroup(newGroupTitle);
      setNewGroupTitle('');
      setIsAddingGroup(false);
    } catch (error) {
      console.error('Failed to create group:', error);
    } finally {
      setIsSubmittingGroup(false);
    }
  }

  async function handleDeleteGroup(id: string) {
    if (!confirm('Удалить группу? Крючки будут перемещены в общий список.')) return;
    try {
      await deleteHookGroup(id);
    } catch (error) {
      console.error('Failed to delete group:', error);
    }
  }

  async function handleAddHook() {
    if (!newHookTitle.trim() || !addingHookToGroup) return;
    
    const title = newHookTitle;
    const groupId = addingHookToGroup === 'default' ? undefined : addingHookToGroup;
    
    setNewHookTitle('');
    
    createHook(title, groupId).catch((error) => {
      console.error('Failed to create hook:', error);
    });
  }

  async function handleUpdateHook(id: string) {
    if (!editTitle.trim()) return;
    try {
      await updateHook(id, { title: editTitle });
      setEditingHookId(null);
      setEditTitle('');
    } catch (error) {
      console.error('Failed to update hook:', error);
    }
  }

  async function handleDeleteHook(id: string) {
    if (!confirm('Удалить крючок? Связанные задачи останутся.')) return;
    try {
      if (selectedHookId === id) setSelectedHookId(null);
      await deleteHook(id);
    } catch (error) {
      console.error('Failed to delete hook:', error);
    }
  }

  async function handleQuickAddTask() {
    if (!quickTaskTitle.trim() || !selectedHookId) return;

    const title = quickTaskTitle;
    const hookId = selectedHookId;
    
    setQuickTaskTitle('');

    createTask(title, hookId).catch((error) => {
      console.error('Failed to create task:', error);
    });
  }

  const toggleGroupCollapse = (groupId: string) => {
    const newCollapsed = new Set(collapsedGroups);
    if (newCollapsed.has(groupId)) {
      newCollapsed.delete(groupId);
    } else {
      newCollapsed.add(groupId);
    }
    setCollapsedGroups(newCollapsed);
  };

  // Drag Handlers
  function handleHookDragStart(hook: Hook) {
    setDraggedHook(hook);
  }

  function handleHookDragOver(e: React.DragEvent, hook: Hook) {
    e.preventDefault();
    e.stopPropagation();
    if (draggedHook?.id === hook.id) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const midpoint = rect.top + rect.height / 2;
    const position = e.clientY < midpoint ? 'top' : 'bottom';
    
    setDropIndicator({ hookId: hook.id, position });
  }

  async function handleHookDrop(e: React.DragEvent, targetHook: Hook) {
    e.preventDefault();
    e.stopPropagation();
    
    if (!draggedHook || draggedHook.id === targetHook.id) {
        setDropIndicator(null);
        return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const midpoint = rect.top + rect.height / 2;
    const position = e.clientY < midpoint ? 'top' : 'bottom';

    const groupHooks = hooksWithCount
        .filter(h => h.groupId === targetHook.groupId && h.id !== draggedHook.id)
        .sort((a, b) => getHookSortKey(a) - getHookSortKey(b));
    
    const targetIndex = groupHooks.findIndex(h => h.id === targetHook.id);
    if (targetIndex === -1) return;

    let newPosition;
    if (position === 'top') {
        if (targetIndex === 0) {
             const targetPos = getHookSortKey(targetHook);
             newPosition = targetPos - 1000;
        } else {
             const prevHook = groupHooks[targetIndex - 1];
             newPosition = (getHookSortKey(prevHook) + getHookSortKey(targetHook)) / 2;
        }
    } else {
        if (targetIndex === groupHooks.length - 1) {
            newPosition = getHookSortKey(targetHook) + 1000;
        } else {
            const nextHook = groupHooks[targetIndex + 1];
            newPosition = (getHookSortKey(targetHook) + getHookSortKey(nextHook)) / 2;
        }
    }

    try {
        await updateHook(draggedHook.id, {
            groupId: targetHook.groupId,
            position: newPosition
        });
        setDraggedHook(null);
        setDropIndicator(null);
    } catch (error) {
        console.error('Failed to reorder hook', error);
    }
  }

  function handleDragEnd() {
    setDraggedHook(null);
    setDropIndicator(null);
  }

  async function handleGroupDrop(e: React.DragEvent, groupId: string) {
      e.preventDefault();
      if (!draggedHook) return;
      
      // If dropping on the same group without hitting a specific item (dropped on header or empty space)
      // we append to the end.
      // If we are already in this group, and no indicator, just return (no change).
      if (draggedHook.groupId === groupId && !dropIndicator) return;
      
      // Append to end
      const groupHooks = hooksWithCount
        .filter(h => h.groupId === groupId)
        .sort((a, b) => getHookSortKey(a) - getHookSortKey(b));
      
      const lastHook = groupHooks[groupHooks.length - 1];
      const newPosition = lastHook ? getHookSortKey(lastHook) + 1000 : Date.now();

      try {
          await updateHook(draggedHook.id, {
              groupId,
              position: newPosition
          });
          setDraggedHook(null);
          setDropIndicator(null);
      } catch (error) {
          console.error('Failed to move hook to group', error);
      }
  }

  const selectedHook = hooksWithCount.find((h) => h.id === selectedHookId);
  const selectedHookTasks = tasks
    .filter((t) => t.hookId === selectedHookId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="flex flex-col h-full bg-[var(--color-surface)] border-r border-[var(--color-border)] relative">
      {/* Header */}
      <div className="p-4 border-b border-[var(--color-border)] flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <h2>Крючки</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setIsAddingGroup(true)}
              className="p-2 hover:bg-[var(--color-surface-hover)] rounded transition-colors text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
              title="Добавить группу"
            >
              <Folder className="w-4 h-4" />
            </button>
          </div>
        </div>

        {isAddingGroup && (
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={newGroupTitle}
              onChange={(e) => setNewGroupTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddGroup();
                }
              }}
              placeholder="Название группы"
              autoFocus
              className="flex-1 px-3 py-2 bg-[var(--color-background)] border border-[var(--color-border)] rounded text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-primary)]"
            />
            <button
              onClick={handleAddGroup}
              disabled={isSubmittingGroup}
              className="px-3 py-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white rounded transition-colors disabled:opacity-50"
            >
              ✓
            </button>
            <button
              onClick={() => setIsAddingGroup(false)}
              className="px-3 py-2 hover:bg-[var(--color-surface-hover)] rounded transition-colors"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 min-h-0 space-y-6">
        {/* Groups */}
        {hookGroups.map(group => {
            const isCollapsed = collapsedGroups.has(group.id);
            return (
                <div 
                    key={group.id} 
                    className="space-y-2"
                    onDragOver={(e) => {
                        e.preventDefault();
                        // Allow drop on group container
                    }}
                    onDrop={(e) => {
                        // If drop target is exactly the group container or header (not handled by HookItem)
                        // We can check this, but event bubbling means HookItem drop handles it first.
                        // We use stopPropagation in HookItem drop.
                        handleGroupDrop(e, group.id);
                    }}
                >
                    <div className="flex items-center justify-between group/header sticky top-0 z-10 bg-[var(--color-surface)] py-2 -mt-2 mb-2">
                        <div 
                            className="flex items-center gap-2 cursor-pointer text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                            onClick={() => toggleGroupCollapse(group.id)}
                        >
                            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            <span className="font-medium text-sm">{group.title}</span>
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover/header:opacity-100 transition-opacity">
                            <button
                                onClick={() => setAddingHookToGroup(group.id)}
                                className="p-1 hover:bg-[var(--color-surface-hover)] rounded"
                                title="Добавить крючок в группу"
                            >
                                <Plus className="w-3 h-3" />
                            </button>
                            <button
                                onClick={() => handleDeleteGroup(group.id)}
                                className="p-1 hover:bg-red-500/10 rounded text-red-500"
                                title="Удалить группу"
                            >
                                <Trash2 className="w-3 h-3" />
                            </button>
                        </div>
                    </div>

                    {!isCollapsed && (
                        <div className="pl-2 space-y-1 border-l border-[var(--color-border)] ml-2 min-h-[10px]">
                            {addingHookToGroup === group.id && (
                                <div className="flex gap-2 mb-2 px-2">
                                    <input
                                        type="text"
                                        value={newHookTitle}
                                        onChange={(e) => setNewHookTitle(e.target.value)}
                                        onKeyDown={(e) => {
                                          if (e.key === 'Enter') {
                                            e.preventDefault();
                                            handleAddHook();
                                          }
                                        }}
                                        placeholder="Название крючка"
                                        autoFocus
                                        className="flex-1 px-2 py-1 text-sm bg-[var(--color-background)] border border-[var(--color-border)] rounded focus:outline-none focus:border-[var(--color-primary)]"
                                    />
                                    <button
                                        onClick={handleAddHook}
                                        disabled={isSubmittingHook}
                                        className="px-2 py-1 bg-[var(--color-primary)] text-white rounded text-xs disabled:opacity-50"
                                    >
                                        ✓
                                    </button>
                                    <button
                                        onClick={() => setAddingHookToGroup(null)}
                                        className="px-2 py-1 hover:bg-[var(--color-surface-hover)] rounded text-xs"
                                    >
                                        ✕
                                    </button>
                                </div>
                            )}

                            {groupedHooks.groups[group.id]?.map(hook => (
                                <HookItem
                                    key={hook.id}
                                    hook={hook}
                                    selectedHookId={selectedHookId}
                                    editingHookId={editingHookId}
                                    editTitle={editTitle}
                                    draggedHookId={draggedHook?.id}
                                    dropIndicator={dropIndicator}
                                    onSelect={setSelectedHookId}
                                    onEditStart={(id, title) => {
                                        setEditingHookId(id);
                                        setEditTitle(title);
                                    }}
                                    onEditUpdate={setEditTitle}
                                    onEditSave={handleUpdateHook}
                                    onDelete={handleDeleteHook}
                                    onDragStart={handleHookDragStart}
                                    onDragOver={handleHookDragOver}
                                    onDrop={handleHookDrop}
                                    onDragEnd={handleDragEnd}
                                />
                            ))}
                            {(!groupedHooks.groups[group.id] || groupedHooks.groups[group.id].length === 0) && !addingHookToGroup && (
                                <div className="text-xs text-[var(--color-text-tertiary)] px-2 py-1">
                                    Нет крючков
                                </div>
                            )}
                        </div>
                    )}
                </div>
            );
        })}


      </div>

      {/* Hook Details Modal (Portal) */}
      {selectedHookId && selectedHook && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div 
            className="w-full max-w-2xl bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg shadow-2xl flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
             {/* Modal Header */}
             <div className="flex items-center justify-between p-4 border-b border-[var(--color-border)] bg-[var(--color-surface)] shrink-0">
                <div className="flex items-center gap-3 overflow-hidden">
                    <div className="p-2 bg-[var(--color-primary)]/10 rounded text-[var(--color-primary)] shrink-0">
                        <Hash className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                        <h3 className="text-lg font-medium break-words leading-tight">{selectedHook.title}</h3>
                        <p className="text-xs text-[var(--color-text-tertiary)]">
                            {selectedHookTasks.length} задач
                        </p>
                    </div>
                </div>
                <button
                    onClick={() => setSelectedHookId(null)}
                    className="p-2 hover:bg-[var(--color-surface-hover)] rounded-full transition-colors shrink-0"
                >
                    <X className="w-5 h-5" />
                </button>
             </div>

             {/* Modal Content */}
             <div className="flex flex-col gap-4 flex-1 min-h-0 bg-[var(--color-background)]">
                {/* Quick Add Task Input */}
                <div className="flex gap-2 shrink-0">
                    <input
                        type="text"
                        value={quickTaskTitle}
                        onChange={(e) => setQuickTaskTitle(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleQuickAddTask();
                          }
                        }}
                        placeholder="Быстро добавить задачу..."
                        autoFocus
                        className="flex-1 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-primary)] transition-all shadow-sm m-[12px]"
                    />
                    <button
                        onClick={handleQuickAddTask}
                        disabled={!quickTaskTitle.trim() || isSubmittingTask}
                        className="px-4 py-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white rounded-lg transition-colors disabled:opacity-50 font-medium"
                    >
                        {isSubmittingTask ? '...' : <Plus className="w-5 h-5" />}
                    </button>
                </div>

                {/* Task History List */}
                <div className="flex-1 min-h-0 flex flex-col">
                    <h4 className="text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wider mb-[12px] mx-[0px] my-[12px] mt-[0px] mr-[0px] ml-[0px]">
                        История задач
                    </h4>
                    <div className="flex-1 overflow-y-auto space-y-2 pr-1">
                        {selectedHookTasks.length === 0 ? (
                            <div className="text-center py-8 text-[var(--color-text-tertiary)] bg-[var(--color-surface)]/50 rounded-lg border border-dashed border-[var(--color-border)]">
                                <p>История задач пуста</p>
                                <small>Добавьте первую задачу выше</small>
                            </div>
                        ) : (
                            selectedHookTasks.map((task) => (
                                <div
                                    key={task.id}
                                    className="p-3 bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] rounded-lg border border-[var(--color-border)] transition-colors group"
                                >
                                    <div className="flex items-start justify-between gap-2">
                                        <span className={`text-sm break-words ${task.isDone ? 'line-through text-[var(--color-text-tertiary)]' : 'text-[var(--color-text-primary)]'}`}>
                                            {task.title}
                                        </span>
                                        <span className="text-xs text-[var(--color-text-tertiary)] whitespace-nowrap">
                                            {Math.floor(task.spentTime / 60)}m
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between mt-2">
                                        <span className="text-[10px] text-[var(--color-text-tertiary)]">
                                            {new Date(task.createdAt).toLocaleDateString()}
                                        </span>
                                        {task.isDone && (
                                            <span className="text-[10px] text-[var(--color-success)] bg-[var(--color-success)]/10 px-2 py-0.5 rounded-full">
                                                Выполнено
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
             </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

// Helper Component for Hook Item
function HookItem({ 
  hook, 
  selectedHookId, 
  editingHookId, 
  editTitle, 
  draggedHookId,
  dropIndicator,
  onSelect, 
  onEditStart, 
  onEditUpdate, 
  onEditSave, 
  onDelete,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd
}: any) {
  return (
    <div
      className={`group relative p-3 rounded border cursor-pointer transition-all ${
        selectedHookId === hook.id
          ? 'bg-[var(--color-primary)]/10 border-[var(--color-primary)]'
          : 'bg-[var(--color-background)] border-[var(--color-border)] hover:border-[var(--color-primary)]/50'
      } ${draggedHookId === hook.id ? 'opacity-50' : ''}`}
      onClick={() => onSelect(hook.id)}
      draggable
      onDragStart={(e) => onDragStart(hook)}
      onDragEnd={onDragEnd}
      onDragOver={(e) => onDragOver(e, hook)}
      onDrop={(e) => onDrop(e, hook)}
    >
      {dropIndicator?.hookId === hook.id && dropIndicator.position === 'top' && (
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-[var(--color-primary)] z-10" />
      )}
      {dropIndicator?.hookId === hook.id && dropIndicator.position === 'bottom' && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-primary)] z-10" />
      )}

      {editingHookId === hook.id ? (
        <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => onEditUpdate(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                onEditSave(hook.id);
              }
            }}
            autoFocus
            className="flex-1 px-2 py-1 bg-[var(--color-background)] border border-[var(--color-border)] rounded focus:outline-none focus:border-[var(--color-primary)]"
          />
          <button
            onClick={() => onEditSave(hook.id)}
            className="px-2 py-1 bg-[var(--color-primary)] text-white rounded"
          >
            ✓
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <Hash className="w-4 h-4 text-[var(--color-primary)] flex-shrink-0" />
            <span className="truncate text-sm">{hook.title}</span>
            {hook.taskCount > 0 && (
                <span className="text-xs bg-[var(--color-surface-hover)] px-1.5 py-0.5 rounded text-[var(--color-text-secondary)]">
                    {hook.taskCount}
                </span>
            )}
          </div>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEditStart(hook.id, hook.title);
              }}
              className="p-1 hover:bg-[var(--color-surface-hover)] rounded text-[var(--color-text-secondary)]"
              title="Редактировать"
            >
              <span className="text-xs">✎</span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(hook.id);
              }}
              className="p-1 hover:bg-red-500/10 rounded text-red-500"
              title="Удалить"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
