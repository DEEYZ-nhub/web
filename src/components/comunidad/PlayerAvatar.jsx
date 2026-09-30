import React from 'react';

export function PlayerAvatar({ initials, color, size = 'md', className = '' }) {
  const sizes = {
    sm: 'h-8 w-8 text-[10px]',
    md: 'h-10 w-10 text-[11px]',
    lg: 'h-11 w-11 text-[12px]'
  };

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full border font-black italic [font-family:var(--font-display)] ${sizes[size]} ${className}`}
      style={{
        backgroundColor: `${color}22`,
        borderColor: `${color}66`,
        color
      }}
      aria-hidden="true"
    >
      {initials}
    </span>
  );
}
