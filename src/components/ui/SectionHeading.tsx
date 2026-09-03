import { cn } from '../../lib/utils'

interface SectionHeadingProps {
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
  id?: string
}

export default function SectionHeading({
  title,
  subtitle,
  align = 'left',
  className,
  id,
}: SectionHeadingProps) {
  return (
    <div className={cn('mb-12', align === 'center' && 'text-center', className)}>
      <h2
        id={id}
        className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-3 tracking-tight"
      >
        {title}
      </h2>
      {/* Accent underline */}
      <div
        className={cn(
          'h-0.5 w-12 bg-accent rounded-full mb-4',
          align === 'center' && 'mx-auto'
        )}
        aria-hidden="true"
      />
      {subtitle && (
        <p className="text-[var(--text-muted)] text-base max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  )
}
