import React, { useState, useEffect, useRef, useMemo, useLayoutEffect } from 'react';
import { useApp } from '../context/AppContext';
import { api } from '../utils/api';
import { Plus, Minus } from 'lucide-react';

const PRIORITY_COLORS: { [key: number]: string } = {
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

interface TimeEntry {
  id: string;
  taskId: string;
  sprintId: string | null;
  startTime: string;
  endTime: string | null;
  priorityLevel: number;
}

export function TimerColumn({ isCollapsed, onToggleCollapse }: { isCollapsed?: boolean; onToggleCollapse?: () => void }) {
  const { tasks, timer, accessToken } = useApp();
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [initialScrollDone, setInitialScrollDone] = useState(false);
  const zoomAnchorRef = useRef<{ minutes: number, offset: number } | null>(null);
  
  // Zoom state: pixels per minute
  // Range: 0.5 (30px/hr) to 20 (1200px/hr -> 20px/min)
  const [zoom, setZoom] = useState(1);

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
    if (accessToken) {
        fetchEntries();
    }
  }, [timer.isRunning, timer.taskId, accessToken]); 

  // Clock tick
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every second for timeline position
    return () => clearInterval(interval);
  }, []);

  // Scroll to current time on mount
  useEffect(() => {
    if (!initialScrollDone && scrollContainerRef.current) {
      const now = new Date();
      const minutes = now.getHours() * 60 + now.getMinutes();
      // Scroll to center the time
      scrollContainerRef.current.scrollTop = Math.max(0, (minutes * zoom) - 300);
      setInitialScrollDone(true);
    }
  }, [initialScrollDone, zoom]); 

  // --- Timeline Logic ---
  
  // Generate last 7 days
  const last7Days = useMemo(() => {
    const days = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let i = 6; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        days.push(d);
    }
    return days;
  }, [currentTime]);

  const isTodaySelected = useMemo(() => {
      const now = new Date();
      return selectedDate.getDate() === now.getDate() && 
             selectedDate.getMonth() === now.getMonth() && 
             selectedDate.getFullYear() === now.getFullYear();
  }, [selectedDate]);

  // Determine grid interval based on zoom
  const gridInterval = useMemo(() => {
      const minPixelHeight = 40; // Minimum height for a grid row
      // Check from smallest to largest to find the most granular interval that fits
      const potentialIntervals = [5, 10, 15, 20, 30, 60];
      
      for (const interval of potentialIntervals) {
          if (interval * zoom >= minPixelHeight) {
              return interval;
          }
      }
      return 60; // Default fallback
  }, [zoom]);

  // Filter entries for selected date
  const filteredEntries = useMemo(() => {
    const startOfDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate()).getTime();
    const endOfDay = startOfDay + 86400000;

    return timeEntries.filter(e => {
        const t = new Date(e.startTime).getTime();
        if (t < startOfDay || t >= endOfDay) return false;

        // Calculate duration
        let duration = 0;
        if (e.endTime) {
            duration = (new Date(e.endTime).getTime() - t) / 1000 / 60;
        } else {
             // Active task logic
             const entryDayStart = new Date(e.startTime);
             entryDayStart.setHours(0,0,0,0);
             const selectedDayStart = new Date(selectedDate);
             selectedDayStart.setHours(0,0,0,0);
             
             // Only show active duration if viewing today
             if (entryDayStart.getTime() === selectedDayStart.getTime() && isTodaySelected) {
                 duration = (Date.now() - t) / 1000 / 60;
             } else {
                 duration = (Date.now() - t) / 1000 / 60;
             }
        }
        
        // Filter out short tasks (< 1 min)
        return duration >= 1;
    });
  }, [timeEntries, selectedDate, isTodaySelected, currentTime]);

  // Filter planned tasks for selected date
  const plannedEntries = useMemo(() => {
    const startOfDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate()).getTime();
    const endOfDay = startOfDay + 86400000;

    return tasks.filter(t => {
        if (!t.plannedStartTime) return false;
        const start = new Date(t.plannedStartTime).getTime();
        
        let end = start + (60 * 60 * 1000); // Default 1 hour visualization if no end time
        if (t.plannedEndTime) {
            end = new Date(t.plannedEndTime).getTime();
        }
        
        return start < endOfDay && end > startOfDay;
    });
  }, [tasks, selectedDate]);

  // Current time line position
  const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
  
  // Calculated values based on zoom
  const totalHeight = 24 * 60 * zoom;

  const handleZoomChange = (newZoom: number) => {
      if (!scrollContainerRef.current) {
          setZoom(newZoom);
          return;
      }
      
      const container = scrollContainerRef.current;
      
      // Anchor to Center of Viewport (Always)
      // This ensures the view zooms in/out relative to what the user is looking at
      const middleY = container.scrollTop + container.clientHeight / 2;
      const anchorTimeMinutes = middleY / zoom;
      const offsetFromTop = container.clientHeight / 2;
      
      zoomAnchorRef.current = { minutes: anchorTimeMinutes, offset: offsetFromTop };
      setZoom(newZoom);
  };

  const handleZoomIn = () => {
      const newZoom = Math.min(zoom * 1.5, 20);
      handleZoomChange(newZoom);
  };

  const handleZoomOut = () => {
      const newZoom = Math.max(zoom / 1.5, 0.5);
      handleZoomChange(newZoom);
  };

  // Apply scroll position restoration after zoom
  useLayoutEffect(() => {
      if (zoomAnchorRef.current && scrollContainerRef.current) {
          const { minutes, offset } = zoomAnchorRef.current;
          const newY = minutes * zoom;
          scrollContainerRef.current.scrollTop = newY - offset;
          zoomAnchorRef.current = null;
      }
  }, [zoom]);

  // Generate Grid Lines
  const gridLines = useMemo(() => {
      const lines = [];
      for (let m = 0; m < 1440; m += gridInterval) {
          lines.push(m);
      }
      return lines;
  }, [gridInterval]);

  // Helper to format duration
  const formatDuration = (seconds: number) => {
      const h = Math.floor(seconds / 3600);
      const m = Math.floor((seconds % 3600) / 60);
      if (h > 0) return `${h} ч ${m} мин`;
      return `${m} мин`;
  };

  if (isCollapsed) {
    return (
      <div 
        className="flex flex-col h-full bg-[#09090B] border-l border-[#27272A] text-zinc-100 items-center py-4 cursor-pointer hover:bg-[#27272A] transition-colors"
        onClick={onToggleCollapse}
      >
        <div className="whitespace-nowrap font-medium text-sm text-zinc-500 select-none" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
          Таймлайн
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#09090B] border-l border-[#27272A] text-zinc-100">
      {/* --- Header with Date Selector --- */}
      <div className="flex flex-col border-b border-[#27272A] bg-[#09090B] z-20 shrink-0">
        <div 
            className="p-4 pb-2 flex justify-between items-center cursor-pointer hover:bg-[#27272A] transition-colors"
            onClick={onToggleCollapse}
        >
            <h2 className="font-semibold">Таймлайн</h2>
            <div className="text-xs text-zinc-500 font-mono">
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
                                ? 'bg-[#27272A] text-white shadow-sm border border-zinc-700' 
                                : 'hover:bg-[#27272A]/50 text-zinc-500'
                        } ${isToday && !isSelected ? 'text-zinc-300 font-medium' : ''}`}
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
        className="flex-1 overflow-y-auto min-h-0 relative scroll-smooth bg-[#000000]"
        ref={scrollContainerRef}
      >
         <div style={{ height: `${totalHeight}px` }} className="relative w-full">
            {/* Grid Lines */}
            {gridLines.map((minutes) => {
                const hours = Math.floor(minutes / 60);
                const mins = minutes % 60;
                const timeString = `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
                const isHour = mins === 0;
                
                return (
                    <div 
                        key={minutes} 
                        className={`absolute left-0 w-full flex items-start border-t ${isHour ? 'border-white/10' : 'border-white/5'}`}
                        style={{ top: `${minutes * zoom}px`, height: `${gridInterval * zoom}px` }}
                    >
                        <span className={`text-[10px] w-12 pl-3 -mt-2 bg-[#000000] ${isHour ? 'text-zinc-500 font-medium' : 'text-zinc-500'}`}>
                            {timeString}
                        </span>
                    </div>
                );
            })}

            {/* Planned Time Blocks */}
            {plannedEntries.map(task => {
                const start = new Date(task.plannedStartTime!);
                const startMin = start.getHours() * 60 + start.getMinutes();
                
                let duration = 60; // Default 60 mins
                if (task.plannedEndTime) {
                    const end = new Date(task.plannedEndTime);
                    duration = (end.getTime() - start.getTime()) / 1000 / 60;
                }
                
                const height = duration * zoom;
                const color = task.priorityLevel ? PRIORITY_COLORS[task.priorityLevel] : '#94a3b8'; // Default gray
                
                return (
                    <div
                        key={`plan-${task.id}`}
                        className="absolute left-14 right-2 group z-0"
                        style={{
                            top: `${startMin * zoom}px`,
                            height: `${height}px`,
                        }}
                    >
                         <div 
                             className="absolute inset-0 rounded-sm border-2 border-dashed opacity-60 hover:opacity-90 transition-all cursor-help overflow-hidden"
                             style={{
                                 backgroundColor: `color-mix(in srgb, ${color}, transparent 95%)`, 
                                 borderColor: color,
                             }}
                         >
                             {height > 20 && (
                                 <div className="px-2 py-1 text-[11px] leading-none truncate text-zinc-500 font-medium">
                                     {task.title}
                                 </div>
                             )}
                         </div>
                         
                         <div className="hidden group-hover:flex flex-col absolute left-0 top-full mt-1 bg-zinc-800 border border-zinc-700 text-zinc-100 text-xs p-2 rounded z-50 whitespace-nowrap shadow-lg pointer-events-none">
                            <span className="font-medium mb-1">{task.title} (План)</span>
                            <div className="flex flex-col gap-0.5 text-zinc-400">
                                <span>
                                    {start.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})} — {
                                        task.plannedEndTime 
                                        ? new Date(task.plannedEndTime).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}) 
                                        : '?'
                                    }
                                </span>
                                <span className="text-zinc-500 border-t border-zinc-700/50 pt-1 mt-1">
                                    Длительность: {Math.round(duration)} мин
                                </span>
                            </div>
                         </div>
                    </div>
                );
            })}

            {/* Tracked Time Blocks */}
            {filteredEntries.map(entry => {
                const start = new Date(entry.startTime);
                const startMin = start.getHours() * 60 + start.getMinutes() + start.getSeconds() / 60;
                
                let duration = 0;
                if (entry.endTime) {
                    const end = new Date(entry.endTime);
                    duration = (end.getTime() - start.getTime()) / 1000 / 60; // minutes
                } else {
                    // Recalculate purely for rendering height
                    duration = (currentTime.getTime() - start.getTime()) / 1000 / 60;
                }
                
                const height = duration * zoom; 
                const color = PRIORITY_COLORS[entry.priorityLevel] || '#94a3b8';
                
                const task = tasks.find(t => t.id === entry.taskId);
                const taskTitle = task?.title || 'Неизвестная задача';
                
                return (
                    <div
                        key={entry.id}
                        className="absolute left-14 right-2 group"
                        style={{
                            top: `${startMin * zoom}px`,
                            height: `${height}px`,
                        }}
                    >
                         {/* Visual Block */}
                         <div 
                             className="absolute inset-0 rounded-sm border-l-2 opacity-90 hover:opacity-100 hover:z-10 transition-all cursor-help overflow-hidden"
                             style={{
                                 backgroundColor: `color-mix(in srgb, ${color}, transparent 80%)`, 
                                 borderColor: color,
                             }}
                         >
                             {height > 20 && (
                                 <div className="px-2 py-1 text-[11px] leading-none truncate text-zinc-200 font-medium">
                                     {taskTitle}
                                 </div>
                             )}
                         </div>
                         
                         {/* Hover Tooltip */}
                         <div className="hidden group-hover:flex flex-col absolute left-0 top-full mt-1 bg-zinc-800 border border-zinc-700 text-zinc-100 text-xs p-2 rounded z-50 whitespace-nowrap shadow-lg pointer-events-none">
                            <span className="font-medium mb-1">{taskTitle}</span>
                            <div className="flex flex-col gap-0.5 text-zinc-400">
                                <span>
                                    {start.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})} — {
                                        entry.endTime 
                                        ? new Date(entry.endTime).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}) 
                                        : currentTime.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})
                                    }
                                </span>
                                <span className="text-zinc-500 border-t border-zinc-700/50 pt-1 mt-1">
                                    Длительность: {formatDuration(duration * 60)}
                                </span>
                            </div>
                         </div>
                    </div>
                );
            })}

            {/* Current Time Line */}
            {isTodaySelected && (
                <div 
                    className="absolute left-0 right-0 border-t border-pink-500 z-10 flex items-center pointer-events-none"
                    style={{ top: `${currentMinutes * zoom}px` }}
                >
                    <div className="w-2 h-2 bg-pink-500 rounded-full -ml-1 box-content border-2 border-[#000000]" />
                </div>
            )}
         </div>
      </div>

      {/* Zoom Controls */}
      <div className="absolute bottom-11 right-6 flex flex-col bg-[#18181B] rounded-lg border border-[#27272A] shadow-xl overflow-hidden">
          <button 
            onClick={handleZoomIn}
            className="p-2 hover:bg-[#27272A] text-zinc-400 hover:text-white transition-colors border-b border-[#27272A]"
            title="Увеличить масштаб"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button 
            onClick={handleZoomOut}
            className="p-2 hover:bg-[#27272A] text-zinc-400 hover:text-white transition-colors"
            title="Уменьшить масштаб"
          >
            <Minus className="w-4 h-4" />
          </button>
      </div>
    </div>
  );
}
