import Script from 'next/script'
import React from 'react'

const AdSense = () => {
  return (
    <Script 
        async 
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6856025729636564"
        crossOrigin="anonymous"
        strategy="lazyOnload"
    />
  )
}

export default AdSense