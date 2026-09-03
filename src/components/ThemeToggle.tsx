import { Moon, Sun } from 'lucide-react'
import { cn } from '../lib/utils'

interface ThemeToggleProps {
  theme: 'dark' | 'light'
  toggle: () => void
  className?: string
}

export default function ThemeToggle({ theme, toggle, className }: ThemeToggleProps) {
  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className={cn(
        'p-2 rounded-lg transition-colors duration-150',
        'text-[var(--text-muted)] hover:text-[var(--text-primary)]',
        'hover:bg-[var(--bg-surface-2)]',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
        className
      )}
    >
      {theme === 'dark' ? (
        <Sun size={18} strokeWidth={2} aria-hidden="true" />
      ) : (
        <Moon size={18} strokeWidth={2} aria-hidden="true" />
      )}
    </button>
  )
}
