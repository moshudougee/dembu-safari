'use client'
import React, { useEffect } from 'react'

const AdsHorizontal = ({ slot="5474928500" }) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.log(error.message)
    }
  }, [])
  
  return (
    <ins 
      className="adsbygoogle flex flex-col w-full h-44 shadow-md my-2"
      style={{display: "block"}}
      data-ad-client="ca-pub-6856025729636564"
      data-ad-slot= {slot}
      data-ad-format="auto"
      data-full-width-responsive="true" 
    />
    
  )
}

export default AdsHorizontal