import { Link } from 'react-router-dom'
import { WHATSAPP_URL } from '../data/contact'
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

const VISA_CATEGORIES = [
  {
    num: '01',
    title: 'Visit Visa',
    href: '/services/visit-visa',
    copy: 'Canada’s Visit Visa allows short-term stays for tourism, family visits, or business meetings. Applicants must demonstrate ties to their home country, financial stability, and a clear travel plan. While temporary, this visa opens the door to experiencing Canada’s culture and lifestyle.',
  },
  {
    num: '02',
    title: 'Study Visa',
    href: '/services/study-visa',
    copy: 'Canada is a global leader in education. A Study Visa enables international students to enroll in universities, colleges, and vocational institutions. Beyond academics, students gain valuable work experience through part-time jobs and post-graduation work permits, often leading to permanent residency.',
  },
  {
    num: '03',
    title: 'Work Visa',
    href: '/services/work-visa',
    copy: 'With a growing demand for skilled professionals, Canada offers temporary work permits. Applicants usually require a job offer and, in many cases, a Labor Market Impact Assessment (LMIA). Work visas provide a pathway to permanent residency while contributing to Canada’s economy.',
  },
  {
    num: '04',
    title: 'Express Entry',
    href: '/services/express-entry-pnp',
    copy: 'Express Entry is Canada’s flagship immigration system for skilled workers. It uses a points-based Comprehensive Ranking System (CRS) to evaluate candidates based on age, education, work experience, and language proficiency. Successful applicants receive invitations to apply for permanent residency.',
  },
  {
    num: '05',
    title: 'Provincial Nominee Program (PNP)',
    href: '/services/express-entry-pnp',
    copy: 'Each Canadian province has unique labor needs. Through PNP, provinces nominate candidates who match their requirements. This program is ideal for applicants with specialized skills or ties to specific regions.',
  },
  {
    num: '06',
    title: 'Family Sponsorship',
    href: '/services/family-sponsorship-settlement',
    copy: 'Canada values family reunification. Citizens and permanent residents can sponsor spouses, children, parents, and relatives. This pathway ensures loved ones can join and thrive together in Canada.',
  },
  {
    num: '07',
    title: 'Business & Investor Visa',
    href: '/#booking',
    copy: 'Entrepreneurs and investors can establish businesses in Canada, contributing to innovation and job creation. These visas are tailored for individuals with financial resources and business acumen.',
  },
  {
    num: '08',
    title: 'Settlement Services',
    href: '/services/family-sponsorship-settlement',
    copy: 'Immigration does not end with a visa approval. Settlement services help newcomers integrate into Canadian society by providing housing assistance, healthcare guidance, job search support, and cultural orientation.',
  },
]

const WHY_US = [
  ['Expert Guidance', 'Our consultants are trained in Canadian immigration law and policy.'],
  ['End-to-End Support', 'From initial consultation to post-arrival settlement.'],
  ['Proven Success', 'High approval rates backed by meticulous documentation.'],
  ['Personalized Strategy', 'Every applicant receives a tailored plan.'],
  ['Global Reach', 'Serving clients across multiple countries.'],
]

const BENEFITS = [
  ['Economic Opportunities', 'Access to jobs in healthcare, IT, engineering, and skilled trades.'],
  ['Education', 'World-class institutions with global recognition.'],
  ['Healthcare', 'Universal healthcare system ensuring quality medical care.'],
  ['Multicultural Society', 'Diversity and inclusivity at the heart of Canadian values.'],
  ['Permanent Residency & Citizenship', 'Pathways to secure long-term stability.'],
]

