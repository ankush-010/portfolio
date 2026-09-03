import { useState, useEffect, type MouseEvent } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../lib/utils'
import ThemeToggle from './ThemeToggle'
import { useTheme } from '../hooks/useTheme'
import { useActiveSection } from '../hooks/useActiveSection'
import { useScrolled } from '../hooks/useScrolled'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Resume', href: '#resume' },
  { label: 'Contact', href: '#contact' },
] as const

export default function Navbar() {
  const { theme, toggle } = useTheme()
  const activeSection = useActiveSection()
  const scrolled = useScrolled(20)
  const [menuOpen, setMenuOpen] = useState(false)

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMenuOpen(false)
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) {
      const offset = 72 // navbar height
      const top = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-200',
          scrolled
            ? 'glass dark:glass border-b border-[var(--border)] shadow-sm'
            : 'bg-transparent'
        )}
        style={{ height: '64px' }}
      >
        <nav
          className="container-max flex items-center justify-between h-full px-4 sm:px-6 lg:px-8"
          aria-label="Main navigation"
        >
          {/* Logo / Initials */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg"
            aria-label="Ankush Kumar — back to top"
          >
            <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center text-white font-bold text-sm select-none group-hover:bg-accent-hover transition-colors">
              AK
            </div>
            <span className="hidden sm:block font-semibold text-[var(--text-primary)] text-sm">
              Ankush Kumar
            </span>
          </a>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ label, href }) => {
              const sectionId = href.replace('#', '')
              const isActive = activeSection === sectionId
              return (
                <a
                  key={label}
                  href={href}
                  onClick={(e) => handleNavClick(e, href)}
                  className={cn(
                    'px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
                    isActive
                      ? 'text-accent'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-2)]'
                  )}
                  aria-current={isActive ? 'location' : undefined}
                >
                  {label}
                </a>
              )
            })}
          </div>

          {/* Right side: theme toggle + mobile menu button */}
          <div className="flex items-center gap-1">
            <ThemeToggle theme={theme} toggle={toggle} />

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-2)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/50 md:hidden"
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Menu panel */}
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="fixed top-16 left-0 right-0 z-40 md:hidden border-b border-[var(--border)]"
              style={{ backgroundColor: 'var(--bg-surface)' }}
            >
              <nav className="flex flex-col p-4 gap-1" aria-label="Mobile navigation">
                {NAV_LINKS.map(({ label, href }) => {
                  const sectionId = href.replace('#', '')
                  const isActive = activeSection === sectionId
                  return (
                    <a
                      key={label}
                      href={href}
                      onClick={(e) => handleNavClick(e, href)}
                      className={cn(
                        'px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-150',
                        isActive
                          ? 'bg-blue-500/10 text-accent'
                          : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-2)]'
                      )}
                      aria-current={isActive ? 'location' : undefined}
                    >
                      {label}
                    </a>
                  )
                })}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
