"use client"

import React from 'react'
import { X } from 'lucide-react'
import Link from 'next/link'
import { Button } from './button'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <div 
      className={`fixed inset-0 bg-white z-50 transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className='flex flex-col h-full p-8'>
        <div className='flex justify-end'>
          <button onClick={onClose} className='p-2'>
            <X className='w-8 h-8' />
          </button>
        </div>
        <div className='flex flex-col items-center justify-center flex-1 gap-8'>
          <Link href={"https://cal.com/emirayaz"}>
              <Button
                variant={"ghost"}
              >
                Book a call
              </Button>
            </Link>
          <Button 
            className='text-2xl p-6 w-full max-w-xs'
            onClick={onClose}
          >
            <Link 
            href='https://buy.polar.sh/polar_cl_DXTCbLKmdtW8MXkGtqw7BaX2UriQkAumCehTC2jJfBz' 
            className='text-4xl text-black hover:text-gray-600 transition-colors'
            onClick={onClose}
          >
            Get Started
          </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default MobileMenu 