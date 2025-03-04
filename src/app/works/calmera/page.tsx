import {Work, WorkTitle, WorkDescription, WorkDescItem, WorkImage} from '@/components/ui/work'
import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Calmera'
}

function CalmeraWork() {
  return (
    <div className='w-full min-h-screen flex flex-col'>
      <Work image='/works/calmera/widescreen.jpg'>
        <WorkTitle title='Calmera' badges={['AI', 'Mental Health', 'Web Application', 'Voice Processing', 'Sentiment Analysis']} />
        <WorkDescription>
          <WorkDescItem description='Calmera is an AI-powered mental health companion that combines voice-enabled therapy sessions with intelligent mood and anxiety tracking. Through natural conversations with an empathetic AI, users can explore their thoughts and feelings in a safe, judgment-free space.' />
          <WorkDescItem description='We crafted Calmera&apos;s brand identity to evoke a sense of calm and trust, using a soothing color palette and organic shapes. The interface design prioritizes accessibility and emotional safety, making mental health support feel more approachable and less clinical.' />
          <WorkDescItem description='The web application features real-time voice processing, sentiment analysis, and personalized insights that help users understand their emotional patterns. Our development focused on creating seamless voice interactions and ensuring complete privacy of sensitive mental health data.' />
        </WorkDescription>
        <WorkImage image='/works/calmera/mockups/part-1.png' />
        <WorkImage image='/works/calmera/mockups/part-2.png' />
        <WorkImage image='/works/calmera/mockups/part-3.png' />
        <WorkImage image='/works/calmera/mockups/part-4.png' />
        <WorkImage image='/works/calmera/mockups/part-5.png' />
      </Work>
    </div>
  )
}

export default CalmeraWork