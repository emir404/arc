"use client"

import React, { useEffect } from 'react'
import gsap from 'gsap'

function Footer() {
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: 'footer',
        start: 'top bottom-=100',
        toggleActions: 'restart pause reset'
      }
    })

    gsap.set('.footer-content > *', { opacity: 0, y: 20, filter: 'blur(5px)' })
    
    tl.to('.footer-content > *', {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out'
    })

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <footer className="text-black/40 py-8 md:py-16 footer-content px-4 sm:px-12 md:px-36 lg:px-48 xl:px-56">
      <p className="text-lg md:text-2xl">© Arc Studio 2025</p>
    </footer>
  )
}

export default Footer
