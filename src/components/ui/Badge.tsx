import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

type BadgeVariant = 'default' | 'blue' | 'green' | 'orange' | 'purple' | 'muted'

interface BadgeProps {
  children: ReactNode
  variant?: BadgeVariant
  className?: string
}

const variantClasses: Record<BadgeVariant, string> = {
  default:
    'bg-[var(--bg-surface-2)] text-[var(--text-primary)] border border-[var(--border)]',
  blue: 'bg-blue-500/10 text-blue-400 dark:text-blue-400 border border-blue-500/20',
  green: 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20',
  orange: 'bg-orange-500/10 text-orange-400 border border-orange-500/20',
  purple: 'bg-purple-500/10 text-purple-400 border border-purple-500/20',
  muted: 'bg-transparent text-[var(--text-muted)] border border-[var(--border)]',
}

export default function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
