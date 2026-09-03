import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

interface TagProps {
  children: ReactNode
  className?: string
  size?: 'sm' | 'md'
}

export default function Tag({ children, className, size = 'md' }: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded font-mono font-medium',
        'bg-blue-500/10 text-blue-400 dark:text-blue-400 border border-blue-500/15',
        'transition-colors duration-150',
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs',
        className
      )}
    >
      {children}
    </span>
  )
}
