import React, { useEffect } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { Marquee } from '../marquee'
import { Button } from '../button'
import Link from 'next/link'

const MARQUEE_ONE = [
  "/assets/hero/1.png",
  "/assets/hero/2.png",
  "/assets/hero/3.png",
  "/assets/hero/4.png",
  "/assets/hero/5.png",
]

const MARQUEE_TWO = [
  "/assets/hero/6.png",
  "/assets/hero/7.png",
  "/assets/hero/8.png",
  "/assets/hero/9.png",
  "/assets/hero/10.png",
]

function Hero() {
  useEffect(() => {

    const tl = gsap.timeline({})

    // Set initial states
    gsap.set('.hero-heading', { opacity: 0, y: 20, filter: 'blur(5px)' })
    gsap.set('.hero-description', { opacity: 0, y: 20, filter: 'blur(5px)' })
    gsap.set('.hero-buttons', { opacity: 0, y: 20, filter: 'blur(5px)' })
    gsap.set('.hero-testimonial', { opacity: 0, y: 20, filter: 'blur(5px)' })
    gsap.set('.hero-marquee', { opacity: 0, y: 30, filter: 'blur(8px)' })


    gsap.fromTo(".hero-section", {
      visibility:"hidden"
    },
    {
      visibility:"visible"
    }
    )

    // Animate elements
    tl.to('.hero-heading', {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.8,
      ease: 'power3.out'
    })
    .to('.hero-description', {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.6')
    .to('.hero-buttons', {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.6')
    .to('.hero-testimonial',{
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.4')
    .to('.hero-marquee', {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out'
    }, '-=0.6')

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <div className='invisible hero-section flex flex-col gap-8 sm:gap-12 md:gap-16'>
      <div className='px-4 sm:px-12 md:px-36 lg:px-48 xl:px-56 flex flex-col w-full pt-4 sm:pt-8'>
        <div className='flex flex-col gap-9 max-w-3xl'>
          <h1 className='hero-heading font-semibold tracking-[-0.04em] text-5xl text-black/80'>
            Hey! This is Arc. 👋 
          </h1>
          <p className='hero-description text-3xl tracking-[-0.01em] leading-[1.5] text-black/50'>
          Design + Development studio for your next big project.
          </p>
          <p className='hero-description text-3xl tracking-[-0.01em] leading-[1.5] text-black/50'>
          We create seamless experiences that includes web design, product design, branding and development in under one roof.
          </p>
          <div className='flex gap-3 hero-buttons'>
            <Link href={'https://buy.polar.sh/polar_cl_DXTCbLKmdtW8MXkGtqw7BaX2UriQkAumCehTC2jJfBz'} target='_blank'>
              <Button 
                variant="default"
              >
                Get Started
              </Button>
            </Link>
            <Link href={'#pricing'} className='w-max'>
              <Button 
              variant="secondary"
              className='shadow-none text-black/70 bg-none'
              >
                See Pricing
              </Button>
            </Link>
          </div>
          <div className='hero-testimonial relative flex flex-col gap-6 p-6 rounded-lg border border-gray-400 border-dotted mt-4'>
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
                  CEO @ Simstudio.ai
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full flex flex-col hero-marquee'>
        <Marquee className='[--duration:20s] gap-8' pauseOnHover>
          {
            MARQUEE_ONE.map((item, i) => (
              <Image className='aspect-[16:10] object-cover object-left-top w-[30rem] rounded-lg' width={1440} height={1024} src={item} alt={'Image ' + i} key={i}/>
            ))
          }
        </Marquee>
        <Marquee className='[--duration:20s] gap-8' reverse pauseOnHover>
          {
            MARQUEE_TWO.map((item, i) => (
              <Image className='aspect-[16:10] object-cover object-center w-[30rem] rounded-lg' width={1440} height={1024} src={item} alt={'Image ' + i} key={i}/>
            ))
          }
        </Marquee>
        <Link href={"/works"} className='mt-8 w-max mx-auto'>
          <Button className='border-transparent bg-neutral-100/30 text-black/50' variant={"outline"}>
            See all
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default Hero