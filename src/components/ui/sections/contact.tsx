"use client"

import { MoveDownRight } from 'lucide-react'
import React, { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'

gsap.registerPlugin(ScrollTrigger)

function Contact() {
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#contact',
        start: 'top bottom',
        end: 'top center',
        toggleActions: "play none none none",
        once: true
      }
    });

    tl.from('.contact-title', {
      opacity: 0,
      y: 100,
    })
    .from('.contact-text-1', {
      opacity: 0, 
      y: 100,
    })
    .from('.contact-text-2', {
      opacity: 0,
      y: 100,
    })
    .from('.line', {
      opacity: 0,
      y: 100,
    })
    .from('.mail-text', {
      opacity: 0,
      y: 100,
    });
  }, [])

  return (
    <div id="contact" className='flex flex-col w-full px-4 sm:px-6 md:px-8 lg:px-16 py-10 md:py-20'>
      <div className='flex flex-col w-full gap-6 md:gap-10'>
        <div className='flex gap-4 md:gap-8 items-center contact-title'>
          <h1 className='text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold text-[#3C3C3C]'>
            Get in touch
          </h1>
          <MoveDownRight className='w-6 h-6 sm:w-8 sm:h-8 md:w-16 md:h-16 lg:w-24 lg:h-24 text-[#3C3C3C]' />
        </div>
        
        <div className='flex flex-col w-full'>
          <div className='flex flex-col lg:flex-row gap-6 lg:gap-20'>
            <p className='text-base sm:text-lg md:text-2xl lg:text-3xl text-[#3C3C3C] contact-text-1'>
              Your brand deserves more than a generic website—it deserves an experience that captivates, engages, and leaves a lasting impression. Whether you have a clear vision or need creative direction, we&apos;re here to bring it to life with custom, strategy-driven web design.
            </p>

            <p className='text-lg sm:text-xl md:text-3xl lg:text-4xl contact-text-2'>
              Tell us about your project, your goals, and what makes your brand unique. We&apos;ll craft a digital experience that reflects your vision and sets you apart.
            </p>
          </div>
        </div>
        
        <div className='line w-full h-0.5 bg-black/10'></div>
        
        <div className='flex items-center justify-center w-full overflow-hidden px-2 md:px-4'>
          <Link 
            href={'mailto:hello@witharc.co'} 
            className='text-xl sm:text-3xl md:text-6xl lg:text-[200px] text-black/50 mail-text hover:text-black/70 transition-colors break-all sm:break-normal'
          >
            hello@witharc.co
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Contact