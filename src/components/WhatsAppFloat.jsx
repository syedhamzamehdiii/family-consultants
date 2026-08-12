import { WHATSAPP_URL } from '../data/contact'
import { IconWhatsApp } from './Icons'

export function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_URL}
      className="wa-float"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp — 0327 2377746"
    >
      <span className="wa-float-pulse" aria-hidden="true" />
      <IconWhatsApp />
    </a>
  )
}
