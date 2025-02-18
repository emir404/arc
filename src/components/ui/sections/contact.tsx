import React, { useEffect } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function Contact() {
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.contact-section',
        start: 'top center+=100',
      }
    })

    gsap.set('.contact-content', { opacity: 0, y: 50 })
    gsap.set('.phone-decoration', { opacity: 0, rotate: 45, scale: 0.8 })

    tl.to('.contact-content', {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out'
    })
    .to('.phone-decoration', {
      opacity: 1,
      rotate: 12,
      scale: 1,
      duration: 1.2,
      ease: 'power3.out'
    }, '-=0.5')

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <div className="min-h-screen bg-white px-4 sm:px-8 md:px-24 py-12 md:py-24">
      {/* Content container */}
      <div className="mx-auto relative">
        <div className="bg-black rounded-[24px] md:rounded-[48px] p-8 md:p-16 overflow-hidden">
          {/* Main content */}
          <div className="z-10">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium mb-8 md:mb-16 leading-tight text-white">
              Lets create something <br className="hidden md:block" /> extraordinary.
            </h2>

            {/* Contact details */}
            <div className="space-y-4 md:space-y-8">
              <div>
                <p className="text-gray-500 mb-1 md:mb-2">Mail us</p>
                <a 
                  href="mailto:hello@witharc.co" 
                  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white hover:text-gray-300 transition-colors"
                >
                  hello@witharc.co
                </a>
              </div>

              <div>
                <p className="text-gray-500 mb-1 md:mb-2">Visit us at</p>
                <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white">
                  Beşiktaş, İstanbul
                </p>
              </div>
            </div>
          </div>

          {/* Phone decoration */}
          <div className="absolute top-0 right-0 w-1/2 md:w-1/3 -translate-y-1/4 translate-x-1/4 rotate-12">
            <Image
              src="/icons/phone.png"
              alt="Phone icon"
              width={500}
              height={500}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
