import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Auth } from './components/Auth';
import { HooksColumn } from './components/HooksColumn';
import { InboxColumn } from './components/InboxColumn';
import { SprintColumn } from './components/SprintColumn';
import { TimerColumn } from './components/TimerColumn';
import { LogOut } from 'lucide-react';

function AppContent() {
  const { user, isLoading, signOut } = useApp();

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

      {/* Main Content - 4 Columns */}
      <div className="flex-1 grid grid-cols-4 min-h-0">
        {/* Column 1: Hooks */}
        <div className="h-full min-h-0 overflow-hidden">
          <HooksColumn />
        </div>

        {/* Column 2: Inbox */}
        <div className="h-full min-h-0 overflow-hidden">
          <InboxColumn />
        </div>

        {/* Column 3: Sprint */}
        <div className="h-full min-h-0 overflow-hidden">
          <SprintColumn />
        </div>

        {/* Column 4: Timer */}
        <div className="h-full min-h-0 overflow-hidden">
          <TimerColumn />
        </div>
      </div>
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