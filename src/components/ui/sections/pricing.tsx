import React, { useEffect, useState } from 'react'
import gsap from 'gsap'
import { FaCircleCheck } from "react-icons/fa6";
import { ScrollTrigger } from 'gsap/all'
import { Button } from '../button';
import Link from 'next/link';

type PricingMode = "monthly" | "annually"

function Pricing() {
  const [mode, setMode] = useState<PricingMode>("monthly")

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
      <div className='px-4 sm:px-12 md:px-16 lg:px-28 xl:px-40 flex flex-col gap-4'>
        <div className='hidden w-full lg:flex'>
          <div className='pricing-cards w-full flex gap-2 justify-end'>
            <button className={`px-4 py-2 rounded-2xl border hover:bg-gray-800/10 transition ${mode === "monthly" ? "bg-gray-800/10" : "border-gray-800/10"}`} onClick={() => setMode("monthly")}>
              Monthly
            </button>
            <button className={`px-4 py-2 rounded-2xl border hover:bg-gray-800/10 transition ${mode === "annually" ? "bg-gray-800/10" : "border-gray-800/10"}`} onClick={() => setMode("annually")}>
              Annually
            </button>
          </div>
        </div>
        <div className='pricing-cards w-full flex-col lg:flex-row flex gap-4'>
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
              $1895
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
                  Conversion Optimized
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
            <Link href={'https://t.me/emirthedev'} target='_blank' className='w-full mt-auto'>
              <Button className='w-full'>
                Get Your Landing Page
              </Button>
            </Link>
          </div>
          <div className='flex w-full lg:hidden'>
          <div className='pricing-cards w-full flex gap-2 justify-end'>
            <button className={`px-4 py-2 rounded-2xl border hover:bg-gray-800/10 transition ${mode === "monthly" ? "bg-gray-800/10" : "border-gray-800/10"}`} onClick={() => setMode("monthly")}>
              Monthly
            </button>
            <button className={`px-4 py-2 rounded-2xl border hover:bg-gray-800/10 transition ${mode === "annually" ? "bg-gray-800/10" : "border-gray-800/10"}`} onClick={() => setMode("annually")}>
              Annually
            </button>
          </div>
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
              {
                mode === "monthly" ? (
                  <p className='font-semibold text-6xl my-2 text-gray-700 tracking-tighter pt-2'>$2195 <span className='text-lg text-gray-400 tracking-normal font-normal'>/per month</span></p>
                ) : (
                  <p className='font-semibold text-6xl my-2 text-gray-700 tracking-tighter pt-2'>$21950 <span className='text-lg text-gray-400 tracking-normal font-normal'>/per year</span></p>
                )
              }
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
                  No meetings (if preferred)
                </p>
              </div>
            </div>
            <Link href={"https://t.me/emirthedev"} target='_blank' className='w-full mt-auto'>
            <Button className='w-full bg-blue-500 font-semibold'>
                Let's Chat <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" width="48" height="48" preserveAspectRatio="xMidYMid"><defs><linearGradient id="a" x1="50%" x2="50%" y1="0%" y2="100%"><stop offset="0%" stopColor="#fff"/><stop offset="100%" stopColor="#fff"/></linearGradient></defs><path fill="url(#a)" d="M128 0C94.06 0 61.48 13.494 37.5 37.49A128.038 128.038 0 0 0 0 128c0 33.934 13.5 66.514 37.5 90.51C61.48 242.506 94.06 256 128 256s66.52-13.494 90.5-37.49c24-23.996 37.5-56.576 37.5-90.51 0-33.934-13.5-66.514-37.5-90.51C194.52 13.494 161.94 0 128 0Z"/><path fill="#000" d="M57.94 126.648c37.32-16.256 62.2-26.974 74.64-32.152 35.56-14.786 42.94-17.354 47.76-17.441 1.06-.017 3.42.245 4.96 1.49 1.28 1.05 1.64 2.47 1.82 3.467.16.996.38 3.266.2 5.038-1.92 20.24-10.26 69.356-14.5 92.026-1.78 9.592-5.32 12.808-8.74 13.122-7.44.684-13.08-4.912-20.28-9.63-11.26-7.386-17.62-11.982-28.56-19.188-12.64-8.328-4.44-12.906 2.76-20.386 1.88-1.958 34.64-31.748 35.26-34.45.08-.338.16-1.598-.6-2.262-.74-.666-1.84-.438-2.64-.258-1.14.256-19.12 12.152-54 35.686-5.1 3.508-9.72 5.218-13.88 5.128-4.56-.098-13.36-2.584-19.9-4.708-8-2.606-14.38-3.984-13.82-8.41.28-2.304 3.46-4.662 9.52-7.072Z"/></svg>
            </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Pricing