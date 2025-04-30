"use client"

import React, { useEffect } from 'react'
import gsap from 'gsap'
import Link from 'next/link'

function Redesign() {
  useEffect(() => {


    // Set initial states
    gsap.set('.redesign-description', { opacity: 0, y: 20, filter: 'blur(5px)' })


    gsap.fromTo(".redesign-section", {
      visibility:"hidden"
    },
    {
      visibility:"visible"
    }
    )

    // Animate elements
    gsap.to('.redesign-description', {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.8,
      ease: 'power3.out'
    })
  }, [])

  return (
    <div className='invisible redesign-section flex flex-col gap-4 sm:gap-8 md:gap-12 px-4 sm:px-12 md:px-36 lg:px-48 xl:px-56 py-20'>
      <p className='max-w-5xl font-semibold redesign-description text-3xl tracking-[-0.01em] leading-[1.5] text-black/70'>
        Hey! We got your Redesign order.
      </p>
      
      <p className='max-w-3xl redesign-description text-3xl tracking-[-0.01em] leading-[1.7] text-black/50'>
        In few hours, i will contact you with a mail to start working on your redesign.
      </p>

      <p className='max-w-3xl redesign-description text-3xl tracking-[-0.01em] leading-[1.7] text-black/50'>
        In <span className='mx-1 rounded-xl px-3 py-1 bg-red-500 hover:bg-red-600 transition-all duration-200  font-semibold shadow-[inset_0px_-3px_0px_0px_#dc2626] text-red-100'>48 hours</span> you will get a <span className='mx-1 rounded-xl px-3 py-1 bg-blue-500 hover:bg-blue-600 transition-all duration-200  font-semibold shadow-[inset_0px_-3px_0px_0px_#005ee6] text-blue-100'>Figma</span> file including the page you wanted for redesign.
      </p>

      <p className='max-w-3xl redesign-description text-3xl tracking-[-0.01em] leading-[1.7] text-black/50'>
        If you have any more questions, please don't hesitate to contact me on <Link href={'mailto:hello@witharc.co'} target='_blank' className='mx-1 rounded-xl px-3 py-1 bg-violet-500 hover:bg-violet-600 transition-all duration-200  font-semibold shadow-[inset_0px_-3px_0px_0px_#7c3aed] text-violet-100'>hello@witharc.co</Link>
      </p>

      <p className='max-w-3xl redesign-description text-3xl tracking-[-0.01em] leading-[1.5] text-black/50'>
        Thanks for choosing Arc! Excited to work with you.
      </p>
    </div>
  )
}

export default Redesign