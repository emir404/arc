'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

const PROJECTS = [
  {
    title: "Lumino Agency",
    description: "A creative agency specializing in branding and strategy needed a website that showcased their expertise and creative vision.",
    solution: "Arc designed an engaging website that brought their strategic and creative capabilities to life.",
    image: "/projects/lumino.jpg",
    year: "2023",
    category: "Branding",
    link: "/projects/lumino",
  },
]

function ProjectItem({ 
  project, 
  index, 
  containerRef,
  isExpanded 
}: { 
  project: typeof PROJECTS[0]
  index: number
  containerRef: React.RefObject<HTMLDivElement>
  isExpanded: boolean
}) {
  const projectRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (projectRef.current) {
      setHeight(projectRef.current.scrollHeight)
    }
  }, [])

  return (
    <Link 
      href={project.link}
      className="block relative"
    >
      <motion.div 
        animate={{ 
          height: isExpanded ? height : 100,
          opacity: isExpanded ? 1 : 0.5
        }}
        transition={{ 
          height: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          opacity: { duration: 0.3 }
        }}
        className="relative border-t border-white/10 overflow-hidden"
      >
        <div ref={projectRef} className="py-8 grid grid-cols-12 items-start">
          <div className="col-span-12 md:col-span-4 mb-6 md:mb-0">
            <motion.h3 
              animate={{ 
                opacity: isExpanded ? 1 : 0.7
              }}
              transition={{ duration: 0.4 }}
              className="text-2xl sm:text-3xl font-medium text-white"
            >
              {project.title}
            </motion.h3>
            <motion.div
              animate={{ opacity: isExpanded ? 1 : 0.5 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-white/60 mt-2">{project.category}</p>
              <p className="text-white/60">{project.year}</p>
            </motion.div>
          </div>
          
          <motion.div 
            className="col-span-12 md:col-span-8 relative"
            animate={{ opacity: isExpanded ? 1 : 0 }}
            transition={{ duration: 0.4, delay: isExpanded ? 0.2 : 0 }}
          >
            <div className="aspect-[16/9] relative rounded-lg overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 66vw"
                quality={90}
              />
            </div>
            <div className="mt-6 space-y-4">
              <p className="text-white/80 text-lg leading-relaxed">
                {project.description}
              </p>
              <p className="text-white/60 text-lg leading-relaxed">
                {project.solution}
              </p>
            </div>
            <div className="mt-8 flex justify-end">
              <motion.div
                whileHover={{ x: 5, y: 5 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowUpRight className="w-6 h-6 text-white" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </Link>
  )
}

function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [expandedIndex, setExpandedIndex] = useState(0)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (containerRef.current) {
        const container = containerRef.current
        const containerHeight = container.scrollHeight - window.innerHeight
        const scrollPosition = latest * containerHeight
        
        // Each project takes up roughly equal space
        const projectHeight = containerHeight / PROJECTS.length
        const newIndex = Math.floor(scrollPosition / projectHeight)
        
        if (newIndex !== expandedIndex && newIndex >= 0 && newIndex < PROJECTS.length) {
          setExpandedIndex(newIndex)
        }
      }
    })

    return () => unsubscribe()
  }, [scrollYProgress, expandedIndex])

  return (
    <section 
      ref={containerRef} 
      id="portfolio" 
      className="w-full min-h-screen py-24 px-6 sm:px-8 md:px-12 lg:px-16"
    >
      <div className="max-w-[2000px] mx-auto">
        <div className="flex items-end justify-between mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white">
            Latest<br />Works
          </h2>
          <span className="text-white/50 font-mono">02</span>
        </div>

        <div className="space-y-1">
          {PROJECTS.map((project, index) => (
            <ProjectItem
              key={project.title}
              project={project}
              index={index}
              containerRef={containerRef}
              isExpanded={index === expandedIndex}
            />
          ))}
          <div className="border-t border-white/10" />
        </div>
      </div>
    </section>
  )
}

export default Portfolio