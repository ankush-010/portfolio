import { useRef } from 'react'
import { motion, useReducedMotion, useInView } from 'framer-motion'
import { GraduationCap, MapPin, BookOpen } from 'lucide-react'
import SectionHeading from '../components/ui/SectionHeading'
import education from '../data/education'

export default function Education() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const shouldReduce = useReducedMotion()

  return (
    <section
      id="education"
      className="section-padding"
      style={{ backgroundColor: 'var(--bg-surface)' }}
      aria-labelledby="education-heading"
    >
      <div className="container-max" ref={ref}>
        <motion.div
          initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
          animate={inView && !shouldReduce ? { opacity: 1, y: 0 } : shouldReduce ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <SectionHeading
            id="education-heading"
            title="Education"
            subtitle="My academic background."
          />
        </motion.div>

        <div className="space-y-6">
          {education.map((entry, i) => (
            <motion.div
              key={i}
              initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
              animate={inView && !shouldReduce ? { opacity: 1, y: 0 } : shouldReduce ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
              className="surface-card p-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-accent shrink-0">
                  <GraduationCap size={22} strokeWidth={1.75} aria-hidden="true" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                    <div>
                      <h3 className="font-semibold text-[var(--text-primary)] text-base">
                        {entry.degree}
                      </h3>
                      <p className="text-accent font-medium text-sm">{entry.branch}</p>
                    </div>
                    {entry.period && (
                      <span className="text-xs text-[var(--text-muted)] bg-[var(--bg-surface-2)] border border-[var(--border)] px-2.5 py-1 rounded-full">
                        {entry.period}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 text-sm text-[var(--text-muted)] mb-1">
                    <BookOpen size={13} aria-hidden="true" />
                    <span>{entry.institution}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-sm text-[var(--text-muted)] mb-4">
                    <MapPin size={13} aria-hidden="true" />
                    <span>{entry.location}</span>
                  </div>

                  {entry.cgpa && (
                    <div className="inline-flex items-center gap-1.5 text-sm text-[var(--text-primary)] bg-[var(--bg-surface-2)] border border-[var(--border)] px-3 py-1 rounded-full mb-4">
                      <span className="font-medium">CGPA:</span>
                      <span>{entry.cgpa}</span>
                    </div>
                  )}

                  {entry.highlights && entry.highlights.length > 0 && (
                    <ul className="space-y-1.5">
                      {entry.highlights.map((h, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-2 text-sm text-[var(--text-muted)]"
                        >
                          <span className="text-accent mt-0.5 shrink-0" aria-hidden="true">▸</span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
