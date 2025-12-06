import React, { useState, useEffect } from 'react';
import { Plus, X, Trash2, Edit2, RefreshCw } from 'lucide-react';
import { api } from '../utils/api';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

interface Idea {
  id: string;
  text: string;
  author?: string;
  tags?: string[];
  color?: string;
  createdAt?: string;
  updatedAt?: string;
}

export function IdeasSection() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newIdeaText, setNewIdeaText] = useState('');
  const [newIdeaTags, setNewIdeaTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  // Fetch ideas on mount
  useEffect(() => {
    loadIdeas();
  }, []);

  const loadIdeas = async () => {
    try {
      setIsLoading(true);
      console.log('Loading ideas from server...');
      
      // Try to load from server
      const response = await api.getIdeas();
      console.log('Ideas loaded from server:', response.length);
      
      // Check if localStorage has old data that needs migration
      if (response.length === 0) {
        console.log('No ideas on server, checking localStorage for migration...');
        const localIdeas = localStorage.getItem('ideas');
        if (localIdeas) {
          try {
            const parsedIdeas = JSON.parse(localIdeas);
            if (Array.isArray(parsedIdeas) && parsedIdeas.length > 0) {
              console.log(`Found ${parsedIdeas.length} ideas in localStorage, migrating to server...`);
              
              // Migrate each idea to server
              const migratedIdeas = [];
              for (const idea of parsedIdeas) {
                try {
                  const newIdea = await api.createIdea({
                    text: idea.text || idea.content || '',
                    tags: idea.tags || [],
                    color: idea.color || '#FFF8E1'
                  });
                  migratedIdeas.push(newIdea);
                } catch (err) {
                  console.error('Failed to migrate idea:', err);
                }
              }
              
              setIdeas(migratedIdeas);
              console.log(`Successfully migrated ${migratedIdeas.length} ideas to server`);
              
              // Clear localStorage after successful migration
              localStorage.removeItem('ideas');
              console.log('Cleared localStorage ideas after migration');
              return;
            }
          } catch (err) {
            console.error('Error parsing localStorage ideas:', err);
          }
        }
      }
      
      setIdeas(response);
    } catch (error) {
      console.error('Failed to load ideas:', error);
      console.error('Error details:', {
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      });
      
      // Show user-friendly error
      alert('Не удалось загрузить записки. Проверьте подключение к интернету и попробуйте перезагрузить страницу.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTag = () => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag && !newIdeaTags.includes(trimmedTag)) {
      setNewIdeaTags([...newIdeaTags, trimmedTag]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setNewIdeaTags(newIdeaTags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleAddIdea = async () => {
    if (newIdeaText.trim()) {
      try {
        const newIdea = await api.createIdea({
          text: newIdeaText.trim(),
          tags: newIdeaTags.length > 0 ? newIdeaTags : [],
          color: '#FFF8E1'
        });
        setIdeas([newIdea, ...ideas]);
        setNewIdeaText('');
        setNewIdeaTags([]);
        setTagInput('');
      } catch (error: any) {
        console.error('Failed to create idea:', error);
        console.error('Error details:', error.message, error.stack);
        alert(`Не удалось добавить записку: ${error.message || 'Неизвестная ошибка'}`);
      }
    }
  };

  const handleQuickAdd = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Ctrl/Cmd + Enter to quickly add
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleAddIdea();
    }
  };

  const handleDeleteIdea = async (id: string) => {
    try {
      await api.deleteIdea(id);
      setIdeas(ideas.filter(idea => idea.id !== id));
    } catch (error) {
      console.error('Failed to delete idea:', error);
    }
  };

  // Get all unique tags from existing ideas
  const getAllTags = (): string[] => {
    const tagsSet = new Set<string>();
    ideas.forEach(idea => {
      idea.tags?.forEach(tag => tagsSet.add(tag));
    });
    return Array.from(tagsSet).sort();
  };

  // Filtering
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filterMode, setFilterMode] = useState<'AND' | 'OR'>('AND');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleTagFilter = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const filteredIdeas = ideas.filter(idea => {
    // Text search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      if (!idea.text.toLowerCase().includes(query)) {
        return false;
      }
    }

    // Tag filter
    if (selectedTags.length > 0) {
      const ideaTags = idea.tags || [];
      if (filterMode === 'AND') {
        // All selected tags must be present
        return selectedTags.every(tag => ideaTags.includes(tag));
      } else {
        // At least one selected tag must be present
        return selectedTags.some(tag => ideaTags.includes(tag));
      }
    }

    return true;
  });

  // Edit State
  const [editingIdea, setEditingIdea] = useState<Idea | null>(null);
  const [editText, setEditText] = useState('');
  const [editTags, setEditTags] = useState<string[]>([]);
  const [editTagInput, setEditTagInput] = useState('');

  const handleStartEdit = (idea: Idea) => {
    setEditingIdea(idea);
    setEditText(idea.text);
    setEditTags(idea.tags || []);
    setEditTagInput('');
  };

  const handleCancelEdit = () => {
    setEditingIdea(null);
    setEditText('');
    setEditTags([]);
    setEditTagInput('');
  };

  const handleSaveEdit = async () => {
    if (editingIdea && editText.trim()) {
      try {
        const updated = await api.updateIdea(editingIdea.id, {
          text: editText.trim(),
          tags: editTags
        });
        setIdeas(ideas.map(i => i.id === updated.id ? updated : i));
        handleCancelEdit();
      } catch (error) {
        console.error('Failed to update idea:', error);
      }
    }
  };

  const handleAddEditTag = () => {
    const trimmedTag = editTagInput.trim();
    if (trimmedTag && !editTags.includes(trimmedTag)) {
      setEditTags([...editTags, trimmedTag]);
      setEditTagInput('');
    }
  };

  const handleRemoveEditTag = (tagToRemove: string) => {
    setEditTags(editTags.filter(tag => tag !== tagToRemove));
  };

  const handleEditTagKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddEditTag();
    }
  };

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center bg-[var(--color-background)]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin" />
          <div className="text-[var(--color-text-secondary)]">Загрузка записок...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-[var(--color-background)] flex">
      {/* Left Sidebar - Add Form */}
      <div className="w-80 border-r border-[var(--color-border)] p-6 flex flex-col gap-4 overflow-y-auto">
        <h2 className="text-[var(--color-text-primary)] font-medium">Новая записка</h2>
        
        <div className="flex flex-col gap-3">
          <textarea
            value={newIdeaText}
            onChange={(e) => setNewIdeaText(e.target.value)}
            onKeyDown={handleQuickAdd}
            placeholder="Напишите вашу записку..."
            className="w-full min-h-[120px] p-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded text-[var(--color-text-primary)] resize-none focus:outline-none focus:border-[var(--color-primary)]"
          />
          
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Добавить тег"
                className="flex-1 p-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-primary)]"
              />
              <button
                onClick={handleAddTag}
                className="px-3 py-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white rounded transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            
            {newIdeaTags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {newIdeaTags.map(tag => (
                  <div
                    key={tag}
                    className="px-2 py-1 bg-[var(--color-surface-hover)] border border-[var(--color-border)] rounded text-sm text-[var(--color-text-primary)] flex items-center gap-1"
                  >
                    {tag}
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className="hover:text-red-500 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <button
            onClick={handleAddIdea}
            disabled={!newIdeaText.trim()}
            className="w-full py-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Добавить записку
          </button>
          
          <p className="text-xs text-[var(--color-text-secondary)]">
            Или нажмите Ctrl+Enter для быстрого добавления
          </p>
        </div>

        {/* Filter Section */}
        <div className="mt-6 pt-6 border-t border-[var(--color-border)]">
          <h3 className="text-[var(--color-text-primary)] font-medium mb-3">Фильтры</h3>
          
          {/* Search */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск по тексту..."
            className="w-full p-2 mb-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-primary)]"
          />

          {/* Filter Mode Toggle */}
          {selectedTags.length > 0 && (
            <div className="mb-3 flex gap-2">
              <button
                onClick={() => setFilterMode('AND')}
                className={`flex-1 py-1 px-2 rounded text-sm transition-colors ${
                  filterMode === 'AND'
                    ? 'bg-[var(--color-primary)] text-white'
                    : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border)]'
                }`}
              >
                И (AND)
              </button>
              <button
                onClick={() => setFilterMode('OR')}
                className={`flex-1 py-1 px-2 rounded text-sm transition-colors ${
                  filterMode === 'OR'
                    ? 'bg-[var(--color-primary)] text-white'
                    : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border)]'
                }`}
              >
                ИЛИ (OR)
              </button>
            </div>
          )}

          {/* Available Tags */}
          <div className="flex flex-wrap gap-2">
            {getAllTags().map(tag => (
              <button
                key={tag}
                onClick={() => toggleTagFilter(tag)}
                className={`px-2 py-1 rounded text-sm transition-colors ${
                  selectedTags.includes(tag)
                    ? 'bg-[var(--color-primary)] text-white'
                    : 'bg-[var(--color-surface)] text-[var(--color-text-primary)] border border-[var(--color-border)] hover:bg-[var(--color-surface-hover)]'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {(selectedTags.length > 0 || searchQuery.trim()) && (
            <button
              onClick={() => {
                setSelectedTags([]);
                setSearchQuery('');
              }}
              className="mt-3 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
            >
              Сбросить фильтры
            </button>
          )}
        </div>
      </div>

      {/* Main Area - Ideas Grid */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="mb-4 flex items-center justify-between">
          <div className="text-[var(--color-text-secondary)] text-sm">
            {filteredIdeas.length === 0 ? (
              'Нет записок'
            ) : (
              `${filteredIdeas.length} ${filteredIdeas.length === 1 ? 'записка' : filteredIdeas.length < 5 ? 'записки' : 'записок'}`
            )}
          </div>
          <button
            onClick={loadIdeas}
            disabled={isLoading}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)] rounded transition-colors disabled:opacity-50"
            title="Обновить записки"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            Обновить
          </button>
        </div>

        {/* Masonry Layout using CSS columns */}
        <div 
          className="masonry-container"
          style={{
            columnCount: 'auto',
            columnWidth: '300px',
            columnGap: '16px',
          }}
        >
          {filteredIdeas.map((idea) => (
            <div
              key={idea.id}
              className="masonry-item break-inside-avoid mb-4"
            >
              <div 
                className="p-4 rounded-lg bg-[#1a1a1a] border-2 border-[#2a2a2a] hover:border-[var(--color-primary)] transition-all shadow-lg hover:shadow-xl group"
              >
                <p className="text-white whitespace-pre-wrap mb-3 leading-relaxed">
                  {idea.text}
                </p>

                {idea.tags && idea.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {idea.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 bg-[var(--color-primary)]/20 border border-[var(--color-primary)]/40 rounded text-xs text-[var(--color-primary)] font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>
                    {idea.createdAt ? new Date(idea.createdAt).toLocaleDateString('ru-RU') : ''}
                  </span>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleStartEdit(idea)}
                      className="p-1.5 rounded bg-[#2a2a2a] hover:bg-[var(--color-primary)] hover:text-white transition-all"
                      title="Редактировать"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteIdea(idea.id)}
                      className="p-1.5 rounded bg-[#2a2a2a] hover:bg-red-500 hover:text-white transition-all"
                      title="Удалить"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!editingIdea} onOpenChange={(open) => !open && handleCancelEdit()}>
        <DialogContent className="max-w-2xl bg-[var(--color-surface)] border-[var(--color-border)]">
          <DialogHeader>
            <DialogTitle className="text-[var(--color-text-primary)]">
              Редактировать записку
            </DialogTitle>
            <DialogDescription className="text-[var(--color-text-secondary)]">
              Измените текст или теги вашей записки
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              placeholder="Текст записки..."
              className="w-full min-h-[150px] p-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded text-[var(--color-text-primary)] resize-none focus:outline-none focus:border-[var(--color-primary)]"
            />

            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={editTagInput}
                  onChange={(e) => setEditTagInput(e.target.value)}
                  onKeyDown={handleEditTagKeyPress}
                  placeholder="Добавить тег"
                  className="flex-1 p-2 bg-[var(--color-background)] border border-[var(--color-border)] rounded text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-primary)]"
                />
                <button
                  onClick={handleAddEditTag}
                  className="px-3 py-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white rounded transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {editTags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {editTags.map(tag => (
                    <div
                      key={tag}
                      className="px-2 py-1 bg-[var(--color-surface-hover)] border border-[var(--color-border)] rounded text-sm text-[var(--color-text-primary)] flex items-center gap-1"
                    >
                      {tag}
                      <button
                        onClick={() => handleRemoveEditTag(tag)}
                        className="hover:text-red-500 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <button
              onClick={handleCancelEdit}
              className="px-4 py-2 bg-[var(--color-surface-hover)] hover:bg-[var(--color-border)] text-[var(--color-text-primary)] rounded transition-colors"
            >
              Отмена
            </button>
            <button
              onClick={handleSaveEdit}
              disabled={!editText.trim()}
              className="px-4 py-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Сохранить
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}