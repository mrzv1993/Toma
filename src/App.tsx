import React, { useState, useEffect, useRef } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Auth } from './components/Auth';
import { HooksColumn } from './components/HooksColumn';
import { InboxColumn } from './components/InboxColumn';
import { SprintColumn } from './components/SprintColumn';
import { TimerColumn } from './components/TimerColumn';
import { TaskDetailsPanel } from './components/TaskDetailsDialog';
import { LogOut, Users } from 'lucide-react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from './components/ui/resizable';
import { ImperativePanelHandle } from "react-resizable-panels";
import { PeopleManager } from './components/people/PeopleManager';

function AppContent() {
  const { user, isLoading, signOut, selectedTask, setSelectedTask, updateTask } = useApp();
  const [isMobile, setIsMobile] = useState(false);
  const [collapsed, setCollapsed] = useState({
    hooks: false,
    inbox: false,
    sprint: false,
    timer: false
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const hooksRef = useRef<ImperativePanelHandle>(null);
  const inboxRef = useRef<ImperativePanelHandle>(null);
  const sprintRef = useRef<ImperativePanelHandle>(null);
  const timerRef = useRef<ImperativePanelHandle>(null);

  useEffect(() => {
    if (selectedTask && collapsed.timer) {
        timerRef.current?.expand();
    }
  }, [selectedTask, collapsed.timer]);

  // Sync collapsed state with panels
  useEffect(() => {
    const panel = hooksRef.current;
    if (panel) {
      if (collapsed.hooks) panel.collapse();
      else panel.expand();
    }
  }, [collapsed.hooks]);

  useEffect(() => {
    const panel = inboxRef.current;
    if (panel) {
      if (collapsed.inbox) panel.collapse();
      else panel.expand();
    }
  }, [collapsed.inbox]);

  useEffect(() => {
    const panel = sprintRef.current;
    if (panel) {
      if (collapsed.sprint) panel.collapse();
      else panel.expand();
    }
  }, [collapsed.sprint]);

  useEffect(() => {
    const panel = timerRef.current;
    if (panel) {
      if (collapsed.timer) panel.collapse();
      else panel.expand();
    }
  }, [collapsed.timer]);

  const toggleCollapse = (key: keyof typeof collapsed) => {
    setCollapsed(prev => ({ ...prev, [key]: !prev[key] }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[var(--color-text-secondary)]">Загрузка...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Auth />;
  }

  return (
    <div className="h-screen flex flex-col bg-[var(--color-background)]">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-4 bg-[var(--color-surface)] border-b border-[var(--color-border)] flex-shrink-0">
        <div>
          <h1>toma</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p>{user.email}</p>
          </div>
          <button
            onClick={signOut}
            className="p-2 hover:bg-[var(--color-surface-hover)] rounded transition-colors"
            title="Выйти"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      {isMobile ? (
        <div className="flex-1 overflow-x-auto snap-x snap-mandatory flex h-full w-full bg-[var(--color-background)]">
           <div className="snap-center w-full min-w-0 h-full flex-shrink-0 border-r border-[var(--color-border)]">
             <HooksColumn />
           </div>
           <div className="snap-center w-full min-w-0 h-full flex-shrink-0 border-r border-[var(--color-border)]">
             <InboxColumn />
           </div>
           <div className="snap-center w-full min-w-0 h-full flex-shrink-0 border-r border-[var(--color-border)]">
             <SprintColumn />
           </div>
           <div className="snap-center w-full min-w-0 h-full flex-shrink-0 border-r border-[var(--color-border)]">
              {selectedTask ? (
                <TaskDetailsPanel 
                  task={selectedTask}
                  onUpdate={updateTask}
                  onClose={() => setSelectedTask(null)}
                />
              ) : (
                <TimerColumn />
              )}
           </div>
        </div>
      ) : (
      <ResizablePanelGroup direction="horizontal" className="flex-1 min-h-0">
        {/* Column 1: Hooks */}
        <ResizablePanel 
            ref={hooksRef}
            defaultSize={20}
            minSize={15}
            collapsible={true}
            collapsedSize={4}
            onCollapse={() => setCollapsed(prev => ({ ...prev, hooks: true }))}
            onExpand={() => setCollapsed(prev => ({ ...prev, hooks: false }))}
            className={`transition-all duration-300 ease-in-out ${collapsed.hooks ? 'min-w-[40px]' : ''}`}
        >
          <HooksColumn 
            isCollapsed={collapsed.hooks} 
            onToggleCollapse={() => toggleCollapse('hooks')} 
          />
        </ResizablePanel>
        
        <ResizableHandle 
            onDoubleClick={() => {
                hooksRef.current?.resize(20);
                inboxRef.current?.resize(30);
            }}
        />

        {/* Column 2: Inbox */}
        <ResizablePanel 
            ref={inboxRef}
            defaultSize={30}
            minSize={15}
            collapsible={true}
            collapsedSize={4}
            onCollapse={() => setCollapsed(prev => ({ ...prev, inbox: true }))}
            onExpand={() => setCollapsed(prev => ({ ...prev, inbox: false }))}
            className={`transition-all duration-300 ease-in-out ${collapsed.inbox ? 'min-w-[40px]' : ''}`}
        >
          <InboxColumn 
            isCollapsed={collapsed.inbox} 
            onToggleCollapse={() => toggleCollapse('inbox')}
          />
        </ResizablePanel>

        <ResizableHandle 
            onDoubleClick={() => {
                inboxRef.current?.resize(30);
                sprintRef.current?.resize(30);
            }}
        />

        {/* Column 3: Sprint */}
        <ResizablePanel 
            ref={sprintRef}
            defaultSize={30}
            minSize={15}
            collapsible={true}
            collapsedSize={4}
            onCollapse={() => setCollapsed(prev => ({ ...prev, sprint: true }))}
            onExpand={() => setCollapsed(prev => ({ ...prev, sprint: false }))}
            className={`transition-all duration-300 ease-in-out ${collapsed.sprint ? 'min-w-[40px]' : ''}`}
        >
          <SprintColumn 
            isCollapsed={collapsed.sprint} 
            onToggleCollapse={() => toggleCollapse('sprint')}
          />
        </ResizablePanel>

        <ResizableHandle 
            onDoubleClick={() => {
                sprintRef.current?.resize(30);
                timerRef.current?.resize(20);
            }}
        />

        {/* Column 4: Timer or Task Details */}
        <ResizablePanel 
            ref={timerRef}
            defaultSize={20}
            minSize={15}
            collapsible={true}
            collapsedSize={4}
            onCollapse={() => setCollapsed(prev => ({ ...prev, timer: true }))}
            onExpand={() => setCollapsed(prev => ({ ...prev, timer: false }))}
            className={`transition-all duration-300 ease-in-out ${collapsed.timer ? 'min-w-[40px]' : ''}`}
        >
          {selectedTask ? (
            <TaskDetailsPanel 
              task={selectedTask}
              onUpdate={updateTask}
              onClose={() => setSelectedTask(null)}
            />
          ) : (
            <TimerColumn 
              isCollapsed={collapsed.timer} 
              onToggleCollapse={() => toggleCollapse('timer')}
            />
          )}
        </ResizablePanel>

      </ResizablePanelGroup>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}