import { useEffect, useState, type MouseEvent } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, Github, Linkedin, FileText } from 'lucide-react'
import Button from '../components/ui/Button'
import { externalLink, isPlaceholder } from '../lib/utils'
import personal from '../data/personal'
import { socials } from '../data/socials'

// Animated code block — subtle visual that communicates "developer" without being gimmicky
const CODE_LINES = [
  { indent: 0, text: '@RestController', color: 'text-blue-400' },
  { indent: 0, text: 'public class AkPortfolio {', color: 'text-[var(--text-primary)]' },
  { indent: 1, text: '', color: '' },
  { indent: 1, text: '@GetMapping("/developer")', color: 'text-blue-400' },
  { indent: 1, text: 'public Developer getProfile() {', color: 'text-[var(--text-primary)]' },
  { indent: 2, text: 'return Developer.builder()', color: 'text-[var(--text-muted)]' },
  { indent: 3, text: '.name("Ankush Kumar")', color: 'text-emerald-400' },
  { indent: 3, text: '.role("Java Backend Dev")', color: 'text-emerald-400' },
  { indent: 3, text: '.stack("Spring Boot")', color: 'text-emerald-400' },
  { indent: 3, text: '.database("PostgreSQL")', color: 'text-emerald-400' },
  { indent: 3, text: '.passion("Building APIs")', color: 'text-emerald-400' },
  { indent: 3, text: '.build();', color: 'text-[var(--text-muted)]' },
  { indent: 1, text: '}', color: 'text-[var(--text-primary)]' },
  { indent: 0, text: '}', color: 'text-[var(--text-primary)]' },
]

function TerminalBlock() {
  const [visibleLines, setVisibleLines] = useState(0)
  const shouldReduce = useReducedMotion()

  useEffect(() => {
    if (shouldReduce) {
      setVisibleLines(CODE_LINES.length)
      return
    }
    if (visibleLines >= CODE_LINES.length) return
    const timer = setTimeout(() => setVisibleLines((v) => v + 1), 80)
    return () => clearTimeout(timer)
  }, [visibleLines, shouldReduce])

  return (
    <div
      className="rounded-xl border border-[var(--border)] overflow-hidden shadow-xl"
      style={{ backgroundColor: 'var(--bg-surface)' }}
      aria-hidden="true"
    >
      {/* Window chrome */}
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-[var(--border)]" style={{ backgroundColor: 'var(--bg-surface-2)' }}>
        <div className="w-3 h-3 rounded-full bg-red-500/70" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <div className="w-3 h-3 rounded-full bg-green-500/70" />
        <span className="ml-2 text-xs text-[var(--text-muted)] font-mono">AkPortfolio.java</span>
      </div>
      {/* Code */}
      <div className="p-5 font-mono text-sm leading-relaxed overflow-x-auto">
        {CODE_LINES.slice(0, visibleLines).map((line, i) => (
          <div key={i} className="whitespace-pre">
            <span className="select-none text-[var(--text-muted)] mr-4 text-xs w-5 inline-block text-right">
              {i + 1}
            </span>
            <span className={line.color}>
              {'  '.repeat(line.indent) + line.text}
            </span>
          </div>
        ))}
        {visibleLines < CODE_LINES.length && (
          <div className="inline-block w-2 h-4 bg-accent ml-1 animate-blink" />
        )}
      </div>
    </div>
  )
}

export default function Hero() {
  const shouldReduce = useReducedMotion()
  const githubSocial = socials.find((s) => s.icon === 'github')
  const linkedinSocial = socials.find((s) => s.icon === 'linkedin')

  const fadeUp = shouldReduce
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
      }

  const handleScrollToProjects = (e: MouseEvent) => {
    e.preventDefault()
    const el = document.getElementById('projects')
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 72
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <section
      className="min-h-screen flex items-center pt-16"
      aria-label="Introduction"
      style={{ backgroundColor: 'var(--bg-base)' }}
    >
      <div className="container-max section-padding w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — text content */}
          <div>
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {personal.openToWork && (
                <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-medium">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                  </span>
                  Open to Internships & Opportunities
                </div>
              )}
            </motion.div>

            <motion.h1
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-primary)] mb-4"
            >
              Hi, I'm{' '}
              <span className="text-gradient">{personal.firstName}</span>.
            </motion.h1>

            <motion.p
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-xl sm:text-2xl font-semibold text-[var(--text-muted)] mb-6"
            >
              {personal.title}
            </motion.p>

            <motion.p
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-base text-[var(--text-muted)] leading-relaxed mb-8 max-w-lg"
            >
              {personal.tagline}
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap gap-3 mb-8"
            >
              <button
                type="button"
                onClick={handleScrollToProjects}
                className="inline-flex items-center justify-center rounded-lg font-medium transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 bg-accent hover:bg-accent-hover text-white border border-transparent shadow-sm px-6 py-3 text-base gap-2"
              >
                View Projects
              </button>

              {personal.resumeAvailable ? (
                <Button
                  as="a"
                  href={personal.resumePath}
                  variant="outline"
                  size="lg"
                  external
                >
                  <FileText size={16} aria-hidden="true" />
                  Download Resume
                </Button>
              ) : (
                <Button
                  as="a"
                  href="#resume"
                  variant="outline"
                  size="lg"
                >
                  <FileText size={16} aria-hidden="true" />
                  Resume
                </Button>
              )}
            </motion.div>

            {/* Social links */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex items-center gap-2"
            >
              {githubSocial && (
                <a
                  {...externalLink(githubSocial.url)}
                  aria-label="GitHub"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-2)] transition-colors border border-[var(--border)]"
                >
                  <Github size={16} aria-hidden="true" />
                  {isPlaceholder(githubSocial.url) ? 'GitHub' : githubSocial.username}
                </a>
              )}
              {linkedinSocial && (
                <a
                  {...externalLink(linkedinSocial.url)}
                  aria-label="LinkedIn"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-2)] transition-colors border border-[var(--border)]"
                >
                  <Linkedin size={16} aria-hidden="true" />
                  LinkedIn
                </a>
              )}
            </motion.div>
          </div>

          {/* Right — code visual */}
          <motion.div
            {...(shouldReduce ? {} : { initial: { opacity: 0, x: 24 }, animate: { opacity: 1, x: 0 } })}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="hidden lg:block"
          >
            <TerminalBlock />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          {...(shouldReduce ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 } })}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="flex justify-center mt-16"
        >
          <button
            onClick={handleScrollToProjects}
            aria-label="Scroll to projects"
            className="flex flex-col items-center gap-2 text-[var(--text-muted)] hover:text-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
          >
            <span className="text-xs uppercase tracking-widest font-medium">Scroll</span>
            <motion.div
              animate={shouldReduce ? {} : { y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            >
              <ArrowDown size={16} aria-hidden="true" />
            </motion.div>
          </button>
        </motion.div>
      </div>
    </section>
  )
}
