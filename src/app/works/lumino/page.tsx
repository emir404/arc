import {Work, WorkTitle, WorkDescription, WorkDescItem, WorkImage} from '@/components/ui/work'
import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Lumino'
}

function LuminoWork () {
  return (
    <div className='w-full min-h-screen flex flex-col'>
      <Work image='/works/lumino/widescreen.jpg'>
        <WorkTitle title='Lumino' badges={['Design & Development']} />
        <WorkDescription>
          <WorkDescItem description='Lumino is a strategy-focused branding and design agency that helps businesses build meaningful connections with their audiences through thoughtful brand experiences and compelling visual narratives.' />
          <WorkDescItem description='We partnered with Lumino to evolve their digital presence, crafting a minimalist yet impactful website that embodies their strategic approach to branding. The design system emphasizes typography and whitespace to create a sophisticated, gallery-like showcase of their work.' />
          <WorkDescItem description='The website features smooth animations and intuitive navigation that guides visitors through their case studies and methodology. Our development focused on performance optimization and responsive design to ensure a seamless experience across all devices.' />
        </WorkDescription>
        <WorkImage image='/works/lumino/mockups/part-1.jpg' />
        <WorkImage image='/works/lumino/mockups/part-2.jpg' />
        <WorkImage image='/works/lumino/mockups/part-3.jpg' />
        <WorkImage image='/works/lumino/mockups/part-4.jpg' />
      </Work>
    </div>
  )
}

export default LuminoWork