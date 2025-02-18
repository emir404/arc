"use client"

import React, { useEffect } from 'react'
import Link from 'next/link'
import { Marquee } from '../marquee'
import gsap from 'gsap'

function Footer() {
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: 'footer',
        start: 'top bottom-=100',
      }
    })

    gsap.set('.footer-content > *', { opacity: 0, y: 20 })
    
    tl.to('.footer-content > *', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out'
    })

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <footer className="bg-black text-white py-8 md:py-16">
      <div className="w-full mx-auto px-4 sm:px-8 md:px-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-16 gap-4 md:gap-0">
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold">
            Arc Studio
          </h1>

          <p className="text-xl sm:text-2xl md:text-3xl">
            <Link href="mailto:hello@witharc.co" className="hover:text-gray-300 transition-colors">
              hello@witharc.co
            </Link>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-0">
          <div>
            <Link 
              href="/privacy"
              className="text-lg sm:text-xl md:text-2xl text-gray-500 hover:text-gray-300 transition-colors block"
            >
              Privacy Policy
            </Link>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-500 mt-2">
              © Arc 2025
            </p>
          </div>

          <div className="flex flex-col space-y-2 sm:text-right">
            <Link 
              href="https://instagram.com/witharc.co"
              className="text-lg sm:text-xl md:text-2xl text-gray-500 hover:text-gray-300 transition-colors"
            >
              Instagram
            </Link>
            <Link 
              href="https://linkedin.com/witharcstudio"
              className="text-lg sm:text-xl md:text-2xl text-gray-500 hover:text-gray-300 transition-colors"
            >
              LinkedIn
            </Link>
          </div>
        </div>

        <Marquee className='border-t border-gray-800 pt-4 sm:pt-8 mt-4 sm:mt-8'>
          <div className="flex space-x-4">
            <span className="text-gray-500 text-xl md:text-2xl">
              a experience agency. a experience agency. a experience agency. a experience agency. a experience agency. a experience agency. a experience agency. a experience agency. a experience agency.
            </span>
          </div>
        </Marquee>
      </div>
    </footer>
  )
}

export default Footer
