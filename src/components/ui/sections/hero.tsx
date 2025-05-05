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
    .to('.hero-icons',{
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
          <h1 className='hero-heading font-semibold max-w-lg leading-[1.2] tracking-[-0.04em] text-6xl text-black/80'>
            Design partnership for busy founders 
          </h1>
          <p className='hero-description max-w-md text-2xl tracking-[-0.01em] leading-[1.5] text-black/50'>
          Design + Development studio for your next big project. 
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