'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import Header from '@/components/ui/header'
import Hero from '@/components/ui/sections/hero'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useEffect, useRef } from 'react'

// Dynamically import heavy components
const AboutUs = dynamic(() => import('@/components/ui/sections/aboutus'), {
  loading: () => <div className="min-h-screen" />
})

const Portfolio = dynamic(() => import('@/components/ui/sections/portfolio'), {
  loading: () => <div className="min-h-screen" />
})

const Contact = dynamic(() => import('@/components/ui/sections/contact'), {
  loading: () => <div className="min-h-screen" />
})

const Footer = dynamic(() => import('@/components/ui/footer'), {
  loading: () => <div className="min-h-[200px]" />
})

function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })
  const opacity = useTransform(scrollYProgress, [0, 0.07], [0, 1])

  useEffect(() => {
    // Ensure we start at the top of the page
    window.scrollTo(0, 0)
    
    // Disable scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }

    // Add smooth scroll behavior with custom speed
    const html = document.documentElement
    html.style.scrollBehavior = 'auto' // Disable default smooth scroll
    
    let isScrolling = false
    let targetScrollTop = window.scrollY
    let currentScrollTop = window.scrollY
    const scrollSpeed = 0.05 // Lower value = slower scroll (0.05 is quite smooth)

    const smoothScroll = () => {
      if (!isScrolling) return
      
      // Calculate the distance to scroll
      const distance = targetScrollTop - currentScrollTop
      
      // If we're close enough to the target, stop scrolling
      if (Math.abs(distance) < 1) {
        currentScrollTop = targetScrollTop
        isScrolling = false
        return
      }

      // Update the current scroll position
      currentScrollTop += distance * scrollSpeed
      window.scrollTo(0, currentScrollTop)

      // Continue the animation
      requestAnimationFrame(smoothScroll)
    }

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      
      // Update target scroll position
      targetScrollTop = Math.max(0, Math.min(
        targetScrollTop + e.deltaY,
        document.documentElement.scrollHeight - window.innerHeight
      ))

      // Start smooth scrolling if not already scrolling
      if (!isScrolling) {
        isScrolling = true
        smoothScroll()
      }
    }

    // Add wheel event listener
    window.addEventListener('wheel', handleWheel, { passive: false })
    
    return () => {
      window.removeEventListener('wheel', handleWheel)
      html.style.scrollBehavior = 'auto'
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'auto'
      }
    }
  }, [])

  return (
    <div className="relative min-h-screen" ref={containerRef}>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-white origin-left z-[60]"
        style={{ scaleX, opacity: 0.5 }}
      />
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={"fixed top-0 left-0 right-0 z-50"}
      >
        <Header/>
      </motion.div>

      <div className="fixed inset-0 z-0">
        <motion.div 
          className='absolute w-screen h-screen z-10 backdrop-blur-lg'
          style={{ opacity }}
          transition={{ duration: 0.5 }}
        />
        <Hero/>
      </div>

      <motion.main 
        className='relative z-10 mt-screen bg-background rounded-t-3xl'
        style={{ marginTop: '100vh' }}
      >
        <Suspense fallback={<div className="min-h-screen" />}>
          <AboutUs />
        </Suspense>
        
        <Suspense fallback={<div className="min-h-screen" />}>
          <Portfolio />
        </Suspense>
        
        <Suspense fallback={<div className="min-h-screen" />}>
          <Contact />
        </Suspense>
        
        <Suspense fallback={<div className="min-h-[200px]" />}>
          <Footer />
        </Suspense>
      </motion.main>
    </div>
  )
}

export default Home