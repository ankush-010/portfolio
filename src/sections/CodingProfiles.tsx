import type { ElementType } from 'react'
import { useRef } from 'react'
import { motion, useReducedMotion, useInView } from 'framer-motion'
import { Code, Trophy, BookOpen, Github } from 'lucide-react'
import SectionHeading from '../components/ui/SectionHeading'
import { cn, externalLink, isPlaceholder } from '../lib/utils'
import { codingProfiles } from '../data/socials'

const iconMap: Record<string, ElementType> = {
  github: Github,
  code: Code,
  trophy: Trophy,
  'book-open': BookOpen,
}

export default function CodingProfiles() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const shouldReduce = useReducedMotion()

  return (
    <section
      id="coding"
      className="section-padding"
      aria-labelledby="coding-heading"
    >
      <div className="container-max" ref={ref}>
        <motion.div
          initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
          animate={inView && !shouldReduce ? { opacity: 1, y: 0 } : shouldReduce ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <SectionHeading
            id="coding-heading"
            title="Coding & Development Profiles"
            subtitle="Find my work, solutions, and activity on these platforms."
          />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {codingProfiles.map((profile, i) => {
            const Icon = iconMap[profile.icon] ?? Code
            const placeholder = isPlaceholder(profile.url)

            return (
              <motion.a
                key={profile.platform}
                {...externalLink(profile.url)}
                initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
                animate={
                  inView && !shouldReduce
                    ? { opacity: 1, y: 0 }
                    : shouldReduce
                    ? { opacity: 1 }
                    : {}
                }
                transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                className={cn(
                  'surface-card p-5 flex flex-col gap-3',
                  'hover:border-accent/40 transition-all duration-200',
                  'group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
                  placeholder && 'opacity-60'
                )}
                aria-label={
                  placeholder
                    ? `${profile.platform} (placeholder — update in socials.ts)`
                    : `Visit my ${profile.platform} profile`
                }
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-accent">
                    <Icon size={18} strokeWidth={1.75} aria-hidden="true" />
                  </div>
                  <span
                    className={cn(
                      'text-xs font-medium px-2 py-0.5 rounded-full',
                      placeholder
                        ? 'bg-[var(--bg-surface-2)] text-[var(--text-muted)] border border-[var(--border)]'
                        : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    )}
                  >
                    {placeholder ? 'Placeholder' : 'Active'}
                  </span>
                </div>

                <div>
                  <p className="font-semibold text-sm text-[var(--text-primary)] group-hover:text-accent transition-colors">
                    {profile.platform}
                  </p>
                  <p className="text-xs text-[var(--text-muted)] font-mono mt-0.5">
                    @{placeholder ? 'your_username' : profile.username}
                  </p>
                </div>

                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  {profile.description}
                </p>
              </motion.a>
            )
          })}
        </div>

        {/* Placeholder instruction */}
        {codingProfiles.some((p) => isPlaceholder(p.url)) && (
          <p className="text-xs text-[var(--text-muted)] text-center mt-6 p-3 rounded-lg border border-dashed border-[var(--border)]">
            📝 Update profile usernames in{' '}
            <code className="font-mono bg-[var(--bg-surface-2)] px-1 rounded">
              src/data/socials.ts
            </code>{' '}
            to replace placeholders.
          </p>
        )}
      </div>
    </section>
  )
}
