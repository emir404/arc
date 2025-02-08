"use client"

import React, { useRef, useState } from 'react'
import gsap from 'gsap'
import { useEffect } from 'react'
import Logo from './logo'
import { Button } from './button'
import { Menu } from 'lucide-react'
import MobileMenu from './mobile-menu'
import Link from 'next/link'

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const logoRef = useRef<HTMLAnchorElement>(null)
  const navRef = useRef<HTMLDivElement>(null)

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    let tl = gsap.timeline({
      delay: 0.1,
      defaults: {
        ease: "power2.inOut",
        duration: 0.4
      }
    })

    tl.from(logoRef.current, {
      opacity: 0,
      y: -100
    })

    tl.from(navRef.current, {
      opacity: 0,
      y: -100
    })
  }, [])

  return (
    <>
      <div className='absolute flex justify-between items-center w-full p-4 md:p-8 z-50'>
        <Link href='/' ref={logoRef} className='w-16 md:w-24'>
          <Logo fill='#2E2E2E' />
        </Link>
        <div ref={navRef}>
          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center gap-10'>
            <button 
              onClick={() => scrollToSection('portfolio')} 
              className='text-2xl text-black hover:opacity-70 transition-opacity'
            >
              Work
            </button>
            <Button 
              onClick={() => scrollToSection('contact')} 
              className='text-2xl p-6 bg-[#2E2E2E] text-white font-[400] shadow-none hover:bg-white hover:text-[#2E2E2E] transition-colors'
            >
              Get Started
            </Button>
          </div>
          {/* Mobile Menu Button */}
          <button 
            className='md:hidden p-2'
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className='w-8 h-8' />
          </button>
        </div>
      </div>
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
    </>
  )
}

export default Header