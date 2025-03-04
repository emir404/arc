"use client"

import { Button } from '@/components/ui/button'
import React from 'react'
import Hero from '@/components/ui/sections/hero'
import Portfolio from '@/components/ui/sections/portfolio'
import Contact from '@/components/ui/sections/contact'
import AboutUs from '@/components/ui/sections/aboutus'

function Home() {
  return (
    <div className='flex flex-col w-full min-h-screen'>
      <Hero />
      <AboutUs />
      <Portfolio />
      <Contact />
    </div>
  )
}

export default Home