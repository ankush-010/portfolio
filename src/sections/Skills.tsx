import type { ElementType } from 'react'
import { motion, useReducedMotion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  Code2,
  Server,
  Database,
  Layout,
  Cpu,
  Wrench,
  Brain,
} from 'lucide-react'
import SectionHeading from '../components/ui/SectionHeading'
import { cn } from '../lib/utils'
import skills from '../data/skills'
import type { SkillGroup } from '../sections/types'

// Maps icon string identifiers from data to Lucide components
const iconMap: Record<string, ElementType> = {
  'code-2': Code2,
  server: Server,
  database: Database,
  layout: Layout,
  cpu: Cpu,
  wrench: Wrench,
  brain: Brain,
}

function SkillCategoryCard({
  group,
  delay,
}: {
  group: SkillGroup
  delay: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const shouldReduce = useReducedMotion()
  const Icon = iconMap[group.icon] ?? Code2

  return (
    <motion.div
      ref={ref}
      initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
      animate={inView && !shouldReduce ? { opacity: 1, y: 0 } : shouldReduce ? { opacity: 1 } : {}}
      transition={{ duration: 0.4, delay }}
      className="surface-card p-5 flex flex-col gap-4"
    >
      {/* Category header */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-accent shrink-0">
          <Icon size={18} strokeWidth={1.75} aria-hidden="true" />
        </div>
        <h3 className="text-sm font-semibold text-[var(--text-primary)]">{group.category}</h3>
      </div>

      {/* Skill tags */}
      <div className="flex flex-wrap gap-2">
        {group.skills.map((skill) => (
          <span
            key={skill.name}
            className={cn(
              'inline-flex items-center px-2.5 py-1 rounded text-xs font-medium transition-colors',
              skill.level === 'primary'
                ? 'bg-[var(--bg-surface-2)] text-[var(--text-primary)] border border-[var(--border)]'
                : 'bg-transparent text-[var(--text-muted)] border border-[var(--border)]/60'
            )}
          >
            {skill.name}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const shouldReduce = useReducedMotion()

  return (
    <section
      id="skills"
      className="section-padding"
      style={{ backgroundColor: 'var(--bg-surface)' }}
      aria-labelledby="skills-heading"
    >
      <div className="container-max" ref={ref}>
        <motion.div
          initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
          animate={inView && !shouldReduce ? { opacity: 1, y: 0 } : shouldReduce ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <SectionHeading
            id="skills-heading"
            title="Technical Skills"
            subtitle="Technologies and tools I work with. Solid borders indicate primary skills; faded borders indicate working familiarity."
          />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {skills.map((group, i) => (
            <SkillCategoryCard key={group.category} group={group} delay={i * 0.07} />
          ))}
        </div>

        {/* Legend */}
        <motion.div
          initial={shouldReduce ? {} : { opacity: 0 }}
          animate={inView && !shouldReduce ? { opacity: 1 } : shouldReduce ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="flex flex-wrap items-center gap-4 mt-8 pt-6 border-t border-[var(--border)]"
        >
          <span className="text-xs text-[var(--text-muted)]">Legend:</span>
          <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
            <span className="inline-block px-2.5 py-0.5 rounded bg-[var(--bg-surface-2)] border border-[var(--border)] text-[var(--text-primary)] font-medium text-xs">
              Java
            </span>
            Primary skill
          </div>
          <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
            <span className="inline-block px-2.5 py-0.5 rounded bg-transparent border border-[var(--border)]/60 text-[var(--text-muted)] text-xs">
              Python
            </span>
            Working familiarity
          </div>
        </motion.div>
      </div>
    </section>
  )
}
