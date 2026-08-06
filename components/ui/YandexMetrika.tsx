'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'

const METRIKA_ID = 111353256
const STORAGE_KEY = 'ff_cookie_consent'

function analyticsAllowed(): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return false
    const state = JSON.parse(raw) as { settled?: boolean; analytics?: boolean }
    return state.settled === true && state.analytics === true
  } catch {
    return false
  }
}

export default function YandexMetrika() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    setEnabled(analyticsAllowed())
    const handler = () => setEnabled(analyticsAllowed())
    window.addEventListener('ff:consent-changed', handler)
    return () => window.removeEventListener('ff:consent-changed', handler)
  }, [])

  if (!enabled) return null

  return (
    <>
      <Script id="yandex-metrika" strategy="afterInteractive">
        {`
          (function(m,e,t,r,i,k,a){
              m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
          })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=${METRIKA_ID}', 'ym');

          ym(${METRIKA_ID}, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});
        `}
      </Script>
      <noscript>
        <div>
          <img src={`https://mc.yandex.ru/watch/${METRIKA_ID}`} style={{ position: 'absolute', left: '-9999px' }} alt="" />
        </div>
      </noscript>
    </>
  )
}
