'use client'

import { motion } from 'framer-motion'
import { Github, Instagram, Linkedin, Twitter } from 'lucide-react'
import Link from 'next/link'

function Footer() {
  const socialLinks = [
    { icon: <Github className="w-5 h-5" />, href: 'https://github.com' },
    { icon: <Twitter className="w-5 h-5" />, href: 'https://twitter.com' },
    { icon: <Instagram className="w-5 h-5" />, href: 'https://instagram.com' },
    { icon: <Linkedin className="w-5 h-5" />, href: 'https://linkedin.com' }
  ]

  return (
    <motion.footer 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full py-8 px-4 sm:px-6 md:px-8 lg:px-10 bg-black/10 backdrop-blur-lg"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.6 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-white/60 text-sm"
        >
          © 2024 Arc Agency. All rights reserved.
        </motion.p>
        
        <div className="flex items-center gap-6">
          {socialLinks.map((social, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -2 }}
            >
              <Link 
                href={social.href}
                className="text-white/60 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.icon}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer 