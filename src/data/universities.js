import seedUniversities from './universities.seed.json'

const HIPO_RAW_URL =
  'https://raw.githubusercontent.com/Hipo/university-domains-list/master/world_universities_and_domains.json'

const CACHE_KEY = 'fc-universities-cache-v1'
const CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000

function normalizeCountry(country) {
  const c = String(country || '').trim().toLowerCase()
  if (c === 'canada') return 'Canada'
  if (c === 'united kingdom') return 'UK'
  return null
}

function bestDomain(domains = []) {
  const scored = []
  for (const raw of domains) {
    let d = String(raw || '').toLowerCase().trim()
    if (d.startsWith('www.')) d = d.slice(4)
    if (!d || d.includes(' ')) continue
    let score = 0
    const dots = (d.match(/\./g) || []).length
    if (d.endsWith('.ac.uk')) score += 6
    else if (d.endsWith('.edu')) score += 4
    else if (d.endsWith('.ca')) score += 4
    if (dots === 1) score += 2
    if (/facebook|twitter|linkedin|youtube|blogspot/.test(d)) score -= 20
    scored.push([score, d.length, d])
  }
  if (!scored.length) return null
  scored.sort((a, b) => b[0] - a[0] || a[1] - b[1])
  return scored[0][2]
}

/**
 * Keep the curated seed list (quality + count), but refresh domains from
 * the latest Hipo dataset when a confident name match exists.
 */
function mergeWithHipo(rows) {
  const index = []
  for (const row of rows) {
    const country = normalizeCountry(row.country)
    if (!country) continue
    const name = String(row.name || '').replace(/\s+/g, ' ').trim()
    const domain = bestDomain(row.domains)
    if (!name || !domain) continue
    index.push({ name, domain, country, low: name.toLowerCase() })
  }

  return seedUniversities.map((seed) => {
    const target = seed.name.toLowerCase()
    let best = null
    let bestScore = -1

    for (const row of index) {
      if (row.country !== seed.country) continue
      let score = -1
      if (row.low === target) score = 100
      else if (row.domain === seed.domain) score = 90
      else if (row.low.includes(target) || target.includes(row.low)) {
        score = 70 - Math.abs(row.low.length - target.length)
      }
      if (score > bestScore) {
        bestScore = score
        best = row
      }
    }

    if (best && bestScore >= 70) {
      return {
        name: seed.name,
        domain: best.domain || seed.domain,
        country: seed.country,
      }
    }
    return seed
  })
}

function readCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed?.savedAt || !Array.isArray(parsed?.universities)) return null
    if (Date.now() - parsed.savedAt > CACHE_TTL_MS) return null
    if (parsed.universities.length < 40) return null
    return parsed.universities
  } catch {
    return null
  }
}

function writeCache(universities) {
  try {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ savedAt: Date.now(), universities }),
    )
  } catch {
    // ignore quota / private mode
  }
}

/**
 * Load curated UK + Canada universities.
 * Order: localStorage cache → GitHub Hipo JSON (domain refresh) → bundled seed.
 */
export async function loadUniversities() {
  const cached = readCache()
  if (cached) return { universities: cached, source: 'cache' }

  try {
    const res = await fetch(HIPO_RAW_URL, {
      headers: { Accept: 'application/json' },
    })
    if (!res.ok) throw new Error(`Hipo fetch failed: ${res.status}`)
    const rows = await res.json()
    if (!Array.isArray(rows) || !rows.length) throw new Error('Hipo payload empty')
    const universities = mergeWithHipo(rows)
    writeCache(universities)
    return { universities, source: 'hipo' }
  } catch {
    return { universities: seedUniversities, source: 'seed' }
  }
}

export { seedUniversities }