export default function AboutPage() {
  return (
    <main className="about-page">
      <section className="about-page-hero">
        <div className="about-page-hero-media">
          <img src="/images/meeting.jpg" alt="Consultation at Family Consultants office" />
        </div>
        <div className="about-page-hero-shade" />
        <div className="about-page-hero-pattern" aria-hidden="true" />
        <div className="wrap about-page-hero-inner">
          <div className="svc-hero-badge">
            <MapleMark />
            <span>Welcome to our office</span>
          </div>
          <h1>A trusted partner for your Canadian future</h1>
          <p className="svc-hero-lead">
            Immigration is not just paperwork — it is a life-changing journey. We guide applicants through every step with clarity, confidence, and success.
          </p>
          <div className="svc-hero-actions">
            <Link to="/#booking" className="btn btn-primary">
              Book free consultation <IconArrow />
            </Link>
            <a href={WHATSAPP_URL} className="btn btn-wa" target="_blank" rel="noopener noreferrer">
              <IconWhatsApp filled /> WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="about-page-intro wrap">
        <Reveal className="about-page-intro-grid">
          <div className="about-page-intro-copy">
            <span className="eyebrow">Our mission</span>
            <h2>Guiding families from first call to landing</h2>
            <p>
              A trusted partner for individuals and families who dream of building a future in Canada. Immigration is not just paperwork — it is a life-changing journey. Our office was established with the mission of guiding applicants through every step of the process, ensuring clarity, confidence, and success.
            </p>
            <p>
              We understand that Canada is one of the most sought-after destinations in the world. With its strong economy, world-class education system, advanced healthcare, and multicultural society, Canada offers opportunities that attract millions of applicants each year. Navigating this complex system requires expertise, and that is where we come in.
            </p>
            <div className="about-pills">
              <span>Clarity</span>
              <span>Confidence</span>
              <span>Success</span>
              <span>End-to-end support</span>
            </div>
          </div>
          <div className="about-page-intro-visual">
            <img src="/images/team.jpg" alt="Our consultancy team" />
            <div className="about-page-intro-card">
              <MapleMark />
              <strong>Canada-focused expertise</strong>
              <span>Tailored strategies for every applicant profile</span>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="about-canada about-page-canada">
        <div className="wrap about-canada-inner">
          <Reveal className="about-canada-copy">
            <span className="eyebrow">About Canada immigration</span>
            <h2>Pathways built to welcome newcomers</h2>
            <p>
              Canada’s immigration framework is designed to welcome newcomers who contribute to its economy, enrich its culture, and strengthen its communities. The government has built multiple pathways to accommodate different needs: students, workers, entrepreneurs, families, and visitors.
            </p>
            <p>
              Immigration is not a one-size-fits-all process. Each applicant’s journey depends on their background, goals, and eligibility. Our consultancy office specializes in tailoring strategies that match your profile with the right visa category.
            </p>
          </Reveal>
          <Reveal className="about-canada-panel" delay={0.1}>
            <img src="/images/canada-nature.jpg" alt="Canadian landscape" />
            <div className="about-canada-panel-body">
              <strong>Not one-size-fits-all</strong>
              <span>We match your profile to the right Canadian pathway.</span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="about-cats wrap about-page-cats">
        <Reveal className="section-head center">
          <span className="eyebrow">Visa categories we handle</span>
          <h2>Eight routes. One specialist team.</h2>
          <p style={{ marginLeft: 'auto', marginRight: 'auto' }}>
            From short visits to permanent residency and settlement — we cover the full Canadian immigration spectrum.
          </p>
        </Reveal>
        <div className="about-page-cat-grid">
          {VISA_CATEGORIES.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.04}>
              <Link to={item.href} className="about-page-cat">
                <div className="about-page-cat-top">
                  <span className="about-cat-num">{item.num}</span>
                  <MapleMark />
                </div>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
                <span className="lrn">Learn more <IconArrow /></span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="about-why-band">
        <div className="wrap">
          <Reveal className="section-head center">
            <span className="eyebrow">Why choose our office</span>
            <h2>Expertise you can lean on</h2>
          </Reveal>
          <div className="about-why-grid">
            {WHY_US.map(([title, copy], i) => (
              <Reveal key={title} className="about-why-card" delay={i * 0.06}>
                <span className="about-why-mark" aria-hidden="true" />
                <h3>{title}</h3>
                <p>{copy}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="about-benefits wrap about-page-benefits">
        <Reveal className="section-head center">
          <span className="eyebrow">Benefits of immigrating to Canada</span>
          <h2>Why millions choose Canada</h2>
        </Reveal>
        <div className="about-benefit-grid">
          {BENEFITS.map(([title, copy], i) => (
            <Reveal key={title} className="about-benefit" delay={i * 0.06}>
              <div className="about-benefit-ico"><IconCheck /></div>
              <div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="about-cta-row" delay={0.1}>
          <Link to="/#booking" className="btn btn-primary">Book free consultation <IconArrow /></Link>
          <Link to="/#destinations" className="btn btn-dark">View all services</Link>
          <a href={WHATSAPP_URL} className="btn btn-wa" target="_blank" rel="noopener noreferrer">
            <IconWhatsApp filled /> WhatsApp
          </a>
        </Reveal>
      </section>
    </main>
  )
}
