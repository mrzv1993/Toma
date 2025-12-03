import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { api } from '../utils/api';
import { Task, PRIORITY_LEVELS, SPRINT_DURATION_SECONDS } from '../types';
import { History, GripVertical, CheckSquare, Square, Play, Pause, Lock, RotateCw, BookOpen } from 'lucide-react';
import { PersonAvatar } from './people/PersonAvatar';
import { SprintJournalModal } from './SprintJournalModal';

const PRIORITY_NAMES: { [key: number]: string } = {
    1: 'Альфа',
    2: 'Бета',
    3: 'Гамма',
    4: 'Дельта',
    5: 'Эпсилон',
    6: 'Дзета',
    7: 'Эта',
    8: 'Тета',
    9: 'Йота'
};

export function SprintColumn({ isCollapsed, onToggleCollapse }: { isCollapsed?: boolean; onToggleCollapse?: () => void }) {
  const {
    tasks,
    activeSprint,
    sprintHistory,
    viewMode,
    setViewMode,
    selectedHistorySprint,
    setSelectedHistorySprint,
    updateTask,
    completeTask,
    moveTaskToInbox,
    draggedTask,
    setDraggedTask,
    timer,
    startTimer,
    pauseTimer,
    stopTimer,
    hooks,
    people,
    startSprint,
    setSelectedTask,
  } = useApp();

  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editTaskTitle, setEditTaskTitle] = useState('');
  const editInputRef = useRef<HTMLInputElement>(null);
  const editBackdropRef = useRef<HTMLDivElement>(null);
  const [dropIndicator, setDropIndicator] = useState<{ taskId: string; position: 'top' | 'bottom' } | null>(null);
  const [now, setNow] = useState(Date.now());
  const [isJournalOpen, setIsJournalOpen] = useState(false);
  const [isHistoryJournalOpen, setIsHistoryJournalOpen] = useState(false);

  React.useEffect(() => {
    if (!timer.isRunning) return;
    const interval = setInterval(() => {
        const currentTime = Date.now();
        setNow(currentTime);

        // Check Max Time Limit
        if (timer.taskId && timer.startedAt) {
            const task = tasks.find(t => t.id === timer.taskId);
            if (task && task.maxAllowedTime) {
                const elapsed = Math.floor((currentTime - new Date(timer.startedAt).getTime()) / 1000) + (timer.elapsedTime || 0);
                const maxSeconds = task.maxAllowedTime * 60;
                
                if (elapsed >= maxSeconds) {
                    // Stop timer and complete task
                    // Update task spent time to exactly match limit
                    completeTask(task.id).then(() => {
                        updateTask(task.id, { spentTime: maxSeconds });
                        alert(`Время вышло! Задача "${task.title}" автоматически завершена.`);
                    });
                }
            }
        }

        // Check Sprint Completion (9 hours)
        if (activeSprint?.startedAt && timer.startedAt) {
             const sprintTasks = tasks.filter(t => t.sprintId === activeSprint.id);
             const liveTotal = sprintTasks.reduce((sum, task) => {
                 if (timer.taskId === task.id) {
                     const currentSession = Math.floor((currentTime - new Date(timer.startedAt!).getTime()) / 1000);
                     return sum + task.spentTime + currentSession;
                 }
                 return sum + task.spentTime;
             }, 0);
             
             if (liveTotal >= SPRINT_DURATION_SECONDS) {
                 // Stop timer and open journal
                 const currentSession = Math.floor((currentTime - new Date(timer.startedAt!).getTime()) / 1000);
                 const newSpentTime = (timer.elapsedTime || 0) + currentSession;
                 
                 stopTimer(newSpentTime).then(() => {
                     setIsJournalOpen(true);
                     // alert("Рабочее время спринта (9 часов) истекло. Спринт завершён.");
                 });
             }
        }
    }, 1000);
    return () => clearInterval(interval);
  }, [timer.isRunning, timer.taskId, timer.startedAt, tasks, completeTask, activeSprint, stopTimer]);

  // Get sprint tasks
  const sprintTasks = tasks.filter((task) => task.sprintId === activeSprint?.id);
  const totalSprintTime = sprintTasks.reduce((sum, task) => sum + task.spentTime, 0);
  const progress = (totalSprintTime / SPRINT_DURATION_SECONDS) * 100;

  // Group tasks by priority level
  const tasksByLevel: { [key: number]: Task[] } = {};
  for (let level = 9; level >= 1; level--) {
    tasksByLevel[level] = sprintTasks
      .filter((task) => task.priorityLevel === level)
      .sort((a, b) => (a.priorityPosition || 0) - (b.priorityPosition || 0));
  }

  function handleDragStart(task: Task) {
    setDraggedTask(task);
  }

  function handleDragEnd() {
    setDraggedTask(null);
    setDropIndicator(null);
  }

  function handleDragOver(e: React.DragEvent, level: number) {
    if (draggedTask && draggedTask.spentTime > 60 && draggedTask.priorityLevel !== level) return;
    e.preventDefault();
  }

  // Helper to perform cascade updates
  async function executeCascade(
      startTask: Task, 
      startLevel: number, 
      startPosition: number,
      simulatedLevels: { [key: number]: Task[] }
  ) {
      try {
          const updates: { taskId: string, update: any }[] = [];
          let currentTask: Task = startTask;
          let currentLevel = startLevel;
          let currentPosition = startPosition;

          while (true) {
              if (currentLevel < 1) {
                   // Throw error to prevent removing from sprint
                   throw new Error("Cannot remove task from sprint");
              }

              const capacity = PRIORITY_LEVELS[currentLevel as keyof typeof PRIORITY_LEVELS];
              let levelTasks = simulatedLevels[currentLevel] || [];
              
              const taskWithNewPos = { ...currentTask, priorityLevel: currentLevel, priorityPosition: currentPosition };
              const newLevelList = [...levelTasks, taskWithNewPos].sort((a, b) => (a.priorityPosition || 0) - (b.priorityPosition || 0));
              
              if (newLevelList.length <= capacity) {
                  updates.push({
                      taskId: currentTask.id,
                      update: {
                          sprintId: activeSprint?.id,
                          priorityLevel: currentLevel,
                          priorityPosition: currentPosition
                      }
                  });
                  break;
              } else {
                  // Find the lowest priority task that is NOT locked (spentTime <= 60)
                  // Since the task being inserted is guaranteed to be unlocked (enforced by drag start),
                  // we will always find at least one unlocked task (the inserted one itself, in worst case).
                  const displacedTask = [...newLevelList].reverse().find(t => t.spentTime <= 60);
                  
                  if (!displacedTask) {
                       // This should theoretically not happen given our constraints
                       throw new Error("Could not find a valid task to displace");
                  }
                  
                  if (displacedTask.id !== currentTask.id) {
                      updates.push({
                          taskId: currentTask.id,
                          update: {
                              sprintId: activeSprint?.id,
                              priorityLevel: currentLevel,
                              priorityPosition: currentPosition
                          }
                      });
                  }
                  
                  simulatedLevels[currentLevel] = newLevelList.filter(t => t.id !== displacedTask.id);

                  currentTask = displacedTask;
                  currentLevel = currentLevel - 1;
                  
                  const nextLevelTasks = simulatedLevels[currentLevel - 1] || [];
                  const topTask = nextLevelTasks[0];
                  currentPosition = topTask ? (topTask.priorityPosition || 0) - 1000 : Date.now();
                  if (nextLevelTasks.length === 0) currentPosition = Date.now(); 
              }
          }
          
          await Promise.all(updates.map(u => updateTask(u.taskId, u.update)));
          setDraggedTask(null);
          setDropIndicator(null);
      } catch (error: any) {
          if (error.message === "Cannot remove task from sprint") {
              alert("Задачи нельзя убирать из спринта");
          } else {
              console.error('Failed to move task:', error);
          }
      }
  }

  async function handleDrop(priorityLevel: number) {
    if (!draggedTask) return;
    
    if (draggedTask.spentTime > 60 && draggedTask.priorityLevel !== priorityLevel) return;

    if (draggedTask.sprintId === activeSprint?.id && draggedTask.priorityLevel === priorityLevel) {
      setDraggedTask(null);
      setDropIndicator(null);
      return;
    }

    const simulatedLevels: { [key: number]: Task[] } = {};
    for (let i = 1; i <= 9; i++) {
      simulatedLevels[i] = tasksByLevel[i] ? [...tasksByLevel[i]] : [];
    }
    
    if (draggedTask.sprintId === activeSprint?.id && draggedTask.priorityLevel) {
        simulatedLevels[draggedTask.priorityLevel] = simulatedLevels[draggedTask.priorityLevel].filter(t => t.id !== draggedTask.id);
    }

    const levelTasks = simulatedLevels[priorityLevel];
    const lastTask = levelTasks[levelTasks.length - 1];
    const newPos = lastTask ? (lastTask.priorityPosition || 0) + 1000 : Date.now();

    await executeCascade(draggedTask, priorityLevel, newPos, simulatedLevels);
  }

  async function handleTaskDrop(e: React.DragEvent, targetTask: Task) {
      e.preventDefault();
      e.stopPropagation();
      
      if (!draggedTask || draggedTask.id === targetTask.id) return;

      if (draggedTask.spentTime > 60 && draggedTask.priorityLevel !== targetTask.priorityLevel) return;

      const rect = e.currentTarget.getBoundingClientRect();
      const midpoint = rect.top + rect.height / 2;
      const position = e.clientY < midpoint ? 'top' : 'bottom';
      
      const targetLevel = targetTask.priorityLevel!;
      
      const simulatedLevels: { [key: number]: Task[] } = {};
      for (let i = 1; i <= 9; i++) {
          simulatedLevels[i] = tasksByLevel[i] ? [...tasksByLevel[i]] : [];
      }
      if (draggedTask.sprintId === activeSprint?.id && draggedTask.priorityLevel) {
          simulatedLevels[draggedTask.priorityLevel] = simulatedLevels[draggedTask.priorityLevel].filter(t => t.id !== draggedTask.id);
      }

      const levelTasks = simulatedLevels[targetLevel];
      const targetIndex = levelTasks.findIndex(t => t.id === targetTask.id);
      
      let newPos;
      if (targetIndex === -1) {
          newPos = (targetTask.priorityPosition || 0) + 1000;
      } else {
          if (position === 'top') {
              if (targetIndex === 0) {
                  newPos = (levelTasks[0].priorityPosition || 0) - 1000;
              } else {
                  const prev = levelTasks[targetIndex - 1];
                  newPos = ((prev.priorityPosition || 0) + (targetTask.priorityPosition || 0)) / 2;
              }
          } else {
              if (targetIndex === levelTasks.length - 1) {
                  newPos = (targetTask.priorityPosition || 0) + 1000;
              } else {
                  const next = levelTasks[targetIndex + 1];
                  newPos = ((targetTask.priorityPosition || 0) + (next.priorityPosition || 0)) / 2;
              }
          }
      }

      await executeCascade(draggedTask, targetLevel, newPos, simulatedLevels);
  }

  function handleTaskDragOver(e: React.DragEvent, task: Task) {
      e.preventDefault();
      e.stopPropagation();
      if (draggedTask?.id === task.id) return;

      if (draggedTask && draggedTask.spentTime > 60 && draggedTask.priorityLevel !== task.priorityLevel) {
          setDropIndicator(null);
          return;
      }

      const rect = e.currentTarget.getBoundingClientRect();
      const midpoint = rect.top + rect.height / 2;
      const position = e.clientY < midpoint ? 'top' : 'bottom';
      
      setDropIndicator({ taskId: task.id, position });
  }

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

  async function handleToggleTimer(e: React.MouseEvent, task: Task) {
    e.stopPropagation();
    if (task.isDone) return; // Prevent timer on completed tasks

    if (timer.taskId === task.id && timer.isRunning) {
        const currentSessionDuration = timer.startedAt 
            ? Math.floor((Date.now() - new Date(timer.startedAt).getTime()) / 1000)
            : 0;
        await pauseTimer((timer.elapsedTime || 0) + currentSessionDuration);
    } else {
        // Client-side validation for Min/Max time
        if (activeSprint?.startedAt) {
            // 1. Check Max Time
            if (typeof task.maxAllowedTime === 'number' && task.maxAllowedTime > 0) {
                const maxSeconds = task.maxAllowedTime * 60;
                const spent = (task.spentTime || 0); // Only count time in CURRENT sprint
                if (spent >= maxSeconds) {
                    const spentMinutes = Math.floor(spent / 60);
                    alert(`Лимит времени на задачу исчерпан. (Лимит: ${task.maxAllowedTime} мин, Затрачено в этом спринте: ${spentMinutes} мин)`);
                    return;
                }
            }

            // 2. Check Min Time Rule
            // Calculate TRUE sprint elapsed time (sum of all task durations IN THIS SPRINT)
            const sprintTasks = tasks.filter(t => t.sprintId === activeSprint.id);
            const elapsed = sprintTasks.reduce((sum, t) => sum + (t.spentTime || 0), 0); // Only count spentTime
            const remaining = Math.max(0, SPRINT_DURATION_SECONDS - elapsed);
            
            const unfinishedTasks = tasks.filter(t => t.sprintId === activeSprint.id && !t.isDone);
            const totalMinTime = unfinishedTasks.reduce((sum, t) => sum + (t.minRequiredTime || 0), 0) * 60;
            
            if (remaining <= totalMinTime) {
                if (!task.minRequiredTime) {
                    alert('Недостаточно времени. Сначала завершите задачи с минимальным временем.');
                    return;
                }
            }
        }

        try {
            await startTimer(task.id);
        } catch (error: any) {
            alert(error.message || "Не удалось запустить таймер");
        }
    }
  }

  async function handleCompleteTask(taskId: string) {
    try {
      if (timer.taskId === taskId && timer.isRunning) {
          const currentSessionDuration = timer.startedAt 
              ? Math.floor((Date.now() - new Date(timer.startedAt).getTime()) / 1000)
              : 0;
          await pauseTimer((timer.elapsedTime || 0) + currentSessionDuration);
      }
      await completeTask(taskId);
    } catch (error) {
      console.error('Failed to complete task:', error);
    }
  }

  function formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}ч ${minutes}м`;
    }
    return `${minutes}м`;
  }

  function getPriorityColor(level: number): string {
    const colors: { [key: number]: string } = {
      9: '#22c55e', // Alpha (Green)
      8: '#4ade80',
      7: '#84cc16',
      6: '#a3e635',
      5: '#facc15',
      4: '#fbbf24',
      3: '#fb923c',
      2: '#f87171',
      1: '#ef4444', // Iota (Red)
    };
    return colors[level] || '#94a3b8';
  }

  if (isCollapsed) {
    return (
      <div 
        className="flex flex-col h-full bg-[var(--color-surface)] border-r border-[var(--color-border)] items-center py-4 cursor-pointer hover:bg-[var(--color-surface-hover)] transition-colors"
        onClick={onToggleCollapse}
      >
        <div className="whitespace-nowrap font-medium text-sm text-[var(--color-text-secondary)] select-none" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
          Спринт
        </div>
      </div>
    );
  }

  if (viewMode === 'history') {
    return (
      <div className="flex flex-col h-full bg-[var(--color-surface)] border-r border-[var(--color-border)]">
        {/* Header */}
        <div 
          className="p-4 border-b border-[var(--color-border)] flex-shrink-0 cursor-pointer hover:bg-[var(--color-surface-hover)] transition-colors"
          onClick={onToggleCollapse}
        >
          <div className="flex items-center justify-between mb-4">
            <h2>История спринтов</h2>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setViewMode('current');
                setSelectedHistorySprint(null);
              }}
              className="px-3 py-1 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white rounded transition-colors"
            >
              Текущий спринт
            </button>
          </div>
        </div>

        {/* Sprint History List */}
        <div className="flex-1 overflow-y-auto p-4 min-h-0">
          {sprintHistory.length === 0 ? (
            <div className="text-center py-8 text-[var(--color-text-tertiary)]">
              <History className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>Нет завершённых спринтов</p>
            </div>
          ) : (
            <div className="space-y-2">
              {sprintHistory
                .slice()
                .reverse()
                .map((sprint) => (
                  <div
                    key={sprint.id}
                    onClick={() => setSelectedHistorySprint(sprint)}
                    className={`p-4 rounded border cursor-pointer transition-all ${
                      selectedHistorySprint?.id === sprint.id
                        ? 'bg-[var(--color-primary)]/10 border-[var(--color-primary)]'
                        : 'bg-[var(--color-background)] border-[var(--color-border)] hover:border-[var(--color-primary)]/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4>Спринт #{sprint.number}</h4>
                      <span className="text-[var(--color-text-tertiary)]">
                        {new Date(sprint.completedAt!).toLocaleDateString('ru-RU')}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <small className="text-[var(--color-text-secondary)]">
                        Время: {sprint.startedAt && sprint.completedAt 
                          ? formatTime((new Date(sprint.completedAt).getTime() - new Date(sprint.startedAt).getTime()) / 1000)
                          : '0м'}
                      </small>
                      <small className="text-[var(--color-text-secondary)]">
                        Задач: {sprint.tasks.length}
                      </small>
                      <small className="text-[var(--color-success)]">
                        Выполнено: {sprint.tasks.filter((t) => t.isDone).length}
                      </small>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* Selected Sprint Details */}
        {selectedHistorySprint && (
          <div className="border-t border-[var(--color-border)] p-4 max-h-96 overflow-y-auto">
            <div className="flex items-center justify-between mb-3">
                <h4 className="mb-0">Спринт #{selectedHistorySprint.number}</h4>
                {selectedHistorySprint.journal && (
                    <button
                        onClick={() => setIsHistoryJournalOpen(true)}
                        className="p-3 md:p-2 hover:bg-[var(--color-surface-hover)] rounded text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                        title="Открыть журнал спринта"
                    >
                        <BookOpen className="w-4 h-4" />
                    </button>
                )}
            </div>
            <div className="flex flex-col rounded border border-[var(--color-border)] overflow-hidden">
              {selectedHistorySprint.tasks
                .slice()
                .sort((a, b) => {
                    const timeA = (a.spentTime || 0) + (a.archivedTime || 0);
                    const timeB = (b.spentTime || 0) + (b.archivedTime || 0);
                    if (timeB !== timeA) return timeB - timeA;
                    return (b.priorityLevel || 0) - (a.priorityLevel || 0);
                })
                .map((task) => (
                <div
                  key={task.id}
                  className="flex bg-[var(--color-background)] border-b border-[var(--color-border)] last:border-b-0"
                >
                  <div 
                    style={{ width: '6px', backgroundColor: getPriorityColor(task.priorityLevel) }} 
                    className="flex-shrink-0"
                  />
                  <div className="flex-1 p-3 flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2 flex-1">
                      {task.isDone ? (
                        <CheckSquare className="w-4 h-4 text-[var(--color-success)] flex-shrink-0 mt-0.5" />
                      ) : (
                        <Square className="w-4 h-4 text-[var(--color-text-tertiary)] flex-shrink-0 mt-0.5" />
                      )}
                      <p className={task.isDone ? 'line-through text-[var(--color-text-tertiary)]' : ''}>
                        {task.title}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      <small className="text-[var(--color-text-tertiary)]">
                        {formatTime((task.spentTime || 0) + (task.archivedTime || 0))}
                      </small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[var(--color-surface)] border-r border-[var(--color-border)]">
      {/* Header */}
      <div 
        className="p-4 border-b border-[var(--color-border)] cursor-pointer hover:bg-[var(--color-surface-hover)] transition-colors"
        onClick={onToggleCollapse}
      >
        <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
                <h2>Спринт #{activeSprint?.number || 1}</h2>
                {activeSprint?.startedAt ? (
                    <span className="text-[var(--color-text-tertiary)] text-sm font-normal">(9ч)</span>
                ) : (
                    <span className="px-2 py-0.5 rounded bg-yellow-500/10 text-yellow-500 text-xs font-bold">
                        Подготовка
                    </span>
                )}
            </div>
            {!activeSprint?.startedAt ? (
                <button
                    onClick={async (e) => {
                        e.stopPropagation();
                        if (confirm('Запустить спринт?')) {
                            try {
                                await startSprint();
                            } catch (err) {
                                console.error(err);
                            }
                        }
                    }}
                    className="px-3 py-2 md:py-1 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-xs font-bold rounded transition-colors flex items-center gap-1"
                    title="Запустить спринт"
                >
                    <Play className="w-3 h-3 fill-current" />
                    ЗАПУСК
                </button>
            ) : (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsJournalOpen(true);
                    }}
                    className="p-3 md:p-2 hover:bg-[var(--color-surface-hover)] rounded text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                    title="Завершить спринт"
                >
                    <RotateCw className="w-4 h-4" />
                </button>
            )}
        </div>
        
        <div className="flex justify-between items-center text-xs text-[var(--color-text-secondary)] mb-2">
            <span>
                В работе: {(() => {
                    if (!activeSprint?.startedAt) return 'Подготовка';
                    const start = new Date(activeSprint.startedAt).getTime();
                    const diffMs = now - start;
                    const totalMinutes = Math.floor(diffMs / (1000 * 60));
                    const hours = Math.floor(totalMinutes / 60);
                    const minutes = totalMinutes % 60;
                    return hours > 0 ? `${hours}ч ${minutes}м` : `${minutes}м`;
                })()}
            </span>
            <span>
                {(() => {
                    const liveTotal = sprintTasks.reduce((sum, task) => {
                        if (timer.taskId === task.id && timer.isRunning && timer.startedAt) {
                            return sum + task.spentTime + Math.floor((now - new Date(timer.startedAt).getTime()) / 1000);
                        }
                        return sum + task.spentTime;
                    }, 0);
                    const liveProgress = (liveTotal / SPRINT_DURATION_SECONDS) * 100;
                    return `${formatTime(liveTotal)} (${Math.round(liveProgress)}%)`;
                })()}
            </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-[var(--color-background)] rounded-full overflow-hidden flex">
            {Object.entries(tasksByLevel)
              .sort(([a], [b]) => Number(b) - Number(a))
              .map(([level, levelTasks]) => {
                const levelNum = Number(level);
                const levelTime = levelTasks.reduce((sum, task) => {
                  if (timer.taskId === task.id && timer.isRunning && timer.startedAt) {
                    return sum + task.spentTime + Math.floor((now - new Date(timer.startedAt).getTime()) / 1000);
                  }
                  return sum + task.spentTime;
                }, 0);
                
                const width = (levelTime / SPRINT_DURATION_SECONDS) * 100;
                
                if (width <= 0) return null;
                
                return (
                  <div
                    key={level}
                    className="h-full transition-all flex-shrink-0"
                    style={{ 
                      width: `${width}%`, 
                      backgroundColor: getPriorityColor(levelNum) 
                    }}
                  />
                );
              })}
        </div>

        {progress >= 100 && (
          <p className="mt-2 text-[var(--color-warning)]">
            Спринт завершён! Нажмите кнопку обновления, чтобы начать новый.
          </p>
        )}
      </div>

      {activeSprint && isJournalOpen && (
        <SprintJournalModal
            isOpen={isJournalOpen}
            onClose={() => setIsJournalOpen(false)}
            sprint={activeSprint}
            tasks={tasks}
        />
      )}

      {selectedHistorySprint && isHistoryJournalOpen && (
        <SprintJournalModal
            isOpen={isHistoryJournalOpen}
            onClose={() => setIsHistoryJournalOpen(false)}
            sprint={selectedHistorySprint}
            tasks={selectedHistorySprint.tasks}
            readOnly={true}
            initialAnswers={selectedHistorySprint.journal}
        />
      )}

      {/* Priority Levels */}
      <div className="flex-1 overflow-y-auto p-4 min-h-0">
        <div className="space-y-1">
          {Object.entries(PRIORITY_LEVELS)
            .sort(([a], [b]) => Number(b) - Number(a))
            .map(([level, capacity]) => {
              const levelNum = Number(level);
              const levelTasks = tasksByLevel[levelNum] || [];
              const displayLevel = 10 - levelNum;

              return (
                <div
                  key={level}
                  className="bg-[var(--color-background)] rounded transition-colors"
                  onDragOver={(e) => handleDragOver(e, levelNum)}
                  onDrop={() => handleDrop(levelNum)}
                >
                  {/* Level Header */}
                  <div
                    className="p-3 flex items-center justify-between"
                    style={{
                      backgroundColor: `${getPriorityColor(levelNum)}15`,
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="px-[8px] py-0.5 rounded text-white text-sm font-bold"
                        style={{ backgroundColor: getPriorityColor(levelNum) }}
                      >
                        {PRIORITY_NAMES[displayLevel]}
                      </span>
                    </div>
                    <small className="text-[var(--color-text-tertiary)]">
                      {levelTasks.length}/{capacity}
                    </small>
                  </div>

                  {/* Tasks */}
                  <div className="">
                    {levelTasks.length === 0 ? (
                      <div className="text-center py-4 text-[var(--color-text-tertiary)]">
                        <p>Перетащите задачи сюда</p>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        {levelTasks.map((task, index) => (
                          <div
                            key={task.id}
                            draggable
                            onDragStart={() => handleDragStart(task)}
                            onDragEnd={handleDragEnd}
                            onDragOver={(e) => handleTaskDragOver(e, task)}
                            onDrop={(e) => handleTaskDrop(e, task)}
                            onClick={() => setSelectedTask(task)}
                            className={`group relative flex items-center gap-2 p-3 md:p-2 rounded cursor-grab active:cursor-grabbing transition-all hover:bg-[var(--color-surface-hover)] ${
                              draggedTask?.id === task.id ? 'opacity-50' : ''
                            } ${task.isDone ? 'bg-[var(--color-success)]/5' : ''}`}
                          >
                            {dropIndicator?.taskId === task.id && dropIndicator.position === 'top' && (
                                <div className="absolute top-0 left-0 right-0 h-0.5 bg-[var(--color-primary)] z-10" />
                            )}
                            {dropIndicator?.taskId === task.id && dropIndicator.position === 'bottom' && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-primary)] z-10" />
                            )}

                            {/* Checkbox */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                const isTimeoutCompleted = task.isDone && task.maxAllowedTime && task.spentTime >= task.maxAllowedTime * 60;
                                if (isTimeoutCompleted) {
                                    alert("Задача завершена автоматически по истечении времени и не может быть возобновлена.");
                                    return;
                                }
                                task.isDone ? updateTask(task.id, { isDone: false }) : handleCompleteTask(task.id);
                              }}
                              className={`flex-shrink-0 p-1 -m-1 md:p-0 md:m-0 ${task.isDone && task.maxAllowedTime && task.spentTime >= task.maxAllowedTime * 60 ? 'cursor-not-allowed opacity-50' : ''}`}
                            >
                              {task.isDone ? (
                                task.maxAllowedTime && task.spentTime >= task.maxAllowedTime * 60 ? (
                                    <Lock className="w-5 h-5 text-[var(--color-text-tertiary)]" />
                                ) : (
                                    <CheckSquare className="w-5 h-5 text-[var(--color-success)]" />
                                )
                              ) : (
                                <Square className="w-5 h-5 text-[var(--color-text-tertiary)] hover:text-[var(--color-success)]" />
                              )}
                            </button>
                            
                            {task.spentTime > 60 && (
                                <Lock className="w-3 h-3 text-[var(--color-text-tertiary)] flex-shrink-0" />
                            )}
                            
                            <div 
                              className="flex-1 min-w-0 flex items-center gap-2"
                            >
                              {editingTaskId === task.id ? (
                                  <div className="relative flex-1 min-w-0 grid grid-cols-1">
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
                                  className={`flex-1 min-w-0 truncate ${task.isDone ? 'line-through text-[var(--color-text-tertiary)]' : ''}`}
                                  style={{ 
                                    opacity: Math.max(0.08, 1 - (Math.max(0, Math.floor((Date.now() - new Date(task.createdAt).getTime()) / (1000 * 60 * 60 * 24))) * 0.01))
                                  }}
                                >
                                  {task.title}
                                </p>
                                )}
                            
                            {/* Min/Max Time Inputs or Badges */}
                            <div 
                                className="flex items-center gap-2 flex-shrink-0"
                                onClick={e => e.stopPropagation()}
                                onDoubleClick={e => e.stopPropagation()}
                            >
                                {!activeSprint?.startedAt ? (
                                    // Preparation Mode: Inputs
                                    <>
                                        <div className="flex items-center gap-1" title="Минимальное необходимое время (мин)">
                                            <span className="text-[10px] text-[var(--color-text-tertiary)] font-mono uppercase">Min</span>
                                            <input
                                                type="number"
                                                min="0"
                                                placeholder="0"
                                                className="w-14 h-8 md:w-10 md:h-5 text-sm md:text-xs px-1 bg-[var(--color-background)] border border-[var(--color-border)] rounded text-center focus:border-[var(--color-primary)] focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                value={task.minRequiredTime || ''}
                                                onChange={(e) => {
                                                    const val = parseInt(e.target.value);
                                                    updateTask(task.id, { minRequiredTime: isNaN(val) || val === 0 ? null : val });
                                                }}
                                            />
                                        </div>
                                        <div className="flex items-center gap-1" title="Максимальное допустимое время (мин)">
                                            <span className="text-[10px] text-[var(--color-text-tertiary)] font-mono uppercase">Max</span>
                                            <input
                                                type="number"
                                                min="0"
                                                placeholder="∞"
                                                className="w-14 h-8 md:w-10 md:h-5 text-sm md:text-xs px-1 bg-[var(--color-background)] border border-[var(--color-border)] rounded text-center focus:border-[var(--color-primary)] focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                value={task.maxAllowedTime || ''}
                                                onChange={(e) => {
                                                    const val = parseInt(e.target.value);
                                                    updateTask(task.id, { maxAllowedTime: isNaN(val) || val <= 0 ? null : val });
                                                }}
                                            />
                                        </div>
                                    </>
                                ) : (
                                    // Active/History Mode: Badges
                                    <>
                                        {task.minRequiredTime && (
                                            <span className="text-xs md:text-[10px] px-2 py-1 md:px-1.5 md:py-0.5 bg-blue-500/10 text-blue-500 rounded font-medium" title="Минимальное время">
                                                Min: {task.minRequiredTime}м
                                            </span>
                                        )}
                                        {task.maxAllowedTime && (
                                            <span className="text-xs md:text-[10px] px-2 py-1 md:px-1.5 md:py-0.5 bg-red-500/10 text-red-500 rounded font-medium" title="Максимальное время">
                                                Max: {task.maxAllowedTime}м
                                            </span>
                                        )}
                                    </>
                                )}
                            </div>
                            </div>

                            <div className="flex items-center gap-2 flex-shrink-0">
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

                                {!task.isDone && activeSprint?.startedAt && (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleToggleTimer(e, task);
                                        }}
                                        className={`p-2 md:p-1 rounded hover:bg-[var(--color-surface-hover)] transition-all ${
                                            timer.taskId === task.id && timer.isRunning 
                                                ? 'opacity-100 text-[var(--color-primary)]' 
                                                : 'opacity-100 md:opacity-0 md:group-hover:opacity-100 text-[var(--color-text-secondary)]'
                                        }`}
                                        title={timer.taskId === task.id && timer.isRunning ? "Пауза" : "Запустить таймер"}
                                    >
                                        {timer.taskId === task.id && timer.isRunning ? (
                                            <Pause className="w-4 h-4 fill-current" />
                                        ) : (
                                            <Play className="w-4 h-4 fill-current" />
                                        )}
                                    </button>
                                )}
                                {(() => {
                                  const isRunning = timer.taskId === task.id && timer.isRunning;
                                  const hasTime = (task.spentTime || 0) > 0 || isRunning;
                                  
                                  if (!hasTime) {
                                    return null;
                                  }

                                  return (
                                    <small className={`font-mono whitespace-nowrap ${
                                        isRunning
                                            ? 'text-[var(--color-primary)] font-bold' 
                                            : 'text-[var(--color-text-tertiary)]'
                                    }`}>
                                        {(() => {
                                            const totalSeconds = (isRunning && timer.startedAt
                                                ? Math.floor((now - new Date(timer.startedAt).getTime()) / 1000) + (timer.elapsedTime || 0)
                                                : (task.spentTime || 0));
                                            const h = Math.floor(totalSeconds / 3600);
                                            const m = Math.floor((totalSeconds % 3600) / 60);
                                            const s = totalSeconds % 60;
                                            return h > 0 ? `${h}ч ${m}м ${s}с` : `${m}м ${s}с`;
                                        })()}
                                    </small>
                                  );
                                })()}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Footer: Sprint History */}
      <div className="p-3 border-t border-[var(--color-border)] bg-[var(--color-surface)] flex gap-2">
          <button 
             onClick={() => setViewMode('history')}
             className="flex-1 flex items-center justify-center gap-2 p-3 md:p-2 text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] rounded transition-colors"
          >
             <History className="w-4 h-4" />
             <span>История спринтов</span>
          </button>
      </div>
    </div>
  );
}
