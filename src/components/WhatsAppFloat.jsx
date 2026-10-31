import { PRIMARY_PHONE, WHATSAPP_URL } from '../data/contact'
import { IconWhatsApp } from './Icons'

export function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_URL}
      className="wa-float"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat on WhatsApp — ${PRIMARY_PHONE.display}`}
    >
      <span className="wa-float-pulse" aria-hidden="true" />
      <IconWhatsApp />
    </a>
  )
}
