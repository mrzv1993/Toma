import React, { useState, useEffect } from 'react';
import { X, RefreshCw, Bell, Calendar, Pause } from 'lucide-react';
import { Task, RecurrenceSettings } from '../types';

interface TaskRecurrenceDialogProps {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
  onSave: (recurrence: RecurrenceSettings) => void;
}

export function TaskRecurrenceDialog({ task, isOpen, onClose, onSave }: TaskRecurrenceDialogProps) {
  if (!isOpen) return null;

  // Default state based on task or defaults
  const [type, setType] = useState<RecurrenceSettings['type']>(task.recurrence?.type || 'daily');
  const [interval, setInterval] = useState(task.recurrence?.interval || 1);
  const [onlyWhenPreviousDone, setOnlyWhenPreviousDone] = useState(task.recurrence?.onlyWhenPreviousDone || false);
  
  // Time defaults to task planned time or empty
  const defaultStartTime = task.plannedStartTime 
    ? new Date(task.plannedStartTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: false})
    : task.recurrence?.startTime || '';
  const defaultEndTime = task.plannedEndTime
    ? new Date(task.plannedEndTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: false})
    : task.recurrence?.endTime || '';

  const [startTime, setStartTime] = useState(defaultStartTime);
  const [endTime, setEndTime] = useState(defaultEndTime);
  
  const [startDate, setStartDate] = useState(
    task.recurrence?.startDate || new Date().toISOString().split('T')[0]
  );
  
  const [endDateMode, setEndDateMode] = useState<RecurrenceSettings['endDateMode']>(
    task.recurrence?.endDateMode || 'never'
  );
  const [endAfterOccurrences, setEndAfterOccurrences] = useState(
    task.recurrence?.endAfterOccurrences || 5
  );
  const [endDate, setEndDate] = useState(
    task.recurrence?.endDate || new Date().toISOString().split('T')[0]
  );

  // Calculated summary text
  const getSummary = () => {
    const intervalText = interval === 1 ? '' : `${interval} `;
    let typeText = '';
    switch (type) {
      case 'daily': typeText = interval === 1 ? 'каждый день' : `каждые ${interval} дн.`; break;
      case 'weekly': typeText = interval === 1 ? 'каждую неделю' : `каждые ${interval} нед.`; break;
      case 'monthly': typeText = interval === 1 ? 'каждый месяц' : `каждые ${interval} мес.`; break;
      case 'yearly': typeText = interval === 1 ? 'каждый год' : `каждые ${interval} г.`; break;
      case 'after_completion': typeText = 'после выполнения'; break;
    }
    return `Повторять: ${typeText}`;
  };

  // Calculate next occurrences
  const getNextOccurrences = () => {
    const dates: string[] = [];
    const start = new Date(startDate);
    const now = new Date();
    // If start date is in past, we probably want to show next future occurrences
    // But for simplicity, let's just show the first 3 generated from start date
    // Logic could be complex: "Next from NOW" vs "Next from Start"
    
    let current = new Date(start);
    
    // Simple loop to find next 3
    for (let i = 0; i < 3; i++) {
        dates.push(current.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' }));
        
        switch (type) {
            case 'daily': current.setDate(current.getDate() + interval); break;
            case 'weekly': current.setDate(current.getDate() + interval * 7); break;
            case 'monthly': current.setMonth(current.getMonth() + interval); break;
            case 'yearly': current.setFullYear(current.getFullYear() + interval); break;
            case 'after_completion': 
                // For "after completion", dates depend on completion, so maybe just show "..."
                return 'При завершении задачи';
        }
    }
    
    // Format: "29 ноября; 30 ноября; 1 декабря"
    return dates.join('; ');
  };

  const handleSave = () => {
    onSave({
      type,
      interval,
      onlyWhenPreviousDone,
      startTime: startTime || null,
      endTime: endTime || null,
      startDate,
      endDateMode,
      endAfterOccurrences: endDateMode === 'after' ? endAfterOccurrences : null,
      endDate: endDateMode === 'date' ? endDate : null,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="w-[650px] bg-[#1e1e24] text-gray-200 rounded-xl shadow-2xl overflow-hidden border border-white/10 flex" onClick={e => e.stopPropagation()}>
        
        {/* Sidebar */}
        <div className="w-[220px] bg-[#18181b] border-r border-white/5 flex flex-col p-4">
            <div className="text-sm font-medium text-gray-400 mb-2 px-2">После выполнения</div>
            
            <div className="space-y-1">
                {[
                    { id: 'daily', label: 'Ежедневно' },
                    { id: 'weekly', label: 'Еженедельно' },
                    { id: 'monthly', label: 'Ежемесячно' },
                    { id: 'yearly', label: 'Ежегодно' }
                ].map(item => (
                    <button
                        key={item.id}
                        onClick={() => setType(item.id as any)}
                        className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                            type === item.id 
                            ? 'bg-[#2d2d35] text-blue-400' 
                            : 'text-gray-400 hover:bg-white/5'
                        }`}
                    >
                        {item.label}
                    </button>
                ))}
            </div>

            <div className="mt-auto pt-6">
                <div className="text-sm font-medium text-white mb-1">Сводка</div>
                <div className="text-xs text-gray-500 mb-4">{getSummary()}</div>
                
                <div className="text-sm font-medium text-white mb-1">Следующий раз:</div>
                <div className="text-xs text-gray-500 leading-relaxed">
                    {getNextOccurrences()}
                </div>
            </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col bg-[#1e1e24]">
            {/* Header */}
            <div className="p-4 border-b border-white/5 flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-gray-400" />
                <h2 className="text-lg font-medium text-white">Повторять задачу</h2>
            </div>

            <div className="p-6 space-y-5 flex-1">
                {/* Interval */}
                <div className="flex items-center gap-3">
                    <span className="w-20 text-sm text-gray-300">Интервал</span>
                    <input 
                        type="number" 
                        min="1"
                        value={interval}
                        onChange={e => setInterval(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-32 bg-[#18181b] border border-white/10 rounded px-3 py-1.5 text-white focus:border-blue-500 focus:outline-none"
                    />
                    <span className="text-sm text-gray-400">
                        {type === 'daily' ? 'д.' : type === 'weekly' ? 'нед.' : type === 'monthly' ? 'мес.' : 'лет'}
                    </span>
                </div>

                {/* Checkbox */}
                <label className="flex items-center gap-3 cursor-pointer">
                    <input 
                        type="checkbox"
                        checked={onlyWhenPreviousDone}
                        onChange={e => setOnlyWhenPreviousDone(e.target.checked)}
                        className="w-4 h-4 rounded border-white/20 bg-[#18181b] text-blue-500 focus:ring-0 focus:ring-offset-0"
                    />
                    <span className="text-sm text-gray-300">Создавать новую только при окончании предыдущей</span>
                </label>

                {/* Time */}
                <div className="flex items-center gap-3">
                    <span className="w-20 text-sm text-gray-300">Время</span>
                    <div className="flex items-center gap-2">
                        <input 
                            type="time" 
                            value={startTime}
                            onChange={e => setStartTime(e.target.value)}
                            className="bg-[#18181b] border border-white/10 rounded px-2 py-1.5 text-white focus:border-blue-500 focus:outline-none"
                        />
                        <span className="text-gray-500">–</span>
                        <input 
                            type="time" 
                            value={endTime}
                            onChange={e => setEndTime(e.target.value)}
                            className="bg-[#18181b] border border-white/10 rounded px-2 py-1.5 text-white focus:border-blue-500 focus:outline-none"
                        />
                        <Bell className="w-4 h-4 text-gray-600 ml-2" />
                    </div>
                </div>

                {/* Start Date */}
                <div className="flex items-center gap-3">
                    <span className="w-20 text-sm text-gray-300">Начало</span>
                    <div className="relative">
                        <input 
                            type="date"
                            value={startDate}
                            onChange={e => setStartDate(e.target.value)}
                            className="bg-[#18181b] border border-white/10 rounded pl-3 pr-8 py-1.5 text-white focus:border-blue-500 focus:outline-none [color-scheme:dark]" 
                        />
                        <Calendar className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400 pointer-events-none" />
                    </div>
                </div>

                {/* End Condition */}
                <div className="space-y-3">
                    <span className="block text-sm text-gray-300 mb-2">Окончание</span>
                    
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input 
                            type="radio"
                            name="endDateMode"
                            checked={endDateMode === 'never'}
                            onChange={() => setEndDateMode('never')}
                            className="text-blue-500 bg-[#18181b] border-white/20 focus:ring-0"
                        />
                        <span className="text-sm text-gray-300">Никогда</span>
                    </label>

                    <div className="flex items-center gap-3">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input 
                                type="radio"
                                name="endDateMode"
                                checked={endDateMode === 'after'}
                                onChange={() => setEndDateMode('after')}
                                className="text-blue-500 bg-[#18181b] border-white/20 focus:ring-0"
                            />
                            <span className="text-sm text-gray-300">Спустя</span>
                        </label>
                        <input 
                            type="number"
                            value={endAfterOccurrences}
                            onChange={e => setEndAfterOccurrences(parseInt(e.target.value) || 1)}
                            disabled={endDateMode !== 'after'}
                            className="w-20 bg-[#18181b] border border-white/10 rounded px-2 py-1 text-white disabled:opacity-50 focus:border-blue-500 focus:outline-none"
                        />
                        <span className="text-sm text-gray-400">раз</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input 
                                type="radio"
                                name="endDateMode"
                                checked={endDateMode === 'date'}
                                onChange={() => setEndDateMode('date')}
                                className="text-blue-500 bg-[#18181b] border-white/20 focus:ring-0"
                            />
                            <span className="text-sm text-gray-300">Дата</span>
                        </label>
                        <div className="relative">
                            <input 
                                type="date"
                                value={endDate}
                                onChange={e => setEndDate(e.target.value)}
                                disabled={endDateMode !== 'date'}
                                className="bg-[#18181b] border border-white/10 rounded pl-3 pr-8 py-1 text-white disabled:opacity-50 focus:border-blue-500 focus:outline-none [color-scheme:dark]"
                            />
                            <Calendar className={`absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400 pointer-events-none ${endDateMode !== 'date' ? 'opacity-50' : ''}`} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-white/5 flex justify-between items-center">
                 <button className="p-2 hover:bg-white/5 rounded-full text-gray-400 hover:text-white transition-colors">
                    <span className="text-xs text-gray-500">Отмена</span>
                 </button>
                 
                 <div className="flex items-center gap-3">
                    <button 
                        onClick={onClose}
                        className="px-6 py-2 rounded border border-white/10 text-sm text-gray-300 hover:bg-white/5 transition-colors"
                    >
                        Отмена
                    </button>
                    <button 
                        onClick={handleSave}
                        className="px-6 py-2 rounded bg-blue-600 text-white text-sm hover:bg-blue-500 transition-colors"
                    >
                        Ок
                    </button>
                 </div>

                 <button className="p-2 hover:bg-white/5 rounded-full text-gray-400 hover:text-white transition-colors ml-auto">
                    <Pause className="w-5 h-5" />
                 </button>
            </div>
        </div>
      </div>
    </div>
  );
}
