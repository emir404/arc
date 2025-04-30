import React from 'react'
import Image from 'next/image'

const WORK_IMAGES = [
  "/assets/hero/1.png",
  "/assets/hero/2.png",
  "/assets/hero/24.png",
  "/assets/hero/3.png",
  "/assets/hero/4.png",
  "/assets/hero/5.png",
  "/assets/hero/6.png",
  "/assets/hero/7.png",
  "/assets/hero/8.png",
  "/assets/hero/9.png",
  "/assets/hero/10.png",
  "/assets/hero/11.png",
  "/assets/hero/12.png",
  "/assets/hero/13.png",
  "/assets/hero/14.png",
  "/assets/hero/15.png",
  "/assets/hero/16.png",
  "/assets/hero/17.png",
  "/assets/hero/18.png",
  "/assets/hero/19.png",
  "/assets/hero/20.png",
  "/assets/hero/21.png",
  "/assets/hero/22.png",
  "/assets/hero/23.png",
]

function Works() {
  return (
    <div className='flex flex-col gap-8 py-12 p-8'>
      {
            WORK_IMAGES.map((item, i) => (
              <Image key={i} className='aspect-[16:10] object-cover object-left-top rounded-xl' width={1440} height={1024} src={item} alt={'Image ' + i}/>
            ))
          }
    </div>
  )
}

export default Works