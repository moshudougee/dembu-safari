import React, { useEffect } from 'react'

const AdSquare = ({ slot="9551471558" }) => {
    useEffect(() => {
        try {
          (adsbygoogle = window.adsbygoogle || []).push({});
        } catch (error) {
          console.log(error.message)
        }
      }, [])
  return (
    <ins 
        className="adsbygoogle w-[200px] h-[200px]"
        style={{display: "block"}}
        data-ad-client="ca-pub-6856025729636564"
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
     >
    </ins>
  )
}

export default AdSquare