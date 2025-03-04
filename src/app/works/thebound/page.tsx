import {Work, WorkTitle, WorkDescription, WorkDescItem, WorkImage} from '@/components/ui/work'
import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Bound Games'
}

function TheBoundWork () {
  return (
    <div className='w-full min-h-screen flex flex-col'>
      <Work image='/works/thebound/widescreen.jpg'>
        <WorkTitle title='The Bound Games' badges={['Branding']} />
        <WorkDescription>
          <WorkDescItem description='The Bound Games is an innovative game development studio focused on creating unique desktop games with open source components. We partnered with them to develop a brand identity that captures their experimental approach and commitment to community-driven development.' />
          <WorkDescItem description='Our branding work centered on conveying their outside-the-box thinking and transparent development process. The visual identity balances professional polish with creative energy, using dynamic elements that reflect the studio&apos;s innovative spirit.' />
          <WorkDescItem description='The brand system we created helps The Bound Games stand out in the indie game space while building trust with both players and the open source community. The identity supports their mission of pushing creative boundaries while keeping their development process accessible and collaborative.' />
        </WorkDescription>
        <WorkImage image='/works/thebound/mockups/part-1.jpg' />
      </Work>
    </div>
  )
}

export default TheBoundWork