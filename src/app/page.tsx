'use client'

import Header from '@/components/ui/header'
import AboutUs from '@/components/ui/sections/aboutus'
import Contact from '@/components/ui/sections/contact'
import Hero from '@/components/ui/sections/hero'
import Portfolio from '@/components/ui/sections/portfolio'
import Footer from '@/components/ui/footer'
import { motion } from 'framer-motion'

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

function Home() {
  return (
    <div className='relative w-full min-h-screen flex flex-col'>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Header />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Hero />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
        transition={{ duration: 0.6, delay: 0.2 }}
        id="about"
      >
        <AboutUs />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
        transition={{ duration: 0.6, delay: 0.3 }}
        id="portfolio"
      >
        <Portfolio />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
        transition={{ duration: 0.6, delay: 0.4 }}
        id="contact"
      >
        <Contact />
      </motion.div>

      <Footer />
    </div>
  )
}

export default Home