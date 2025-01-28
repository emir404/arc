'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-6xl sm:text-8xl font-bold text-white mb-4">404</h1>
          <h2 className="text-2xl sm:text-3xl text-white/80 mb-8">Page Not Found</h2>
          <p className="text-white/60 text-lg mb-12">
            The page you're looking for doesn't exist or has been moved.
            <br />
            Let's get you back on track.
          </p>
          
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/"
                className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
            </div>
            
            <div className="text-white/40">
              <p className="text-sm">Quick Links:</p>
              <div className="mt-2 flex flex-wrap gap-4 justify-center">
                <Link href="/projects/lumino" className="hover:text-white transition-colors">
                  Lumino Project
                </Link>
                <Link href="/projects/syntra" className="hover:text-white transition-colors">
                  Syntra Project
                </Link>
                <Link href="/#contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 