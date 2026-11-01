// Websites RaishaHost designed and built, shown on /work and the homepage.
// Screenshots live in public/work/<slug>.webp and <slug>-full.webp (scripts/shoot-work.mjs).
// List supplied by the owner (November 2026). Add a project here and to the script together.

export type WorkCategory =
  | 'ecommerce'
  | 'realestate'
  | 'architecture'
  | 'news'
  | 'garments'
  | 'isp'
  | 'finance'
  | 'travel'
  | 'renovation'
  | 'printing'
  | 'health'
  | 'education'

export const workCategories: Record<WorkCategory, { en: string; bn: string }> = {
  ecommerce: { en: 'E-commerce', bn: 'ই-কমার্স' },
  realestate: { en: 'Real estate & development', bn: 'রিয়েল এস্টেট ও ডেভেলপার' },
  architecture: { en: 'Architecture & interiors', bn: 'আর্কিটেকচার ও ইন্টেরিয়র' },
  news: { en: 'News & media', bn: 'সংবাদ ও মিডিয়া' },
  garments: { en: 'Garments & accessories', bn: 'গার্মেন্টস ও এক্সেসরিজ' },
  isp: { en: 'Internet providers', bn: 'ইন্টারনেট প্রোভাইডার' },
  finance: { en: 'Finance & consulting', bn: 'ফাইন্যান্স ও কনসালটিং' },
  travel: { en: 'Travel & tourism', bn: 'ভ্রমণ ও পর্যটন' },
  renovation: { en: 'Renovation & painting', bn: 'রেনোভেশন ও পেইন্টিং' },
  printing: { en: 'Printing', bn: 'প্রিন্টিং' },
  health: { en: 'Healthcare & medical supply', bn: 'স্বাস্থ্যসেবা ও মেডিকেল সাপ্লাই' },
  education: { en: 'Education & training', bn: 'শিক্ষা ও প্রশিক্ষণ' },
}

export interface WorkItem {
  slug: string
  name: string
  /** The address visitors open. */
  url: string
  /** Shown instead of the URL's host when set. */
  domain?: string
  category: WorkCategory
  /** One line about the site, in each language. */
  en: string
  bn: string
  /** Shown large at the top of /work and on the homepage. */
  featured?: boolean
  /**
   * The new site is still on a preview address; the link goes to the live domain and the card says
   * "new site launching". Remove once the domain points to the new site, and re-run
   * `scripts/shoot-work.mjs <slug>` against the live domain.
   */
  launching?: boolean
}

