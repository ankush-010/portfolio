import type { ReactNode } from 'react'
import { useEffect, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { X, Github, ExternalLink, CheckCircle, Zap, BookOpen, AlertTriangle } from 'lucide-react'
import Tag from './ui/Tag'
import Button from './ui/Button'
import { externalLink, isPlaceholder } from '../lib/utils'
import type { Project } from '../types'

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const shouldReduce = useReducedMotion()
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  // Focus trap and keyboard handling
  useEffect(() => {
    if (!project) return

    // Focus the close button when modal opens
    setTimeout(() => closeButtonRef.current?.focus(), 50)

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    // Prevent scroll on body
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/70"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal panel */}
          <div
            className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-8 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <motion.div
              initial={shouldReduce ? {} : { opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={shouldReduce ? {} : { opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.25, type: 'spring', bounce: 0.1 }}
              className="relative w-full max-w-3xl my-4 rounded-xl border border-[var(--border)] shadow-2xl"
              style={{ backgroundColor: 'var(--bg-base)' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 p-6 border-b border-[var(--border)]">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    {project.category.map((cat) => (
                      <Tag key={cat} size="sm">
                        {cat}
                      </Tag>
                    ))}
                    <StatusBadge status={project.status} />
                  </div>
                  <h2
                    id="modal-title"
                    className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] truncate"
                  >
                    {project.title}
                  </h2>
                  <p className="text-[var(--text-muted)] text-sm mt-1">{project.tagline}</p>
                </div>
                <button
                  ref={closeButtonRef}
                  onClick={onClose}
                  aria-label="Close case study"
                  className="shrink-0 p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-2)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  <X size={20} aria-hidden="true" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-8 overflow-y-auto max-h-[70vh]">
                {/* Overview */}
                <Section title="Overview" icon={<Zap size={16} />}>
                  <p className="text-[var(--text-muted)] leading-relaxed text-sm">{project.description}</p>
                </Section>

                {/* Problem & Solution */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <Section title="Problem" icon={<AlertTriangle size={16} />}>
                    <p className="text-[var(--text-muted)] leading-relaxed text-sm">{project.problem}</p>
                  </Section>
                  <Section title="Solution" icon={<CheckCircle size={16} />}>
                    <p className="text-[var(--text-muted)] leading-relaxed text-sm">{project.solution}</p>
                  </Section>
                </div>

                {/* Features */}
                {project.features.length > 0 && (
                  <Section title="Key Features" icon={<CheckCircle size={16} />}>
                    <ul className="space-y-2">
                      {project.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                          <span className="text-accent mt-0.5 shrink-0" aria-hidden="true">▸</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </Section>
                )}

                {/* Architecture */}
                {project.architecture && (
                  <Section title="Architecture" icon={<Zap size={16} />}>
                    <pre className="text-xs text-[var(--text-muted)] font-mono leading-relaxed whitespace-pre-wrap p-4 rounded-lg border border-[var(--border)] overflow-x-auto" style={{ backgroundColor: 'var(--bg-surface)' }}>
                      {project.architecture}
                    </pre>
                  </Section>
                )}

                {/* Tech stack */}
                <Section title="Technologies Used" icon={<BookOpen size={16} />}>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <Tag key={t} size="sm">{t}</Tag>
                    ))}
                  </div>
                </Section>

                {/* Challenges */}
                {project.challenges && project.challenges.length > 0 && (
                  <Section title="Challenges" icon={<AlertTriangle size={16} />}>
                    <ul className="space-y-2">
                      {project.challenges.map((c, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                          <span className="text-orange-400 mt-0.5 shrink-0" aria-hidden="true">▸</span>
                          {c}
                        </li>
                      ))}
                    </ul>
                  </Section>
                )}

                {/* Learnings */}
                {project.learnings && project.learnings.length > 0 && (
                  <Section title="What I Learned" icon={<BookOpen size={16} />}>
                    <ul className="space-y-2">
                      {project.learnings.map((l, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                          <span className="text-emerald-400 mt-0.5 shrink-0" aria-hidden="true">▸</span>
                          {l}
                        </li>
                      ))}
                    </ul>
                  </Section>
                )}
              </div>

              {/* Footer actions */}
              <div className="flex flex-wrap items-center gap-3 p-6 border-t border-[var(--border)]">
                {project.github && !isPlaceholder(project.github) ? (
                  <Button as="a" href={project.github} variant="primary" size="sm" external>
                    <Github size={15} aria-hidden="true" />
                    View on GitHub
                  </Button>
                ) : (
                  <Button as="a" href="#" variant="secondary" size="sm">
                    <Github size={15} aria-hidden="true" />
                    GitHub (coming soon)
                  </Button>
                )}

                {project.demo && !isPlaceholder(project.demo) && (
                  <Button as="a" href={project.demo} variant="outline" size="sm" external>
                    <ExternalLink size={15} aria-hidden="true" />
                    Live Demo
                  </Button>
                )}

                <button
                  onClick={onClose}
                  className="ml-auto text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

function Section({
  title,
  icon,
  children,
}: {
  title: string
  icon: ReactNode
  children: ReactNode
}) {
  return (
    <div>
      <h3 className="flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)] mb-3">
        <span className="text-accent" aria-hidden="true">{icon}</span>
        {title}
      </h3>
      {children}
    </div>
  )
}

function StatusBadge({ status }: { status: Project['status'] }) {
  const map: Record<Project['status'], { label: string; className: string }> = {
    complete: { label: 'Completed', className: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' },
    'in-progress': { label: 'In Progress', className: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' },
    planned: { label: 'Planned', className: 'bg-[var(--bg-surface-2)] text-[var(--text-muted)] border border-[var(--border)]' },
  }
  const { label, className } = map[status]
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${className}`}>
      {label}
    </span>
  )
}
