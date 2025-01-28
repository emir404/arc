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
            className='fixed inset-0 top-[64px] sm:top-[80px] md:hidden bg-[#0A0F17]/95 backdrop-blur-xl border-t border-white/5 z-[49]'
          >
            <motion.div 
              variants={mobileMenuVariants}
              className='relative h-[calc(100vh-64px)] sm:h-[calc(100vh-80px)] px-6 py-12 overflow-hidden'
            >
              {/* Background gradient effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F17] via-[#0A0F17]/95 to-[#0A0F17] pointer-events-none" />
              
              {/* Animated background circles */}
              <motion.div 
                className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-blue-400/[0.02] blur-3xl pointer-events-none"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.15, 0.1],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div 
                className="absolute -left-24 bottom-24 w-72 h-72 rounded-full bg-indigo-400/[0.02] blur-3xl pointer-events-none"
                animate={{
                  scale: [1.2, 1, 1.2],
                  opacity: [0.15, 0.1, 0.15],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              <div className='relative space-y-8 z-10'>
                {[
                  { href: '#about', text: 'About us' },
                  { href: '#portfolio', text: 'Portfolio' },
                  { href: '#contact', text: 'Contact', isButton: true }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 }
                    }}
                    className='group'
                  >
                    <Link 
                      href={item.href}
                      onClick={(e) => handleScroll(e, item.href.substring(1))}
                      className={`
                        flex items-center justify-between
                        ${item.isButton 
                          ? 'text-4xl sm:text-5xl font-medium text-white' 
                          : 'text-3xl sm:text-4xl text-white/70'
                        }
                        transition-all duration-300 hover:text-white
                      `}
                    >
                      <motion.span 
                        className='relative inline-block'
                        whileHover={{ x: 10 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {item.text}
                        <span className='absolute -bottom-1 left-0 w-0 h-[2px] bg-white group-hover:w-full transition-all duration-300 ease-out' />
                      </motion.span>
                      <motion.div
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className='transform group-hover:translate-x-2 transition-transform duration-300'
                        >
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className='absolute bottom-0 left-0 right-0 p-6 space-y-6'
              >
                <div className='h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent' />
                <div className='flex justify-between items-center'>
                  <div className='space-y-2'>
                    <p className='text-white/40 font-instrument text-lg'>© 2025 Arc Studio</p>
                    <p className='text-white/40 font-instrument text-lg'>Beşiktaş, İstanbul</p>
                  </div>
                  <motion.div
                    whileHover={{ rotate: 90 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className='text-white/40'
                    >
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                    </svg>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default Header