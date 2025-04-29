"use client"

import React, { useEffect } from 'react'
import gsap from 'gsap'
import Link from 'next/link'

function Subscription() {
  useEffect(() => {


    // Set initial states
    gsap.set('.subscription-description', { opacity: 0, y: 20, filter: 'blur(5px)' })


    gsap.fromTo(".subscription-section", {
      visibility:"hidden"
    },
    {
      visibility:"visible"
    }
    )

    // Animate elements
    gsap.to('.subscription-description', {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.8,
      ease: 'power3.out'
    })
  }, [])

  return (
    <div className='invisible subscription-section flex flex-col gap-4 sm:gap-8 md:gap-12 px-4 sm:px-12 md:px-36 lg:px-48 xl:px-56 py-20'>
      <p className='max-w-3xl font-semibold subscription-description text-4xl tracking-[-0.01em] leading-[1.5] text-black/70'>
        Hey! We got your Subscription order.
      </p>
      
      <p className='max-w-3xl subscription-description text-3xl tracking-[-0.01em] leading-[1.7] text-black/50'>
        In few hours, i will contact you with a mail to start working on your subscription.
      </p>

      <p className='max-w-3xl subscription-description text-3xl tracking-[-0.01em] leading-[1.7] text-black/50'>
        We will set up your subscription and you will get access to all the features of Arc.
      </p>

      <p className='max-w-3xl subscription-description text-3xl tracking-[-0.01em] leading-[1.7] text-black/50'>
        You and your team will have a private <span className='mx-1 rounded-xl px-3 py-1 bg-violet-500 hover:bg-violet-600 transition-all duration-200  font-semibold shadow-[inset_0px_-3px_0px_0px_#7c3aed] text-violet-100'>Slack</span> channel to ask any questions or to get support and a <span className='mx-1 rounded-xl px-3 py-1 bg-blue-500 hover:bg-blue-600 transition-all duration-200  font-semibold shadow-[inset_0px_-3px_0px_0px_#005ee6] text-blue-100'>Trello</span> board to submit your requests.
      </p>

      <p className='max-w-3xl subscription-description text-3xl tracking-[-0.01em] leading-[1.7] text-black/50'>
        You can <span className='mx-1 rounded-xl px-3 py-1 bg-yellow-500 hover:bg-yellow-600 transition-all duration-200  font-semibold shadow-[inset_0px_-3px_0px_0px_#ca8a04] text-yellow-100'>pause</span> or <span className='mx-1 rounded-xl px-3 py-1 bg-indigo-500 hover:bg-indigo-600 transition-all duration-200  font-semibold shadow-[inset_0px_-3px_0px_0px_#4f46e5] text-indigo-100'>resume</span> your subscription anytime. No commitment, cancel anytime.
      </p>

      <p className='max-w-3xl subscription-description text-3xl tracking-[-0.01em] leading-[1.7] text-black/50'>
        Your subscription includes any type of design work, branding, product design, UI/UX, landing pages, and more.
      </p>

      <p className='max-w-3xl subscription-description text-3xl tracking-[-0.01em] leading-[1.7] text-black/50'>
        If you have any more questions, please don't hesitate to contact me on <Link href={'mailto:emir@witharc.co'} target='_blank' className='mx-1 rounded-xl px-3 py-1 bg-red-500 hover:bg-red-600 transition-all duration-200  font-semibold shadow-[inset_0px_-3px_0px_0px_#dc2626] text-red-100'>emir@witharc.co</Link>
      </p>

      <p className='max-w-3xl subscription-description text-3xl tracking-[-0.01em] leading-[1.5] text-black/50'>
        Thanks for choosing Arc! Excited to work with you.
      </p>
    </div>
  )
}

export default Subscription