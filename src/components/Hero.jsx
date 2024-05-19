'use client';
import React, { useEffect, useState } from 'react';
//import Image from "next/image";
//import WildBanner from '../images/image17.jpg';
import Link from "next/link";
import { ArrowBigLeftDash, ArrowBigRightDash } from 'lucide-react';



const Hero = ({ children: slides, autoSlide = false, autoSlideInterval = 3000 }) => {
  const [curr, setCurr] = useState(0)
  const prev = () => setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1))
  const next = () => setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1))
    useEffect(() => {
      if (!autoSlide) return
        const slideInterval = setInterval(next, autoSlideInterval)
        return () => clearInterval(slideInterval)  
    }, []);
  return (
    <div className='relative overflow-hidden'>
      <div className='flex transition-transform ease-out duration-1000 delay-1000' style={{ transform: `translateX(-${curr * 100}%)` }}>
        {slides}
      </div>
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <button onClick={prev} className='p-1 rounded-full shadow bg-banner text-safari-3 hover:bg-safari-3 hover:text-banner'>
            <ArrowBigLeftDash />
        </button>
        <button onClick={next} className='p-1 rounded-full shadow bg-banner text-safari-3 hover:bg-safari-3 hover:text-banner'>
            <ArrowBigRightDash />
        </button>
      </div>
      <div className='absolute bottom-4 right-0 left-0'>
        <div className='flex items-center justify-center gap-2'>
          {slides.map((slide, i) => { 
            return (
              <div key={i} className={`transition-all w-1.5 h-1.5 bg-safari-2 rounded-full  ${curr === i ? "p-0.5" : "bg-opacity-50"}`} />
          )})}
        </div>
      </div>
    </div>
  )
}

export default Hero