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
      <div className='invisible header-container flex justify-between items-center w-full z-50 px-4 sm:px-12 md:px-36 lg:px-64 xl:px-80'>
        <Link href='/' ref={logoRef} className='w-16 md:w-20'>
          <Logo fill='#2E2E2E' />
        </Link>
        <div ref={navRef}>
          <div className='hidden md:flex gap-4 items-end text-neutral-500'>
            <Button
              variant={"ghost"}
            >
              <Link href={"https://x.com/emirthedev"} target='_blank'>
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" viewBox="0 0 1200 1227"><path fill="#000" d="M714.163 519.284 1160.89 0h-105.86L667.137 450.887 357.328 0H0l468.492 681.821L0 1226.37h105.866l409.625-476.152 327.181 476.152H1200L714.137 519.284h.026ZM569.165 687.828l-47.468-67.894-377.686-540.24h162.604l304.797 435.991 47.468 67.894 396.2 566.721H892.476L569.165 687.854v-.026Z"/></svg>
              </Link>
            </Button>
            <Button 
              variant="default"
            >
              <Link href={'https://cal.com/emirayaz'} target='_blank'>
                Get Started
              </Link>
            </Button>
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