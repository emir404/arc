import {Work, WorkTitle, WorkDescription, WorkDescItem, WorkImage} from '@/components/ui/work'
import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Syntra Media'
}

function SyntraWork() {
  return (
    <div className='w-full min-h-screen flex flex-col'>
      <Work image='/works/syntra/widescreen.jpg'>
        <WorkTitle title='Syntra Media' badges={['Branding', 'Strategy', 'Design & Development']} />
        <WorkDescription>
          <WorkDescItem description='Syntra Media is a digital marketing agency that specializes in creating effective online marketing strategies for businesses. We help businesses grow their online presence and reach their target audience through various digital marketing channels.' />
          <WorkDescItem description='We crafted Syntra Media&apos;s brand identity to evoke a sense of trust and professionalism, using a bold color palette and clean, modern design. The interface design prioritizes accessibility and user-friendly navigation, making digital marketing feel more approachable and less intimidating.' />
          <WorkDescItem description='The web application features a dynamic blog platform, intuitive content management system, and secure client portal. Our development focused on creating a seamless user experience while ensuring robust functionality across all components of the digital ecosystem.' />
        </WorkDescription>
        <WorkImage image='/works/syntra/mockups/part-1.png' />
        <WorkImage image='/works/syntra/mockups/part-2.png' />
        <WorkImage image='/works/syntra/mockups/part-3.png' />
      </Work>
    </div>
  )
}

export default SyntraWork