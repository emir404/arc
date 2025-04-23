import React, { useEffect } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { Hand } from 'lucide-react'
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
    gsap.set('.hero-card', { opacity: 0, y: 30, filter: 'blur(8px)' })

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
    .to('.hero-card', {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out'
    }, '-=0.4')

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <div className='flex flex-col gap-8 sm:gap-12 md:gap-16'>
      <div className='flex flex-col w-full pt-4 sm:pt-8 hero-section'>
        <div className='flex flex-col gap-9'>
          <div className='flex gap-3 items-center'>
            <h1 className='font-semibold tracking-tight text-4xl text-black/80'>
              Hey! We are Arc. 
            </h1>
            <Hand className='w-10 h-10'/>
          </div>
          <p className='text-3xl font-medium tracking-[-0.01em] leading-[1.35] text-black/50'>
          Design + Development studio for your next big project.
          </p>
          <p className='text-3xl font-medium tracking-[-0.01em] leading-[1.35] text-black/50'>
          We create seamless experiences that includes web design, product design, branding and development in under one roof.
          </p>
        </div>
      </div>
      <div className='w-full flex flex-col'>
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
        <Button className='mt-8 w-max mx-auto border-transparent bg-neutral-100/30 text-black/50' variant={"outline"}>
          <Link href={"/works"}>
            See all
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default Hero