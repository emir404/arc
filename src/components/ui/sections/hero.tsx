"use client";

import React from 'react'
import gsap from 'gsap'
import { useEffect } from 'react'
// @ts-expect-error
import ReactCurvedText from 'react-curved-text'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function Hero() {
  useEffect(() => {
    // First make container visible
    gsap.set('.hero-container', { visibility: 'visible' })
    
    const tl = gsap.timeline()
    
    // Animation sequence
    tl.fromTo('.hero-text', 
      { opacity: 0, y: 100, visibility: 'hidden' },
      { opacity: 1, y: 0, visibility: 'visible', duration: 1.2, ease: 'power3.out' }
    )
    .fromTo('.header-text',
      { opacity: 0, y: 50, visibility: 'hidden' },
      { opacity: 1, y: 0, visibility: 'visible', duration: 1, ease: 'power3.out' },
      '-=0.8'
    )
    .fromTo('.hero-description',
      { opacity: 0, y: 30, visibility: 'hidden' },
      { opacity: 1, y: 0, visibility: 'visible', duration: 0.8, ease: 'power3.out' },
      '-=0.6'
    )
    .fromTo('.circle-decoration',
      { scale: 0, opacity: 0, visibility: 'hidden' },
      { scale: 1, opacity: 1, visibility: 'visible', duration: 1, stagger: 0.2, ease: 'power3.out' },
      '-=0.8'
    )
    .fromTo('.background-text',
      { opacity: 0, x: -100, visibility: 'hidden' },
      { opacity: 1, x: 0, visibility: 'visible', duration: 1.5, ease: 'power2.out' },
      '-=1.2'
    )

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <div className='relative invisible hero-container flex flex-col pt-16 justify-center md:justify-start md:pt-24 lg:pt-56 w-full px-4 sm:px-6 md:px-10 min-h-screen overflow-hidden'>
      <div className='w-full flex relative p-4 md:p-16 hero-text'>
        <div className='flex w-full flex-col md:flex-row gap-8 md:gap-24'>
          <h1 className='header-text 
            text-6xl sm:text-7xl md:text-8xl lg:text-9xl
            md:font-medium
            font-semibold
            text-left
            leading-none
            tracking-tighter
            text-gray-500
            w-full md:w-fit
            mb-8 md:mb-0
          '>
            Design. Develop. <br/>
            <span className='text-black'>Launch.</span>
          </h1>

          <div className='flex flex-col md:flex-row md:items-end md:justify-end gap-8 md:gap-24 flex-1'>
            <p className='text-lg md:text-xl w-full md:w-1/2 hero-description'>
              We craft immersive digital experiences with precision, creativity, and impact—transforming complex ideas into seamless, high-performing websites that leave a lasting impression.
            </p>
            <div className='hidden md:flex flex-col -space-y-16'>
              <div className='w-32 h-32 rounded-full border border-gray-300 circle-decoration'></div>
              <div className='w-32 h-32 rounded-full border border-gray-300 circle-decoration'></div>
              <div className='w-32 h-32 rounded-full border border-gray-300 circle-decoration'></div>
            </div>
          </div>
        </div>
      </div>

      <div className='absolute -bottom-32 md:-bottom-72 -left-32 w-[200vw] background-text'>
        <p className='text-[300px] md:text-[600px] font-extrabold text-gray-100/80 truncate select-none'>ARC ARC</p>
      </div>
    </div>
  )
}

export default Hero