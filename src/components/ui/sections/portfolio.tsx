"use client";

import React, { useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger)

const PROJECTS = [
  {
    title: 'Syntra Media',
    description: 'A digital marketing agency needed a comprehensive web platform to streamline their operations and enhance client engagement.',
    industry: 'Agency',
    image: '/projects/syntra.jpg',
    badges: ['Branding', 'Strategy', 'Design & Development']
  },
  {
    title: 'Lumino Agency',
    description: 'A creative agency specializing in branding and strategy needed a website that showcased their expertise and creative vision.',
    industry: 'Agency',
    image: '/projects/lumino.jpg',
    badges: ['Branding', 'Strategy', 'Design & Development']
  },
]

function Portfolio() {
  useEffect(() => {
    // Initial setup
    gsap.set('.bento-item', {
      opacity: 0,
      y: 40
    });

    // Scroll-triggered animations for bento items
    gsap.to('.bento-item', {
      scrollTrigger: {
        trigger: '.bento-grid',
        start: 'top center+=100',
        end: 'bottom bottom',
        toggleActions: 'play none none none',
        once: true
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power2.out"
    });

  }, [])

  return (
    <div id="portfolio" className='relative flex flex-col w-full px-4 md:px-10 py-32 md:py-64'>
      <div className="bento-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-10 w-full">
        {/* Top row */}
        <div className="bento-item">
          <PortfolioItem title={PROJECTS[0].title} description={PROJECTS[0].description} industry={PROJECTS[0].industry} image={PROJECTS[0].image} badges={PROJECTS[0].badges} />
        </div>
        <div className="bento-item">
          <PortfolioItem title={PROJECTS[1].title} description={PROJECTS[1].description} industry={PROJECTS[1].industry} image={PROJECTS[1].image} badges={PROJECTS[1].badges} />
        </div>
        {/*
        <div className="bento-item">
          <PortfolioItem title={PROJECTS[1].title} description={PROJECTS[1].description} industry={PROJECTS[1].industry} image={PROJECTS[1].image} badges={PROJECTS[1].badges} />
        </div>
        <div className="bento-item sm:col-span-2 lg:col-span-2">
          <PortfolioItem title={PROJECTS[1].title} description={PROJECTS[1].description} industry={PROJECTS[1].industry} image={PROJECTS[1].image} badges={PROJECTS[1].badges} />
        </div>
        <div className="bento-item">
          <PortfolioItem title={PROJECTS[1].title} description={PROJECTS[1].description} industry={PROJECTS[1].industry} image={PROJECTS[1].image} badges={PROJECTS[1].badges} />
        </div>

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

const PortfolioItem = ({ title, description, industry, image, badges }: { title: string, description: string, industry: string, image: string, badges?: string[] }) => {
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
          mixBlendMode: 'difference'
        }}
      >
        <span className="text-black text-sm font-medium">View</span>
      </div>

      <div className='bg-gray-200 w-full relative aspect-video group-hover:scale-[0.98] transition-transform duration-500'>
        <Image 
          src={image} 
          alt={title} 
          fill
          className='object-cover object-top' 
        />
        <div className='absolute bottom-0 right-0 p-2 md:p-4 flex gap-2 md:gap-4'>
          {badges?.map((badge, index) => (
            <div key={index} className="px-2 md:px-4 py-1 md:py-2 rounded-full bg-white/10 backdrop-blur-md mix-blend-difference">
              <p className="text-white text-sm md:text-base font-[500] mix-blend-difference">{badge}</p>
            </div>
          ))}
        </div>
      </div>
      <div className='flex flex-col gap-1 md:gap-2'>
        <div className='flex gap-2 items-center'>
          <p className='text-lg md:text-2xl'>{title}</p>
          <p className='text-sm text-gray-500'>|</p>
          <p className='text-lg md:text-2xl text-gray-500'>{industry}</p>
        </div>
        <p className='text-sm md:text-base lg:text-lg text-gray-500'>{description}</p>
      </div>
    </div>
  )
}

export default Portfolio