import { useRef } from 'react'
import { motion, useReducedMotion, useInView } from 'framer-motion'
import { FileText, Download, Eye, AlertCircle } from 'lucide-react'
import Button from '../components/ui/Button'
import personal from '../data/personal'

export default function Resume() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const shouldReduce = useReducedMotion()

  return (
    <section
      id="resume"
      className="section-padding"
      aria-labelledby="resume-heading"
    >
      <div className="container-max" ref={ref}>
        <motion.div
          initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
          animate={inView && !shouldReduce ? { opacity: 1, y: 0 } : shouldReduce ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-accent mb-6">
            <FileText size={28} strokeWidth={1.5} aria-hidden="true" />
          </div>

          <h2
            id="resume-heading"
            className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-3 tracking-tight"
          >
            Resume
          </h2>
          <div className="h-0.5 w-12 bg-accent rounded-full mx-auto mb-4" aria-hidden="true" />

          {personal.resumeAvailable ? (
            <>
              <p className="text-[var(--text-muted)] text-base leading-relaxed mb-8">
                View or download my latest resume. It covers my technical skills, projects, and academic background.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button
                  as="a"
                  href={personal.resumePath}
                  variant="primary"
                  size="lg"
                  external
                >
                  <Eye size={16} aria-hidden="true" />
                  View Resume
                </Button>
                <Button
                  as="a"
                  href={personal.resumePath}
                  variant="outline"
                  size="lg"
                  external
                >
                  <Download size={16} aria-hidden="true" />
                  Download PDF
                </Button>
              </div>
            </>
          ) : (
            <>
              <p className="text-[var(--text-muted)] text-base leading-relaxed mb-6">
                My resume will be available here soon.
              </p>

              {/* Placeholder notice */}
              <div className="inline-flex items-start gap-3 text-left bg-yellow-500/10 border border-yellow-500/20 rounded-xl px-5 py-4 max-w-md mx-auto mb-8">
                <AlertCircle
                  size={16}
                  className="text-yellow-400 shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <div className="text-sm text-[var(--text-muted)]">
                  <p className="font-medium text-yellow-400 mb-1">Resume placeholder</p>
                  <p>
                    Place your resume PDF at{' '}
                    <code className="font-mono bg-[var(--bg-surface-2)] px-1 rounded text-xs">
                      public/resume.pdf
                    </code>
                    , then set{' '}
                    <code className="font-mono bg-[var(--bg-surface-2)] px-1 rounded text-xs">
                      resumeAvailable: true
                    </code>{' '}
                    in{' '}
                    <code className="font-mono bg-[var(--bg-surface-2)] px-1 rounded text-xs">
                      src/data/personal.ts
                    </code>
                    .
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button as="a" href={personal.resumePath} variant="primary" size="lg" external>
                  <Eye size={16} aria-hidden="true" />
                  View Resume
                </Button>
                <Button as="a" href={personal.resumePath} variant="outline" size="lg" external>
                  <Download size={16} aria-hidden="true" />
                  Download PDF
                </Button>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  )
}
