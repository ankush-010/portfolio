import { useState, useEffect, useRef } from 'react'

const NAV_SECTIONS = ['about', 'skills', 'projects', 'education', 'resume', 'contact']

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState<string>('')
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const handleIntersect: IntersectionObserverCallback = (entries) => {
      // Find the entry with the largest intersection ratio that is intersecting
      const intersecting = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

      if (intersecting.length > 0) {
        setActiveSection(intersecting[0].target.id)
      }
    }

    observerRef.current = new IntersectionObserver(handleIntersect, {
      rootMargin: '-30% 0px -60% 0px',
      threshold: [0, 0.25, 0.5, 0.75, 1],
    })

    NAV_SECTIONS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observerRef.current?.observe(el)
    })

    return () => observerRef.current?.disconnect()
  }, [])

  return activeSection
}
