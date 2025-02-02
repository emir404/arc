"use client"

import React from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { useEffect } from 'react'

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
    <div className='w-full h-auto md:h-80 bg-[#0066FF] px-6 md:px-16 lg:px-24 py-10 md:py-16'>
      <div className='flex flex-col md:flex-row h-full items-center md:items-center justify-between gap-8 md:gap-0'>
        <p className='text-white text-5xl md:text-6xl lg:text-8xl font-overused footer-logo'>
          Arc.
        </p>
        <div className='flex flex-col gap-4 text-center md:text-right'>
          <Link href={"https://www.instagram.com/witharc.co"} className='text-white text-2xl md:text-3xl lg:text-4xl font-overused social-link'>
            Instagram
          </Link>
          <Link href={"https://www.instagram.com/witharc.co"} className='text-white text-2xl md:text-3xl lg:text-4xl font-overused social-link'>
            Dribble
          </Link>
          <Link href={"https://www.instagram.com/witharc.co"} className='text-white text-2xl md:text-3xl lg:text-4xl font-overused social-link'>
            LinkedIn
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Footer