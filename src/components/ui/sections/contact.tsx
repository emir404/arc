"use client"

import React from 'react'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Clock, MapPin } from 'lucide-react'
import { Phone } from 'lucide-react'
import { motion } from 'framer-motion'

interface ContactFormValues {
  fullName: string
  email: string
  company?: string
  message: string
}

function Contact() {
  const { register, handleSubmit } = useForm<ContactFormValues>()

  const onSubmit = (data: ContactFormValues) => {
    console.log(data)
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const formFieldVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  }

  const contactInfoVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 }
  }

  return (
    <motion.div 
      id="contact"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className='w-full p-10 sm:p-12 md:p-16 lg:p-20 gap-6 sm:gap-8 md:gap-12 flex flex-col'
    >
      <motion.div 
        variants={fadeInUp}
        transition={{ duration: 0.6 }}
        className='flex gap-4 sm:gap-8 md:gap-12'
      >
        <motion.p 
          variants={fadeInUp}
          transition={{ duration: 0.6, delay: 0.1 }}
          className='text-white/50 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-inter font-[900]'
        >
          03
        </motion.p>
        <motion.h2 
          variants={fadeInUp}
          transition={{ duration: 0.6, delay: 0.2 }}
          className='text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold'
        >
          Let&apos;s Build Something Extraordinary Together
        </motion.h2>
      </motion.div>
      <div className='flex flex-col lg:flex-row gap-8 md:gap-12'>
        <motion.div 
          variants={fadeInUp}
          transition={{ duration: 0.6, delay: 0.3 }}
          className='flex-1 flex flex-col gap-6 md:gap-8'
        >
          <motion.p 
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.4 }}
            className='text-muted-foreground text-base sm:text-lg md:text-xl'
          >
            Ready to transform your digital presence? Let&apos;s start a conversation about your project. Fill out the form below and we&apos;ll get back to you within 24 hours.
          </motion.p>
          <motion.form 
            variants={fadeInUp}
            onSubmit={handleSubmit(onSubmit)} 
            className='flex flex-col gap-4 sm:gap-5 md:gap-6'
          >
            <motion.div 
              variants={formFieldVariants}
              transition={{ duration: 0.5, delay: 0.5 }}
              className='flex flex-col sm:flex-row gap-4 sm:gap-6'
            >
              <Input
                {...register('fullName', { required: true })}
                placeholder="Full Name"
                className='flex-1 h-10 sm:h-12'
              />
              <Input
                {...register('email', { required: true })}
                type="email"
                placeholder="Email Address" 
                className='flex-1 h-10 sm:h-12'
              />
            </motion.div>
            <motion.div
              variants={formFieldVariants}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Input
                {...register('company')}
                placeholder="Company (Optional)"
                className='w-full h-10 sm:h-12'
              />
            </motion.div>
            <motion.div
              variants={formFieldVariants}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <Textarea
                {...register('message', { required: true })}
                placeholder="Tell us about your project"
                rows={6}
                className='w-full resize-none'
              />
            </motion.div>
            <motion.div
              variants={formFieldVariants}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Button type="submit" className='self-start text-base sm:text-lg md:text-xl' size={"lg"}>
                Send Message
              </Button>
            </motion.div>
          </motion.form>
        </motion.div>
        <motion.div 
          variants={fadeInUp}
          transition={{ duration: 0.6, delay: 0.6 }}
          className='flex-1 flex flex-col'
        >
          <motion.div 
            variants={contactInfoVariants}
            transition={{ duration: 0.6, delay: 0.7 }}
            className='w-full h-[180px] sm:h-[200px] md:h-[225px] mb-6 sm:mb-8 rounded-lg overflow-hidden'
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0927141661437!2d-122.39901368468215!3d37.78779997975728!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085807abad77c31%3A0x3f10582f2e67dd3f!2sSan%20Francisco%2C%20CA%2094105!5e0!3m2!1sen!2sus!4v1647894687693!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </motion.div>
          <motion.div 
            variants={contactInfoVariants}
            transition={{ duration: 0.6, delay: 0.8 }}
            className='grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 bg-card/50 rounded-lg p-4 sm:p-6 md:p-8'
          >
            {[
              {
                icon: <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />,
                title: "Contact",
                lines: ["hello@witharc.co"]
              },
              {
                icon: <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />,
                title: "Location", 
                lines: ["Sinanpaşa Mahallesi", "Beşiktaş, Istanbul 34353"]
              },
              {
                icon: <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />,
                title: "Hours",
                lines: ["Mon-Fri: 9AM - 6PM IST", "Sat-Sun: Closed"]
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={contactInfoVariants}
                transition={{ duration: 0.5, delay: 0.9 + (index * 0.1) }}
                className='flex flex-col gap-2 sm:gap-3'
              >
                <div className='flex items-center gap-2 sm:gap-3'>
                  {item.icon}
                  <h3 className='font-bold text-sm sm:text-base'>{item.title}</h3>
                </div>
                {item.lines.map((line, lineIndex) => (
                  <motion.p
                    key={lineIndex}
                    variants={fadeInUp}
                    transition={{ duration: 0.5, delay: 1 + (index * 0.1) + (lineIndex * 0.05) }}
                    className='text-muted-foreground text-sm sm:text-base'
                  >
                    {line}
                  </motion.p>
                ))}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Contact