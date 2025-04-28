import React, { useEffect } from 'react'
import gsap from 'gsap'
import { Button } from '../button'
import { BadgeCheck } from 'lucide-react'

function Pricing() {
  useEffect(() => {

    const tl = gsap.timeline({})

    // Set initial states
    gsap.set('.pricing-heading', { opacity: 0, y: 20, filter: 'blur(5px)' })
    gsap.set('.pricing-cards', { opacity: 0, y: 20, filter: 'blur(5px)' })


    gsap.fromTo(".pricing-section", {
      visibility:"hidden"
    },
    {
      visibility:"visible"
    }
    )

    // Animate elements
    tl.to('.pricing-heading', {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.8,
      ease: 'power3.out'
    })
    .to('.pricing-cards', {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.6')

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <div className='invisible pricing-section flex flex-col gap-8 sm:gap-12 md:gap-16 px-4 sm:px-12 md:px-36 lg:px-48 xl:px-56 py-12'>
      <p className='pricing-heading font-semibold tracking-[-0.04em] text-5xl text-black/80'>
        Plans
      </p>
      <div className='w-full flex gap-4'>
        <div className='w-full h-full flex flex-col p-8 bg-gray-300/50 rounded-xl border border-sky-100 gap-3'>
          <p className='font-medium tracking-tight text-2xl text-gray-500'>
            Landing Page
          </p>
          <p className='font-bold tracking-tight text-5xl text-gray-700'>
            1095$
          </p>
          <div className='py-4 flex flex-col gap-2'>
            <div className='flex gap-2'>
              <BadgeCheck size={28} className='text-blue-500'/>
              <p className='text-xl text-gray-600'>
                Maximum Conversion Rate
              </p>
            </div>
            <div className='flex gap-2'>
              <BadgeCheck size={28} className='text-blue-500'/>
              <p className='text-xl text-gray-600'>
                Animations
              </p>
            </div>
            <div className='flex gap-2'>
              <BadgeCheck size={28} className='text-blue-500'/>
              <p className='text-xl text-gray-600'>
                Custom Code / Framer
              </p>
            </div>
          </div>
        </div>
        <div className='w-full h-full flex flex-col p-8 bg-gray-300/50 rounded-xl border border-sky-100 gap-3'>
          <p className='font-medium tracking-tight text-2xl text-gray-500'>
            Design Partner
          </p>
          <p className='font-bold tracking-tight text-5xl text-gray-700'>
            1600$/mo
          </p>
          <div className='py-4 flex flex-col gap-2'>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Pricing