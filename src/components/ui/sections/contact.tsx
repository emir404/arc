"use client"

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Clock, MapPin, Phone } from 'lucide-react'
import { motion, Variants } from 'framer-motion'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const contactFormSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters')
})

type ContactFormValues = z.infer<typeof contactFormSchema>

function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const { 
    register, 
    handleSubmit,
    formState: { errors },
    reset 
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema)
  })

  const onSubmit = async () => {
    try {
      setIsSubmitting(true)
      // Here you would typically send the data to your API
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulated API call
      setSubmitStatus('success')
      reset()
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus('idle'), 3000)
    }
  }

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const formFieldVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  }

  return (
    <motion.section 
      id="contact"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className='w-full min-h-screen py-24 px-6 sm:px-8 md:px-12 lg:px-16'
    >
      <div className="max-w-[2000px] mx-auto">
        <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-8">
          <motion.h2 
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white"
          >
            Let&apos;s Build<br />Something Great
          </motion.h2>
          <motion.span 
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-white/40 font-mono"
          >
            03
          </motion.span>
        </div>

        <motion.p 
          variants={fadeInUp}
          transition={{ duration: 0.6, delay: 0.2 }}
          className='text-white/80 text-lg sm:text-xl md:text-2xl max-w-2xl mb-24'
        >
          Ready to transform your digital presence? Let&apos;s start a conversation about your project.
        </motion.p>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24'>
          <motion.div 
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.form 
              onSubmit={handleSubmit(onSubmit)} 
              className='flex flex-col gap-8'
              data-netlify="true"
            >
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                <motion.div 
                  variants={formFieldVariants}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Input
                    {...register('fullName')}
                    placeholder="Full Name"
                    className='h-12 border-white/10 focus:border-white/20'
                  />
                  {errors.fullName && (
                    <p className="mt-2 text-sm text-red-500">{errors.fullName.message}</p>
                  )}
                </motion.div>
                <motion.div
                  variants={formFieldVariants}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <Input
                    {...register('email')}
                    type="email"
                    placeholder="Email Address" 
                    className='h-12 border-white/10 focus:border-white/20'
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-500">{errors.email.message}</p>
                  )}
                </motion.div>
              </div>

              <motion.div
                variants={formFieldVariants}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Input
                  {...register('company')}
                  placeholder="Company (Optional)"
                  className='h-12 border-white/10 focus:border-white/20'
                />
              </motion.div>

              <motion.div
                variants={formFieldVariants}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <Textarea
                  {...register('message')}
                  placeholder="Tell us about your project"
                  rows={6}
                  className='resize-none border-white/10 focus:border-white/20'
                />
                {errors.message && (
                  <p className="mt-2 text-sm text-red-500">{errors.message.message}</p>
                )}
              </motion.div>

              <motion.div
                variants={formFieldVariants}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="relative"
              >
                <Button 
                  type="submit" 
                  className='h-12 px-8 text-base' 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
                {submitStatus === 'success' && (
                  <p className="mt-4 text-sm text-green-500">Message sent successfully!</p>
                )}
                {submitStatus === 'error' && (
                  <p className="mt-4 text-sm text-red-500">Failed to send message. Please try again.</p>
                )}
              </motion.div>
            </motion.form>
          </motion.div>

          <motion.div 
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.4 }}
            className='space-y-12'
          >
            <div className='h-[300px] border border-white/10 rounded-lg overflow-hidden'>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3757.5818684331352!2d29.00180852657051!3d41.04275351730056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab79f5a4f16a7%3A0x5c911d9ea20c25aa!2zU2luYW5wYcWfYSwgQmXFn2lrdGHFny_EsHN0YW5idWw!5e0!3m2!1str!2str!4v1738011485604!5m2!1str!2str"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                title="Office Location"
              />
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-3 gap-8'>
              {[
                {
                  icon: <Phone className="h-5 w-5 text-white/40" />,
                  title: "Contact",
                  lines: ["hello@witharc.co"]
                },
                {
                  icon: <MapPin className="h-5 w-5 text-white/40" />,
                  title: "Location", 
                  lines: ["Sinanpaşa Mahallesi", "Beşiktaş, Istanbul 34353"]
                },
                {
                  icon: <Clock className="h-5 w-5 text-white/40" />,
                  title: "Hours",
                  lines: ["Mon-Fri: 9AM - 6PM IST", "Sat-Sun: Closed"]
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  transition={{ duration: 0.5, delay: 0.5 + (index * 0.1) }}
                  className='space-y-4'
                >
                  <div className='flex items-center gap-3'>
                    {item.icon}
                    <h3 className='font-medium text-white/80'>{item.title}</h3>
                  </div>
                  {item.lines.map((line, lineIndex) => (
                    <p
                      key={lineIndex}
                      className='text-white/60'
                    >
                      {line}
                    </p>
                  ))}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

export default Contact