import React from 'react';
import { Person } from '../../types';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';

interface PersonAvatarProps {
  person: Person;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showTooltip?: boolean;
}

export function PersonAvatar({ person, size = 'md', className = '', showTooltip = true }: PersonAvatarProps) {
  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-10 h-10 text-base',
  };

  const initials = person.firstName.charAt(0) + (person.lastName ? person.lastName.charAt(0) : '');
  
  // Default color generation if not provided
  const getColor = (str: string) => {
    if (person.color) return person.color;
    const colors = ['#ef4444', '#f97316', '#f59e0b', '#84cc16', '#10b981', '#06b6d4', '#3b82f6', '#6366f1', '#8b5cf6', '#d946ef', '#f43f5e'];
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const backgroundColor = getColor(person.id);

  const avatar = (
    <Avatar className={`${sizeClasses[size]} ${className}`}>
      <AvatarImage src={person.avatarUrl || undefined} alt={person.firstName} />
      <AvatarFallback style={{ backgroundColor, color: 'white' }}>
        {initials.toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );

  if (showTooltip) {
    return (
      <div className="relative group" title={`${person.firstName} ${person.lastName || ''}`.trim()}>
        {avatar}
      </div>
    );
  }

  return avatar;
}
