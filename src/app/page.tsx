"use client"

import React from 'react'
import Hero from '@/components/ui/sections/hero'
import Pricing from '@/components/ui/sections/pricing'
import AboutUs from '@/components/ui/sections/aboutus'

function Home() {
  return (
    <div className='flex flex-col w-full min-h-screen'>
      <Hero />
      <AboutUs/>
      <Pricing />
    </div>
  )
}

export default Home