"use client"

import { Instagram, Linkedin, MoveDownRight, MoveRight, Twitter } from 'lucide-react'
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'

gsap.registerPlugin(ScrollTrigger)

function Contact() {
  const containerRef = useRef(null)
  const circleRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#contact',
        start: 'top 80%',
        end: 'bottom center',
        toggleActions: "play none none none",
        once: true
      }
    });

    // Animate the floating circle
    gsap.to(circleRef.current, {
      y: -20,
      duration: 2,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1
    });

    // Main animation sequence
    tl.from('.contact-title', {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    })
    .from('.contact-description', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.5")
    .from('.contact-item', {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.2,
      ease: "power2.out"
    }, "-=0.3")
    .from('.floating-arrow', {
      x: -50,
      opacity: 0,
      duration: 0.8,
      ease: "back.out(1.7)"
    }, "-=0.5");

    // Cursor follower effect
    const handleMouseMove = (e: MouseEvent) => {
      const cursor = document.querySelector('.cursor-follower') as HTMLElement;
      if (cursor) {
        gsap.to(cursor, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.6,
          ease: "power2.out"
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      id="contact" 
      ref={containerRef}
      className='relative flex flex-col md:flex-row gap-12 md:gap-0 w-full min-h-screen px-4 sm:px-6 md:px-10 py-20 md:py-32 overflow-hidden'
    >
      {/* Background decorative elements */}
      <div className='fixed w-80 h-80 rounded-full bg-black/5 blur-3xl pointer-events-none -z-10 opacity-50' />
      <div ref={circleRef} className='hover:bg-black/5 transition-all duration-500 absolute top-20 right-20 w-32 h-32 rounded-full border border-black/20 floating-circle' />
      <div ref={circleRef} className='hover:bg-black/5 transition-all duration-500 absolute top-32 right-20 w-32 h-32 rounded-full border border-black/20 floating-circle' />
      <div ref={circleRef} className='hover:bg-black/5 transition-all duration-500 absolute top-44 right-20 w-32 h-32 rounded-full border border-black/20 floating-circle' />
      
      <div className='flex flex-col w-full md:w-1/2 pr-0 md:pr-20'>
        <h1 className='contact-title text-6xl md:text-8xl mb-8 text-black/80 leading-tight'>
          Let's create something extraordinary.
        </h1>
        <p className='contact-description text-xl md:text-2xl text-black/60 max-w-xl'>
          Tell us about your project, your goals, and what makes your brand unique. 
          We'll craft a digital experience that reflects your vision.
        </p>
      </div>

      <div className='flex flex-col w-full md:w-1/2 gap-20 md:gap-32 mt-32'>
        <div className='contact-item group'>
          <Link href="mailto:hello@witharc.co" 
                className='inline-flex flex-col group-hover:translate-x-4 transition-transform duration-500'>
            <span className='text-xl tracking-wider text-black/60 mb-2'>Email us at</span>
            <span className='text-4xl md:text-5xl group-hover:text-black/60 transition-colors'>
              hello@witharc.co
            </span>
          </Link>
        </div>

        <div className='contact-item group'>
          <Link href="https://maps.google.com/?q=Süleyman Seba Cad. No:79 34357 Besiktas Istanbul Turkey"
                target="_blank"
                className='inline-flex flex-col group-hover:translate-x-4 transition-transform duration-500'>
            <span className='text-xl tracking-wider text-black/60 mb-2'>Visit us at</span>
            <span className='text-4xl md:text-5xl group-hover:text-black/60 transition-colors'>
              Süleyman Seba Cad.
              <br />
              Besiktas, Istanbul
            </span>
          </Link>
        </div>

        <div className='contact-item flex gap-8'>
          <Link href="https://www.instagram.com/witharc.co" className='hover:text-black/40 transition-colors'>
            <Instagram className="w-6 h-6" />
          </Link>
          <Link href="https://www.linkedin.com/company/witharcstudio" className='hover:text-black/40 transition-colors'>
            <Linkedin className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Contact