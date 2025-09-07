'use client'

import { Marquee } from '@/components/magicui/marquee'
import { Button } from '@/components/ui/button'
import Logo from '@/components/ui/logo'
import Image from 'next/image'
import React from 'react'

const IMAGE_LINKS_TABLE_1 = [
  "https://494510hkri.ufs.sh/f/3d9AyaVNUM8w36URyDVNUM8wsF1VBZOHcvIdTi9DhgQ7Rpmu",
  "https://494510hkri.ufs.sh/f/3d9AyaVNUM8wOqI2ETkCmxdvfqiDUQANc63RleuKp0a1ygHt",
  "https://494510hkri.ufs.sh/f/3d9AyaVNUM8wjs0J4Sj2liYDLCwz1dkyTG0eoFMBrvbUqSZI",
  "https://494510hkri.ufs.sh/f/3d9AyaVNUM8wvi2zETQzr6o3qQ0XHuiJjTO9KPEfdgxUynIW",
  "https://494510hkri.ufs.sh/f/3d9AyaVNUM8wGDjxYdTURyKDoa2EILBAk1TXCdzcYgemjFSf",
  "https://494510hkri.ufs.sh/f/3d9AyaVNUM8w3rPSdLVNUM8wsF1VBZOHcvIdTi9DhgQ7Rpmu",
  "https://494510hkri.ufs.sh/f/3d9AyaVNUM8wtwPP3xMYZjvNFCAUWr1ncwPQR7T4hm8pI5kV",
]

const IMAGE_LINKS_TABLE_2 = [
  "https://494510hkri.ufs.sh/f/3d9AyaVNUM8wMUW57vopSFDV0swukhOE7I6jqTUixzNdZ3CP",
  "https://494510hkri.ufs.sh/f/3d9AyaVNUM8wmo2TwcaI0TuRiKvWN36gjOJDhEzkplXCmeAY",
  "https://494510hkri.ufs.sh/f/3d9AyaVNUM8wEwPxiMqhFvnVqJMwHyLro5RN9sWceEY6Dgpl",
  "https://494510hkri.ufs.sh/f/3d9AyaVNUM8wHQzwRsIyKkDSOZiG1hIAbQ39vtTzYqmW5UfC",
  "https://494510hkri.ufs.sh/f/3d9AyaVNUM8wCLBrHN02g0NPOiTH8EVzMJdeZDkqQ5hlp9uf",
  "https://494510hkri.ufs.sh/f/3d9AyaVNUM8wwrR6pSybJe8R9xiXtAMghY0op6WKcvIlBTHQ",
  "https://494510hkri.ufs.sh/f/3d9AyaVNUM8wrx0Z3MnFtc80pzOYxZ3yevLma4hXGJluCH9i",
]

