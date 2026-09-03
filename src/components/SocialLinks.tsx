import type { ElementType } from 'react'
import { Github, Linkedin, Mail, Code, Trophy, BookOpen } from 'lucide-react'
import { cn, externalLink, isPlaceholder } from '../lib/utils'
import type { Social } from '../types'

interface SocialLinksProps {
  socials: Social[]
  className?: string
  iconSize?: number
  showLabel?: boolean
  orientation?: 'horizontal' | 'vertical'
}

// Maps icon string identifiers to Lucide icon components
const iconMap: Record<string, ElementType> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  code: Code,
  trophy: Trophy,
  'book-open': BookOpen,
}

export default function SocialLinks({
  socials,
  className,
  iconSize = 20,
  showLabel = false,
  orientation = 'horizontal',
}: SocialLinksProps) {
  return (
    <div
      className={cn(
        'flex gap-2',
        orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap',
        className
      )}
    >
      {socials.map((social) => {
        const Icon = iconMap[social.icon] ?? Code
        const placeholder = isPlaceholder(social.url)

        return (
          <a
            key={social.label}
            {...externalLink(social.url)}
            aria-label={social.label}
            title={placeholder ? `${social.label} (placeholder — update in socials.ts)` : social.label}
            className={cn(
              'inline-flex items-center gap-2 rounded-lg p-2 transition-colors duration-150',
              'text-[var(--text-muted)] hover:text-[var(--text-primary)]',
              'hover:bg-[var(--bg-surface-2)]',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
              placeholder && 'opacity-60'
            )}
          >
            <Icon size={iconSize} strokeWidth={1.75} aria-hidden="true" />
            {showLabel && (
              <span className="text-sm">{social.username ?? social.label}</span>
            )}
          </a>
        )
      })}
    </div>
  )
}
