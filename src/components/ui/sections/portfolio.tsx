"use client";

import React from 'react'
import { useEffect } from 'react'
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

    // Subtle hover effect
    const bentoItems = document.querySelectorAll('.bento-item');
    bentoItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        gsap.to(item, {
          scale: 1.02,
          duration: 0.3,
          ease: "power2.inOut"
        });
      });
      
      item.addEventListener('mouseleave', () => {
        gsap.to(item, {
          scale: 1,
          duration: 0.3,
          ease: "power2.inOut"
        });
      });
    });

  }, [])

  return (
    <div id="portfolio" className='relative flex flex-col w-full px-4 md:px-10 py-32 md:py-64'>
      <div className='absolute top-0 left-0 w-full h-16 md:h-20 bg-gradient-to-b from-[#0066FF] to-transparent' />
    
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
          <PortfolioItem title="Project 3" description="This is a description of project 3" industry="Industry 3" image="/images/portfolio/3.jpg" />
        </div>
        Middle row
        <div className="bento-item sm:col-span-2 lg:col-span-2">
          <PortfolioItem title="Project 4" description="This is a description of project 4" industry="Industry 4" image="/images/portfolio/4.jpg" />
        </div>
        <div className="bento-item">
          <PortfolioItem title="Project 5" description="This is a description of project 5" industry="Industry 5" image="/images/portfolio/5.jpg" />
        </div>

        Bottom row
        <div className="bento-item">
          <PortfolioItem title="Project 6" description="This is a description of project 6" industry="Industry 6" image="/images/portfolio/6.jpg" />
        </div>
        <div className="bento-item sm:col-span-2 lg:col-span-2 h-fit">
          <PortfolioItem title="Project 7" description="This is a description of project 7" industry="Industry 7" image="/images/portfolio/7.jpg" />
        </div>
        */}
      </div>
    </div>
  )
}

const PortfolioItem = ({ title, description, industry, image, badges }: { title: string, description: string, industry: string, image: string, badges?: string[] }) => {
  return (
    <div className="flex flex-col gap-2 md:gap-4">
      <div className='bg-gray-200 w-full relative aspect-video'>
        <Image 
          src={image} 
          alt={title} 
          fill
          className='object-cover object-top' 
        />
        <div className='absolute bottom-0 right-0 p-2 md:p-4 flex gap-2 md:gap-4'>
          {badges?.map((badge, index) => (
            <div key={index} className="px-2 md:px-4 py-1 md:py-2 rounded-full bg-white/20 backdrop-blur-md">
              <p className="text-white text-xs md:text-sm font-medium">{badge}</p>
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
        <p className='text-sm md:text-base text-gray-500'>{description}</p>
      </div>
    </div>
  )
}

export default Portfolio