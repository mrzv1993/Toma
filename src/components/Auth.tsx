import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Play } from 'lucide-react';

export function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDemoLoading, setIsDemoLoading] = useState(false);

  const { signIn, signUp } = useApp();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      if (isSignUp) {
        await signUp(email, password);
      } else {
        await signIn(email, password);
      }
    } catch (err: any) {
      setError(err.message || 'Произошла ошибка');
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDemoLogin() {
    setError('');
    setIsDemoLoading(true);
    const demoEmail = 'demo@example.com';
    const demoPassword = 'demo-password-123';

    try {
      // Try to sign in first
      try {
        await signIn(demoEmail, demoPassword);
      } catch (err) {
        // If sign in fails, try to sign up (maybe user doesn't exist yet)
        console.log('Demo sign in failed, trying to create demo account...');
        await signUp(demoEmail, demoPassword);
      }
    } catch (err: any) {
      setError('Не удалось войти в демо-режим: ' + (err.message || 'Unknown error'));
    } finally {
      setIsDemoLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)] px-4 font-sans">
      <div className="w-full max-w-[400px]">
        {/* Logo / Title Section */}
        <div className="mb-12">
          <h1 className="text-[var(--color-text-primary)] leading-none select-none">
            <span className="block text-2xl font-medium mb-2">Фреймворк</span>
            <span className="block text-8xl font-bold tracking-tighter">9-</span>
            <span className="block text-8xl font-bold tracking-tighter">1</span>
          </h1>
          <div className="mt-6 text-[var(--color-text-secondary)] text-lg leading-relaxed max-w-[280px]">
            Управление
            <br />
            задачами
            <br />
            и
            <br />
            приоритетами
          </div>
        </div>

        {/* Auth Form */}
        <div className="space-y-6">
          {/* Tabs */}
          <div className="flex gap-6 text-lg">
            <button
              type="button"
              onClick={() => {
                setIsSignUp(false);
                setError('');
              }}
              className={`pb-1 transition-colors ${
                !isSignUp
                  ? 'text-[var(--color-text-primary)] border-b-2 border-[var(--color-primary)]'
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
              }`}
            >
              Вход
            </button>
            <button
              type="button"
              onClick={() => {
                setIsSignUp(true);
                setError('');
              }}
              className={`pb-1 transition-colors ${
                isSignUp
                  ? 'text-[var(--color-text-primary)] border-b-2 border-[var(--color-primary)]'
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
              }`}
            >
              Регистрация
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-2 text-[var(--color-text-secondary)] text-sm">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                placeholder="example@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block mb-2 text-[var(--color-text-secondary)] text-sm">
                Пароль
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/50 rounded text-red-500 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting || isDemoLoading}
              className="w-full py-3 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {isSubmitting ? 'Загрузка...' : isSignUp ? 'Создать аккаунт' : 'Войти'}
            </button>
          </form>

          <div className="pt-4 border-t border-[var(--color-border)]">
             <button
              type="button"
              onClick={handleDemoLogin}
              disabled={isSubmitting || isDemoLoading}
              className="w-full flex items-center justify-center gap-2 py-3 bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] text-[var(--color-text-primary)] border border-[var(--color-border)] rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDemoLoading ? (
                'Вход в демо...'
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>Демо-доступ</span>
                </>
              )}
            </button>
             <p className="text-xs text-center text-[var(--color-text-tertiary)] mt-3">
               Демо-режим позволяет ознакомиться с функционалом без регистрации
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
