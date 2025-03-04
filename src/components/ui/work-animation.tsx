import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function WorkAnimation({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const ctx = gsap.context(() => {
      // Fade in and slide up title
      gsap.from('.work-title', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.work-title',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })

      // Stagger fade in description items
      gsap.from('.work-desc-item', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.work-description',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })

      // Fade in images with stagger
      gsap.from('.work-image', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.work-image',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })
    }, container)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="w-full min-h-screen flex flex-col">
      {children}
    </div>
  )
} 