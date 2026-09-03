import type { ElementType } from 'react'
import { Github, Linkedin, Mail } from 'lucide-react'
import { externalLink } from '../lib/utils'
import personal from '../data/personal'
import { socials } from '../data/socials'

export default function Footer() {
  const year = new Date().getFullYear()

  const iconMap: Record<string, ElementType> = {
    github: Github,
    linkedin: Linkedin,
    mail: Mail,
  }

  return (
    <footer className="border-t border-[var(--border)] py-10">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 text-center">
          {/* Identity */}
          <div>
            <p className="font-semibold text-[var(--text-primary)]">{personal.name}</p>
            <p className="text-sm text-[var(--text-muted)]">{personal.title}</p>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-1">
            {socials.map((social) => {
              const Icon = iconMap[social.icon]
              if (!Icon) return null
              return (
                <a
                  key={social.label}
                  {...externalLink(social.url)}
                  aria-label={social.label}
                  className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-2)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  <Icon size={18} strokeWidth={1.75} aria-hidden="true" />
                </a>
              )
            })}
          </div>

          {/* Copyright */}
          <p className="text-xs text-[var(--text-muted)]">
            © {year} {personal.name}. Built with React, Vite & Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  )
}
