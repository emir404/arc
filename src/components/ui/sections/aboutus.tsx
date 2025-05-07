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
    <div className='invisible about-section flex flex-col gap-4 sm:gap-8 md:gap-12 px-4 sm:px-12 md:px-36 lg:px-48 xl:px-56 py-20'>
      <p className='max-w-3xl about-description text-3xl tracking-[-0.01em] leading-[1.5] text-black/50'>
        We're your ever-ready design partner, scaling with you through growth or downsizing.
      </p>
      <p className='max-w-3xl about-description text-3xl tracking-[-0.01em] leading-[1.7] text-black/50'>
        We previously worked with <span className='mx-1 rounded-xl px-3 py-1 bg-red-500 font-semibold shadow-[inset_0px_-3px_0px_0px_#dc2626] text-red-100'>YC Startups</span> <span className='mx-1 rounded-xl px-3 py-1 bg-blue-500 text-blue-100 font-semibold shadow-[inset_0px_-3px_0px_0px_#005ee6]'>SaaS</span> and <span className='mx-1 rounded-xl px-3 py-1 bg-yellow-500 text-yellow-100 font-semibold shadow-[inset_0px_-3px_0px_0px_#ca8a04]'>AI</span> companies.
      </p>

      <div className='about-description max-w-3xl relative flex flex-col gap-6 p-6 rounded-lg border border-gray-400 border-dotted mt-4'>
          <Image src={"/assets/sticker.png"} alt='Sticker' width={500} height={500} className='absolute w-48 h-48 -bottom-16 -right-16'/>
          <p className='text-xl leading-[1.5] text-gray-600 font-merriweather'>
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

      <p className='max-w-3xl about-description text-3xl tracking-[-0.01em] leading-[1.7] text-black/50'>
        But we are open to work with <span className='mx-1 rounded-xl px-3 py-1 bg-indigo-500  font-semibold shadow-[inset_0px_-3px_0px_0px_#4f46e5] text-indigo-100'>any industry.</span>
      </p>

      <p className='max-w-3xl about-description text-3xl tracking-[-0.01em] leading-[1.5] text-black/50'>
        At Arc, we provide branding, UI/UX design, product design and more based on your needs.
      </p>

      <p className='max-w-3xl about-description text-3xl tracking-[-0.01em] leading-[1.7] text-black/50'>
        We are open to work as your <span className='mx-1 rounded-xl px-3 py-1 bg-teal-500  font-semibold shadow-[inset_0px_-3px_0px_0px_#0d9488] text-teal-100'>design partner</span> for your next big project.
      </p>

      <p className='max-w-3xl about-description text-3xl tracking-[-0.01em] leading-[1.7] text-black/50'>
        We can also work <span className='mx-1 rounded-xl px-3 py-1 bg-pink-500  font-semibold shadow-[inset_0px_-3px_0px_0px_#db2777] text-pink-100'>one-off</span> for your projects.
      </p>

      <p className='max-w-3xl about-description text-3xl tracking-[-0.01em] leading-[1.7] text-black/50'>
        You can always <span className='mx-1 rounded-xl px-3 py-1 bg-rose-500  font-semibold shadow-[inset_0px_-3px_0px_0px_#e11d48] text-rose-100'>pause</span> your subscription and get back to it when you're in need.
      </p>

      <p className='max-w-3xl about-description text-3xl tracking-[-0.01em] leading-[2] text-black/50'>
        <Link href={'https://cal.com/emirayaz'} target='_blank' className='mx-1 rounded-xl px-3 py-1 bg-fuchsia-500 hover:bg-fuchsia-600 transition-all duration-200  font-semibold shadow-[inset_0px_-3px_0px_0px_#c026d3] text-fuchsia-100'>Book a call</Link> or contact us on <Link href={'mailto:hello@witharc.co'} target='_blank' className='mx-1 rounded-xl px-3 py-1 bg-violet-500 hover:bg-violet-600 transition-all duration-200  font-semibold shadow-[inset_0px_-3px_0px_0px_#7c3aed] text-violet-100'>hello@witharc.co</Link>
      </p>
    </div>
  )
}

export default AboutUs