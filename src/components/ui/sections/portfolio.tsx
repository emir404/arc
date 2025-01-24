'use client'

import { ArrowDownRightIcon } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Marquee } from '../marquee'
import { title } from 'process'
import { i } from 'framer-motion/client'

const BRAND_IMAGES = [
  "/brands/ArtCode.png",
  "/brands/Focusify.png",
  "/brands/Justhink.png",
  "/brands/Sapphireall.png",
  "/brands/Xpertweb.png",
  "/brands/Clutch.png",
]

const PROJECTS = [
  {
    title: "LexPro Partners",
    description: "A Chicago-based law firm needed a modern website and professional branding to attract corporate clients.",
    solution: "Arc designed a sleek website with client success stories and a minimalist brand identity.",
    image: "/projects/lexpro.png",
    link: "/projects/lexpro"
  },

  {
    title: "VisionEdge Architects",
    description: "A Chicago-based law firm needed a modern website and professional branding to attract corporate clients.",
    solution: "Arc created an interactive website and a sophisticated rebrand with geometric visuals.",
    image: "/projects/visionedge.png",
    link: "/projects/visionedge"
  },

  {
    title: "Spotlight Theatre Company",
    description: "A London theatre wanted to attract younger audiences with a more engaging digital presence.",
    solution: "Arc built a vibrant website with online ticketing and crafted bold branding materials.",
    image: "/projects/spotlight.png",
    link: "/projects/spotlight"
  }
]

function Portfolio() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const cardHover = {
    rest: { opacity: 1 },
    hover: { opacity: 0.9, transition: { duration: 0.3 } }
  }

  const arrowHover = {
    rest: { x: 0, y: 0 },
    hover: { x: 5, y: 5, transition: { duration: 0.3 } }
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
        className='flex justify-end w-full'
      >
        <div className='flex gap-4 sm:gap-8 md:gap-12'>
          <motion.h2 
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold'
          >
            Masterpieces in Motion
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.3 }}
            className='text-white/50 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-inter font-[900]'
          >
            02
          </motion.p>
        </div>
      </motion.div>

      <div className='flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-9 w-full'>
        {PROJECTS.map((project, index) => (
          <motion.div
            key={index}
            initial="rest"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.4 + (index * 0.2) }}
            whileHover="hover"
            animate="rest"
            className='flex flex-col gap-4 sm:gap-5 md:gap-6 h-auto lg:h-[32rem] w-full'
          >
            <motion.div 
              variants={cardHover}
              className='rounded-lg bg-card w-full h-48 sm:h-56 md:h-64'
            >
              {/* TODO: Add image */}
              <img src={project.image} alt={project.title} className='w-full h-full object-cover' />
            </motion.div>
            <motion.div 
              variants={fadeInUp}
              className='flex flex-col gap-2'
            >
              <motion.h3 
                variants={fadeInUp}
                className='text-white text-xl sm:text-2xl md:text-3xl font-bold'
              >
                {project.title}
              </motion.h3>
              <motion.p 
                variants={fadeInUp}
                className='text-white/80 text-base sm:text-lg md:text-xl'
              >
                {project.description}
              </motion.p>
              <motion.p 
                variants={fadeInUp}
                className='text-white/80 text-base sm:text-lg md:text-xl'
              >
                {project.solution}
              </motion.p>
            </motion.div>
            <motion.div 
              variants={fadeInUp}
              className='flex justify-between items-end mt-auto'
            >
              <Link href={project.link} className='text-white/80 text-base sm:text-lg md:text-xl underline underline-offset-[6px]'>
                Read their story
              </Link>
              <motion.div variants={arrowHover}>
                <ArrowDownRightIcon className='w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 stroke-1 text-white/80' />
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 w-[300px] bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-[300px] bg-gradient-to-l from-background to-transparent z-10" />
        <Marquee
          className='[--duration:20s] w-full mt-4'
        >
          {BRAND_IMAGES.map((image, index) => (
            <div key={index} className='w-full h-48 sm:h-56 md:h-64 mx-12 grayscale rounded-lg flex items-center justify-center'>
              <img src={image} alt={`Brand ${index + 1}`} width={180} height={180} />
            </div>
          ))}
        </Marquee>
      </div>
    </motion.div>
  )
}

export default Portfolio