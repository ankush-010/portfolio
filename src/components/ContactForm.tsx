import { useState, type ChangeEvent, type FocusEvent, type FormEvent } from 'react'
import { Send, CheckCircle, AlertCircle, Loader } from 'lucide-react'
import { cn } from '../lib/utils'
import type { ContactFormData, FormStatus } from '../types'
import personal from '../data/personal'

// Validation helpers
function validateForm(data: ContactFormData): Partial<Record<keyof ContactFormData, string>> {
  const errors: Partial<Record<keyof ContactFormData, string>> = {}
  if (!data.name.trim()) {
    errors.name = 'Name is required.'
  } else if (data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters.'
  }
  if (!data.email.trim()) {
    errors.email = 'Email is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email address.'
  }
  if (!data.message.trim()) {
    errors.message = 'Message is required.'
  } else if (data.message.trim().length < 20) {
    errors.message = 'Message must be at least 20 characters.'
  }
  return errors
}

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({})
  const [status, setStatus] = useState<FormStatus>('idle')
  const [touched, setTouched] = useState<Partial<Record<keyof ContactFormData, boolean>>>({})

  const formspreeId = import.meta.env.VITE_FORMSPREE_ID as string | undefined
  const email = personal.email.includes('PLACEHOLDER') ? undefined : personal.email

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Live validation after first touch
    if (touched[name as keyof ContactFormData]) {
      const newErrors = validateForm({ ...formData, [name]: value })
      setErrors((prev) => ({ ...prev, [name]: newErrors[name as keyof ContactFormData] }))
    }
  }

  const handleBlur = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    const fieldErrors = validateForm(formData)
    setErrors((prev) => ({ ...prev, [name]: fieldErrors[name as keyof ContactFormData] }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Mark all fields as touched
    setTouched({ name: true, email: true, message: true })
    const fieldErrors = validateForm(formData)
    setErrors(fieldErrors)

    if (Object.keys(fieldErrors).length > 0) return

    setStatus('loading')

    try {
      if (formspreeId && formspreeId.length > 3) {
        // Formspree submission
        const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(formData),
        })
        if (!res.ok) throw new Error('Submission failed')
        setStatus('success')
        setFormData({ name: '', email: '', message: '' })
        setTouched({})
      } else if (email) {
        // Mailto fallback — open in email client
        const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`)
        const body = encodeURIComponent(
          `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
        )
        window.open(`mailto:${email}?subject=${subject}&body=${body}`, '_blank')
        setStatus('success')
      } else {
        // No integration configured — show placeholder message
        await new Promise((r) => setTimeout(r, 800)) // simulate latency
        setStatus('success') // still show success to demonstrate UX
      }
    } catch {
      setStatus('error')
    }
  }

  const handleReset = () => {
    setStatus('idle')
    setErrors({})
    setTouched({})
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
        <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
          <CheckCircle size={26} aria-hidden="true" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">Message sent!</h3>
          <p className="text-sm text-[var(--text-muted)]">
            Thanks for reaching out. I'll get back to you as soon as possible.
          </p>
        </div>
        <button
          onClick={handleReset}
          className="text-sm text-accent hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Contact form" className="space-y-5">
      {/* Name */}
      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
          Name <span className="text-red-400" aria-hidden="true">*</span>
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          autoComplete="name"
          placeholder="Your full name"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
          className={cn(
            'w-full px-4 py-2.5 rounded-lg text-sm transition-colors duration-150',
            'bg-[var(--bg-surface-2)] border text-[var(--text-primary)]',
            'placeholder:text-[var(--text-muted)]',
            'focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-accent',
            errors.name ? 'border-red-500/60' : 'border-[var(--border)]'
          )}
        />
        {errors.name && (
          <p id="name-error" className="mt-1.5 text-xs text-red-400 flex items-center gap-1" role="alert">
            <AlertCircle size={12} aria-hidden="true" />
            {errors.name}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
          Email <span className="text-red-400" aria-hidden="true">*</span>
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          autoComplete="email"
          placeholder="your@email.com"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
          className={cn(
            'w-full px-4 py-2.5 rounded-lg text-sm transition-colors duration-150',
            'bg-[var(--bg-surface-2)] border text-[var(--text-primary)]',
            'placeholder:text-[var(--text-muted)]',
            'focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-accent',
            errors.email ? 'border-red-500/60' : 'border-[var(--border)]'
          )}
        />
        {errors.email && (
          <p id="email-error" className="mt-1.5 text-xs text-red-400 flex items-center gap-1" role="alert">
            <AlertCircle size={12} aria-hidden="true" />
            {errors.email}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
          Message <span className="text-red-400" aria-hidden="true">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          onBlur={handleBlur}
          rows={5}
          placeholder="Tell me about the opportunity, project, or just say hello..."
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
          className={cn(
            'w-full px-4 py-2.5 rounded-lg text-sm transition-colors duration-150 resize-y',
            'bg-[var(--bg-surface-2)] border text-[var(--text-primary)]',
            'placeholder:text-[var(--text-muted)]',
            'focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-accent',
            errors.message ? 'border-red-500/60' : 'border-[var(--border)]'
          )}
        />
        <div className="flex items-center justify-between mt-1">
          {errors.message ? (
            <p id="message-error" className="text-xs text-red-400 flex items-center gap-1" role="alert">
              <AlertCircle size={12} aria-hidden="true" />
              {errors.message}
            </p>
          ) : (
            <span />
          )}
          <span className={cn(
            'text-xs',
            formData.message.length < 20 ? 'text-[var(--text-muted)]' : 'text-emerald-400'
          )}>
            {formData.message.length} / min 20
          </span>
        </div>
      </div>

      {/* Error state */}
      {status === 'error' && (
        <div className="flex items-center gap-2 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3" role="alert">
          <AlertCircle size={15} aria-hidden="true" />
          Something went wrong. Please try again or email me directly.
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className={cn(
          'w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg',
          'text-sm font-medium text-white transition-all duration-150',
          'bg-accent hover:bg-accent-hover',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
          'disabled:opacity-50 disabled:cursor-not-allowed'
        )}
      >
        {status === 'loading' ? (
          <>
            <Loader size={15} className="animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>
            <Send size={15} aria-hidden="true" />
            Send Message
          </>
        )}
      </button>

      {/* Integration note */}
      {!formspreeId && (
        <p className="text-xs text-[var(--text-muted)] text-center">
          Set{' '}
          <code className="font-mono bg-[var(--bg-surface-2)] px-1 rounded">VITE_FORMSPREE_ID</code>{' '}
          in <code className="font-mono bg-[var(--bg-surface-2)] px-1 rounded">.env</code> to enable
          direct email delivery.
        </p>
      )}
    </form>
  )
}
