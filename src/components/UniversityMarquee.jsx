import { useEffect, useState } from 'react'
import { loadUniversities, seedUniversities } from '../data/universities'

const LOGO_TOKEN = 'pk_Em-DSkBiSK-PWqB7R13yjQ'

function logoUrl(domain) {
  const params = new URLSearchParams({
    token: LOGO_TOKEN,
    format: 'png',
    size: '64',
    retina: 'true',
    theme: 'light',
    fallback: '404',
  })
  return `https://img.logo.dev/${encodeURIComponent(domain)}?${params}`
}

function UniMark({ uni }) {
  const [failed, setFailed] = useState(false)
  const initial = (uni.name || '?').trim().charAt(0).toUpperCase()

  return (
    <li className="uni-marquee-item">
      <span className="uni-marquee-logo" aria-hidden="true">
        {!failed ? (
          <img
            src={logoUrl(uni.domain)}
            alt=""
            width={28}
            height={28}
            loading="lazy"
            decoding="async"
            onError={() => setFailed(true)}
          />
        ) : (
          <span className="uni-marquee-fallback">{initial}</span>
        )}
      </span>
      <span className="uni-marquee-name">{uni.name}</span>
      <span className="uni-marquee-country" aria-hidden="true">{uni.country}</span>
    </li>
  )
}

function MarqueeTrack({ universities, lane }) {
  return (
    <ul className="uni-marquee-track" aria-hidden={lane === 'b' ? 'true' : undefined}>
      {universities.map((uni) => (
        <UniMark key={`${lane}-${uni.country}-${uni.domain}`} uni={uni} />
      ))}
    </ul>
  )
}

/**
 * Fixed bottom university marquee.
 * Logos identify study destinations only — not partnerships or endorsements.
 */
export function UniversityMarquee() {
  const [universities, setUniversities] = useState(seedUniversities)

  useEffect(() => {
    let alive = true
    loadUniversities().then((result) => {
      if (alive && result?.universities?.length) {
        setUniversities(result.universities)
      }
    })
    return () => {
      alive = false
    }
  }, [])

  return (
    <aside
      className="uni-marquee"
      aria-label="Study destinations in Canada and the UK. Logos identify institutions only and do not imply endorsement or partnership."
    >
      <div className="uni-marquee-viewport">
        <div className="uni-marquee-rail">
          <MarqueeTrack universities={universities} lane="a" />
          <MarqueeTrack universities={universities} lane="b" />
        </div>
      </div>
    </aside>
  )
}
