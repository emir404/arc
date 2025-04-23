import React, { useEffect } from 'react'
import { FileTextIcon, InputIcon, GlobeIcon, CalendarIcon, BellIcon } from '@radix-ui/react-icons'
import { FaBolt, FaUser, FaGaugeHigh } from 'react-icons/fa6'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'
import { OrbitingCircles } from '@/components/magicui/orbiting-circles'

function Hero() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top center+=100',
        toggleActions: 'restart pause reset pause'
      }
    })

    // Set initial states
    gsap.set('.hero-heading', { opacity: 0, y: 20, filter: 'blur(5px)' })
    gsap.set('.hero-description', { opacity: 0, y: 20, filter: 'blur(5px)' })
    gsap.set('.hero-card', { opacity: 0, y: 30, filter: 'blur(8px)' })

    // Animate elements
    tl.to('.hero-heading', {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.8,
      ease: 'power3.out'
    })
    .to('.hero-description', {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.6')
    .to('.hero-card', {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out'
    }, '-=0.4')

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <div className='flex flex-col w-full pt-20 gap-16 hero-section'>
      <div className='flex flex-col mb-8 gap-8 relative'>
        <h1 className="hero-heading text-5xl tracking-[-0.05em] md:leading-[1.15] text-[#454545] sm:text-6xl md:text-7xl font-bold">
          Custom web design, <br /> 
          no templates, no limits.
        </h1>
        <p className='hero-description text-lg md:text-2xl font-regular text-[#858585] leading-6 max-w-2xl'>
          Arc crafts high-impact websites designed to captivate and convert—no templates, just pure creativity.
        </p>
      </div>
      <div className='w-full pb-16'>
        <div className="relative grid grid-cols-6 grid-rows-2 gap-4 md:gap-8 h-[700px]">
          {/* Creativity First Card */}
          <div className="hero-card col-span-3 row-span-1 bg-[#F3F3F3] border border-[#7E7E7E]/20 rounded-3xl flex flex-col relative overflow-hidden">
            <div className="overflow-hidden z-0 w-full">
              <Image src="/assets/bento1.png" alt="Bento" width={1000} height={1000} className='z-10 w-full h-full' draggable={false} />
            </div>
            <div className='absolute left-1/2 -bottom-16 h-64 w-[160rem] z-0 bg-[#F3F3F3] blur-[40px] mt-auto transform -translate-x-1/2'></div>

            <div className="bottom-0 p-9 absolute z-20">
              <h3 className="text-2xl font-semibold text-[#454545] mb-2 leading-[1.3] tracking-[-0.03em]">Creativity First. <span className="text-[#7A7A7A] font-normal">Every project is<br/>a blank canvas.</span></h3>
            </div>
          </div>
          
          {/* User Centered Card */}
          <div className="hero-card col-span-3 row-span-1 bg-[#F3F3F3] border border-[#7E7E7E]/20 rounded-3xl flex flex-col relative overflow-hidden">
            <div className="overflow-hidden z-0 w-full">
              <div className='absolute flex justify-center w-full gap-8 mt-12 z-20 mix-blend-overlay'>
                <FaBolt className="text-8xl text-[#001C34]" />
                <FaUser className="text-8xl text-[#001C34]" />
                <FaGaugeHigh className="text-8xl text-[#001C34]" />
              </div>
              <Image src="/assets/bento2.png" alt="Bento" width={1000} height={1000} className='z-10 w-full h-full' draggable={false} />
            </div>
            <div className='absolute left-1/2 -bottom-16 h-64 w-[160rem] z-0 bg-[#F3F3F3] blur-[40px] mt-auto transform -translate-x-1/2'></div>

            <div className="bottom-0 p-9 absolute z-20">
              <h3 className="text-2xl font-semibold text-[#454545] mb-2 leading-[1.3] tracking-[-0.03em]">User Centered. <span className="text-[#7A7A7A] font-normal">Websites built for engagement and experience.</span></h3>
            </div>
          </div>
          
          <div className="hero-card col-span-2 row-span-1 bg-[#F3F3F3] border border-[#7E7E7E]/20 rounded-3xl flex flex-col relative overflow-hidden">
            <div className="overflow-hidden z-0 w-full">
              <Image src="/assets/bento4.png" alt="Bento" width={1000} height={1000} className='z-10 w-full h-full absolute bottom-20 left-12' draggable={false} />
            </div>
            <div className='absolute left-1/2 -bottom-16 h-64 w-[160rem] z-0 bg-[#F3F3F3] blur-[40px] mt-auto transform -translate-x-1/2'></div>

            <div className="bottom-0 p-9 absolute z-20">
              <h3 className="text-2xl font-semibold text-[#454545] mb-2 leading-[1.3] tracking-[-0.03em]">Solid Prices. <span className="text-[#7A7A7A] font-normal">No b*llshit.</span></h3>
            </div>
          </div>
          
          {/* Future-Ready Tech Card */}
          <div className="hero-card col-span-4 row-span-1 bg-[#F3F3F3] border border-[#7E7E7E]/20 rounded-3xl flex flex-col relative overflow-hidden">
            <div className="overflow-hidden z-0 w-full">
              <Image src="/assets/bento3.png" alt="Bento" width={1000} height={1000} className='z-10 w-full h-full' draggable={false} />
            </div>
            <div className='absolute left-1/2 -bottom-16 h-64 w-[160rem] z-0 bg-[#F3F3F3] blur-[40px] mt-auto transform -translate-x-1/2'></div>

            <div className="bottom-0 p-9 absolute z-20">
              <h3 className="text-2xl font-semibold text-[#454545] mb-2 leading-[1.3] tracking-[-0.03em]">Future-Ready Tech. <span className="text-[#7A7A7A] font-normal">Performance, speed, and cutting-edge design.</span></h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero