export const SERVICES = [
  {
    slug: 'visit-visa',
    shortTitle: 'Visit Visa',
    title: 'Canada Visit Visa',
    eyebrow: 'Temporary Resident Visa',
    label: 'Canada',
    img: '/images/family.jpg',
    heroImg: '/images/canada-nature.jpg',
    alt: 'Family visiting Canada',
    summary:
      'Short-term stays for tourism, family visits, or business — experience Canada’s culture, cities, and landscapes.',
    intro:
      'Canada’s Visit Visa is designed for short-term stays, whether for tourism, family visits, or business meetings. It allows foreign nationals to experience Canada’s culture, natural beauty, and vibrant cities.',
    sections: [
      {
        icon: 'purpose',
        title: 'Purpose',
        items: [
          { label: 'Tourism', text: 'Explore destinations like Niagara Falls, Banff, and Vancouver.' },
          { label: 'Family Visits', text: 'Spend time with relatives living in Canada.' },
          { label: 'Business Trips', text: 'Attend meetings, conferences, or trade events.' },
        ],
      },
      {
        icon: 'eligibility',
        title: 'Eligibility',
        items: [
          { text: 'Valid passport and travel documents.' },
          { text: 'Proof of financial support for your stay.' },
        ],
      },
    ],
    role: 'We prepare invitation letters, strengthen your ties-to-home evidence, and file a complete visitor application with IRCC.',
    cta: 'Book a visit visa consultation',
  },
  {
    slug: 'study-visa',
    shortTitle: 'Study Visa',
    title: 'Canada Study Visa',
    eyebrow: 'Study Permit',
    label: 'Canada',
    img: '/images/study.jpg',
    heroImg: '/images/campus.jpg',
    alt: 'Students on a Canadian campus',
    summary:
      'Enrol in Canadian universities, colleges, or vocational institutions — with work options and a path to PR.',
    intro:
      'Canada is one of the world’s top destinations for international students. A Study Visa allows you to enroll in Canadian universities, colleges, or vocational institutions.',
    sections: [
      {
        icon: 'purpose',
        title: 'Purpose',
        items: [
          { text: 'Access world-class education.' },
          { text: 'Gain international exposure.' },
          { text: 'Pathway to permanent residency after graduation.' },
        ],
      },
      {
        icon: 'eligibility',
        title: 'Eligibility',
        items: [
          { text: 'Letter of acceptance from a Designated Learning Institution (DLI).' },
          { text: 'Proof of funds for tuition and living expenses.' },
          { text: 'English/French language proficiency.' },
          { text: 'Clean criminal record and medical clearance.' },
        ],
      },
      {
        icon: 'work',
        title: 'Work Options',
        items: [
          { text: 'Part-time work during studies (up to 20 hours/week).' },
          { text: 'Post-Graduation Work Permit (PGWP) for up to 3 years.' },
        ],
      },
    ],
    role: 'We guide students through admissions, visa filing, and settlement planning.',
    cta: 'Start your study plan',
  },
  {
    slug: 'work-visa',
    shortTitle: 'Work Visa',
    title: 'Canada Work Visa',
    eyebrow: 'Work Permit',
    label: 'Canada',
    img: '/images/work.jpg',
    heroImg: '/images/toronto.jpg',
    alt: 'Professionals working in Canada',
    summary:
      'Skilled and labour pathways to work in Canada, build experience, and move toward permanent residency.',
    intro:
      'Canada’s Work Visa provides opportunities for skilled professionals and labor categories to contribute to the Canadian economy.',
    sections: [
      {
        icon: 'purpose',
        title: 'Purpose',
        items: [
          { text: 'Fill labor shortages in healthcare, IT, construction, and more.' },
          { text: 'Gain Canadian work experience.' },
          { text: 'Pathway to permanent residency.' },
        ],
      },
      {
        icon: 'eligibility',
        title: 'Eligibility',
        items: [
          { text: 'Job offer from a Canadian employer.' },
          { text: 'Labor Market Impact Assessment (LMIA) approval (in most cases).' },
          { text: 'Relevant qualifications and work experience.' },
        ],
      },
      {
        icon: 'duration',
        title: 'Duration',
        items: [{ text: 'Typically valid for 1–3 years, renewable.' }],
      },
    ],
    role: 'We connect candidates with employers, prepare documentation, and ensure compliance with Canadian labor laws.',
    cta: 'Discuss your work pathway',
  },
  {
    slug: 'express-entry-pnp',
    shortTitle: 'Express Entry & PNP',
    title: 'Express Entry & PNP',
    eyebrow: 'Permanent Residency',
    label: 'Canada',
    img: '/images/toronto.jpg',
    heroImg: '/images/travel-bg.jpg',
    alt: 'Canadian skyline representing permanent residency',
    summary:
      'The fastest federal and provincial routes to Canadian permanent residency.',
    intro:
      'Canada’s Express Entry and Provincial Nominee Program (PNP) are the fastest pathways to permanent residency.',
    sections: [
      {
        icon: 'purpose',
        title: 'Express Entry',
        items: [
          { text: 'Points-based system (CRS score).' },
          { text: 'Factors: Age, education, work experience, language skills.' },
          { text: 'Regular draws invite top candidates to apply for PR.' },
        ],
      },
      {
        icon: 'eligibility',
        title: 'Provincial Nominee Program (PNP)',
        items: [
          { text: 'Provinces nominate candidates based on local labor needs.' },
          { text: 'Tailored opportunities for specific industries.' },
        ],
      },
    ],
    role: 'We evaluate CRS scores, create Express Entry profiles, and manage provincial applications to maximize chances of selection.',
    cta: 'Get a CRS assessment',
  },
  {
    slug: 'family-sponsorship-settlement',
    shortTitle: 'Family & Settlement',
    title: 'Family Sponsorship & Settlement',
    eyebrow: 'Reunification',
    label: 'Canada',
    img: '/images/meeting.jpg',
    heroImg: '/images/family.jpg',
    alt: 'Family reunification in Canada',
    summary:
      'Sponsor loved ones for permanent residency and settle smoothly into Canadian life.',
    intro:
      'Canada values family reunification and smooth settlement for newcomers.',
    sections: [
      {
        icon: 'purpose',
        title: 'Family Sponsorship',
        items: [
          { text: 'Sponsor spouse, children, parents, or relatives.' },
          { text: 'Secure permanent residency for loved ones.' },
        ],
      },
      {
        icon: 'eligibility',
        title: 'Settlement Services',
        items: [
          { text: 'Housing assistance.' },
          { text: 'Healthcare guidance.' },
          { text: 'Job search support.' },
          { text: 'Cultural integration programs.' },
        ],
      },
    ],
    role: 'We prepare sponsorship applications and provide settlement planning to ensure a smooth transition to Canadian life.',
    cta: 'Plan family reunification',
  },
]

export function getService(slug) {
  return SERVICES.find((s) => s.slug === slug)
}
