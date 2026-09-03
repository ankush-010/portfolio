import type { AnchorHTMLAttributes, MouseEventHandler, ReactNode } from 'react'
import { cn, externalLink } from '../../lib/utils'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline'
type ButtonSize = 'sm' | 'md' | 'lg'

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-accent hover:bg-accent-hover text-white border border-transparent shadow-sm',
  secondary:
    'bg-[var(--bg-surface-2)] hover:bg-[var(--bg-surface-2)] text-[var(--text-primary)] border border-[var(--border)] hover:opacity-80',
  ghost:
    'bg-transparent hover:bg-[var(--bg-surface-2)] text-[var(--text-primary)] border border-transparent',
  outline:
    'bg-transparent hover:bg-blue-500/10 text-accent border border-accent/40 hover:border-accent',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  md: 'px-5 py-2.5 text-sm gap-2',
  lg: 'px-6 py-3 text-base gap-2',
}

interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  children: ReactNode
  disabled?: boolean
  loading?: boolean
  // anchor mode
  as?: 'a'
  href?: string
  external?: boolean
  // button mode
  onClick?: MouseEventHandler<HTMLButtonElement>
  type?: 'button' | 'submit' | 'reset'
}

export default function Button({
  as,
  href,
  external,
  variant = 'primary',
  size = 'md',
  className,
  children,
  disabled,
  loading,
  onClick,
  type = 'button',
}: ButtonProps) {
  const base = cn(
    'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-150',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    variantClasses[variant],
    sizeClasses[size],
    className
  )

  if (as === 'a' && href) {
    const linkProps: AnchorHTMLAttributes<HTMLAnchorElement> = external
      ? externalLink(href)
      : { href }

    return (
      <a {...linkProps} className={base}>
        {children}
      </a>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={base}
    >
      {loading ? (
        <svg
          className="animate-spin -ml-0.5 mr-1.5 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
      ) : null}
      {children}
    </button>
  )
}
