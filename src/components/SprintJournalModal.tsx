import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useApp } from '../context/AppContext';
import { Sprint, Task, SPRINT_DURATION_SECONDS } from '../types';
import { X, Check, Save } from 'lucide-react';

interface SprintJournalModalProps {
  isOpen: boolean;
  onClose: () => void;
  sprint: Sprint;
  tasks: Task[];
  readOnly?: boolean;
  initialAnswers?: any;
}

export function SprintJournalModal({ isOpen, onClose, sprint, tasks, readOnly, initialAnswers }: SprintJournalModalProps) {
  const { completeSprint } = useApp();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [answers, setAnswers] = useState({
    mostImportant: '',
    good: '',
    better: '',
    distractions: '',
    insight: ''
  });

  // Load draft or initial answers
  useEffect(() => {
    if (initialAnswers) {
      setAnswers(initialAnswers);
      return;
    }

    if (!readOnly) {
      const saved = localStorage.getItem(`journal_draft_${sprint.id}`);
      if (saved) {
        try {
          setAnswers(JSON.parse(saved));
        } catch (e) {
          console.error('Failed to parse journal draft', e);
        }
      }
    }
  }, [sprint.id, readOnly, initialAnswers]);

  // Auto-save to localStorage when answers change (only if not readOnly)
  useEffect(() => {
    if (!readOnly) {
      localStorage.setItem(`journal_draft_${sprint.id}`, JSON.stringify(answers));
    }
  }, [answers, sprint.id, readOnly]);

  if (!isOpen) return null;

  // Stats Calculation
  const sprintTasks = tasks.filter(t => t.sprintId === sprint.id);
  const completedTasks = sprintTasks.filter(t => t.isDone);
  const unfinishedTasks = sprintTasks.filter(t => !t.isDone);
  const totalTime = sprintTasks.reduce((sum, t) => sum + t.spentTime, 0);
  // Calculate progress based on time (9 hours goal)
  const timeProgress = (totalTime / SPRINT_DURATION_SECONDS) * 100;
  const isTimeGoalMet = timeProgress >= 100;

  const taskProgress = sprintTasks.length > 0 
    ? Math.round((completedTasks.length / sprintTasks.length) * 100) 
    : 0;

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    if (h > 0) return `${h}ч ${m}м`;
    return `${m}м`;
  };

  const handleSaveDraft = () => {
    // Answers are already auto-saved to localStorage via useEffect
    onClose();
  };

  const handleComplete = async () => {
    if (!isTimeGoalMet) return;
    
    setIsSubmitting(true);
    try {
      await completeSprint(answers);
      // Clear draft after successful completion
      localStorage.removeItem(`journal_draft_${sprint.id}`);
      onClose();
    } catch (error) {
      console.error('Failed to complete sprint:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkip = async () => {
    if (!isTimeGoalMet) return;

    setIsSubmitting(true);
    try {
      await completeSprint({});
      // Clear draft after successful completion
      localStorage.removeItem(`journal_draft_${sprint.id}`);
      onClose();
    } catch (error) {
      console.error('Failed to complete sprint:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-3xl bg-[#0F1117] border border-gray-800 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800 bg-[#0F1117]">
          <div>
            <h2 className="text-xl font-bold text-white mb-1">Журнал спринта #{sprint.number}</h2>
            <p className="text-sm text-gray-400">
              {readOnly ? "Просмотр итогов спринта" : (isTimeGoalMet 
                ? "Подведите итоги перед началом следующего этапа" 
                : `Цель по времени не достигнута (${formatTime(totalTime)} / 9ч 0м). Спринт нельзя завершить.`)}
            </p>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-gray-800 rounded-full transition-colors text-gray-400"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
            
            {/* Stats Block */}
            <div className="grid grid-cols-4 gap-4">
                <div className="bg-[#1A1D26] p-4 rounded-xl border border-gray-800">
                    <div className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-1">Всего задач</div>
                    <div className="text-2xl font-bold text-white">{sprintTasks.length}</div>
                </div>
                <div className="bg-[#1A1D26] p-4 rounded-xl border border-gray-800">
                    <div className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-1">Выполнено</div>
                    <div className="text-2xl font-bold text-green-500">{completedTasks.length} <span className="text-sm font-normal text-gray-500">({taskProgress}%)</span></div>
                </div>
                <div className="bg-[#1A1D26] p-4 rounded-xl border border-gray-800">
                    <div className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-1">Осталось</div>
                    <div className="text-2xl font-bold text-orange-500">{unfinishedTasks.length}</div>
                </div>
                <div className={`bg-[#1A1D26] p-4 rounded-xl border ${isTimeGoalMet || readOnly ? 'border-gray-800' : 'border-red-500/50'}`}>
                    <div className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-1">Время</div>
                    <div className={`text-2xl font-bold ${isTimeGoalMet || readOnly ? 'text-blue-500' : 'text-red-500'}`}>{formatTime(totalTime)}</div>
                </div>
            </div>

            {/* Questions Block */}
            <div className="space-y-6">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                        1. Что сегодня было самым важным?
                    </label>
                    <textarea
                        value={answers.mostImportant}
                        onChange={(e) => setAnswers({...answers, mostImportant: e.target.value})}
                        disabled={readOnly}
                        className="w-full h-24 bg-[#1A1D26] border border-gray-800 rounded-xl p-4 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none disabled:opacity-70 disabled:cursor-not-allowed"
                        placeholder="Главное достижение..."
                    />
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-300">
                            2. Что у меня получилось хорошо?
                        </label>
                        <textarea
                            value={answers.good}
                            onChange={(e) => setAnswers({...answers, good: e.target.value})}
                            disabled={readOnly}
                            className="w-full h-24 bg-[#1A1D26] border border-gray-800 rounded-xl p-4 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none disabled:opacity-70 disabled:cursor-not-allowed"
                            placeholder="Успехи..."
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-300">
                            3. Что я мог бы сделать лучше?
                        </label>
                        <textarea
                            value={answers.better}
                            onChange={(e) => setAnswers({...answers, better: e.target.value})}
                            disabled={readOnly}
                            className="w-full h-24 bg-[#1A1D26] border border-gray-800 rounded-xl p-4 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none disabled:opacity-70 disabled:cursor-not-allowed"
                            placeholder="Зоны роста..."
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                        4. Что меня отвлекало?
                    </label>
                    <textarea
                        value={answers.distractions}
                        onChange={(e) => setAnswers({...answers, distractions: e.target.value})}
                        disabled={readOnly}
                        className="w-full h-20 bg-[#1A1D26] border border-gray-800 rounded-xl p-4 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none disabled:opacity-70 disabled:cursor-not-allowed"
                        placeholder="Факторы отвлечения..."
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-purple-400">
                        5. Какой один вывод я беру в следующий спринт?
                    </label>
                    <textarea
                        value={answers.insight}
                        onChange={(e) => setAnswers({...answers, insight: e.target.value})}
                        disabled={readOnly}
                        className="w-full h-20 bg-[#1A1D26] border border-gray-800 rounded-xl p-4 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none disabled:opacity-70 disabled:cursor-not-allowed"
                        placeholder="Инсайт..."
                    />
                </div>
            </div>
        </div>

        {/* Footer */}
        {!readOnly && (
        <div className="p-6 border-t border-gray-800 bg-[#0F1117] flex justify-between items-center">
            {isTimeGoalMet ? (
                <button
                    onClick={handleSkip}
                    disabled={isSubmitting}
                    className="text-gray-500 hover:text-gray-300 text-sm font-medium transition-colors"
                >
                    Пропустить заполнение
                </button>
            ) : (
                <div className="text-red-500 text-sm font-medium">
                    Время спринта не выполнено
                </div>
            )}
            
            {isTimeGoalMet ? (
                <button
                    onClick={handleComplete}
                    disabled={isSubmitting}
                    className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition-all shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_30px_rgba(147,51,234,0.5)] hover:-translate-y-0.5"
                >
                    {isSubmitting ? 'Сохранение...' : (
                        <>
                            <Check className="w-5 h-5" />
                            Готово
                        </>
                    )}
                </button>
            ) : (
                <button
                    onClick={handleSaveDraft}
                    className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-xl font-semibold transition-all"
                >
                    <Save className="w-5 h-5" />
                    Сохранить черновик
                </button>
            )}
        </div>
        )}

      </div>
    </div>,
    document.body
  );
}
