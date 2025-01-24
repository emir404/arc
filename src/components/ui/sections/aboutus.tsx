'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect } from 'react'
import { animate } from 'framer-motion'

function AboutUs() {
  const statsRef = useRef(null)
  const isInView = useInView(statsRef, { once: true })

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const statsVariant = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  }

  const Counter = ({ from, to, className }: { from: number, to: number, className: string }) => {
    const nodeRef = useRef<HTMLParagraphElement>(null)
    
    const animateCount = () => {
      const node = nodeRef.current
      if (node) {
        const controls = animate(from, to, {
          duration: 2,
          onUpdate(value) {
            node.textContent = `${Math.round(value)}+`
          },
          ease: "easeOut"
        })
        return controls.stop
      }
    }

    useEffect(() => {
      if (isInView) {
        animateCount()
      }
    }, [isInView])

    return <p ref={nodeRef} className={className}>{from}+</p>
  }

  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className='w-full p-10 sm:p-12 md:p-16 lg:p-20 gap-6 sm:gap-8 md:gap-12 flex flex-col'
    >
      <motion.div 
        variants={fadeInUp}
        transition={{ duration: 0.6 }}
        className='flex flex-col gap-3 sm:gap-4 md:gap-5'
      >
        <div className='flex gap-4 sm:gap-8 md:gap-12'>
          <motion.p 
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='text-white/50 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-inter font-[900]'
          >
            01
          </motion.p>
          <motion.h2 
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.3 }}
            className='text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold'
          >
            Architects of Digital Dreams
          </motion.h2>
        </div>
        <motion.p 
          variants={fadeInUp}
          transition={{ duration: 0.6, delay: 0.4 }}
          className='text-white text-lg sm:text-xl md:text-2xl'
        >
          We don&apos;t just design websites; we craft products experiences that captivate, inspire, and transform.
        </motion.p>
      </motion.div>

      <div className='flex flex-col lg:flex-row gap-8 sm:gap-10 md:gap-12'>
        <motion.div 
          variants={fadeInUp}
          transition={{ duration: 0.6, delay: 0.5 }}
          className='flex flex-col gap-4 bg-card p-4 sm:p-5 md:p-6 rounded-lg w-full lg:max-w-[28rem]'
        >
          <motion.p 
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.6 }}
            className='text-white text-xl sm:text-2xl font-bold'
          >
            Our Story
          </motion.p>
          <motion.p 
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.7 }}
            className='text-white/50 text-lg sm:text-xl md:text-2xl'
          >
            At Arc, we believe every brand has a story waiting to be told. Founded with a passion for creativity and a commitment to excellence, we specialize in crafting digital spaces where businesses thrive. Our mission is simple: to bridge the gap between imagination and functionality, creating designs that are as impactful as they are beautiful.
            <br />
            <br />
            From cutting-edge web design to strategic SEO solutions, we&apos;re here to elevate your brand and bring your vision to life. Whether you&apos;re a growing startup or an established business, we tailor every project to meet your unique needs, ensuring that your digital presence stands out in a crowded world.
          </motion.p>
        </motion.div>

        <motion.div 
          ref={statsRef}
          className='flex w-full justify-center items-center'
        >
          <div className='grid grid-cols-2 grid-rows-2 gap-8 sm:gap-12 md:gap-16 lg:gap-24'>
            {[
              { number: 20, label: 'happy clients' },
              { number: 3, label: 'countries' },
              { number: 50, label: 'projects' },
              { number: 3, label: 'years of experience' }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                variants={statsVariant}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ duration: 0.5, delay: 0.8 + (index * 0.1) }}
                className='flex flex-col'
              >
                <Counter
                  from={0}
                  to={stat.number}
                  className='text-white text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold'
                />
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 0.6 } : { opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 + (index * 0.1) }}
                  className='text-white/60 text-lg sm:text-xl md:text-2xl lg:text-3xl'
                >
                  {stat.label}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default AboutUs