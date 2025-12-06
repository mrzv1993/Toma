import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Plus, Target, Trash2, Check } from 'lucide-react';
import { Task } from '../types';
import { PersonAvatar } from './people/PersonAvatar';
import { GoalRelationsDialog } from './GoalRelationsDialog';

interface GoalsColumnProps {
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

const GOAL_TYPES = [
  { title: 'Краткосрочные', key: 'short' },
  { title: 'Среднесрочные', key: 'medium' },
  { title: 'Долгосрочные', key: 'long' },
];

export function GoalsColumn({ isCollapsed, onToggleCollapse }: GoalsColumnProps) {
  const { 
    user,
    categories, 
    tasks, 
    createCategory, 
    createTask, 
    updateTask, 
    deleteTask,
    people,
    hooks,
    setDraggedTask,
    draggedTask
  } = useApp();

  const [newTaskTitles, setNewTaskTitles] = React.useState<Record<string, string>>({});
  const [isInitializing, setIsInitializing] = React.useState(false);
  const [relationsTask, setRelationsTask] = React.useState<Task | null>(null);

  // Find goal categories
  const goalCategories = GOAL_TYPES.map(type => {
    return {
      ...type,
      category: categories.find(c => c.title === type.title && c.type === 'goal')
    };
  });

  const missingCategories = goalCategories.filter(g => !g.category);

  useEffect(() => {
    async function initializeGoalCategories() {
        // Don't initialize if user is not logged in yet
        if (!user || missingCategories.length === 0 || isInitializing) return;
        setIsInitializing(true);
        try {
            for (const goal of missingCategories) {
                await createCategory(goal.title, 'goal');
            }
        } catch (error) {
            console.error('Failed to initialize goal categories:', error);
        } finally {
            setIsInitializing(false);
        }
    }

    initializeGoalCategories();
  }, [user, missingCategories.length, isInitializing, createCategory]); // Added dependencies for correctness

  const handleAddTask = async (categoryId: string, key: string) => {
    const title = newTaskTitles[key];
    if (!title?.trim()) return;

    try {
      await createTask(title, null, categoryId);
      setNewTaskTitles(prev => ({ ...prev, [key]: '' }));
    } catch (error) {
      console.error('Failed to create goal:', error);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!confirm('Удалить цель?')) return;
    try {
      await deleteTask(taskId);
    } catch (error) {
      console.error('Failed to delete goal:', error);
    }
  };

  const handleToggleDone = async (task: Task) => {
    try {
      await updateTask(task.id, { isDone: !task.isDone });
    } catch (error) {
      console.error('Failed to toggle goal status:', error);
    }
  };

  const handleDragStart = (task: Task) => {
    setDraggedTask(task);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (categoryId: string) => {
    if (!draggedTask) return;
    
    try {
      await updateTask(draggedTask.id, {
        categoryId,
        sprintId: null,
        priorityLevel: null,
        priorityPosition: Date.now() // Put at the end
      });
      setDraggedTask(null);
    } catch (error) {
      console.error('Failed to move task to goal:', error);
    }
  };

  if (isCollapsed) {
    return (
      <div 
        className="flex flex-col h-full bg-[var(--color-surface)] border-r border-[var(--color-border)] items-center py-4 cursor-pointer hover:bg-[var(--color-surface-hover)] transition-colors"
        onClick={onToggleCollapse}
      >
        <div className="whitespace-nowrap font-medium text-sm text-[var(--color-text-secondary)] select-none" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
          Цели
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[var(--color-surface)] border-r border-[var(--color-border)]">
      <div 
        className="p-4 border-b border-[var(--color-border)] flex-shrink-0 cursor-pointer hover:bg-[var(--color-surface-hover)] transition-colors"
        onClick={onToggleCollapse}
      >
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-[var(--color-primary)]" />
          <h2>Цели</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 min-h-0 space-y-6">
        {missingCategories.length > 0 ? (
           <div className="text-center py-8 text-[var(--color-text-tertiary)]">
             <div className="w-8 h-8 border-2 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
             <p>Инициализация разделов...</p>
           </div>
        ) : (
          goalCategories.map(({ title, key, category }) => {
            if (!category) return null;
            
            const categoryTasks = tasks.filter(t => t.categoryId === category.id);

            return (
              <div 
                key={category.id}
                className="space-y-2"
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(category.id)}
              >
                <h3 className="text-sm font-medium text-[var(--color-text-secondary)] uppercase tracking-wider">
                  {title}
                </h3>
                
                <div className="bg-[var(--color-background)] rounded border border-[var(--color-border)] overflow-hidden">
                  {categoryTasks.map(task => {
                     const hook = hooks.find(h => h.id === task.hookId);
                     
                     // Calculate sub-goals count
                     const subGoalCount = (task.relatedTaskIds || []).filter(id => {
                       const relatedTask = tasks.find(t => t.id === id);
                       if (!relatedTask) return false;
                       const relatedCategory = categories.find(c => c.id === relatedTask.categoryId);
                       if (!relatedCategory) return false;
                       
                       const relatedType = GOAL_TYPES.find(gt => gt.title === relatedCategory.title)?.key;
                       
                       if (key === 'long') {
                          return relatedType === 'medium' || relatedType === 'short';
                       }
                       if (key === 'medium') {
                          return relatedType === 'short';
                       }
                       return false;
                     }).length;

                     return (
                        <div 
                          key={task.id}
                          draggable
                          onDragStart={() => handleDragStart(task)}
                          className="group relative p-3 border-b border-[var(--color-border)] last:border-b-0 hover:bg-[var(--color-surface-hover)] transition-colors cursor-grab active:cursor-grabbing"
                        >
                          <div className="flex items-start justify-between gap-2">
                             <div className="flex-1 min-w-0 flex gap-2">
                               <div 
                                 className={`mt-1 w-4 h-4 rounded border cursor-pointer flex items-center justify-center transition-colors ${
                                   task.isDone 
                                     ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-white' 
                                     : 'border-[var(--color-border)] hover:border-[var(--color-primary)]'
                                 }`}
                                 onClick={(e) => {
                                   e.stopPropagation();
                                   handleToggleDone(task);
                                 }}
                               >
                                 {task.isDone && <Check className="w-3 h-3" />}
                               </div>
                               <div className="flex-1 min-w-0">
                                 <div className="flex items-center gap-2 flex-wrap">
                                    <p 
                                      className={`text-sm ${task.isDone ? 'line-through text-[var(--color-text-tertiary)]' : 'text-[var(--color-text-primary)]'} cursor-pointer hover:text-[var(--color-primary)] transition-colors`}
                                      onClick={() => setRelationsTask(task)}
                                    >
                                      {task.title}
                                    </p>
                                    
                                    {subGoalCount > 0 && (
                                        <span className="text-xs text-[var(--color-text-tertiary)] flex items-center gap-1" title={`${subGoalCount} подцелей`}>
                                            <Target className="w-3 h-3" />
                                            {subGoalCount}
                                        </span>
                                    )}
                                 </div>
                                 
                                 <div className="flex items-center gap-2 mt-1">
                                    {hook && (
                                       <span className="text-xs text-[var(--color-text-tertiary)] bg-[var(--color-surface)] px-1 rounded">
                                         #{hook.title}
                                       </span>
                                    )}
                                    {task.assignedPeopleIds && task.assignedPeopleIds.length > 0 && (
                                       <div className="flex -space-x-1">
                                          {task.assignedPeopleIds.map(id => {
                                              const person = people.find(p => p.id === id);
                                              if (!person) return null;
                                              return <PersonAvatar key={id} person={person} size="xs" className="w-4 h-4 border border-[var(--color-background)]" />;
                                          })}
                                       </div>
                                    )}
                                 </div>
                               </div>
                             </div>
                             
                             <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteTask(task.id);
                                }}
                                className="opacity-0 group-hover:opacity-100 p-1 text-[var(--color-text-tertiary)] hover:text-red-500 transition-all"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                          </div>
                        </div>
                     );
                  })}
                  
                  <div className="p-2 flex gap-2">
                    <input
                      type="text"
                      value={newTaskTitles[key] || ''}
                      onChange={(e) => setNewTaskTitles(prev => ({ ...prev, [key]: e.target.value }))}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddTask(category.id, key)}
                      placeholder="Добавить цель..."
                      className="flex-1 px-2 py-1 bg-[var(--color-surface)] border border-[var(--color-border)] rounded text-sm focus:outline-none focus:border-[var(--color-primary)]"
                    />
                    <button
                      onClick={() => handleAddTask(category.id, key)}
                      disabled={!newTaskTitles[key]?.trim()}
                      className="px-2 py-1 bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] border border-[var(--color-border)] rounded text-[var(--color-text-secondary)] disabled:opacity-50"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {relationsTask && (
        <GoalRelationsDialog 
          task={relationsTask} 
          onClose={() => setRelationsTask(null)} 
        />
      )}
    </div>
  );
}