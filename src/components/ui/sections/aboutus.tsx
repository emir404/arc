import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function AboutUs() {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)
  const highlightRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const container = containerRef.current 
    const text = textRef.current

    // Split text into words but exclude the highlighted word
    if (text) {
      const textContent = text.textContent || ''
      const beforeHighlight = textContent.split('meaningful')[0]
      const afterHighlight = textContent.split('meaningful')[1]
      
      const processText = (text: string) => {
        return text.trim().split(' ').map((word: string) => {
          return `<span class="word-wrap">${word} </span>`
        }).join('')
      }

      text.innerHTML = `${processText(beforeHighlight)}<span ref={highlightRef} class='text-black bg-[#FFD700] px-4 inline-block highlight-word'>meaningful</span>${processText(afterHighlight)}`
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 60%",
        end: "bottom center",
        toggleActions: "play none none none",
        once: true
      }
    })

    // Initial states
    gsap.set(".word-wrap", {
      opacity: 0,
      y: 30
    })
    gsap.set(".highlight-word", {
      opacity: 0,
      scale: 0.5,
      rotation: -15,
      transformOrigin: "center center"
    })

    // Animate words sequentially
    tl.to(".word-wrap", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.05,
      ease: "power3.out"
    })

    // Creative animation for highlight word
    .fromTo(".highlight-word",
      {
        opacity: 0,
        scale: 0.5,
        rotation: -15,
        y: 30,
        x: -20
      },
      {
        opacity: 1,
        scale: 1,
        rotation: -5,
        y: 0,
        x: 0,
        duration: 1.2,
        ease: "elastic.out(1, 0.3)",
        immediateRender: false
      },
      "-=0.7"
    )

    .to(".highlight-word", {
      boxShadow: "0 0 30px rgba(255, 215, 0, 0.6)",
      duration: 0.8,
      yoyo: true,
      repeat: 1
    })

    // Cleanup
    return () => {
      tl.kill()
    }
  }, [])

  return (
    <div 
      ref={containerRef} 
      className='bg-[#0066FF] flex justify-center items-center py-48 md:py-80 w-full text-white overflow-hidden px-4 md:px-0'
    >
      <p 
        ref={textRef} 
        className='text-left w-full md:w-2/3 text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight'
      >
        We are a versatile team leveraging design as a universal tool to elevate brands and drive{' '}
        <span 
          ref={highlightRef}
          className='text-black bg-[#FFD700] px-2 md:px-4 inline-block highlight-word'
        >
          meaningful
        </span>
        {' '}change.
      </p>
    </div>
  )
}

export default AboutUs