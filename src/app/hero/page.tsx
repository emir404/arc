"use client"

import React, { useEffect } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

function Hero() {
  useEffect(() => {

    const tl = gsap.timeline({})

    // Set initial states
    gsap.set('.hero-heading', { opacity: 0, y: 20, filter: 'blur(5px)' })
    gsap.set('.hero-description', { opacity: 0, y: 20, filter: 'blur(5px)' })
    gsap.set('.hero-buttons', { opacity: 0, y: 20, filter: 'blur(5px)' })
    gsap.set('.hero-icons', { opacity: 0, y: 20, filter: 'blur(5px)' })
    gsap.set('.hero-marquee', { opacity: 0, y: 30, filter: 'blur(8px)' })


    gsap.fromTo(".hero-section", {
      visibility:"hidden"
    },
    {
      visibility:"visible"
    }
    )

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
    .to('.hero-buttons', {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.6')
    .to('.hero-icons',{
      opacity: 0.25,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.4')
    .to('.hero-marquee', {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out'
    }, '-=0.6')

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <div className='invisible hero-section flex flex-col gap-8 sm:gap-12 md:gap-16'>
      <div className='px-4 sm:px-12 md:px-36 lg:px-48 xl:px-56 flex flex-col w-full pt-4 sm:pt-8'>
        <div className='flex flex-col gap-9 max-w-3xl items-center'>
          <h1 className='hero-heading font-semibold max-w-lg leading-[1.2] tracking-[-0.04em] text-7xl text-black/80 text-center'>
            Let's roast your hero
          </h1>
          <div>
          <Image src={"/assets/hero.png"} alt="Hero" width={1000} height={1000}/>
          </div>
          <div className='flex gap-3 hero-buttons'>
            <Link href={"https://t.me/emirthedev"} target='_blank'>
              <Button
                variant={"default"}
              >
                Roast me (29$)
              </Button>
            </Link>
            <Link href={'https://form.typeform.com/to/E2UtiPzr'} target='_blank'>
              <Button 
                variant="ghost"
              >
                Roast for free
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero