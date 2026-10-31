import { OFFICE, PRIMARY_PHONE, WHATSAPP_URL } from '../data/contact'
import { SERVICES } from '../data/services'

export const SITE_URL = 'https://axorapk.com'
export const SITE_NAME = 'Family Consultants'
export const DEFAULT_IMAGE = '/images/hero-desktop.jpg'

const BASE_KEYWORDS = [
  'family consultants',
  'family consultants karachi',
  'immigration consultants karachi',
  'visa consultants karachi',
  'canada visa consultant pakistan',
  'DHA phase 6 karachi visa consultant',
]

const PAGES = {
  '/': {
    title: 'Family Consultants Karachi | Canada & UK Visa and Immigration Consultants',
    description:
      'Family Consultants, DHA Phase 6 Karachi — trusted visa & immigration consultants for Canada visit visas, study & work permits, Express Entry, PNP, family sponsorship and UK study. Free consultation: 0325 2900345.',
    keywords: ['canada immigration consultant', 'uk study visa consultant', 'free visa consultation karachi'],
  },
  '/about': {
    title: 'About Family Consultants | Immigration Consultants in Karachi',
    description:
      'About Family Consultants — a Karachi immigration consultancy in DHA Phase 6 guiding families, students and workers through Canada visas, PR pathways and settlement.',
    keywords: ['about family consultants', 'canada pr consultant karachi'],
  },
  '/study-in-uk': {
    title: 'Study in UK from Pakistan | Family Consultants Karachi',
    description:
      'Plan your UK study visa with Family Consultants, Karachi — admissions guidance for Oxford, Cambridge, Imperial, LSE, UCL, KCL, Manchester, Edinburgh and more.',
    keywords: ['study in uk from pakistan', 'uk student visa consultant karachi', 'uk university admissions'],
    image: '/images/uk/hero.jpg',
  },
}

for (const s of SERVICES) {
  PAGES[`/services/${s.slug}`] = {
    title: `${s.title} Consultants in Karachi | Family Consultants`,
    description: `${s.title} from Pakistan with Family Consultants, DHA Phase 6 Karachi. ${s.summary} Free consultation: 0325 2900345.`,
    keywords: [`${s.title.toLowerCase()} consultant`, `${s.title.toLowerCase()} from pakistan`],
    image: s.heroImg,
    service: s,
  }
}

export const ROUTES = Object.keys(PAGES)

export function normalizePath(pathname) {
  if (!pathname || pathname === '/') return '/'
  return pathname.replace(/\/+$/, '')
}

export function getPageMeta(pathname) {
  const path = PAGES[normalizePath(pathname)] ? normalizePath(pathname) : '/'
  const page = PAGES[path]
  return {
    path,
    title: page.title,
    description: page.description,
    service: page.service,
    keywords: [...BASE_KEYWORDS, ...(page.keywords || [])].join(', '),
    url: `${SITE_URL}${path}`,
    image: `${SITE_URL}${page.image || DEFAULT_IMAGE}`,
  }
}

export function getJsonLd(pathname) {
  const meta = getPageMeta(pathname)
  const businessId = `${SITE_URL}/#business`
  const graph = [
    {
      '@type': ['ProfessionalService', 'LocalBusiness'],
      '@id': businessId,
      name: SITE_NAME,
      alternateName: ['Family Consultants Karachi', 'Family Consultant'],
      description: PAGES['/'].description,
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/logo.png`,
      image: `${SITE_URL}${DEFAULT_IMAGE}`,
      telephone: PRIMARY_PHONE.tel,
      address: {
        '@type': 'PostalAddress',
        streetAddress: OFFICE.address,
        addressLocality: 'Karachi',
        addressRegion: 'Sindh',
        addressCountry: 'PK',
      },
      areaServed: ['Karachi', 'Pakistan'],
      sameAs: [WHATSAPP_URL],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Visa & immigration services',
        itemListElement: SERVICES.map((s) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: s.title, url: `${SITE_URL}/services/${s.slug}` },
        })),
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      publisher: { '@id': businessId },
      inLanguage: 'en',
    },
    {
      '@type': 'WebPage',
      '@id': `${meta.url}#webpage`,
      url: meta.url,
      name: meta.title,
      description: meta.description,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': businessId },
    },
  ]

  if (meta.path !== '/') {
    const crumbs = [{ name: 'Home', url: `${SITE_URL}/` }]
    crumbs.push({ name: meta.title.split(' | ')[0], url: meta.url })
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: crumbs.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: c.name,
        item: c.url,
      })),
    })
  }

  if (meta.service) {
    graph.push({
      '@type': 'Service',
      name: meta.service.title,
      description: meta.service.intro,
      serviceType: meta.service.eyebrow,
      url: meta.url,
      provider: { '@id': businessId },
      areaServed: ['Karachi', 'Pakistan'],
    })
  }

  return { '@context': 'https://schema.org', '@graph': graph }
}

function escapeAttr(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

export function renderHeadTags(pathname) {
  const m = getPageMeta(pathname)
  const json = JSON.stringify(getJsonLd(pathname)).replace(/</g, '\\u003c')
  return [
    `<title>${escapeAttr(m.title)}</title>`,
    `<meta name="description" content="${escapeAttr(m.description)}" />`,
    `<meta name="keywords" content="${escapeAttr(m.keywords)}" />`,
    `<link rel="canonical" href="${m.url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:locale" content="en_PK" />`,
    `<meta property="og:title" content="${escapeAttr(m.title)}" />`,
    `<meta property="og:description" content="${escapeAttr(m.description)}" />`,
    `<meta property="og:url" content="${m.url}" />`,
    `<meta property="og:image" content="${m.image}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeAttr(m.title)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(m.description)}" />`,
    `<meta name="twitter:image" content="${m.image}" />`,
    `<script type="application/ld+json">${json}</script>`,
  ].join('\n    ')
}
