import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  BOOKING_EMAIL,
  OFFICE,
  PRIMARY_PHONE,
  WHATSAPP_URL,
} from '../data/contact'
import { SERVICES } from '../data/services'
import { UK_UNIVERSITIES } from '../data/ukUniversities'
import { CountUp } from '../components/CountUp'
import { Reveal, TiltCard } from '../components/Reveal'
import {
  IconArrow,
  IconCheck,
  IconPin,
  IconWhatsApp,
} from '../components/Icons'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
const MIN_MESSAGE_CHARS = 20
const MIN_PHONE_DIGITS = 7
const MAX_PHONE_DIGITS = 15
const SEND_COOLDOWN_SEC = 15

function countDigits(value) {
  return (value.match(/\d/g) || []).length
}

function validateForm(form) {
  const errors = {}
  if (!form.name.trim()) errors.name = 'Please enter your full name.'

  const phoneDigits = countDigits(form.phone)
  if (phoneDigits < MIN_PHONE_DIGITS || phoneDigits > MAX_PHONE_DIGITS) {
    errors.phone = `Enter a valid phone number (${MIN_PHONE_DIGITS}–${MAX_PHONE_DIGITS} digits).`
  }

  if (!EMAIL_RE.test(form.email.trim())) {
    errors.email = 'Please enter a valid email address.'
  }

  if (!form.service) errors.service = 'Please choose a service.'

  if (!form.branch) errors.branch = 'Please select a preferred meeting option.'

  if (form.message.trim().length < MIN_MESSAGE_CHARS) {
    errors.message = `Please write at least ${MIN_MESSAGE_CHARS} characters about your case.`
  }

  return errors
}

