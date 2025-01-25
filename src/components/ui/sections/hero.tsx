'use client'

import { MoveDown } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

function Hero() {
  const [windowWidth, setWindowWidth] = useState(1024) // Default to desktop size

  useEffect(() => {
    // Update window width on mount and resize
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    
    // Set initial width
    handleResize()
    
    // Add resize listener
    window.addEventListener('resize', handleResize)
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const getGridConfig = () => {
    if (windowWidth < 640) {
      return { particles: 400, cols: 20, rows: 20 }
    } else if (windowWidth < 1024) {
      return { particles: 600, cols: 30, rows: 20 }
    }
    return { particles: 800, cols: 40, rows: 20 }
  }

  const { particles, cols, rows } = getGridConfig()

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='relative w-full h-screen bg-[#7300FF] flex flex-col justify-center md:justify-end py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-10'
      style={{
        background: `linear-gradient(to bottom, #7300FF, #4A00A0)`,
      }}
      role="banner"
      aria-label="Hero banner"
    >
      <div className='flex flex-col gap-4 sm:gap-5 md:gap-7 mt-16'>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className='text-white text-5xl font-medium sm:text-6xl md:text-8xl lg:text-9xl leading-[115%]'
        >
          <span className="sr-only">Arc Creative Agency - </span>
          Where imagination{' '}
          {/*<motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className='hidden sm:w-32 md:w-48 lg:w-56 h-10 sm:h-14 md:h-20 lg:h-24 ml-2 sm:ml-3 md:ml-4 bg-[#fff] sm:inline-block rounded-full align-middle'
          />*/}
          <br />
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            shapes the{' '}
          </motion.span>
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.4 }}
            className='font-instrument'
          >
            digital world
          </motion.span>
        </motion.h1>
        <div className='flex justify-between items-end'>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 1.6 }}
            className='text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl w-full sm:w-3/4 md:w-2/3 lg:w-1/2'
          >
            We don&apos;t just build websites—we create the stage for your brand&apos;s story to shine.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.6 }}
            role="presentation"
          >
            <MoveDown 
              className='hidden md:block stroke-1 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 text-white' 
              aria-hidden="true"
            />
          </motion.div>
        </div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute inset-0 w-full h-full overflow-hidden"
        role="presentation"
        aria-hidden="true"
      >
        {Array.from({ length: particles }).map((_, i) => {
          const row = Math.floor(i / cols);
          const col = i % cols;
          return (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: windowWidth < 640 ? '2px' : '4px',
                height: windowWidth < 640 ? '2px' : '4px',
                left: `${(col / cols) * 100}%`,
                top: `${(row / rows) * 100}%`,
                pointerEvents: 'none',
              }}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: (row + col) * 0.1,
                ease: "easeInOut"
              }}
            />
          );
        })}
      </motion.div>
    </motion.section>
  )
}

export default Hero