import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Task, PRIORITY_LEVELS, SPRINT_DURATION_SECONDS } from '../types';
import { History, GripVertical, CheckCircle2, Circle, Play, Pause } from 'lucide-react';

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

export function SprintColumn() {
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
  } = useApp();

  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editTaskTitle, setEditTaskTitle] = useState('');
  const [dropIndicator, setDropIndicator] = useState<{ taskId: string; position: 'top' | 'bottom' } | null>(null);
  const [now, setNow] = useState(Date.now());

  React.useEffect(() => {
    if (!timer.isRunning) return;
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, [timer.isRunning]);

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

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
  }

  // Helper to perform cascade updates
  async function executeCascade(
      startTask: Task, 
      startLevel: number, 
      startPosition: number,
      simulatedLevels: { [key: number]: Task[] }
  ) {
      const updates: { taskId: string, update: any }[] = [];
      let currentTask: Task = startTask;
      let currentLevel = startLevel;
      let currentPosition = startPosition;

      while (true) {
          if (currentLevel < 1) {
               // Move to inbox
               updates.push({
                   taskId: currentTask.id,
                   update: {
                       sprintId: null,
                       priorityLevel: null,
                       priorityPosition: null,
                       categoryId: currentTask.categoryId || 'default'
                   }
               });
               break;
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
              const displacedTask = newLevelList[newLevelList.length - 1];
              
              updates.push({
                  taskId: currentTask.id,
                  update: {
                      sprintId: activeSprint?.id,
                      priorityLevel: currentLevel,
                      priorityPosition: currentPosition
                  }
              });
              
              simulatedLevels[currentLevel] = newLevelList.filter(t => t.id !== displacedTask.id);

              currentTask = displacedTask;
              currentLevel = currentLevel - 1;
              
              const nextLevelTasks = simulatedLevels[currentLevel - 1] || [];
              const topTask = nextLevelTasks[0];
              currentPosition = topTask ? (topTask.priorityPosition || 0) - 1000 : Date.now();
              if (nextLevelTasks.length === 0) currentPosition = Date.now(); 
          }
      }
      
      try {
        await Promise.all(updates.map(u => updateTask(u.taskId, u.update)));
        setDraggedTask(null);
        setDropIndicator(null);
      } catch (error) {
        console.error('Failed to move task:', error);
      }
  }

  async function handleDrop(priorityLevel: number) {
    if (!draggedTask) return;
    
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

      const rect = e.currentTarget.getBoundingClientRect();
      const midpoint = rect.top + rect.height / 2;
      const position = e.clientY < midpoint ? 'top' : 'bottom';
      
      setDropIndicator({ taskId: task.id, position });
  }

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

  async function handleToggleTimer(e: React.MouseEvent, task: Task) {
    e.stopPropagation();
    if (timer.taskId === task.id && timer.isRunning) {
        const currentSessionDuration = timer.startedAt 
            ? Math.floor((Date.now() - new Date(timer.startedAt).getTime()) / 1000)
            : 0;
        await pauseTimer((timer.elapsedTime || 0) + currentSessionDuration);
    } else {
        await startTimer(task.id);
    }
  }

  async function handleCompleteTask(taskId: string) {
    try {
      await completeTask(taskId);
    } catch (error) {
      console.error('Failed to complete task:', error);
    }
  }

  async function handleRemoveFromSprint(taskId: string) {
    if (!confirm('Убрать задачу из спринта?')) return;
    try {
      await moveTaskToInbox(taskId);
    } catch (error) {
      console.error('Failed to remove task from sprint:', error);
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
      9: 'var(--color-priority-9)',
      8: 'var(--color-priority-8)',
      7: 'var(--color-priority-7)',
      6: 'var(--color-priority-6)',
      5: 'var(--color-priority-5)',
      4: 'var(--color-priority-4)',
      3: 'var(--color-priority-3)',
      2: 'var(--color-priority-2)',
      1: 'var(--color-priority-1)',
    };
    return colors[level] || 'var(--color-text-tertiary)';
  }

  if (viewMode === 'history') {
    return (
      <div className="flex flex-col h-full bg-[var(--color-surface)] border-r border-[var(--color-border)]">
        {/* Header */}
        <div className="p-4 border-b border-[var(--color-border)] flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
            <h2>История спринтов</h2>
            <button
              onClick={() => {
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
                        Время: {formatTime(sprint.totalTime)}
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
            <h4 className="mb-3">Спринт #{selectedHistorySprint.number}</h4>
            <div className="space-y-2">
              {selectedHistorySprint.tasks.map((task) => (
                <div
                  key={task.taskId}
                  className="p-3 rounded bg-[var(--color-background)] border border-[var(--color-border)]"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2 flex-1">
                      {task.isDone ? (
                        <CheckCircle2 className="w-4 h-4 text-[var(--color-success)] flex-shrink-0 mt-0.5" />
                      ) : (
                        <Circle className="w-4 h-4 text-[var(--color-text-tertiary)] flex-shrink-0 mt-0.5" />
                      )}
                      <p className={task.isDone ? 'line-through text-[var(--color-text-tertiary)]' : ''}>
                        {task.title}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      <span
                        className="px-2 py-0.5 rounded text-white"
                        style={{ backgroundColor: getPriorityColor(task.priorityLevel) }}
                      >
                        P{10 - task.priorityLevel}
                      </span>
                      <small className="text-[var(--color-text-tertiary)]">
                        {formatTime(task.spentTime)}
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
      <div className="p-4 border-b border-[var(--color-border)]">
        <div className="flex items-center justify-between mb-2">
            <h2>Спринт #{activeSprint?.number || 1}</h2>
        </div>
        
        <div className="flex justify-between items-center text-xs text-[var(--color-text-secondary)] mb-2">
            <span>
                В работе: {(() => {
                    if (!activeSprint?.createdAt) return '0ч';
                    const start = new Date(activeSprint.createdAt).getTime();
                    const diffHours = Math.floor((now - start) / (1000 * 60 * 60));
                    const days = Math.floor(diffHours / 24);
                    const hours = diffHours % 24;
                    return days > 0 ? `${days}д ${hours}ч` : `${hours}ч`;
                })()}
            </span>
            <span>
                {formatTime(totalSprintTime)} / 9ч ({Math.round(progress)}%)
            </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-[var(--color-background)] rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--color-primary)] transition-all"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
        </div>

        {progress >= 100 && (
          <p className="mt-2 text-[var(--color-warning)]">
            Спринт завершён! Создан новый спринт.
          </p>
        )}
      </div>

      {/* Priority Levels */}
      <div className="flex-1 overflow-y-auto p-4 min-h-0">
        <div className="space-y-3">
          {Object.entries(PRIORITY_LEVELS)
            .sort(([a], [b]) => Number(b) - Number(a))
            .map(([level, capacity]) => {
              const levelNum = Number(level);
              const levelTasks = tasksByLevel[levelNum] || [];
              const displayLevel = 10 - levelNum;

              return (
                <div
                  key={level}
                  className="bg-[var(--color-background)] rounded border border-[var(--color-border)] transition-colors"
                  onDragOver={handleDragOver}
                  onDrop={() => handleDrop(levelNum)}
                >
                  {/* Level Header */}
                  <div
                    className="p-3 border-b border-[var(--color-border)] flex items-center justify-between"
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
                  <div className="p-2 min-h-[60px]">
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
                            className={`group relative flex items-center gap-2 p-2 rounded border border-[var(--color-border)] hover:border-[var(--color-primary)]/50 cursor-grab active:cursor-grabbing transition-all ${
                              draggedTask?.id === task.id ? 'opacity-50' : ''
                            } ${task.isDone ? 'bg-[var(--color-success)]/5' : ''}`}
                          >
                            {dropIndicator?.taskId === task.id && dropIndicator.position === 'top' && (
                                <div className="absolute top-0 left-0 right-0 h-0.5 bg-[var(--color-primary)] z-10" />
                            )}
                            {dropIndicator?.taskId === task.id && dropIndicator.position === 'bottom' && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-primary)] z-10" />
                            )}

                            <button
                              onClick={() => task.isDone ? updateTask(task.id, { isDone: false }) : handleCompleteTask(task.id)}
                              className="flex-shrink-0"
                            >
                              {task.isDone ? (
                                <CheckCircle2 className="w-5 h-5 text-[var(--color-success)]" />
                              ) : (
                                <Circle className="w-5 h-5 text-[var(--color-text-tertiary)] hover:text-[var(--color-success)]" />
                              )}
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
                                <p className={`truncate ${task.isDone ? 'line-through text-[var(--color-text-tertiary)]' : ''}`}>
                                  {task.title}
                                </p>
                              )}
                            </div>

                            <div className="flex items-center gap-2 flex-shrink-0">
                                <button
                                    onClick={(e) => handleToggleTimer(e, task)}
                                    className={`p-1 rounded hover:bg-[var(--color-surface-hover)] transition-all ${
                                        timer.taskId === task.id && timer.isRunning 
                                            ? 'opacity-100 text-[var(--color-primary)]' 
                                            : 'opacity-0 group-hover:opacity-100 text-[var(--color-text-secondary)]'
                                    }`}
                                    title={timer.taskId === task.id && timer.isRunning ? "Пауза" : "Запустить таймер"}
                                >
                                    {timer.taskId === task.id && timer.isRunning ? (
                                        <Pause className="w-4 h-4 fill-current" />
                                    ) : (
                                        <Play className="w-4 h-4 fill-current" />
                                    )}
                                </button>
                                <small className={`font-mono whitespace-nowrap ${
                                    timer.taskId === task.id && timer.isRunning 
                                        ? 'text-[var(--color-primary)] font-bold' 
                                        : 'text-[var(--color-text-tertiary)]'
                                }`}>
                                    {(() => {
                                        const totalSeconds = timer.taskId === task.id && timer.isRunning && timer.startedAt
                                            ? Math.floor((now - new Date(timer.startedAt).getTime()) / 1000) + (timer.elapsedTime || 0)
                                            : (task.spentTime || 0);
                                        const h = Math.floor(totalSeconds / 3600);
                                        const m = Math.floor((totalSeconds % 3600) / 60);
                                        const s = totalSeconds % 60;
                                        return h > 0 ? `${h}ч ${m}м ${s}с` : `${m}м ${s}с`;
                                    })()}
                                </small>
                            </div>
                            <button
                              onClick={() => handleRemoveFromSprint(task.id)}
                              className="p-1 opacity-0 group-hover:opacity-100 hover:bg-red-500/10 rounded text-red-500 transition-opacity flex-shrink-0"
                              title="Убрать из спринта"
                            >
                              ✕
                            </button>
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
      <div className="p-3 border-t border-[var(--color-border)] bg-[var(--color-surface)]">
          <button 
             onClick={() => setViewMode('history')}
             className="w-full flex items-center justify-center gap-2 p-2 text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] rounded transition-colors"
          >
             <History className="w-4 h-4" />
             <span>История спринтов</span>
          </button>
      </div>
    </div>
  );
}
