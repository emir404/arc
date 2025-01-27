'use client'

import { Hammer, MoveDown } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { useState, useEffect, useMemo } from 'react'
// @ts-ignore
import ReactCurvedText from 'react-curved-text'

function Hero() {
  const [windowWidth, setWindowWidth] = useState(1024)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    
    handleResize()
    
    const debouncedHandleResize = debounce(handleResize, 250)
    window.addEventListener('resize', debouncedHandleResize)
    
    return () => window.removeEventListener('resize', debouncedHandleResize)
  }, [])

  const { particles, cols, rows } = useMemo(() => {
    if (windowWidth < 640) {
      return { particles: 200, cols: 15, rows: 15 }
    } else if (windowWidth < 1024) {
      return { particles: 300, cols: 20, rows: 15 }
    }
    return { particles: 400, cols: 25, rows: 15 }
  }, [windowWidth])

  const particlePositions = useMemo(() => {
    return Array.from({ length: particles }).map((_, i) => {
      const row = Math.floor(i / cols)
      const col = i % cols
      return {
        left: `${(col / cols) * 100}%`,
        top: `${(row / rows) * 100}%`,
        delay: (row + col) * 0.1
      }
    })
  }, [particles, cols, rows])

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className='relative w-full h-screen bg-[#7300FF] flex flex-col justify-center py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-10'
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
          transition={{ duration: 0.5, delay: 0.1 }}
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
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            shapes the{' '}
          </motion.span>
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className='font-instrument'
          >
            digital world
          </motion.span>
        </motion.h1>
        <div className='relative flex justify-between items-end'>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className='text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl w-full sm:w-3/4 md:w-2/3 lg:w-1/2'
          >
            We don&apos;t just build websites—we create the stage for your brand&apos;s story to shine.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className='absolute lg:-bottom-40 xl:-bottom-64 right-0 w-[400px] h-[400px] hidden lg:flex items-center justify-center'
          >
            {!prefersReducedMotion && (
              <motion.div
                animate={{
                  rotate: 360
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <ReactCurvedText
                  width={400}
                  height={400}
                  cx={200}
                  cy={200}
                  rx={100}
                  ry={100}
                  startOffset={20}
                  reversed={true}
                  text="ARCHITECTS OF DIGITAL DREAMS / ARC CREATIVE"
                  textProps={{ style: { fontSize: 28, fill: '#ffffffaa' } }}
                  tspanProps={null}
                  svgProps={null}
                />
                <Hammer size={96} className='opacity-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' />
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {!prefersReducedMotion && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="absolute inset-0 w-full h-full overflow-hidden"
          role="presentation"
          aria-hidden="true"
        >
          {particlePositions.map((position, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: windowWidth < 640 ? '2px' : '4px',
                height: windowWidth < 640 ? '2px' : '4px',
                left: position.left,
                top: position.top,
                pointerEvents: 'none',
              }}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: position.delay,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
      )}
    </motion.section>
  )
}

// Utility function for debouncing
function debounce(func: Function, wait: number) {
  let timeout: NodeJS.Timeout
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export default Hero