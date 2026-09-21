import type { PersonalInfo } from '../types'

const personal: PersonalInfo = {
  name: 'Ankush Kumar',
  firstName: 'Ankush',
  title: 'Java Backend Developer',
  tagline:
    'I build reliable backend systems and production-ready software using Java, Spring Boot, and modern development technologies.',
  bio: [
    "I'm a B.Tech Information Technology student at B.K. Birla Institute of Engineering & Technology (BKBIET), Pilani, with a strong focus on Java backend development. I enjoy designing clean REST APIs, working with relational databases, and applying object-oriented design principles to solve real-world problems.",
    'Beyond backend development, I actively work with AI-powered applications — integrating IBM watsonx.ai into full-stack projects — and I have hands-on experience across the modern web stack. I am passionate about building software that is practical, maintainable, and makes a real difference.',
  ],

  email: 'ankushkumawat112@gmail.com',

  location: 'Jhunjhunu, Rajasthan, India',
  resumePath: '/resume.pdf',
  resumeAvailable: true, // Set to true after placing resume.pdf in public/
  openToWork: true,
  canonicalUrl: (import.meta.env.VITE_SITE_URL as string | undefined) ?? 'https://your-domain.com',
}

export default personal
