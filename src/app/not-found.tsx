"use client";

import React, { useEffect } from 'react'
import gsap from 'gsap'
import Link from 'next/link'
import { Button } from '@/components/ui/button';

export default function NotFound() {
  useEffect(() => {
    gsap.from('.not-found-content', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: "power2.out"
    });
  }, [])

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="not-found-content flex flex-col items-center gap-8">
        <h1 className="text-8xl font-semibold text-[#2E2E2E]">
          404
        </h1>
        <Button size={'lg'}>
          <Link href={'/'}>
            Return Home
          </Link>
        </Button>
      </div>
    </div>
  )
}
