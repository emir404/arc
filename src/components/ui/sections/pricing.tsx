import React, { useEffect } from 'react'
import gsap from 'gsap'
import { FaCircleCheck } from "react-icons/fa6";
import { ScrollTrigger } from 'gsap/all'
import { Button } from '../button';
import Link from 'next/link';

function Pricing() {
  useEffect(() => {

    gsap.registerPlugin(ScrollTrigger)

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.pricing-section',
        start: 'top 75%',
        end: 'bottom 25%',
        toggleActions: 'play none none none',
      }
    })

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
    <div id='pricing' className='invisible pricing-section flex flex-col gap-8 sm:gap-12 md:gap-16 py-12'>
      <p className='px-4 sm:px-12 md:px-36 lg:px-48 xl:px-56 pricing-heading font-semibold tracking-[-0.04em] text-5xl text-black/80'>
        Plans
      </p>
      <div className='pricing-cards w-full flex gap-4 px-4 sm:px-12 md:px-16 lg:px-28 xl:px-40'>
        <div className='w-full h-full flex flex-col p-8  rounded-2xl border border-gray-800/10 gap-3'>
          <div className='flex flex-col gap-1'>
            <p className='tracking-tight font-semibold text-xl text-gray-600'>
              Landing Page
            </p>
            <p className='tracking-tight text-lg text-gray-500 max-w-sm'>
              Best for busy founders who want to get a landing page done fast.
            </p>
          </div>
          <p className='font-semibold text-6xl my-2 text-gray-700 tracking-tighter pt-2'>
            $1199
          </p>
          <div className='py-4 flex flex-col gap-4'>
            <div className='flex gap-3 items-center'>
              <FaCircleCheck size={20} className='text-blue-500'/>
              <p className='text-xl text-gray-600'>
                Single Page
              </p>
            </div>
            <div className='flex gap-3 items-center'>
              <FaCircleCheck size={20} className='text-blue-500'/>
              <p className='text-xl text-gray-600'>
                Maximum Conversion Rate
              </p>
            </div>
            <div className='flex gap-3 items-center'>
              <FaCircleCheck size={20} className='text-blue-500'/>
              <p className='text-xl text-gray-600'>
                Animations
              </p>
            </div>
            <div className='flex gap-3 items-center'>
              <FaCircleCheck size={20} className='text-blue-500'/>
              <p className='text-xl text-gray-600'>
                Basic Copywriting
              </p>
            </div>
            <div className='flex gap-3 items-center'>
              <FaCircleCheck size={20} className='text-blue-500'/>
              <p className='text-xl text-gray-600'>
                7 Day Delivery
              </p>
            </div>
            <div className='flex gap-3 items-center'>
              <FaCircleCheck size={20} className='text-blue-500'/>
              <p className='text-xl text-gray-600'>
                Framer / Custom Code
              </p>
            </div>
            <div className='flex gap-3 items-center'>
              <FaCircleCheck size={20} className='text-blue-500'/>
              <p className='text-xl text-gray-600'>
                3 Design Concepts
              </p>
            </div>
          </div>
          <Link href={'https://buy.polar.sh/polar_cl_6EMNsRORjSA73WXAnEJYtgjvAkKOKB1pcnMYL1bfcTN'} target='_blank' className='w-full'>
            <Button className='w-full'>
              Get Your Landing Page
            </Button>
          </Link>
        </div>
        <div className='w-full h-full flex flex-col p-8  rounded-2xl border bg-gray-300/20 border-gray-800/10 gap-3'>
          <div className='flex flex-col gap-1'>
            <p className='tracking-tight font-semibold text-xl text-gray-600'>
              Design Partner
            </p>
            <p className='tracking-tight text-lg text-gray-500 max-w-sm'>
              Best for brands and startups who want to get ongoing design support.
            </p>
          </div>
          <p className='font-semibold text-6xl my-2 text-gray-700 tracking-tighter pt-2'>
            $1600 <span className='text-lg text-gray-400 tracking-normal font-normal'>/per month</span>
          </p>
          <div className='py-4 flex flex-col gap-4'>
            <div className='flex gap-3 items-center'>
              <FaCircleCheck size={20} className='text-blue-500'/>
              <p className='text-xl text-gray-600'>
                One request at a time
              </p>
            </div>
            <div className='flex gap-3 items-center'>
              <FaCircleCheck size={20} className='text-blue-500'/>
              <p className='text-xl text-gray-600'>
                Unlimited brands/projects
              </p>
            </div>
            <div className='flex gap-3 items-center'>
              <FaCircleCheck size={20} className='text-blue-500'/>
              <p className='text-xl text-gray-600'>
                Private Slack channel
              </p>
            </div>
            <div className='flex gap-3 items-center'>
              <FaCircleCheck size={20} className='text-blue-500'/>
              <p className='text-xl text-gray-600'>
                Framer Development
              </p>
            </div>
            <div className='flex gap-3 items-center'>
              <FaCircleCheck size={20} className='text-blue-500'/>
              <p className='text-xl text-gray-600'>
                No Commitment, cancel anytime
              </p>
            </div>
            <div className='flex gap-3 items-center'>
              <FaCircleCheck size={20} className='text-blue-500'/>
              <p className='text-xl text-gray-600'>
                Pause or resume anytime
              </p>
            </div>
            <div className='flex gap-3 items-center'>
              <FaCircleCheck size={20} className='text-blue-500'/>
              <p className='text-xl text-gray-600'>
                No meetings
              </p>
            </div>
          </div>
          <Link href={'https://buy.polar.sh/polar_cl_DXTCbLKmdtW8MXkGtqw7BaX2UriQkAumCehTC2jJfBz'} target='_blank' className='w-full'>
          <Button className='w-full bg-blue-500 font-semibold'>
              Get Started
          </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Pricing