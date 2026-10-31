import { useEffect } from 'react'
import { getJsonLd, getPageMeta } from './meta'

function upsert(tag, matchAttr, matchValue, attrs) {
  let el = document.head.querySelector(`${tag}[${matchAttr}="${matchValue}"]`)
  if (!el) {
    el = document.createElement(tag)
    el.setAttribute(matchAttr, matchValue)
    document.head.appendChild(el)
  }
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v)
}

// Keeps <head> in sync on client-side navigation; the prerendered HTML already has it for crawlers.
export function usePageMeta(pathname) {
  useEffect(() => {
    const m = getPageMeta(pathname)
    document.title = m.title
    upsert('meta', 'name', 'description', { content: m.description })
    upsert('meta', 'name', 'keywords', { content: m.keywords })
    upsert('link', 'rel', 'canonical', { href: m.url })
    upsert('meta', 'property', 'og:title', { content: m.title })
    upsert('meta', 'property', 'og:description', { content: m.description })
    upsert('meta', 'property', 'og:url', { content: m.url })
    upsert('meta', 'property', 'og:image', { content: m.image })
    upsert('meta', 'name', 'twitter:title', { content: m.title })
    upsert('meta', 'name', 'twitter:description', { content: m.description })
    upsert('meta', 'name', 'twitter:image', { content: m.image })

    let ld = document.head.querySelector('script[type="application/ld+json"]')
    if (!ld) {
      ld = document.createElement('script')
      ld.type = 'application/ld+json'
      document.head.appendChild(ld)
    }
    ld.textContent = JSON.stringify(getJsonLd(pathname))
  }, [pathname])
}
