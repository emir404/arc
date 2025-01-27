"use client"

import React, { useState } from 'react'
import Logo from '@/components/ui/logo'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    const header = document.querySelector('header')
    const headerHeight = header?.getBoundingClientRect().height || 0
    
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      const offsetPosition = elementPosition - headerHeight - 32

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
      setIsMenuOpen(false)
    }
  }

  const menuItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const mobileMenuVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2
      }
    }
  }

  return ( 
    <motion.div 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='w-full h-16 sm:h-20 md:h-24 lg:h-28 fixed top-0 left-0 z-50 backdrop-blur-sm border-b border-white/5'
    >
      <div className='w-full h-full flex justify-between items-center px-4 sm:px-6 md:px-8 lg:px-10'>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Logo className='w-16 sm:w-20 md:w-24'/>
        </motion.div>
        
        {/* Desktop Menu */}
        <div className='hidden md:flex gap-6 lg:gap-9 items-center font-overused text-lg lg:text-2xl'>
          {[
            { href: '#about', text: 'About us' },
            { href: '#portfolio', text: 'Portfolio' },
            { href: '#contact', text: 'Book a free call', isButton: true }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
              whileHover={{ y: -2 }}
            >
              <Link 
                href={item.href}
                onClick={(e) => handleScroll(e, item.href.substring(1))}
                className={item.isButton ? 
                  'bg-white text-black px-6 py-2 hover:bg-white/90 transition-colors' : 
                  'text-white hover:text-white/80 transition-colors'}
              >
                {item.text}
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.button 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className='md:hidden text-white p-2'
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <AnimatePresence mode='wait'>
            <motion.div
              key={isMenuOpen ? 'close' : 'menu'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {isMenuOpen ? (
                <X className='w-6 h-6' />
              ) : (
                <Menu className='w-6 h-6' />
              )}
            </motion.div>
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
            className='fixed inset-0 top-[64px] sm:top-[80px] bg-black/95 backdrop-blur-md md:hidden'
          >
            <motion.div 
              variants={mobileMenuVariants}
              className='flex flex-col justify-center min-h-[calc(100vh-64px)] sm:min-h-[calc(100vh-80px)] px-8'
            >
              <div className='space-y-12'>
                {[
                  { href: '#about', text: 'About us' },
                  { href: '#portfolio', text: 'Portfolio' },
                  { href: '#contact', text: 'Contact', isButton: true }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={menuItemVariants}
                    className='overflow-hidden'
                  >
                    <Link 
                      href={item.href}
                      onClick={(e) => handleScroll(e, item.href.substring(1))}
                      className={
                        item.isButton 
                          ? 'block text-5xl sm:text-6xl font-medium text-white hover:text-white/80 transition-colors' 
                          : 'block text-4xl sm:text-5xl text-white/60 hover:text-white transition-colors'
                      }
                    >
                      {item.text}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <motion.div 
                variants={menuItemVariants}
                className='mt-auto pt-12 pb-8 text-white/40 text-sm space-y-2'
              >
                <p>© 2024 Arc Agency</p>
                <p>San Francisco, CA</p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default Header