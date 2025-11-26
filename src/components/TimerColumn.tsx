import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { api } from '../utils/api';

const PRIORITY_COLORS: { [key: number]: string } = {
  9: '#EF4444', // Red-500
  8: '#F97316', // Orange-500
  7: '#F59E0B', // Amber-500
  6: '#EAB308', // Yellow-500
  5: '#84CC16', // Lime-500
  4: '#22C55E', // Green-500
  3: '#06B6D4', // Cyan-500
  2: '#3B82F6', // Blue-500
  1: '#6366F1', // Indigo-500
};

interface TimeEntry {
  id: string;
  taskId: string;
  sprintId: string | null;
  startTime: string;
  endTime: string | null;
  priorityLevel: number;
}

export function TimerColumn() {
  const { tasks, timer } = useApp();
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [initialScrollDone, setInitialScrollDone] = useState(false);

  // Fetch time entries
  const fetchEntries = async () => {
    try {
      const res = await api.getTimeEntries();
      if (res.success) {
        setTimeEntries(res.data);
      }
    } catch (error) {
      console.error('Failed to fetch time entries', error);
    }
  };

  // Initial fetch and refresh when timer state changes
  useEffect(() => {
    fetchEntries();
  }, [timer.isRunning, timer.taskId]); // Refetch when timer toggles

  // Clock tick
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute for timeline position
    return () => clearInterval(interval);
  }, []);

  // Scroll to current time on mount
  useEffect(() => {
    if (!initialScrollDone && scrollContainerRef.current) {
      const now = new Date();
      const minutes = now.getHours() * 60 + now.getMinutes();
      // Scroll to center the time (subtract half container height ~ 300px)
      scrollContainerRef.current.scrollTop = Math.max(0, minutes - 300);
      setInitialScrollDone(true);
    }
  }, [initialScrollDone]);

  // --- Timeline Logic ---
  
  // Generate last 7 days
  const last7Days = useMemo(() => {
    const days = [];
    const today = new Date();
    // Reset time to ensure consistent comparison
    today.setHours(0, 0, 0, 0);
    
    for (let i = 6; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        days.push(d);
    }
    return days;
  }, [currentTime]); // Update when day changes (via currentTime effect generally)

  const isTodaySelected = useMemo(() => {
      const now = new Date();
      return selectedDate.getDate() === now.getDate() && 
             selectedDate.getMonth() === now.getMonth() && 
             selectedDate.getFullYear() === now.getFullYear();
  }, [selectedDate]);

  // Filter entries for selected date
  const filteredEntries = useMemo(() => {
    const startOfDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate()).getTime();
    const endOfDay = startOfDay + 86400000;

    return timeEntries.filter(e => {
        const t = new Date(e.startTime).getTime();
        return t >= startOfDay && t < endOfDay;
    });
  }, [timeEntries, selectedDate]);

  // Current time line position (minutes from 00:00)
  const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();

  return (
    <div className="flex flex-col h-full bg-[var(--color-surface)] border-l border-[var(--color-border)] text-[var(--color-text-primary)]">
      {/* --- Header with Date Selector --- */}
      <div className="flex flex-col border-b border-[var(--color-border)] bg-[var(--color-surface)] z-20 shrink-0">
        <div className="p-4 pb-2 flex justify-between items-center">
            <h2 className="font-semibold">Таймлайн</h2>
            <div className="text-xs text-[var(--color-text-tertiary)] font-mono">
                {currentTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </div>
        </div>
        
        {/* 7 Day Selector */}
        <div className="flex items-center gap-1 px-4 pb-3 overflow-x-auto scrollbar-hide">
            {last7Days.map(date => {
                const isSelected = date.getDate() === selectedDate.getDate() && 
                                 date.getMonth() === selectedDate.getMonth();
                const isToday = date.getDate() === new Date().getDate() && 
                              date.getMonth() === new Date().getMonth();
                
                return (
                    <button
                        key={date.toISOString()}
                        onClick={() => setSelectedDate(date)}
                        className={`flex flex-col items-center justify-center min-w-[40px] h-[44px] rounded transition-all ${
                            isSelected 
                                ? 'bg-[var(--color-primary)] text-white shadow-sm' 
                                : 'hover:bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)]'
                        } ${isToday && !isSelected ? 'text-[var(--color-primary)] font-medium' : ''}`}
                    >
                        <span className="text-[10px] uppercase leading-none mb-0.5 opacity-80">
                            {date.toLocaleDateString('ru-RU', { weekday: 'short' })}
                        </span>
                        <span className={`text-sm leading-none ${isSelected ? 'font-bold' : ''}`}>
                            {date.getDate()}
                        </span>
                    </button>
                );
            })}
        </div>
      </div>

      {/* --- Timeline Visualization --- */}
      <div 
        className="flex-1 overflow-y-auto min-h-0 relative scroll-smooth bg-[#FAFAFA]"
        ref={scrollContainerRef}
      >
         {/* 24h Container (1px = 1min) => 1440px */}
         <div className="h-[1440px] relative w-full">
            {/* Hour Markers */}
            {Array.from({ length: 24 }).map((_, i) => (
                <div 
                    key={i} 
                    className="absolute left-0 w-full border-t border-gray-100 flex items-start"
                    style={{ top: `${i * 60}px`, height: '60px' }}
                >
                    <span className="text-[10px] text-gray-400 w-10 pl-2 -mt-2 bg-[#FAFAFA]">
                        {i.toString().padStart(2, '0')}:00
                    </span>
                    <div className="flex-1 border-t border-dashed border-gray-100 mt-[30px] ml-10 opacity-50" /> {/* Half-hour line */}
                </div>
            ))}

            {/* Time Blocks */}
            {filteredEntries.map(entry => {
                const start = new Date(entry.startTime);
                const startMin = start.getHours() * 60 + start.getMinutes();
                
                let duration = 0;
                if (entry.endTime) {
                    const end = new Date(entry.endTime);
                    duration = (end.getTime() - start.getTime()) / 1000 / 60; // minutes
                } else {
                    // Active entry: duration is until now
                    // Only calculate "until now" if entry is on Today and is active
                    // Wait, if we are viewing past days, active entry implies it was never stopped? 
                    // If we view yesterday, and entry has no end time, it effectively goes until end of yesterday?
                    // Or it continues?
                    // Usually active task is only relevant for Today.
                    // If looking at past day, and entry has no endTime, it might be a bug or long running task.
                    // Let's cap it at end of day for visualization on past days.
                    
                    const entryDayStart = new Date(entry.startTime);
                    entryDayStart.setHours(0,0,0,0);
                    const selectedDayStart = new Date(selectedDate);
                    selectedDayStart.setHours(0,0,0,0);
                    
                    if (entryDayStart.getTime() === selectedDayStart.getTime() && isTodaySelected) {
                         const now = new Date();
                         duration = (now.getTime() - start.getTime()) / 1000 / 60;
                    } else {
                         // For past days, cap at end of day or 23:59?
                         // Or just assume it ended?
                         // Let's assume for visualization purposes we cap at 24h?
                         // But better to just show what we have.
                         // If it has no end time, assume it goes to now?
                         // If I view yesterday, "now" is huge.
                         // Let's just calculate to now, but visually clipped by container.
                         const now = new Date();
                         duration = (now.getTime() - start.getTime()) / 1000 / 60;
                    }
                }
                
                // Min height 2px visibility
                const height = Math.max(2, duration);
                const color = PRIORITY_COLORS[entry.priorityLevel] || '#94A3B8'; // Default slate
                
                const taskTitle = tasks.find(t => t.id === entry.taskId)?.title || 'Неизвестная задача';

                return (
                    <div
                        key={entry.id}
                        className="absolute left-12 right-2 rounded-sm shadow-sm border-l-2 opacity-90 hover:opacity-100 hover:z-10 transition-all cursor-help group overflow-hidden"
                        style={{
                            top: `${startMin}px`,
                            height: `${height}px`,
                            backgroundColor: `${color}20`, // 20% opacity bg
                            borderColor: color,
                        }}
                        title={`${taskTitle} (${Math.round(duration)}m)`}
                    >
                         {height > 15 && (
                             <div className="px-1 py-0.5 text-[10px] leading-none truncate text-gray-700 font-medium">
                                 {taskTitle}
                             </div>
                         )}
                         
                         {/* Hover Tooltip (Simple) */}
                         <div className="hidden group-hover:block absolute left-0 top-full mt-1 bg-black text-white text-xs p-2 rounded z-50 whitespace-nowrap shadow-lg">
                            {taskTitle} • {Math.round(duration)} мин
                         </div>
                    </div>
                );
            })}

            {/* Current Time Line - Only show if today is selected */}
            {isTodaySelected && (
                <div 
                    className="absolute left-0 right-0 border-t-2 border-red-500 z-10 flex items-center pointer-events-none"
                    style={{ top: `${currentMinutes}px` }}
                >
                    <div className="w-2 h-2 bg-red-500 rounded-full -ml-1" />
                    <div className="ml-auto mr-2 text-[10px] font-bold text-red-500 bg-white px-1 rounded border border-red-100 shadow-sm">
                        {currentTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </div>
                </div>
            )}
         </div>
      </div>
    </div>
  );
}
