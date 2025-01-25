'use client'

import { MoveDown } from 'lucide-react'
import { motion } from 'framer-motion'

function Hero() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='relative rounded-b-3xl w-full h-screen bg-[#7300FF] flex flex-col justify-center md:justify-end py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-10'
    >
        <div className='flex flex-col gap-4 sm:gap-5 md:gap-7'>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className='text-white text-5xl font-medium sm:text-6xl md:text-8xl lg:text-9xl leading-[115%]'
          >
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
            >
              <MoveDown className='hidden md:block stroke-1 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 text-white' />
            </motion.div>
          </div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute inset-0 w-full h-full overflow-hidden" 
        >
          {Array.from({ length: window.innerWidth < 640 ? 400 : window.innerWidth < 1024 ? 600 : 800 }).map((_, i) => {
            const cols = window.innerWidth < 640 ? 20 : window.innerWidth < 1024 ? 30 : 40;
            const rows = window.innerWidth < 640 ? 20 : window.innerWidth < 1024 ? 20 : 20;
            const row = Math.floor(i / cols);
            const col = i % cols;
            return (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  width: window.innerWidth < 640 ? '2px' : '4px',
                  height: window.innerWidth < 640 ? '2px' : '4px',
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
    </motion.div>
  )
}

export default Hero