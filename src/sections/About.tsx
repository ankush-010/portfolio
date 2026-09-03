import { motion, useReducedMotion, useInView } from 'framer-motion'
import { useRef } from 'react'
import SectionHeading from '../components/ui/SectionHeading'
import Badge from '../components/ui/Badge'
import personal from '../data/personal'

const QUICK_FACTS = [
  { label: 'B.Tech IT' },
  { label: 'BKBIET Pilani' },
  { label: 'Java Backend' },
  { label: 'Spring Boot' },
  { label: 'DSA & Problem Solving' },
  { label: 'IBM watsonx.ai' },
  { label: 'Open to Opportunities' },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const shouldReduce = useReducedMotion()

  const anim = shouldReduce
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        animate: inView ? { opacity: 1, y: 0 } : {},
      }

  return (
    <section id="about" className="section-padding" aria-labelledby="about-heading">
      <div className="container-max" ref={ref}>
        <motion.div {...anim} transition={{ duration: 0.5 }}>
          <SectionHeading
            title="About Me"
            id="about-heading"
            subtitle="A brief introduction to who I am and what I'm working towards."
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Bio */}
          <motion.div
            {...anim}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            {personal.bio.map((paragraph, i) => (
              <p key={i} className="text-[var(--text-muted)] leading-relaxed text-base">
                {paragraph}
              </p>
            ))}
          </motion.div>

          {/* Quick facts */}
          <motion.div
            {...anim}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="surface-card p-6">
              <h3 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-4">
                Quick Overview
              </h3>
              <div className="flex flex-wrap gap-2">
                {QUICK_FACTS.map((fact) => (
                  <Badge key={fact.label} variant="default">
                    {fact.label}
                  </Badge>
                ))}
              </div>

              <div className="mt-6 pt-5 border-t border-[var(--border)] space-y-3">
                <InfoRow label="Degree" value="B.Tech — Information Technology" />
                <InfoRow label="Institution" value="BKBIET, Pilani" />
                <InfoRow label="Location" value={personal.location} />
                <InfoRow
                  label="Status"
                  value={
                    personal.openToWork
                      ? '🟢 Open to internships & full-time roles'
                      : 'Not actively looking'
                  }
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-3 text-sm">
      <span className="text-[var(--text-muted)] min-w-[90px] shrink-0">{label}</span>
      <span className="text-[var(--text-primary)] font-medium">{value}</span>
    </div>
  )
}
