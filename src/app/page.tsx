"use client"

import { Button } from '@/components/ui/button'
import React from 'react'
import { ReactLenis } from 'lenis/react'
import Hero from '@/components/ui/sections/hero'
import Portfolio from '@/components/ui/sections/portfolio'
import Contact from '@/components/ui/sections/contact'
import AboutUs from '@/components/ui/sections/aboutus'

function Home() {
  return (
    <ReactLenis root options={{ 
      lerp: 2, // Smoother interpolation
      duration: 1.5, // Slightly longer duration for smoother feel
      smoothWheel: true,
      wheelMultiplier: 1.2, // Slightly faster wheel scrolling
      touchMultiplier: 2, // Better touch response
      infinite: false, // Prevent infinite scrolling
      orientation: "vertical" // Explicitly set scroll direction
    }}>
      <div className='flex flex-col w-full min-h-screen'>
        <Hero />
        <AboutUs />
        <Portfolio />
        <Contact />
      </div>
    </ReactLenis>
  )
}

export default Home