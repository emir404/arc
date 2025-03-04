"use client"

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type WorkProps = {
  image: string,
  children: React.ReactNode
}

export const Work = ({ image, children }: WorkProps) => {
  const heroRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' }
    })

    // Hero section animation
    tl.fromTo(heroRef.current,
      { opacity: 0, scale: 1.1 },
      { opacity: 1, scale: 1, duration: 1.5 }
    )

    // Content section animations
    gsap.fromTo('.work-title',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: '.work-title',
          start: 'top bottom-=100',
          toggleActions: 'play none none reverse'
        }
      }
    )

    gsap.fromTo('.work-description',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.work-description',
          start: 'top bottom-=100',
          toggleActions: 'play none none reverse'
        }
      }
    )

    gsap.fromTo('.work-image',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.work-image',
          start: 'top bottom-=100',
          toggleActions: 'play none none reverse'
        }
      }
    )

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <div className='w-full min-h-screen flex flex-col'>
      <div ref={heroRef} className='w-full h-[50vh] md:h-screen relative'>
        <Image 
          src={image} 
          alt='work' 
          fill
          className='w-full h-full object-cover object-center'
          priority
        />
      </div>
      <div ref={contentRef} className='py-8 md:py-24 px-6 md:px-12 lg:px-48 flex flex-col gap-8 md:gap-12'>
        {children}
      </div>
    </div>
  )
}

export const WorkTitle = ({title, badges}: {title: string, badges?: string[]}) => {
  return (
    <div className='work-title w-full flex flex-col gap-3 md:gap-6'>
      <h1 className='text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight'>{title}</h1>
      {badges && (
        <div className='flex flex-wrap gap-1.5 md:gap-4'>
          {badges.map((badge) => (
            <Badge key={badge}>{badge}</Badge>
          ))}
        </div>
      )}
    </div>
  )
}

const Badge = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='bg-neutral-200 text-neutral-700 font-medium px-2.5 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-base'>{children}</div>
  )
}

export const WorkDescription = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='work-description w-full flex flex-col gap-4 md:gap-8'>
      {children}
    </div>
  )
}

export const WorkDescItem = ({description}: {description: string}) => {
  return (
    <p className='text-lg md:text-2xl lg:text-3xl font-regular text-muted-foreground max-w-5xl leading-relaxed'>{description}</p>
  )
}

export const WorkImage = ({image}: {image: string}) => {
  return (
    <div className='work-image w-full aspect-[4/3] md:aspect-video relative'>
      <Image 
        src={image} 
        alt='work' 
        fill
        className='border border-border rounded-xl md:rounded-2xl object-cover object-top' 
      />
    </div>
  )
}