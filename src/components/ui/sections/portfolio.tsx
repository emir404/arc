"use client";

import React, { useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger)

const PROJECTS = [
  {
    title: 'Syntra Media',
    description: 'A digital marketing agency needed a comprehensive web platform to streamline their operations and enhance client engagement.',
    industry: 'Agency',
    image: '/projects/syntra.jpg',
    badges: ['Branding', 'Strategy', 'Design & Development'],
    href: '/works/syntra'
  },
  {
    title: 'Lumino Agency',
    description: 'A creative agency specializing in branding and strategy needed a website that showcased their expertise and creative vision.',
    industry: 'Agency',
    image: '/projects/lumino.jpg',
    badges: ['Design & Development'],
    href: '/works/lumino'
  },
  {
    title: 'Focusify',
    description: 'An AI-powered productivity app that helps users stay focused and manage their tasks more effectively through intelligent scheduling and personalized recommendations.',
    industry: 'Productivity',
    image: '/projects/focusify.jpg',
    badges: ['AI', 'Design & Development', 'UX Research'],
    href: '/works/focusify'
  },
  {
    title: 'Calmera',
    description: 'A AI-powered platform that provides personalized therapy sessions through voice interaction, offering empathetic conversations and mental health support.',
    industry: 'Healthcare',
    image: '/projects/calmera.jpg',
    badges: ['AI', 'Design & Development', 'Branding'],
    href: '/works/calmera'
  },
  {
    title: 'The Bound Games',
    description: 'A innovative game studio needed branding and a website to showcase their games and connect with players.',
    industry: 'Game Studio',
    image: '/projects/thebound.jpg',
    badges: ['Branding', 'Design & Development'],
    href: '/works/thebound'
  }
]

function Portfolio() {
  useEffect(() => {
    const cards = gsap.utils.toArray('.bento-item')
    
    cards.forEach((card: any) => {
      gsap.set(card, { opacity: 0, y: 50 })
      
      ScrollTrigger.create({
        trigger: card,
        start: 'top bottom-=100',
        onEnter: () => {
          gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out'
          })
        },
        once: true
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <div id="portfolio" className='relative flex flex-col w-full px-4 md:px-24 py-32 md:py-64'>
      <div className="bento-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-10 w-full">
        {/* Top row */}
        <div className="bento-item">
          <PortfolioItem title={PROJECTS[0].title} description={PROJECTS[0].description} industry={PROJECTS[0].industry} image={PROJECTS[0].image} badges={PROJECTS[0].badges} href={PROJECTS[0].href}/>
        </div>
        <div className="bento-item">
          <PortfolioItem title={PROJECTS[1].title} description={PROJECTS[1].description} industry={PROJECTS[1].industry} image={PROJECTS[1].image} badges={PROJECTS[1].badges} href={PROJECTS[1].href} />
        </div>
        {/*
        <div className="bento-item">
          <PortfolioItem title={PROJECTS[2].title} description={PROJECTS[2].description} industry={PROJECTS[2].industry} image={PROJECTS[2].image} badges={PROJECTS[2].badges} href={PROJECTS[2].href} />
        </div>
        */}
        <div className="bento-item sm:col-span-2 lg:col-span-2">
          <PortfolioItem title={PROJECTS[3].title} description={PROJECTS[3].description} industry={PROJECTS[3].industry} image={PROJECTS[3].image} badges={PROJECTS[3].badges} href={PROJECTS[3].href} />
        </div>
        <div className="bento-item">
          <PortfolioItem title={PROJECTS[4].title} description={PROJECTS[4].description} industry={PROJECTS[4].industry} image={PROJECTS[4].image} badges={PROJECTS[4].badges} href={PROJECTS[4].href} />
        </div>
        {/*

        <div className="bento-item">
          <PortfolioItem title={PROJECTS[1].title} description={PROJECTS[1].description} industry={PROJECTS[1].industry} image={PROJECTS[1].image} badges={PROJECTS[1].badges} />
        </div>
        <div className="bento-item sm:col-span-2 lg:col-span-2 h-fit">
          <PortfolioItem title={PROJECTS[1].title} description={PROJECTS[1].description} industry={PROJECTS[1].industry} image={PROJECTS[1].image} badges={PROJECTS[1].badges} />
        </div>
        */}
      </div>
    </div>
  )
}

const PortfolioItem = ({ title, description, industry, image, badges, href }: { title: string, description: string, industry: string, image: string, badges?: string[], href?: string }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const cursorRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize GSAP for smooth cursor movement
    if (cursorRef.current) {
      gsap.set(cursorRef.current, {
        x: cursorPosition.x,
        y: cursorPosition.y,
        xPercent: -50,
        yPercent: -50
      });
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        x: x,
        y: y,
        duration: 0.2,
        ease: "power2.out"
      });
    }
  };

  return (
    <div
      className="flex flex-col gap-2 md:gap-4 cursor-none relative overflow-hidden group"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
    >
      <Link href={href || ''}>
      {/* Custom Cursor */}
      <div 
        ref={cursorRef}
        className={`pointer-events-none fixed z-50 flex items-center justify-center transition-opacity duration-300 ${
          isHovering ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          width: '80px',
          height: '80px',
          backgroundColor: 'white',
          borderRadius: '50%',
        }}
      >
        <span className="text-black text-sm font-medium">View</span>
      </div>

      <div className='bg-gray-200 w-full relative aspect-video group-hover:scale-[0.98] transition-transform duration-500'>
        <Image 
          src={image} 
          alt={title} 
          fill
          className='object-cover' 
        />
        <div className='absolute bottom-0 right-0 p-2 md:p-4 flex gap-2 md:gap-4'>
          {badges?.map((badge, index) => (
            <div key={index} className="px-2 md:px-4 py-1 md:py-2 rounded-full bg-black/20 backdrop-blur-md">
              <p className="text-white/70 text-sm md:text-base font-[500]">{badge}</p>
            </div>
          ))}
        </div>
      </div>
      <div className='flex flex-col gap-1 md:gap-2'>
        <div className='flex gap-2 mt-3 items-center'>
          <p className='text-lg md:text-2xl'>{title}</p>
          <p className='text-sm text-gray-500'>|</p>
          <p className='text-lg md:text-2xl text-gray-500'>{industry}</p>
        </div>
          <p className='text-sm md:text-base lg:text-lg text-gray-500'>{description}</p>
        </div>
      </Link>
    </div>
  )
}

export default Portfolio