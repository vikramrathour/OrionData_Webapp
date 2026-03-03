import { useEffect, useState, useRef } from 'react'

export function useScrollSection(threshold = 0.2) {
  const [activeSection, setActiveSection] = useState(0)
  const sectionRefs = useRef<(HTMLElement | null)[]>([])

  const registerSection = (index: number) => (el: HTMLElement | null) => {
    sectionRefs.current[index] = el
  }

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    sectionRefs.current.forEach((section, index) => {
      if (!section) return
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(index)
          }
        },
        { threshold },
      )
      observer.observe(section)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [threshold])

  return { activeSection, registerSection }
}
