import type { ReactNode } from 'react'
import { useRef } from 'react'
import { motion, useReducedMotion, useInView } from 'framer-motion'
import { Mail, Github, Linkedin, MapPin, MessageSquare } from 'lucide-react'
import SectionHeading from '../components/ui/SectionHeading'
import ContactForm from '../components/ContactForm'
import { externalLink, isPlaceholder } from '../lib/utils'
import personal from '../data/personal'
import { socials } from '../data/socials'

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const shouldReduce = useReducedMotion()

  const anim = (delay = 0) => ({
    initial: shouldReduce ? {} : { opacity: 0, y: 20 },
    animate: inView && !shouldReduce ? { opacity: 1, y: 0 } : shouldReduce ? { opacity: 1 } : {},
    transition: { duration: 0.5, delay },
  })

  const emailSocial = socials.find((s) => s.icon === 'mail')
  const githubSocial = socials.find((s) => s.icon === 'github')
  const linkedinSocial = socials.find((s) => s.icon === 'linkedin')

  return (
    <section
      id="contact"
      className="section-padding"
      style={{ backgroundColor: 'var(--bg-surface)' }}
      aria-labelledby="contact-heading"
    >
      <div className="container-max" ref={ref}>
        <motion.div {...anim(0)}>
          <SectionHeading
            id="contact-heading"
            title="Get in Touch"
            subtitle="Have an opportunity, project, or just want to say hello? I'd love to hear from you."
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left — contact info */}
          <motion.div {...anim(0.1)} className="space-y-8">
            <div>
              <h3 className="text-base font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                <MessageSquare size={16} className="text-accent" aria-hidden="true" />
                Contact Information
              </h3>

              <div className="space-y-3">
                {/* Email */}
                {emailSocial && (
                  <ContactInfoRow
                    icon={<Mail size={16} />}
                    label="Email"
                    value={
                      isPlaceholder(emailSocial.url)
                        ? 'email@placeholder.com (update in socials.ts)'
                        : (emailSocial.username ?? personal.email)
                    }
                    href={isPlaceholder(emailSocial.url) ? undefined : emailSocial.url}
                  />
                )}

                {/* GitHub */}
                {githubSocial && (
                  <ContactInfoRow
                    icon={<Github size={16} />}
                    label="GitHub"
                    value={
                      isPlaceholder(githubSocial.url)
                        ? 'github.com/your_username'
                        : `github.com/${githubSocial.username}`
                    }
                    href={isPlaceholder(githubSocial.url) ? undefined : githubSocial.url}
                  />
                )}

                {/* LinkedIn */}
                {linkedinSocial && (
                  <ContactInfoRow
                    icon={<Linkedin size={16} />}
                    label="LinkedIn"
                    value={
                      isPlaceholder(linkedinSocial.url)
                        ? 'linkedin.com/in/your_profile'
                        : `linkedin.com/in/${linkedinSocial.username}`
                    }
                    href={isPlaceholder(linkedinSocial.url) ? undefined : linkedinSocial.url}
                  />
                )}

                {/* Location */}
                <ContactInfoRow
                  icon={<MapPin size={16} />}
                  label="Location"
                  value={personal.location}
                />
              </div>
            </div>

            {/* Availability note */}
            {personal.openToWork && (
              <div className="surface-card p-5 border-l-4 border-l-emerald-500">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
                  </span>
                  <span className="text-sm font-semibold text-emerald-400">Available for opportunities</span>
                </div>
                <p className="text-sm text-[var(--text-muted)]">
                  I'm actively looking for internship and entry-level backend developer roles. Feel free to reach out about any Java, Spring Boot, or backend positions.
                </p>
              </div>
            )}
          </motion.div>

          {/* Right — contact form */}
          <motion.div {...anim(0.2)} className="surface-card p-6">
            <h3 className="text-base font-semibold text-[var(--text-primary)] mb-5 flex items-center gap-2">
              <Mail size={16} className="text-accent" aria-hidden="true" />
              Send a Message
            </h3>
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function ContactInfoRow({
  icon,
  label,
  value,
  href,
}: {
  icon: ReactNode
  label: string
  value: string
  href?: string
}) {
  const inner = (
    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-[var(--bg-surface-2)] transition-colors">
      <span className="text-accent mt-0.5 shrink-0" aria-hidden="true">{icon}</span>
      <div className="min-w-0">
        <p className="text-xs text-[var(--text-muted)] mb-0.5">{label}</p>
        <p className="text-sm text-[var(--text-primary)] font-medium truncate">{value}</p>
      </div>
    </div>
  )

  if (href) {
    return (
      <a
        {...externalLink(href)}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg"
        aria-label={`${label}: ${value}`}
      >
        {inner}
      </a>
    )
  }
  return <div>{inner}</div>
}
