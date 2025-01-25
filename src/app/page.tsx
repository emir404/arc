'use client'

import Header from '@/components/ui/header'
import AboutUs from '@/components/ui/sections/aboutus'
import Contact from '@/components/ui/sections/contact'
import Hero from '@/components/ui/sections/hero'
import Portfolio from '@/components/ui/sections/portfolio'
import Footer from '@/components/ui/footer'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useEffect } from 'react'

function Home() {
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

    // Add smooth scroll behavior to html element
    document.documentElement.style.scrollBehavior = 'smooth'
    
    // Optional: Add custom scrolling behavior
    const html = document.documentElement
    html.style.height = '100%'
    html.style.overflowY = 'scroll'
    html.style.overscrollBehavior = 'none' // Prevents bounce effect on some browsers
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto'
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'auto'
      }
    }
  }, [])

  return (
    <div className="relative min-h-screen">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-white origin-left z-[60]"
        style={{ scaleX, opacity: 0.5 }}
      />
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <Header />
      </motion.div>

      <div className="fixed inset-0 z-0">
        <motion.div className='absolute w-screen h-screen z-10 backdrop-blur-lg'
          style={{
            opacity: opacity,
          }}
          transition={{ duration: 0.5 }}
        ></motion.div>
        <Hero/>
      </div>

      <motion.main 
        className='relative z-10 mt-screen bg-background rounded-t-3xl'
        style={{
          marginTop: '100vh',
        }}
      >
        <AboutUs />
        <Portfolio />
        <Contact />
        <Footer />
      </motion.main>
    </div>
  )
}

export default Home