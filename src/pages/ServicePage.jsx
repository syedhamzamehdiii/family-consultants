import { Link, Navigate, useParams } from 'react-router-dom'
import { WHATSAPP_URL } from '../data/contact'
import { SERVICES, getService } from '../data/services'
import { Reveal } from '../components/Reveal'
import { IconArrow, IconCheck, IconWhatsApp } from '../components/Icons'

function MapleMark() {
  return (
    <svg className="maple-mark" viewBox="0 0 64 64" aria-hidden="true">
      <path
        fill="currentColor"
        d="M32 4l4.2 11.2 11.8-1.4-7.2 9.4 8.6 8.2-11.4-.2 1.6 11.6L32 34.6 26.4 42.8l1.6-11.6-11.4.2 8.6-8.2-7.2-9.4 11.8 1.4L32 4zm0 34.2l1.8 14.8h-3.6L32 38.2z"
      />
    </svg>
  )
}

export default function ServicePage() {
  const { slug } = useParams()
  const service = getService(slug)

  if (!service) return <Navigate to="/#destinations" replace />

  const others = SERVICES.filter((s) => s.slug !== service.slug)

  return (
    <main className="svc-page">
      <section className="svc-hero">
        <div className="svc-hero-media">
          <img src={service.heroImg} alt={service.alt} />
        </div>
        <div className="svc-hero-shade" />
        <div className="svc-hero-pattern" aria-hidden="true" />
        <div className="wrap svc-hero-inner">
          <div className="svc-hero-content">
            <div className="svc-hero-badge">
              <MapleMark />
              <span>{service.eyebrow}</span>
            </div>
            <h1>{service.title}</h1>
            <p className="svc-hero-lead">{service.intro}</p>
            <div className="svc-hero-actions">
              <Link to="/#booking" className="btn btn-primary">
                {service.cta} <IconArrow />
              </Link>
              <a href={WHATSAPP_URL} className="btn btn-wa" target="_blank" rel="noopener noreferrer">
                <IconWhatsApp filled /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="svc-body-section">
        <div className="wrap svc-layout">
          <div className="svc-main">
            {service.sections.map((section, i) => (
              <Reveal key={section.title} className="svc-block" delay={i * 0.08}>
                <div className="svc-block-head">
                  <span className="svc-block-icon" data-kind={section.icon}>
                    <MapleMark />
                  </span>
                  <h2>{section.title}</h2>
                </div>
                <ul className="svc-points">
                  {section.items.map((item) => (
                    <li key={`${section.title}-${item.label || item.text}`}>
                      <IconCheck />
                      <div>
                        {item.label && <strong>{item.label}</strong>}
                        <span>{item.text}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}

            <Reveal className="svc-role" delay={0.15}>
              <div className="svc-role-flag" aria-hidden="true">
                <span /><span /><span />
              </div>
              <h2>Our consultancy role</h2>
              <p>{service.role}</p>
              <Link to="/#booking" className="btn btn-primary">
                Book free consultation <IconArrow />
              </Link>
            </Reveal>
          </div>

          <aside className="svc-side">
            <Reveal className="svc-side-card">
              <div className="svc-side-maple"><MapleMark /></div>
              <h3>Ready to begin?</h3>
              <p>Free 30-minute consultation for your {service.shortTitle.toLowerCase()} case.</p>
              <Link to="/#booking" className="btn btn-primary form-submit">Book appointment</Link>
              <a href={WHATSAPP_URL} className="btn btn-wa form-submit" target="_blank" rel="noopener noreferrer">
                <IconWhatsApp filled /> Chat on WhatsApp
              </a>
            </Reveal>

            <Reveal className="svc-side-card svc-side-muted" delay={0.1}>
              <h3>Other Canada pathways</h3>
              <ul className="svc-side-links">
                {others.map((s) => (
                  <li key={s.slug}>
                    <Link to={`/services/${s.slug}`}>
                      <span>{s.shortTitle}</span>
                      <IconArrow />
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </aside>
        </div>
      </section>

      <section className="svc-related">
        <div className="wrap">
          <Reveal className="section-head center">
            <span className="eyebrow">Explore more</span>
            <h2>More Canadian immigration routes</h2>
          </Reveal>
          <div className="svc-related-grid">
            {others.slice(0, 3).map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.08}>
                <Link to={`/services/${s.slug}`} className="svc-related-card">
                  <img src={s.img} alt={s.alt} />
                  <div>
                    <span className="label">Canada</span>
                    <h3>{s.shortTitle}</h3>
                    <p>{s.summary}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
