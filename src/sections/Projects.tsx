import { useState, useRef } from 'react'
import { motion, useReducedMotion, useInView } from 'framer-motion'
import { Github, ExternalLink, ChevronRight, Layers } from 'lucide-react'
import SectionHeading from '../components/ui/SectionHeading'
import Tag from '../components/ui/Tag'
import ProjectModal from '../components/ProjectModal'
import { cn, isPlaceholder, externalLink } from '../lib/utils'
import projects from '../data/projects'
import type { Project } from '../sections/types'

// All unique categories for filter tabs
const ALL_CATEGORIES = ['All', ...Array.from(new Set(projects.flatMap((p) => p.category)))]

interface ProjectCardProps {
  project: Project
  index: number
  onClick: (project: Project) => void
}

function ProjectCard({ project, index, onClick }: ProjectCardProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const shouldReduce = useReducedMotion()

  return (
    <motion.article
      ref={ref}
      initial={shouldReduce ? {} : { opacity: 0, y: 24 }}
      animate={inView && !shouldReduce ? { opacity: 1, y: 0 } : shouldReduce ? { opacity: 1 } : {}}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className={cn(
        'group surface-card flex flex-col overflow-hidden',
        'hover:border-accent/40 transition-all duration-200 hover:shadow-lg hover:shadow-black/10',
        'cursor-pointer'
      )}
      onClick={() => onClick(project)}
      role="article"
      aria-label={`${project.title} — click to view case study`}
    >
      {/* Card top bar */}
      <div className="h-1 w-full bg-gradient-to-r from-accent/60 to-blue-400/30" aria-hidden="true" />

      <div className="p-6 flex flex-col flex-1 gap-4">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Layers size={16} className="text-accent shrink-0" aria-hidden="true" />
              <h3 className="font-semibold text-[var(--text-primary)] truncate group-hover:text-accent transition-colors">
                {project.title}
              </h3>
            </div>
            <p className="text-xs text-[var(--text-muted)]">{project.tagline}</p>
          </div>
          <StatusBadge status={project.status} />
        </div>

        {/* Description */}
        <p className="text-sm text-[var(--text-muted)] leading-relaxed line-clamp-3 flex-1">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5">
          {project.tech.slice(0, 6).map((t) => (
            <Tag key={t} size="sm">
              {t}
            </Tag>
          ))}
          {project.tech.length > 6 && (
            <Tag size="sm" className="text-[var(--text-muted)] border-dashed">
              +{project.tech.length - 6}
            </Tag>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-2 border-t border-[var(--border)]">
          {/* View case study */}
          <button
            className="flex-1 flex items-center justify-center gap-1.5 text-xs font-medium text-[var(--text-muted)] hover:text-accent transition-colors py-2 rounded hover:bg-blue-500/5"
            onClick={(e) => {
              e.stopPropagation()
              onClick(project)
            }}
            aria-label={`View case study for ${project.title}`}
          >
            Case Study
            <ChevronRight size={13} aria-hidden="true" />
          </button>

          {/* GitHub */}
          {project.github && (
            <a
              {...externalLink(project.github)}
              onClick={(e) => e.stopPropagation()}
              aria-label={`${project.title} on GitHub`}
              className={cn(
                'flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded',
                'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-2)] transition-colors',
                isPlaceholder(project.github) && 'opacity-50 pointer-events-none'
              )}
            >
              <Github size={13} aria-hidden="true" />
              Code
            </a>
          )}

          {/* Demo */}
          {project.demo && !isPlaceholder(project.demo) && (
            <a
              {...externalLink(project.demo)}
              onClick={(e) => e.stopPropagation()}
              aria-label={`Live demo for ${project.title}`}
              className="flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-2)] transition-colors"
            >
              <ExternalLink size={13} aria-hidden="true" />
              Demo
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}

function StatusBadge({ status }: { status: Project['status'] }) {
  const map: Record<Project['status'], { label: string; className: string }> = {
    complete: {
      label: 'Complete',
      className: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    },
    'in-progress': {
      label: 'In Progress',
      className: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20',
    },
    planned: {
      label: 'Planned',
      className: 'bg-[var(--bg-surface-2)] text-[var(--text-muted)] border border-[var(--border)]',
    },
  }
  const { label, className } = map[status]
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium shrink-0',
        className
      )}
    >
      {label}
    </span>
  )
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [activeFilter, setActiveFilter] = useState<string>('All')
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const shouldReduce = useReducedMotion()

  const filtered =
    activeFilter === 'All'
      ? projects.filter((p) => p.featured)
      : projects.filter((p) => p.category.includes(activeFilter))

  return (
    <>
      <section
        id="projects"
        className="section-padding"
        aria-labelledby="projects-heading"
      >
        <div className="container-max" ref={ref}>
          <motion.div
            initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
            animate={inView && !shouldReduce ? { opacity: 1, y: 0 } : shouldReduce ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            <SectionHeading
              id="projects-heading"
              title="Projects"
              subtitle="Real projects I've built. Click any card to read the full case study — problem, solution, architecture, and what I learned."
            />
          </motion.div>

          {/* Category filter tabs */}
          <motion.div
            initial={shouldReduce ? {} : { opacity: 0, y: 12 }}
            animate={inView && !shouldReduce ? { opacity: 1, y: 0 } : shouldReduce ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-wrap gap-2 mb-8"
            role="group"
            aria-label="Filter projects by category"
          >
            {ALL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={cn(
                  'px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-150',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
                  activeFilter === cat
                    ? 'bg-accent text-white'
                    : 'bg-[var(--bg-surface)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-accent/40'
                )}
                aria-pressed={activeFilter === cat}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Project grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                onClick={setSelectedProject}
              />
            ))}
          </div>

          {/* Count note */}
          <motion.p
            initial={shouldReduce ? {} : { opacity: 0 }}
            animate={inView && !shouldReduce ? { opacity: 1 } : shouldReduce ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="text-xs text-[var(--text-muted)] mt-6 text-center"
          >
            Showing {filtered.length} project{filtered.length !== 1 ? 's' : ''}.
            More projects coming soon.
          </motion.p>
        </div>
      </section>

      {/* Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  )
}