export default function HomePage() {
  const [formSuccess, setFormSuccess] = useState(false)
  const [formError, setFormError] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const [formSending, setFormSending] = useState(false)
  const [sendCooldown, setSendCooldown] = useState(0)
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    branch: '',
    date: '',
    message: '',
  })

  useEffect(() => {
    if (sendCooldown <= 0) return undefined
    const timer = setTimeout(() => setSendCooldown((s) => s - 1), 1000)
    return () => clearTimeout(timer)
  }, [sendCooldown])

  function clearFieldError(key) {
    setFieldErrors((errs) => {
      if (!errs[key]) return errs
      const next = { ...errs }
      delete next[key]
      return next
    })
  }

  function updateField(key) {
    return (e) => {
      clearFieldError(key)
      setForm((f) => ({ ...f, [key]: e.target.value }))
    }
  }

  function updatePhone(e) {
    clearFieldError('phone')
    const value = e.target.value
    if (countDigits(value) <= MAX_PHONE_DIGITS) {
      setForm((f) => ({ ...f, phone: value }))
    }
  }

  async function handleBooking(e) {
    e.preventDefault()
    if (sendCooldown > 0) return

    const errors = validateForm(form)
    if (Object.keys(errors).length) {
      setFieldErrors(errors)
      setFormError('Please fix the highlighted fields and try again.')
      setFormSuccess(false)
      return
    }

    setFormError('')
    setFieldErrors({})
    setFormSuccess(false)
    setFormSending(true)

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${BOOKING_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: `Appointment request — ${form.service || 'Consultation'}`,
          _template: 'table',
          _captcha: 'false',
          name: form.name,
          phone: form.phone,
          email: form.email,
          service: form.service,
          preferred_meeting: form.branch,
          preferred_date: form.date || 'Flexible',
          message: form.message || '(none provided)',
        }),
      })

      const result = await response.json().catch(() => ({}))
      if (!response.ok) {
        throw new Error(result.message || 'Could not send your request. Please try again.')
      }

      setFormSuccess(true)
      setSendCooldown(SEND_COOLDOWN_SEC)
      setForm({
        name: '',
        phone: '',
        email: '',
        service: '',
        branch: '',
        date: '',
        message: '',
      })
    } catch (err) {
      setFormError(err.message || 'Could not send your request. Please try again or WhatsApp us.')
    } finally {
      setFormSending(false)
    }
  }

  return (
    <>
      <main id="top">
        <section className="hero">
          <div className="hero-media">
            <picture>
              <source media="(max-width: 760px)" srcSet="/images/hero-mobile.jpg" />
              <img src="/images/hero-desktop.jpg" alt="Family travel and immigration journey" fetchPriority="high" />
            </picture>
          </div>
          <div className="hero-shade" />
          <div className="hero-grain" aria-hidden="true" />
          <div className="hero-orb hero-orb-a" aria-hidden="true" />
          <div className="hero-orb hero-orb-b" aria-hidden="true" />
          <div className="wrap hero-inner">
            <h1>
              We make the <em>visa process</em> clearer
            </h1>
            <p className="hero-lead">
              Family Consultants, DHA Phase 6 Karachi: Canada visit visas, study & work permits, Express Entry, PNP, family sponsorship and UK study — handled by one licensed team from consultation to landing.
            </p>
            <div className="hero-actions">
              <a href="#booking" className="btn btn-primary">
                Book Free Consultation <IconArrow />
              </a>
              <a href="#destinations" className="btn btn-ghost">Explore Services</a>
              <a href={WHATSAPP_URL} className="btn btn-wa" target="_blank" rel="noopener noreferrer">
                <IconWhatsApp filled /> WhatsApp
              </a>
            </div>
          </div>
        </section>

        <section className="trust" aria-label="Key figures">
          <div className="wrap">
            <div className="trust-row">
              {[
                [13, 'Years Experience'],
                [1400, 'Visas Processed'],
                [92, 'Approval Rate'],
                [1, 'Karachi Office'],
              ].map(([n, label], i) => (
                <Reveal key={label} className="trust-item" delay={i * 0.06}>
                  <CountUp to={n} suffixClass="n" />
                  <div className="l">{label}</div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="services" id="study-uk">
          <div className="wrap">
            <Reveal className="section-head center">
              <span className="eyebrow">Study in UK</span>
              <h2>World-class British universities</h2>
              <p style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                Oxford, Cambridge, Imperial, UCL, LSE and more — explore leading UK study destinations we guide applicants toward.
              </p>
            </Reveal>
            <div className="services-grid services-grid-5 scene-3d">
              {UK_UNIVERSITIES.slice(0, 5).map((uni, i) => (
                <Reveal key={uni.slug} delay={i * 0.06} className={i === 4 ? 'svc-span' : undefined}>
                  <TiltCard>
                    <Link to="/study-in-uk" className="svc depth-card">
                      <img src={uni.img} alt={uni.alt} />
                      <div className="svc-body">
                        <span className="label">United Kingdom</span>
                        <h3>{uni.name}</h3>
                        <p>{uni.focus}</p>
                        <span className="lrn">Explore Study in UK <IconArrow /></span>
                      </div>
                    </Link>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 28 }}>
              <Link to="/study-in-uk" className="btn btn-primary">
                View all UK universities <IconArrow />
              </Link>
            </div>
          </div>
        </section>

        <section className="about about-teaser" id="about">
          <div className="wrap about-welcome-grid">
            <Reveal className="about-visual">
              <div className="about-frame depth-frame">
                <img src="/images/meeting.jpg" alt="Consultant meeting with a client" />
              </div>
              <div className="about-float">
                <div className="row">
                  <div className="av"><img src="/images/clients.jpg" alt="" /></div>
                  <div>
                    <b>Trusted partner</b>
                    <span>Canada immigration specialists</span>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal className="about-copy" delay={0.1}>
              <span className="eyebrow">About our office</span>
              <h2>A life-changing journey — guided with clarity</h2>
              <p>
                A trusted partner for individuals and families who dream of building a future in Canada. Immigration is not just paperwork — it is a life-changing journey.
              </p>
              <p>
                From visit and study visas to Express Entry, PNP, family sponsorship, and settlement — we tailor the right pathway to your goals.
              </p>
              <div className="about-pills">
                <span>Clarity</span>
                <span>Confidence</span>
                <span>Success</span>
                <span>End-to-end support</span>
              </div>
              <div className="about-teaser-actions">
                <Link to="/about" className="btn btn-primary">
                  Read our full story <IconArrow />
                </Link>
                <Link to="/#booking" className="btn btn-dark">Book consultation</Link>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="destinations" id="destinations">
          <div className="destinations-bg">
            <img src="/images/travel-bg.jpg" alt="Airplane flying over city lights" />
          </div>
          <div className="wrap">
            <Reveal>
              <span className="eyebrow">Canada services</span>
              <h2>Canada — every major route covered.</h2>
              <p className="sub">
                We focus on Canadian immigration so our advice stays current, specific, and genuinely expert.
              </p>
            </Reveal>
            <div className="dest-grid">
              {[
                ['/images/toronto.jpg', 'Toronto skyline at dusk', 'Visit Visa', 'Tourism & family visits', '/services/visit-visa', false],
                ['/images/canada-nature.jpg', 'Canadian mountain landscape', 'Work Visa', 'LMIA & skilled pathways', '/services/work-visa', false],
                ['/images/campus.jpg', 'University campus building', 'Study Visa', 'DLI admissions & PGWP', '/services/study-visa', false],
                ['/images/family.jpg', 'Family together', 'Family & PR', 'Sponsorship & settlement', '/services/family-sponsorship-settlement', true],
                ['/images/meeting.jpg', 'Consultation meeting for Express Entry', 'Express Entry & PNP', 'Skilled migration to Canada', '/services/express-entry-pnp', true],
              ].map(([img, alt, title, sub, href, wide], i) => (
                <Reveal key={title} className={`dest${wide ? ' dest-wide' : ''}`} delay={i * 0.07}>
                  <Link to={href} className="dest-link">
                    <img src={img} alt={alt} />
                    <div className="dest-body">
                      <h3>{title}</h3>
                      <span>{sub}</span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="process" id="process">
          <div className="wrap">
            <Reveal className="section-head center">
              <span className="eyebrow">Simple process</span>
              <h2>Four clear steps to your visa</h2>
              <p style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                The real order of a genuine application — nothing skipped, nothing rushed.
              </p>
            </Reveal>
            <div className="process-track">
              {[
                ['01', 'Free Consultation', 'We review your profile and goals, and tell you honestly if you qualify.'],
                ['02', 'Document Prep', 'Your case officer builds a personalised checklist and gathers every document.'],
                ['03', 'Application Filing', 'Forms, payments, and evidence submitted correctly — the first time.'],
                ['04', 'Visa & Departure', 'Once approved, we help with travel booking and pre-departure briefing.'],
              ].map(([num, title, copy], i) => (
                <Reveal key={num} className="step" delay={i * 0.08}>
                  <div className="step-num">{num}</div>
                  <h4>{title}</h4>
                  <p>{copy}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="booking" id="booking">
          <div className="booking-bg">
            <img src="/images/hero.jpg" alt="Aircraft wing above clouds" />
          </div>
          <div className="wrap">
            <Reveal className="section-head center">
              <span className="eyebrow" style={{ justifyContent: 'center' }}>Book an appointment</span>
              <h2>Sit down with a case officer</h2>
              <p style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                Free 30-minute consultation — in person at our Karachi office, or over video.
              </p>
            </Reveal>
            <Reveal className="booking-panel" delay={0.1}>
              <form onSubmit={handleBooking}>
                <div className="form-row">
                  <div className={`field${fieldErrors.name ? ' has-error' : ''}`}>
                    <label htmlFor="fname">Full Name</label>
                    <input id="fname" type="text" required placeholder="Your name" autoComplete="name" value={form.name} onChange={updateField('name')} />
                    {fieldErrors.name && <p className="field-error">{fieldErrors.name}</p>}
                  </div>
                  <div className={`field${fieldErrors.phone ? ' has-error' : ''}`}>
                    <label htmlFor="fphone">Phone Number</label>
                    <input
                      id="fphone"
                      type="tel"
                      required
                      placeholder="+92 3XX XXXXXXX"
                      autoComplete="tel"
                      inputMode="tel"
                      value={form.phone}
                      onChange={updatePhone}
                    />
                    {fieldErrors.phone
                      ? <p className="field-error">{fieldErrors.phone}</p>
                      : <p className="field-hint">Up to {MAX_PHONE_DIGITS} digits — international numbers welcome.</p>}
                  </div>
                </div>
                <div className="form-row">
                  <div className={`field${fieldErrors.email ? ' has-error' : ''}`}>
                    <label htmlFor="femail">Email</label>
                    <input id="femail" type="email" required placeholder="you@example.com" autoComplete="email" value={form.email} onChange={updateField('email')} />
                    {fieldErrors.email && <p className="field-error">{fieldErrors.email}</p>}
                  </div>
                  <div className={`field${fieldErrors.service ? ' has-error' : ''}`}>
                    <label htmlFor="fservice">Service</label>
                    <select id="fservice" required value={form.service} onChange={updateField('service')}>
                      <option value="" disabled>Choose a service</option>
                      {SERVICES.map((s) => (
                        <option key={s.slug}>{s.title}</option>
                      ))}
                      <option>Not sure yet</option>
                    </select>
                    {fieldErrors.service && <p className="field-error">{fieldErrors.service}</p>}
                  </div>
                </div>
                <div className="form-row">
                  <div className={`field${fieldErrors.branch ? ' has-error' : ''}`}>
                    <label htmlFor="fbranch">Preferred Meeting</label>
                    <select id="fbranch" required value={form.branch} onChange={updateField('branch')}>
                      <option value="" disabled>Select an option</option>
                      <option>Gathering information</option>
                      <option>Karachi — DHA Phase 6</option>
                      <option>Video Call</option>
                    </select>
                    {fieldErrors.branch && <p className="field-error">{fieldErrors.branch}</p>}
                    {form.branch === 'Karachi — DHA Phase 6' && (
                      <a
                        className="meeting-maps-link"
                        href={OFFICE.directions}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <IconPin /> View office on Google Maps
                      </a>
                    )}
                  </div>
                  <div className="field">
                    <label htmlFor="fdate">Preferred Date</label>
                    <input id="fdate" type="date" value={form.date} onChange={updateField('date')} />
                  </div>
                </div>
                <div className="form-row">
                  <div className={`field full${fieldErrors.message ? ' has-error' : ''}`}>
                    <label htmlFor="fmsg">Tell us about your case</label>
                    <textarea
                      id="fmsg"
                      required
                      placeholder="E.g. Inviting my parents for my daughter’s birth..."
                      value={form.message}
                      onChange={updateField('message')}
                    />
                    {fieldErrors.message
                      ? <p className="field-error">{fieldErrors.message}</p>
                      : <p className="field-hint">Minimum {MIN_MESSAGE_CHARS} characters.</p>}
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary form-submit"
                  disabled={formSending || sendCooldown > 0}
                >
                  {formSending
                    ? 'Sending…'
                    : sendCooldown > 0
                      ? `Sent — send again in ${sendCooldown}s`
                      : 'Confirm appointment request'}
                </button>
                <p className="form-note">
                  We’ll confirm within one business day.
                </p>
                {formSuccess && (
                  <div className="form-success show">
                    <IconCheck />
                    Request received — our team will contact you shortly to confirm.
                  </div>
                )}
                {formError && (
                  <div className="form-error show">
                    {formError}
                  </div>
                )}
              </form>
            </Reveal>
          </div>
        </section>
      </main>

      <section className="contact-cta" id="contact">
        <div className="contact-cta-bg">
          <img src="/images/clouds.jpg" alt="Airplane flying through clouds" />
        </div>
        <div className="wrap contact-inner">
          <h2>Ready to talk about your Canadian visa? We’re one call or WhatsApp away.</h2>
          <div className="contact-actions">
            <a href={`tel:${PRIMARY_PHONE.tel}`} className="btn btn-light">Call {PRIMARY_PHONE.display}</a>
            <a href={WHATSAPP_URL} className="btn btn-wa" target="_blank" rel="noopener noreferrer">
              <IconWhatsApp filled /> WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
