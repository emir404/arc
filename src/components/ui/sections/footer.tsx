"use client"

import React from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { useEffect } from 'react'
import { Marquee } from '../marquee'
import Logo from '../logo'

function Footer() {
  useEffect(() => {
    // Initial setup - hide elements
    gsap.set('.footer-logo', {
      opacity: 0,
      x: -100
    });

    gsap.set('.social-link', {
      opacity: 0,
      x: 100
    });

    // Animate logo
    gsap.to('.footer-logo', {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: 'power3.out'
    });

    // Animate social links with stagger
    gsap.to('.social-link', {
      opacity: 1,
      x: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out'
    });

    // Add hover animations for social links
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
      link.addEventListener('mouseenter', () => {
        gsap.to(link, {
          scale: 1.1,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      link.addEventListener('mouseleave', () => {
        gsap.to(link, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    });
  }, []);

return (
  <div className='relative w-full bg-[#0066FF] rounded-t-3xl px-4 sm:px-6 md:px-16 lg:px-24 py-8 sm:py-10 md:py-16'>
    <div className='flex flex-col h-full gap-8 sm:gap-12'>
      <div className='flex flex-col md:flex-row justify-between items-center w-full'>
        <Logo className='w-24 h-24 sm:w-36 sm:h-36 md:w-36 md:h-36' fill='white'/>
        <div className='flex flex-col gap-3 sm:gap-4 text-center md:text-right mt-6 md:mt-0'>
          <Link href="https://www.instagram.com/witharc.co" className='text-white text-lg sm:text-2xl md:text-3xl lg:text-4xl font-overused social-link'>
            Instagram
          </Link>
          <Link href="https://www.linkedin.com/company/witharcstudio" className='text-white text-lg sm:text-2xl md:text-3xl lg:text-4xl font-overused social-link'>
            LinkedIn
          </Link>
          <p className='text-white/60 text-lg sm:text-2xl md:text-3xl lg:text-4xl font-overused'>
            &copy; 2025 Arc Studio
          </p>
        </div>
      </div>
      <Marquee className='[--duration:15s] w-full'>
        <p className='text-white/20 mx-4 sm:mx-8 text-3xl sm:text-5xl md:text-7xl lg:text-9xl font-light font-overused footer-logo'>Lets create something extraordinary.</p>
      </Marquee>
    </div>
  </div>
)
}

export default Footer