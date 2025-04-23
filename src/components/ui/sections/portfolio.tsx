import React, { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { Button } from '../button'
import Link from 'next/link'

function Portfolio() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.portfolio-section',
        start: 'top center+=100',
        toggleActions: 'play pause resume',
        once: true
      }
    })

    // Set initial states
    gsap.set('.project-one', { opacity: 0, y: 20, filter: 'blur(5px)' })
    gsap.set('.project-two', { opacity: 0, y: 20, filter: 'blur(5px)' })
    gsap.set('.work-button', { opacity: 0, y: 30, filter: 'blur(8px)' })

    // Animate elements
    tl.to('.project-one', {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.8,
      ease: 'power3.out'
    })
    .to('.project-two', {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.6')
    .to('.work-button', {
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
    <div className='flex flex-col gap-4 portfolio-section'>
      <div className='flex flex-col gap-12'>
        <div className='flex flex-col gap-5 project-one'>
          <Image src="/projects/sim.png" alt="Project" width={2000} height={2000} className='w-full h-full rounded-3xl shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)] aspect-video object-cover object-left-top' draggable={false} />
          <p className='text-2xl font-medium text-black/70'>
            Sim Studio
          </p>
        </div>
        <div className='flex flex-col gap-5 project-two'>
          <Image src="/projects/lucid.png" alt="Project" width={2000} height={2000} className='w-full h-full rounded-3xl shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)] aspect-video object-cover object-left-top' draggable={false} />
          <p className='text-2xl font-medium text-black/70'>
            Lucid
          </p>
        </div>
      </div>
      <Button variant={"secondary"} className='work-button w-max mx-auto bg-transparent border rounded-full border-neutral-400/50 text-neutral-600/80'>
        <Link href={"/works"}>
        See all work
        </Link>
      </Button>
    </div>
  )
}

export default Portfolio