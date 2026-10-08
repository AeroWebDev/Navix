import { describe, it, expect } from 'vitest';
import { cn } from '../utils/cn';

describe('Project Scaffold & Setup', () => {
  it('correctly merges CSS classnames with cn()', () => {
    const result = cn('px-4 py-2', 'bg-blue-500', { 'text-white': true, 'hidden': false });
    expect(result).toContain('px-4');
    expect(result).toContain('py-2');
    expect(result).toContain('bg-blue-500');
    expect(result).toContain('text-white');
    expect(result).not.toContain('hidden');
  });

  it('handles Tailwind class overrides correctly', () => {
    const result = cn('px-4 text-red-500', 'text-blue-500');
    expect(result).toContain('px-4');
    expect(result).toContain('text-blue-500');
    expect(result).not.toContain('text-red-500');
  });
});
