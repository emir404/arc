"use client";

import React from 'react'
import gsap from 'gsap'
import { useEffect, useState } from 'react'
// @ts-expect-error
import ReactCurvedText from 'react-curved-text'

function Hero() {

  useEffect(() => {
    // Split text into words
    const text = document.querySelector('.header-text');
    const words = text?.textContent?.split(' ') || [];
    text!.innerHTML = words.map(word => `<span class="word invisible">${word} </span>`).join('');

    // Create timeline for better animation control
    const tl = gsap.timeline({
      defaults: {
        ease: "power3.out",
        lazy: false
      }
    });

    tl.set('.hero-text', {
      opacity: 0,
      autoAlpha: 0
    })
    .to('.hero-text', {
      opacity: 1,
      autoAlpha: 1
    })

    // Animate each word with improved timing
    tl.set('.word', {
      opacity: 0,
      autoAlpha: 0,
      rotateX: -90,
      transformOrigin: "50% 50% -50"
    })
    .to('.word', {
      opacity: 1, 
      autoAlpha: 1,
      rotateX: 0,
      duration: 1.2,
      stagger: 0.15,
      ease: "elastic.out(1, 0.3)",
    });

    // Animate spinner initial appearance only
    tl.fromTo('.spinner', 
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        rotate: 360,
        duration: 1.5,
      },
      "-=1"
    );

    tl.to('.spinner', {
      rotation: 360,
      duration: 8,
      repeat: -1,
        ease: "none"
      },
      "<"
      );


  }, [])

  return (
    <div className='relative flex items-center md:items-end w-full px-4 sm:px-6 md:px-10 min-h-screen'>
      <div className='w-full flex flex-col md:flex-row relative pb-24 hero-text invisible'>
        <h1 className='header-text 
          text-7xl md:text-9xl lg:text-[160px] xl:text-[200px]
          leading-0  text-[#2E2E2E] 
          max-w-[95vw] md:max-w-none 
          tracking-tight
          pt-20 md:pt-0
          '
        >
          Built for Impact. Designed for You.
        </h1>

        <div className='
          hidden 2xl:flex
          absolute 
          bottom-72 right-32
          items-center justify-center 
          scale-100
          origin-top-right
          transition-transform duration-300 ease-out
          hover:scale-110
          z-50'
        >
          <div className='spinner relative flex items-center justify-center'>
            <ReactCurvedText
              width={200}
              height={200}
              cx={100}
              cy={100}
              rx={100}
              ry={100}
              text="We create experiences. "
              textPathProps={{
                style: { 
                  fontSize: '38px',
                  fill: '#0066FF',
                  letterSpacing: '0.25em'
                }
              }}
              svgProps={{
                style: {
                  transform: 'rotate(-90deg)'
                }
              }}
            />
            <div className='absolute w-[110px] h-[110px] bg-[#0066FF] rounded-full 
              transition-transform duration-300 ease-out 
              hover:scale-110' 
            />
          </div>
        </div>
      </div>

    </div>
  )
}

export default Hero