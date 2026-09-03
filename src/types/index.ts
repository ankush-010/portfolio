// ─── Project ───────────────────────────────────────────────────────────────

export interface Project {
  id: string
  title: string
  tagline: string
  description: string
  problem: string
  solution: string
  features: string[]
  tech: string[]
  architecture?: string // Plain text description or Mermaid diagram source
  challenges?: string[]
  learnings?: string[]
  github?: string // GitHub repository URL
  demo?: string // Live demo URL
  status: 'complete' | 'in-progress' | 'planned'
  featured: boolean
  category: string[] // e.g. ['Backend', 'AI', 'Full Stack']
}

// ─── Skills ────────────────────────────────────────────────────────────────

export interface Skill {
  name: string
  level?: 'primary' | 'secondary' // primary = most confident, secondary = familiar
}

export interface SkillGroup {
  category: string
  icon: string // Lucide icon name (as string, resolved at component level)
  skills: Skill[]
}

// ─── Social / Coding Profiles ──────────────────────────────────────────────

export interface Social {
  label: string
  url: string
  icon: string // Lucide icon name or custom identifier
  username?: string
}

export interface CodingProfile {
  platform: string
  url: string
  username: string
  icon: string
  description: string
}

// ─── Education ─────────────────────────────────────────────────────────────

export interface EducationEntry {
  degree: string
  branch: string
  institution: string
  location: string
  period?: string // e.g. '2022 – 2026' — leave empty if not confirmed
  cgpa?: string // Leave empty if not confirmed
  highlights?: string[]
}

// ─── Personal Info ─────────────────────────────────────────────────────────

export interface PersonalInfo {
  name: string
  firstName: string
  title: string
  tagline: string
  bio: string[] // Array of paragraphs
  email: string // Set to PLACEHOLDER if not ready to share
  location: string
  resumePath: string // Path relative to /public, e.g. '/resume.pdf'
  resumeAvailable: boolean // false = show placeholder message
  openToWork: boolean
  canonicalUrl: string
}

// ─── Contact Form ──────────────────────────────────────────────────────────

export interface ContactFormData {
  name: string
  email: string
  message: string
}

export type FormStatus = 'idle' | 'loading' | 'success' | 'error'
