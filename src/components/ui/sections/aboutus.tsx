"use client"

import React, { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function AboutUs() {
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.about-section',
        start: 'top center+=100',
        end: 'bottom center',
      }
    })

    gsap.set('.stat-card', { opacity: 0, y: 50 })
    gsap.set('.about-text', { opacity: 0, y: 30 })

    tl.to('.about-text', {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out'
    })
    .to('.stat-card', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out'
    }, '-=0.5')

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <div className="min-h-screen bg-black text-white px-4 md:px-20 py-24 md:py-48 about-section">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 md:mb-24 about-text">
          <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center leading-tight">
          We collaborate with visionary brands to create high-impact digital experiences, 
          {' '}<span className="text-[#666666]">seamlessly merging development, design, and innovation to deliver results with precision and creativity.</span>
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <StatCard
            number="200+"
            text="Custom web experiences designed with precision and creativity."
            className="col-span-1 sm:col-span-2"
            icon="grid"
          />
          <StatCard
            number="10+"
            text="Industries served, from startups to global brands."
            className="col-span-1 sm:col-span-2"
            icon="building"
          />
          <StatCard
            number="99%"
            text="Bespoke solutions—no templates, just tailored innovation."
            className="col-span-1 sm:col-span-2 lg:col-span-3"
            icon="check"
          />
          <StatCard
            number="2025"
            text="founded to redefine digital experiences."
            className="col-span-1"
            icon="calendar"
          />
        </div>
      </div>
    </div>
  )
}

interface StatCardProps {
  number: string
  text: string
  className?: string
  icon: "grid" | "building" | "check" | "calendar"
}

function StatCard({ number, text, className, icon }: StatCardProps) {
  return (
    <div className={`bg-[#666666] text-black p-6 sm:p-8 md:p-12 flex flex-col justify-center rounded-2xl ${className}`}>
      <div className="relative flex justify-between items-start">
        <span className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-medium block mb-2">{number}</span>
        <div className="w-8 h-8 absolute top-0 right-0">
          {icon === "grid" && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z"/></svg>}
          {icon === "building" && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 21h18M9 8h1m-1 4h1m-1 4h1m5-8h1m-1 4h1m-1 4h1M5 21V5l7-3v19m7-19v19"/></svg>}
          {icon === "check" && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>}
          {icon === "calendar" && <></>}
        </div>
      </div>
      <p className="text-lg sm:text-xl md:text-2xl leading-snug">{text}</p>
    </div>
  )
}

export default AboutUs