export const work: WorkItem[] = [
  {
    slug: 'londonpark',
    name: 'London Park & Cultural City',
    url: 'https://londonparkdhaka.com/',
    category: 'realestate',
    en: 'A city-scale resort and residential development in Dhaka, with projects, amenities and enquiries.',
    bn: 'ঢাকায় একটি বড় রিসোর্ট ও আবাসিক প্রকল্প: প্রজেক্ট, সুযোগ-সুবিধা ও যোগাযোগ।',
    featured: true,
  },
  {
    slug: 'camerabazar',
    name: 'Camera Bazar',
    url: 'https://camerabazar.net/',
    category: 'ecommerce',
    en: 'Online store for broadcast and imaging equipment, from a trusted importer since 2000.',
    bn: 'ব্রডকাস্ট ও ইমেজিং যন্ত্রপাতির অনলাইন শপ, ২০০০ সাল থেকে বিশ্বস্ত আমদানিকারক।',
    featured: true,
  },
  {
    slug: 'primefinance',
    name: 'Prime Finance',
    url: 'https://primefinancr.com.au/',
    category: 'finance',
    en: 'Finance consultancy website for clients in Australia.',
    bn: 'অস্ট্রেলিয়ার ক্লায়েন্টদের জন্য ফাইন্যান্স কনসালটেন্সি ওয়েবসাইট।',
    featured: true,
  },
  {
    slug: 'rcn',
    name: 'RCN Broadband',
    url: 'https://rcnbd.net/',
    domain: 'rcnbd.net',
    category: 'isp',
    en: 'A new website for an internet service provider: packages, coverage and support.',
    bn: 'একটি ইন্টারনেট সার্ভিস প্রোভাইডারের নতুন ওয়েবসাইট: প্যাকেজ, কাভারেজ ও সাপোর্ট।',
    featured: true,
    launching: true,
  },
  {
    slug: 'wingsfly',
    name: 'Wings Fly Aviation Academy',
    url: 'https://wingsflyaviationacademy.com/',
    category: 'education',
    en: 'Aviation career training academy: courses, admissions and student information.',
    bn: 'এভিয়েশন ক্যারিয়ার ট্রেনিং একাডেমি: কোর্স, ভর্তি ও শিক্ষার্থীদের তথ্য।',
    featured: true,
  },
  {
    slug: 'smartarchi',
    name: 'Smart Architects & Interior Decor',
    url: 'https://smartarchibd.com/',
    category: 'architecture',
    en: 'Architecture and interior design studio with services and a project portfolio.',
    bn: 'আর্কিটেকচার ও ইন্টেরিয়র ডিজাইন স্টুডিও: সার্ভিস ও প্রজেক্ট পোর্টফোলিও।',
    featured: true,
  },
  {
    slug: 'greenpeak',
    name: 'Green Peak',
    url: 'https://greenpeakbd.com/',
    category: 'realestate',
    en: 'Real estate developer: ongoing and completed projects.',
    bn: 'রিয়েল এস্টেট ডেভেলপার: চলমান ও সম্পন্ন প্রজেক্ট।',
  },
  {
    slug: 'gloriahomes',
    name: 'Gloria Homes',
    url: 'https://gloriahomesbd.com/',
    category: 'realestate',
    en: 'Homes and apartments from a residential developer.',
    bn: 'একটি আবাসিক ডেভেলপারের বাড়ি ও অ্যাপার্টমেন্ট।',
  },
  {
    slug: 'porzobekkhon',
    name: 'Porzobekkhon',
    url: 'https://porzobekkhon.net/',
    category: 'news',
    en: 'Bangla online newspaper with news sections and categories.',
    bn: 'বাংলা অনলাইন সংবাদপত্র, বিভাগ ও ক্যাটাগরিসহ।',
  },
  {
    slug: 'fnf',
    name: 'Fancy Narrow Fabrics',
    url: 'https://fnfltd.com/',
    category: 'garments',
    en: 'Garment accessories manufacturer: woven and knitted elastics, tapes and drawstrings.',
    bn: 'গার্মেন্টস এক্সেসরিজ প্রস্তুতকারক: ইলাস্টিক, টেপ ও ড্রস্ট্রিং।',
  },
  {
    slug: 'jake',
    name: 'Jake',
    url: 'https://www.jakebd.com/',
    domain: 'jakebd.com',
    category: 'garments',
    en: 'Garment accessories supplier: product range and contact.',
    bn: 'গার্মেন্টস এক্সেসরিজ সরবরাহকারী: পণ্যের তালিকা ও যোগাযোগ।',
  },
  {
    slug: 'hexagontex',
    name: 'Hexagon Tex',
    url: 'https://hexagontex.com/',
    category: 'garments',
    en: 'Textile and garment accessories company website.',
    bn: 'টেক্সটাইল ও গার্মেন্টস এক্সেসরিজ প্রতিষ্ঠানের ওয়েবসাইট।',
  },
  {
    slug: 'rolatrims',
    name: 'Rola Trims Solution',
    url: 'https://rolatrims.com/',
    category: 'garments',
    en: 'Trims and accessories for the garment industry.',
    bn: 'গার্মেন্টস শিল্পের জন্য ট্রিমস ও এক্সেসরিজ।',
  },
  {
    slug: 'janani',
    name: 'Janani',
    url: 'https://jananibd.com/',
    category: 'isp',
    en: 'Internet service provider: packages and coverage.',
    bn: 'ইন্টারনেট সার্ভিস প্রোভাইডার: প্যাকেজ ও কাভারেজ।',
  },
  {
    slug: 'rmttourism',
    name: 'RMT Tourism',
    url: 'https://rmttourism.com/',
    category: 'travel',
    en: 'Travel and tourism agency: tours, packages and bookings.',
    bn: 'ভ্রমণ ও পর্যটন এজেন্সি: ট্যুর, প্যাকেজ ও বুকিং।',
  },
  {
    slug: 'sgreliable',
    name: 'SG Reliable Painting',
    url: 'https://sgreliablepainting.com/',
    category: 'renovation',
    en: 'Painting and renovation services company.',
    bn: 'পেইন্টিং ও রেনোভেশন সার্ভিস প্রতিষ্ঠান।',
  },
  {
    slug: 'sohelart',
    name: 'Sohel Art',
    url: 'https://sohelart.com/',
    category: 'printing',
    en: 'Printing press: print products and services.',
    bn: 'প্রিন্টিং প্রেস: প্রিন্ট পণ্য ও সার্ভিস।',
  },
  {
    slug: 'ultratech',
    name: 'Ultratech',
    url: 'https://ultratechbd.com/',
    category: 'health',
    en: 'Supplier of hospital, pathology and medical devices.',
    bn: 'হাসপাতাল, প্যাথলজি ও মেডিকেল ডিভাইস সরবরাহকারী।',
  },
]

export const hostOf = (w: WorkItem) => w.domain ?? new URL(w.url).host.replace(/^www\./, '')
