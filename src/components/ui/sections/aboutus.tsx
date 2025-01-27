'use client'

import { useRef, useCallback, useEffect } from 'react'
import { motion, useInView, useReducedMotion, Variants, animate } from 'framer-motion'

function AboutUs() {
  const statsRef = useRef(null)
  const isInView = useInView(statsRef, { once: true, margin: "-100px" })
  const prefersReducedMotion = useReducedMotion()

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const statsVariant: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 }
  }

  const Counter = ({ from, to, className }: { from: number, to: number, className: string }) => {
    const nodeRef = useRef<HTMLParagraphElement>(null)
    
    const animateCount = useCallback(() => {
      if (!prefersReducedMotion) {
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
      } else {
        const node = nodeRef.current
        if (node) {
          node.textContent = `${to}+`
        }
      }
    }, [from, to, prefersReducedMotion])

    useEffect(() => {
      if (isInView) {
        animateCount()
      }
    }, [isInView, animateCount])

    return <p ref={nodeRef} className={className}>{from}+</p>
  }

  const stats = [
    { number: 20, label: 'happy clients' },
    { number: 3, label: 'countries' },
    { number: 50, label: 'projects' },
    { number: 3, label: 'years of experience' }
  ]

  return (
    <motion.section 
      id="about"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className='w-full min-h-screen py-24 px-6 sm:px-8 md:px-12 lg:px-16'
    >
      <div className="max-w-[2000px] mx-auto">
        <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-8">
          <motion.h2 
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white"
          >
            Architects of<br />Digital Dreams
          </motion.h2>
          <motion.span 
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-white/40 font-mono"
          >
            01
          </motion.span>
        </div>

        <motion.p 
          variants={fadeInUp}
          transition={{ duration: 0.6, delay: 0.2 }}
          className='text-white/80 text-lg sm:text-xl md:text-2xl max-w-2xl mb-24'
        >
          We don&apos;t just design websites; we craft products experiences that captivate, inspire, and transform.
        </motion.p>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24'>
          <motion.div 
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.3 }}
            className='relative'
          >
            <div className='bg-card/80 p-8 rounded-lg border border-white/5'>
              <h3 className='text-2xl sm:text-3xl font-bold text-white mb-6'>Our Story</h3>
              <div className='space-y-6 text-white/70 text-lg sm:text-xl'>
                <p>
                  At Arc, we believe every brand has a story waiting to be told. Founded with a passion for creativity and a commitment to excellence, we specialize in crafting digital spaces where businesses thrive. Our mission is simple: to bridge the gap between imagination and functionality, creating designs that are as impactful as they are beautiful.
                </p>
                <p>
                  From cutting-edge web design to strategic SEO solutions, we&apos;re here to elevate your brand and bring your vision to life. Whether you&apos;re a growing startup or an established business, we tailor every project to meet your unique needs, ensuring that your digital presence stands out in a crowded world.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            ref={statsRef}
            className='grid grid-cols-2 gap-8'
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                variants={statsVariant}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
                className='relative'
              >
                <div className='bg-card/80 p-6 rounded-lg border border-white/5 h-full flex flex-col justify-center items-center text-center'>
                  <Counter
                    from={0}
                    to={stat.number}
                    className='text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-2'
                  />
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 0.7 } : { opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + (index * 0.1) }}
                    className='text-white/70 text-lg sm:text-xl capitalize'
                  >
                    {stat.label}
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

export default AboutUs