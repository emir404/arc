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
    gsap.set('.header-container', { visibility: 'visible' })

    let tl = gsap.timeline({
      delay: 0.1,
      defaults: {
        ease: "power2.inOut",
        duration: 0.4
      }
    })

    tl.fromTo(logoRef.current, 
      { opacity: 0, y: -100, visibility: 'hidden' },
      { opacity: 1, y: 0, visibility: 'visible' }
    )
    .fromTo(navRef.current,
      { opacity: 0, y: -100, visibility: 'hidden' },
      { opacity: 1, y: 0, visibility: 'visible' },
      '-=0.2'
    )

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <>
      <div className='invisible header-container flex justify-between items-center w-full z-50 px-4 sm:px-12 md:px-36 lg:px-48 xl:px-56'>
        <Link href='/' ref={logoRef} className='w-16 md:w-20'>
          <Logo fill='#2E2E2E' />
        </Link>
        <div ref={navRef}>
          <div className='hidden md:flex gap-4 items-end text-neutral-500'>
            <Link href={"#pricing"}>
              <Button
                variant={"ghost"}
              >
                See plans
              </Button>
            </Link>
            <Link href={"https://cal.com/emirayaz"} target='_blank'>
              <Button 
                variant="default"
              >
                  Schedule a call
              </Button>
            </Link>
          </div>
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