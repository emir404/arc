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
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  const menuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  }

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      y: -10,
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
      className='w-full h-16 sm:h-20 md:h-24 lg:h-28 absolute top-0 left-0 z-50'
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
                  'bg-[#fff] flex text-black px-4 py-2 hover:bg-white/90 transition-colors' : 
                  'text-white hover:text-white/80 transition-colors'}
              >
                <p>{item.text}</p>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.button 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className='md:hidden text-white p-2 flex items-center justify-center'
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence mode='wait'>
            <motion.div
              key={isMenuOpen ? 'close' : 'menu'}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
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
            className='absolute top-full left-0 w-full min-h-[100vh] bg-gradient-to-b from-[#7300FF] to-[#5900CC] md:hidden'
          >
            <motion.div 
              variants={mobileMenuVariants}
              className='flex flex-col items-start px-8 py-12 gap-12 font-overused'
            >
              <motion.div 
                variants={menuItemVariants}
                className='w-full h-[1px] bg-white/10'
              />
              
              {[
                { href: '#about', text: 'About us' },
                { href: '#portfolio', text: 'Portfolio' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={menuItemVariants}
                  className='w-full'
                >
                  <Link 
                    href={item.href}
                    onClick={(e) => handleScroll(e, item.href.substring(1))}
                    className='group w-full flex justify-between items-center text-white/90 hover:text-white transition-all'
                  >
                    <p className='text-3xl font-medium'>{item.text}</p>
                    <motion.span 
                      initial={{ x: -10, opacity: 0 }}
                      whileHover={{ x: 0, opacity: 1 }}
                      className='transform transition-all'
                    >
                      →
                    </motion.span>
                  </Link>
                </motion.div>
              ))}
              
              <motion.div 
                variants={menuItemVariants}
                className='w-full h-[1px] bg-white/10'
              />
              
              <motion.div variants={menuItemVariants} className='w-full'>
                <Link 
                  href='#contact'
                  onClick={(e) => handleScroll(e, 'contact')}
                  className='w-full bg-white text-[#7300FF] p-6 rounded-xl text-center hover:bg-white/90 transition-all block'
                >
                  <p className='text-xl font-medium'>Book a free call</p>
                </Link>
              </motion.div>
              
              <motion.div 
                variants={menuItemVariants}
                className='flex flex-col gap-4 text-white/50 text-sm mt-auto'
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