function Home() {
  return (
    <div className="flex flex-col gap-6">
      <div className="px-4 py-8 sm:p-6 md:p-8 lg:p-12 xl:p-16 flex flex-col gap-12 md:gap-16 border-border border-b">
        <div className="flex flex-col gap-10 md:gap-12">
          <div className="flex flex-col gap-12 md:gap-20 items-start">
            <Logo className="h-8 lg:h-12 xl:h-16" fill="black" />
            <div className="flex flex-col gap-4 sm:gap-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-[1] tracking-[-0.04em] max-w-xs sm:max-w-md md:max-w-lg">
                Design partner for busy founders
              </h1>
              <p className="text-base sm:text-lg md:text-xl leading-[1.6] sm:leading-[1.5] text-muted-foreground max-w-xs sm:max-w-md md:max-w-lg">
                Arc provides world-class branding, product design work to busy founders who want to move fast without headaches.
              </p>
            </div>
          </div>
          <div className="w-full flex items-stretch sm:items-center gap-3 sm:gap-4">
            <Button className="sm:w-auto cursor-pointer"
            onClick={() => {
              window.open('https://cal.com/emirayaz', '_blank')
            }}
            >
              Book a call
            </Button>
            <Button variant="outline" className="sm:w-auto cursor-pointer"
            onClick={() => {
              window.open('https://t.me/@emirthedev', '_blank')
            }}
            >
              Send a message
            </Button>
          </div>
        </div>
      </div>
      <div className='py-8 lg:py-12 xl:py-16 flex flex-col gap-8 border-border border-t border-b'>
        <Marquee>
          {IMAGE_LINKS_TABLE_1.map((link, index) => (
            <Image key={index} src={link} alt="Image" width={1440} height={1024} className='w-96 h-auto border border-border'/>
          ))}
        </Marquee>
        <Marquee reverse={true}>
          {IMAGE_LINKS_TABLE_2.map((link, index) => (
            <Image key={index} src={link} alt="Image" width={1440} height={1024} className='w-96 h-auto border border-border'/>
          ))}
        </Marquee>
      </div>
      <div className='px-4 py-8 sm:p-6 md:p-8 lg:p-12 xl:p-16 flex flex-col gap-12 md:gap-16 border-border border-b border-t'>

          <p className='text-2xl leading-[1.5] max-w-lg text-[#202020]'>
          The world is changing, so does design.
          <br/>
          <br/>
          At Arc, we believe design isn&apos;t a product. It&apos;s an experience. A feeling. A connection.
          <br/>
          <br/>
          We bring expertise, creativity, and an experience you can&apos;t forget to the table. 
          <br/>
          <br/>
          Every brand we work with is treated like the only one.
          <br/>
          <br/>
          We listen, we think, we challenge, we collaborate.
          <br/>
          <br/>
          Because great design doesn&apos;t start in Figma - it starts with why.
          <br/>
          <br/>
          No sales team, no contracts, no boring meetings.
          <br/>
          <br/>
          Just real people, creating magic for you.  
          </p>
          <Image src="https://494510hkri.ufs.sh/f/3d9AyaVNUM8w0zPxUIFgUTyWaSqPprmYFheIGsi3BcZ0MCt2" alt="Image" width={120} height={120} draggable="false" className='w-28 h-auto'/>
      </div>
      <div className='flex flex-col gap-12 md:gap-16 border-border border-b border-t'>
        <div className='flex flex-col md:flex-row w-full'>
          <div className='flex flex-col px-4 py-8 sm:p-6 md:p-8 lg:p-12 xl:p-16 gap-12 border-r border-border w-full'>
            <div className='gap-8 flex flex-col'>
            <div className='flex flex-col gap-3'>
            <p className='text-3xl font-medium'>
              Landing Page
            </p>
            <p className='text-xl text-[#6b6b6b]'>
              Best for busy founders who want
              <br/>
              to get a landing page done fast.
            </p>
            </div>
            <p className='text-6xl font-medium text-[#202020] tracking-[-0.02em]'>
            $2295
            </p>
            </div>
            <div className='flex flex-col gap-4'>
                <div className='flex items-center gap-2'>
                  <CheckIcon />
                  <p className='text-xl text-[#484848]'>Single Page</p>
                </div>
                <div className='flex items-center gap-2'>
                  <CheckIcon />
                  <p className='text-xl text-[#484848]'>Conversion Optimized</p>
                </div>
                <div className='flex items-center gap-2'>
                  <CheckIcon />
                  <p className='text-xl text-[#484848]'>Animations</p>
                </div>
                <div className='flex items-center gap-2'>
                  <CheckIcon />
                  <p className='text-xl text-[#484848]'>Basic Copywriting</p>
                </div>
                <div className='flex items-center gap-2'>
                  <CheckIcon />
                  <p className='text-xl text-[#484848]'>7 Day Delivery</p>
                </div>
                <div className='flex items-center gap-2'>
                  <CheckIcon />
                  <p className='text-xl text-[#484848]'>Framer / Custom Code</p>
                </div>
                <div className='flex items-center gap-2'>
                  <CheckIcon />
                  <p className='text-xl text-[#484848]'>3 Design Concepts</p>
              </div>
              
            </div>
            <Button className='w-full cursor-pointer'
            variant="outline"
            onClick={() => {
              window.open('https://t.me/@emirthedev', '_blank')
            }}
            >
              Send a message
            </Button>
          </div>
          <div className='flex flex-col px-4 py-8 sm:p-6 md:p-8 lg:p-12 xl:p-16 gap-12 border-r border-border w-full dark bg-[#202020]'>
            <div className='gap-8 flex flex-col'>
            <div className='flex flex-col gap-3'>
            <p className='text-3xl font-medium text-[#fefefe]'>
              Design Partner
            </p>
            <p className='text-xl text-[#B3B3B3]'>
            Best for busy founders who want to
              <br/>
              get ongoing unlimited design support.
            </p>
            </div>
            <p className='text-6xl font-medium text-[#fefefe] tracking-[-0.02em]'>
            $3497/mo
            </p>
            </div>
            <div className='flex flex-col gap-4'>
              <div className='flex items-center gap-2'>
                <CheckIcon />
                <p className='text-xl text-[#e5e5e5]'>One request at a time</p>
              </div>
              <div className='flex items-center gap-2'>
                <CheckIcon />
                <p className='text-xl text-[#e5e5e5]'>Unlimited brands/projects</p>
              </div>
              <div className='flex items-center gap-2'>
                <CheckIcon />
                <p className='text-xl text-[#e5e5e5]'>Private Slack channel</p>
              </div>
              <div className='flex items-center gap-2'>
                <CheckIcon />
                <p className='text-xl text-[#e5e5e5]'>Framer Development</p>
              </div>
              <div className='flex items-center gap-2'>
                <CheckIcon />
                <p className='text-xl text-[#e5e5e5]'>No Commitment, cancel anytime</p>
              </div>
              <div className='flex items-center gap-2'>
                <CheckIcon />
                <p className='text-xl text-[#e5e5e5]'>Pause or resume anytime</p>
              </div>
              <div className='flex items-center gap-2'>
                <CheckIcon />
                <p className='text-xl text-[#e5e5e5]'>No meetings (if preferred)</p>
              </div>
            </div>
            <Button className='w-full cursor-pointer'
            onClick={() => {
              window.open('https://cal.com/emirayaz', '_blank')
            }}
            >
              Book a call
            </Button>
          </div>
        </div>
      </div>
      <div className='px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16 flex flex-col border-border border-t'>
        <p className='text-xl text-[#6b6b6b]'>
          &copy; 2025 Arc Studio
        </p>
      </div>
    </div>
  )
}

const CheckIcon = () => {
  return (
    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M14.3769 5.42413L13.8074 6.16883L9.63211 11.6288L9.11398 11.1106L8.29455 10.2912L12.3179 5.02987L12.8874 4.28516L14.3769 5.42413ZM5.1365 15.0881L6.12787 16.0795C5.282 16.7176 4.05589 16.6685 3.26524 15.878L0.836476 13.4497L0.173492 12.7869L1.49917 11.461L2.16216 12.1238L4.59093 14.552C4.6067 14.5677 4.62369 14.5815 4.64157 14.5931L5.1365 15.0881ZM19.12 6.16884L19.6894 5.42413L18.2 4.28517L17.6305 5.02988L10.3727 14.5209C10.2579 14.671 10.0372 14.6856 9.90351 14.5521L7.47464 12.1238L6.81165 11.461L5.48599 12.787L6.14897 13.4497L8.57785 15.878C9.51338 16.8134 11.0585 16.7107 11.8621 15.6599L19.12 6.16884Z" fill="#3B81F6"/>
    </svg>
  )
}

export default Home
