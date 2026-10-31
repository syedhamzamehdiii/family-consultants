import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { OFFICE, PRIMARY_PHONE, WHATSAPP_URL } from '../data/contact'
import { SERVICES } from '../data/services'
import { usePageMeta } from '../seo/usePageMeta'
import { WhatsAppFloat } from './WhatsAppFloat'
import { UniversityMarquee } from './UniversityMarquee'
import {
  IconChevron,
  IconClose,
  IconPhone,
  IconPin,
  IconUp,
  IconWhatsApp,
} from './Icons'

function Brand({ compact, footer }) {
  return (
    <Link
      to="/"
      className={`brand${compact ? ' brand-compact' : ''}${footer ? ' brand-footer' : ''}`}
      aria-label="Family Consultants home"
    >
      <img
        className="brand-logo"
        src="/logo.png"
        alt="Family Consultants — Bringing the World Closer to you"
        width="388"
        height="395"
        decoding="async"
      />
    </Link>
  )
}

export function SiteShell() {
  const [scrolled, setScrolled] = useState(false)
  const [showTop, setShowTop] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  usePageMeta(location.pathname)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
      setShowTop(window.scrollY > 600)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    if (!location.hash) window.scrollTo(0, 0)
    else {
      const id = location.hash.slice(1)
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      })
    }
  }, [location.pathname, location.hash])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const sectionLinks = [
    ['/about', 'About'],
    ['/study-in-uk', 'Study in UK'],
  ]

  return (
    <>
      <div className="topbar">
        <div className="wrap">
          <div className="topbar-left">
            <span>
              <a
                className="topbar-map"
                href={OFFICE.directions}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View office on Google Maps"
              >
                <IconPin />
                {OFFICE.address}
              </a>
            </span>
            <span>
              <IconPhone />
              <a href={`tel:${PRIMARY_PHONE.tel}`}>{PRIMARY_PHONE.display}</a>
            </span>
          </div>
          <div className="topbar-social">
            <a
              href={OFFICE.directions}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View office on Google Maps"
            >
              <IconPin />
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <IconWhatsApp />
            </a>
            <a href={`tel:${PRIMARY_PHONE.tel}`} aria-label="Call">
              <IconPhone />
            </a>
          </div>
        </div>
      </div>

      <header className={`nav${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-inner">
          <Brand />
          <nav className="links" aria-label="Primary">
            <Link to="/">Home</Link>
            <div className="has-drop">
              <Link to="/#destinations">
                Services <IconChevron />
              </Link>
              <div className="dropdown">
                <div className="dropdown-panel">
                  <div className="has-sub">
                    <span className="drop-label">
                      <span className="dot" /> Canada Visa <IconChevron />
                    </span>
                    <div className="dropdown-sub">
                      {SERVICES.map((s) => (
                        <NavLink key={s.slug} to={`/services/${s.slug}`}>
                          <span className="dot" /> {s.shortTitle}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Link to="/about">About</Link>
            <Link to="/study-in-uk">Study in UK</Link>
          </nav>
          <div className="nav-cta">
            <a href={`tel:${PRIMARY_PHONE.tel}`} className="nav-phone" aria-label={`Call ${PRIMARY_PHONE.display}`}>
              <span className="ico"><IconPhone /></span>
            </a>
            <Link to="/#booking" className="btn btn-primary">Get Started</Link>
            <button className="burger" type="button" aria-label="Open menu" onClick={() => setMenuOpen(true)}>
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      <div className={`mnav-overlay${menuOpen ? ' show' : ''}`} onClick={() => setMenuOpen(false)} />
      <nav className={`mnav${menuOpen ? ' open' : ''}`} aria-label="Mobile">
        <div className="mnav-top">
          <Brand compact />
          <button className="mnav-close" type="button" aria-label="Close menu" onClick={() => setMenuOpen(false)}>
            <IconClose />
          </button>
        </div>
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <div className="mnav-group">
          <span className="mnav-group-label">Services</span>
          <span className="mnav-group-sub">Canada Visa</span>
          {SERVICES.map((s) => (
            <Link key={s.slug} to={`/services/${s.slug}`} onClick={() => setMenuOpen(false)}>
              {s.shortTitle}
            </Link>
          ))}
        </div>
        {sectionLinks.map(([href, label]) => (
          <Link key={href} to={href} onClick={() => setMenuOpen(false)}>{label}</Link>
        ))}
        <a href={WHATSAPP_URL} className="btn btn-wa" target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>
          <IconWhatsApp filled /> WhatsApp
        </a>
        <Link to="/#booking" className="btn btn-primary" onClick={() => setMenuOpen(false)}>Get Started</Link>
      </nav>

      <Outlet />

      <footer>
        <div className="wrap">
          <div className="footer-grid">
            <div className="footer-brand">
              <Brand footer />
              <p>Canada visit visas, study & work permits, Express Entry, PNP, and family sponsorship — handled by one licensed team.</p>
              <div className="footer-social">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                  <IconWhatsApp filled />
                </a>
                <a href={`tel:${PRIMARY_PHONE.tel}`} aria-label="Phone"><IconPhone /></a>
              </div>
            </div>
            <div className="footer-col">
              <h5>Services</h5>
              <ul>
                {SERVICES.map((s) => (
                  <li key={s.slug}><Link to={`/services/${s.slug}`}>{s.shortTitle}</Link></li>
                ))}
              </ul>
            </div>
            <div className="footer-col">
              <h5>Company</h5>
              <ul>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/study-in-uk">Study in UK</Link></li>
                <li><Link to="/#booking">Book Appointment</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h5>Karachi Office</h5>
              <ul>
                <li>{OFFICE.address}</li>
                <li><a href={`tel:${PRIMARY_PHONE.tel}`}>{PRIMARY_PHONE.display}</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Family Consultants. All rights reserved.</span>
            <span>Registered Immigration Consultants</span>
          </div>
        </div>
      </footer>

      <UniversityMarquee />

      <WhatsAppFloat />

      <button
        className={`totop${showTop ? ' show' : ''}`}
        type="button"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <IconUp />
      </button>
    </>
  )
}
