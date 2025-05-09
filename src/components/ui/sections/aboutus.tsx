import React, { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import Link from 'next/link'
import Image from 'next/image'

function AboutUs() {
  useEffect(() => {

    gsap.registerPlugin(ScrollTrigger)

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.about-section',
        start: 'top 75%',
        end: 'bottom 25%',
        toggleActions: 'play none none none',
      }
    })

    // Set initial states
    gsap.set('.about-heading', { opacity: 0, y: 20, filter: 'blur(5px)' })
    gsap.set('.about-description', { opacity: 0, y: 20, filter: 'blur(5px)' })


    gsap.fromTo(".about-section", {
      visibility:"hidden"
    },
    {
      visibility:"visible"
    }
    )

    // Animate elements
    tl.to('.about-heading', {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.8,
      ease: 'power3.out'
    })
    .to('.about-description', {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.6')

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <div className='invisible about-section flex flex-col gap-4 sm:gap-8 md:gap-12 px-4 sm:px-12 md:px-36 lg:px-48 xl:px-56 py-20 items-center'>
      <p className='text-xl font-medium text-black/70 max-w-lg text-center'>
        The world is changing, so does <span className='font-semibold italic'>design.</span>
        <br/>
        <br/>
        At Arc, we believe design isn’t a product.
        <br/>
        It’s an experience. A feeling. A connection.
        <br/>
        <br/>
        We bring expertise, creativity, and an experience you can't forget to the table. 
        <br/>
        <br/>
        Every brand we work with is treated like the only one.
        <br/>
        We listen, we think, we challenge, we collaborate.
        <br/>
        Because great design doesn’t start in Figma—it starts with why.
        <br/>
        <br/>
        No sales team, no contracts, no boring meetings.
        <br/>
        <br/>
        Just real people, creating magic for you.
      </p>

      <Image src={"/assets/signature.png"} width={80} height={80} alt='Emir Signature'/>

      <div className='about-description max-w-xl relative flex flex-col items-center gap-6 p-6 rounded-2xl border border-gray-400 border-dashed mt-4'>
          <p className='text-xl leading-[1.5] text-gray-600 text-center'>
            Emir is a super talented designer that has a great eye for products, and the technical expertise to build it for you. 10/10 experience working with him!
          </p>
          <div className='flex gap-5 items-center'>
            <Image src={"/assets/avatars/1.jpeg"} alt='Emir Karabeg Profile Picture' width={64} height={64} className='w-16 h-16 rounded-full'/>

            <div className='flex flex-col gap-0 text-gray-600'>
              <p className='text-xl font-semibold'>
                Emir Karabeg
              </p>
              <p className='text-base font-medium text-gray-500/80'>
                CEO @ Simstudio.ai, YC X25
              </p>
            </div>
          </div>
      </div>

    </div>
  )
}

export default AboutUs