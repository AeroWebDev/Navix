import React from 'react';
import { cn } from '@/utils/cn';

export interface NavixLogoProps {
  /**
   * Layout style:
   * - 'horizontal': icon + text side-by-side (default for headers, navbar)
   * - 'icon': just the N-arrow symbol
   * - 'stacked': icon on top, NAVIX text below
   * - 'symbol-text': icon image + live DOM text for accessibility
   */
  variant?: 'horizontal' | 'icon' | 'stacked' | 'symbol-text';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  subtext?: string;
}

const SIZE_CONFIG = {
  sm: {
    icon: 'h-7 w-7',
    horizontal: 'h-7',
    stacked: 'h-16',
    text: 'text-lg',
    subtext: 'text-[9px]',
  },
  md: {
    icon: 'h-9 w-9',
    horizontal: 'h-9',
    stacked: 'h-20',
    text: 'text-xl',
    subtext: 'text-[10px]',
  },
  lg: {
    icon: 'h-12 w-12',
    horizontal: 'h-12',
    stacked: 'h-28',
    text: 'text-2xl',
    subtext: 'text-xs',
  },
  xl: {
    icon: 'h-16 w-16',
    horizontal: 'h-16',
    stacked: 'h-36',
    text: 'text-3xl',
    subtext: 'text-sm',
  },
};

export const NavixLogo: React.FC<NavixLogoProps> = ({
  variant = 'symbol-text',
  size = 'md',
  className,
  subtext,
}) => {
  const config = SIZE_CONFIG[size];

  if (variant === 'icon') {
    return (
      <div className={cn('relative inline-flex items-center justify-center shrink-0', className)}>
        <img
          src="/images/logo/navix-icon.png"
          alt="NAVIX"
          className={cn(config.icon, 'object-contain transition-transform select-none')}
        />
      </div>
    );
  }

  if (variant === 'horizontal') {
    return (
      <div className={cn('inline-flex items-center shrink-0', className)}>
        <img
          src="/images/logo/navix-logo-horizontal.png"
          alt="NAVIX Logo"
          className={cn(config.horizontal, 'w-auto object-contain transition-transform select-none')}
        />
      </div>
    );
  }

  if (variant === 'stacked') {
    return (
      <div className={cn('inline-flex flex-col items-center text-center shrink-0', className)}>
        <img
          src="/images/logo/navix-logo.png"
          alt="NAVIX Logo"
          className={cn(config.stacked, 'w-auto object-contain transition-transform select-none')}
        />
      </div>
    );
  }

  // Default 'symbol-text': Crisp icon + styled typography for responsive control
  return (
    <div className={cn('inline-flex items-center gap-2.5 shrink-0', className)}>
      <div className={cn('relative flex items-center justify-center shrink-0')}>
        <img
          src="/images/logo/navix-icon.png"
          alt="NAVIX"
          className={cn(config.icon, 'object-contain transition-transform select-none')}
        />
      </div>

      <div className="flex flex-col">
        <span
          className={cn(
            config.text,
            'font-black tracking-tight text-foreground leading-none select-none font-sans'
          )}
        >
          NAVIX
        </span>
        {subtext && (
          <span
            className={cn(
              config.subtext,
              'text-muted-foreground uppercase font-bold tracking-wider mt-0.5'
            )}
          >
            {subtext}
          </span>
        )}
      </div>
    </div>
  );
};

export default NavixLogo;
