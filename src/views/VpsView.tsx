import InnerPage from '@/components/site/InnerPage'
import PlanTabs from '@/components/site/PlanTabs'
import { pageMeta, type Lang } from '@/i18n'

const t = {
  en: {
    title: 'VPS Servers',
    description: 'VPS servers with full root access, NVMe SSD storage, 20 TB bandwidth and DDoS protection. Billed monthly in BDT or USD.',
    kicker: 'VPS servers · billed monthly',
    h1: <>Your own server. <em className='sky'>Your rules.</em></>,
    lede: 'Root access, NVMe storage and room to grow. Pay monthly in taka or dollars.',
    k: 'Included',
    h2: 'Every VPS comes with.',
    points: [
      ['Full root access', 'Install anything. Choose Ubuntu, Debian or AlmaLinux.'],
      ['NVMe SSD storage', 'Fast disks for databases, stores and business apps.'],
      ['20 TB bandwidth', 'Included every month with every VPS.'],
      ['Dedicated IPv4 + IPv6', 'Your own address, ready for email and SSL.'],
      ['DDoS protection', 'Attack traffic is filtered before it reaches your server.'],
      ['99.9% uptime', 'Our target for every server.'],
    ],
  },
  bn: {
    title: 'VPS সার্ভার',
    description: 'পূর্ণ রুট অ্যাক্সেস, NVMe SSD স্টোরেজ, ২০ টিবি ব্যান্ডউইথ ও DDoS সুরক্ষাসহ VPS সার্ভার। টাকা বা ডলারে প্রতি মাসে বিল।',
    kicker: 'VPS সার্ভার · মাসে বিল',
    h1: <>নিজের সার্ভার। <em className='sky'>নিজের নিয়ম।</em></>,
    lede: 'রুট অ্যাক্সেস, NVMe স্টোরেজ আর বাড়ার জায়গা। টাকা বা ডলারে প্রতি মাসে পেমেন্ট।',
    k: 'যা থাকছে',
    h2: 'প্রতিটি VPS-এ যা পাবেন।',
    points: [
      ['পূর্ণ রুট অ্যাক্সেস', 'যা খুশি ইনস্টল করুন। Ubuntu, Debian বা AlmaLinux বেছে নিন।'],
      ['NVMe SSD স্টোরেজ', 'ডাটাবেস, অনলাইন শপ ও ব্যবসায়িক অ্যাপের জন্য দ্রুত ডিস্ক।'],
      ['২০ টিবি ব্যান্ডউইথ', 'প্রতিটি VPS-এ প্রতি মাসে অন্তর্ভুক্ত।'],
      ['নিজস্ব IPv4 + IPv6', 'আপনার নিজের ঠিকানা, ইমেইল ও SSL-এর জন্য প্রস্তুত।'],
      ['DDoS সুরক্ষা', 'আক্রমণের ট্রাফিক আপনার সার্ভারে পৌঁছানোর আগেই আটকে যায়।'],
      ['৯৯.৯% আপটাইম', 'প্রতিটি সার্ভারে আমাদের লক্ষ্য।'],
    ],
  },
}

export const vpsMetadata = (lang: Lang) => pageMeta('/vps', lang, t[lang])

export default function VpsView({ lang }: { lang: Lang }) {
  const c = t[lang]
  return (
    <InnerPage lang={lang} kicker={c.kicker} title={c.h1} lede={c.lede}>
      <section className='sec tight gut'>
        <div className='in'>
          <PlanTabs initial='vps' lockKind lang={lang} />
        </div>
      </section>
      <section className='sec tight gut'>
        <div className='in'>
          <div className='sec-head rv'>
            <div>
              <span className='k'>{c.k}</span>
              <h2>{c.h2}</h2>
            </div>
          </div>
          <div className='cards' data-stagger>
            {c.points.map(([h, p]) => (
              <article className='pr' key={h}>
                <h3>{h}</h3>
                <p>{p}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </InnerPage>
  )
}
