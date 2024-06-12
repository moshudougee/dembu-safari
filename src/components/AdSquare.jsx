import React, { useEffect } from 'react'

const AdSquare = ({ slot="9551471558" }) => {
    useEffect(() => {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (error) {
          console.log(error.message)
        }
      }, [])
  return (
    <ins 
        className="adsbygoogle gog-square"
        style={{
          display: "block",
          overflow: "hidden",
        }}
        data-ad-client="ca-pub-6856025729636564"
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
     />
    
  )
}

export default AdSquare