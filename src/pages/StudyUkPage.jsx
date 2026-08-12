import { Link } from 'react-router-dom'
import { WHATSAPP_URL } from '../data/contact'
import { UK_UNIVERSITIES } from '../data/ukUniversities'
import { Reveal } from '../components/Reveal'
import { IconArrow, IconWhatsApp } from '../components/Icons'

export default function StudyUkPage() {
  return (
    <main className="uk-page">
      <section className="uk-hero">
        <div className="uk-hero-media">
          <img src="/images/uk/hero.jpg" alt="London landmarks and study destination atmosphere" />
        </div>
        <div className="uk-hero-shade" />
        <div className="wrap uk-hero-inner">
          <div className="svc-hero-badge">
            <span>United Kingdom</span>
          </div>
          <h1>Study in the UK</h1>
          <p className="svc-hero-lead">
            Explore leading British universities — from Oxford and Cambridge to London’s global campuses —
            and plan your UK study pathway with a licensed consultancy team.
          </p>
          <div className="svc-hero-actions">
            <Link to="/#booking" className="btn btn-primary">
              Book a UK study consultation <IconArrow />
            </Link>
            <a href={WHATSAPP_URL} className="btn btn-wa" target="_blank" rel="noopener noreferrer">
              <IconWhatsApp filled /> WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="uk-intro">
        <div className="wrap">
          <Reveal className="section-head center">
            <span className="eyebrow" style={{ justifyContent: 'center' }}>Top destinations</span>
            <h2>Ten universities international students aim for</h2>
            <p style={{ marginLeft: 'auto', marginRight: 'auto' }}>
              A curated shortlist of UK institutions known for academic strength, research, and strong outcomes
              for overseas students. We help with admissions strategy, documentation, and visa filing —
              without implying any official university partnership.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="uk-list">
        <div className="wrap uk-list-grid">
          {UK_UNIVERSITIES.map((uni, i) => (
            <Reveal key={uni.slug} className={`uk-card${i % 2 === 1 ? ' uk-card-reverse' : ''}`} delay={(i % 4) * 0.05}>
              <div className="uk-card-media">
                <img src={uni.img} alt={uni.alt} loading="lazy" decoding="async" />
              </div>
              <div className="uk-card-body">
                <span className="uk-card-num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{uni.name}</h3>
                <div className="uk-card-meta">
                  <span className="uk-chip">{uni.city}</span>
                  <span className="uk-chip">{uni.focus}</span>
                </div>
                <p>{uni.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="uk-cta">
        <div className="wrap uk-cta-inner">
          <Reveal>
            <h2>Ready to shortlist your UK university?</h2>
            <p>
              Tell us your preferred course, budget, and intake — we’ll map realistic options and guide your
              student visa steps from consultation to filing.
            </p>
            <div className="svc-hero-actions">
              <Link to="/#booking" className="btn btn-primary">
                Book free consultation <IconArrow />
              </Link>
              <a href={WHATSAPP_URL} className="btn btn-wa" target="_blank" rel="noopener noreferrer">
                <IconWhatsApp filled /> Chat on WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
