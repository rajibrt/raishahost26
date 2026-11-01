import InnerPage from '@/components/site/InnerPage'
import DomainSearch from '@/components/site/DomainSearch'
import { pageMeta, type Lang } from '@/i18n'

const t = {
  en: {
    title: 'Domains',
    description: 'Register .com, .com.bd, .net, .org and more, and connect your domain to RaishaHost hosting in one step.',
    kicker: 'Domains',
    h1: <>Find your <em className='sky'>name.</em></>,
    lede: 'Search for a domain and register it with your hosting in one checkout.',
    fine: 'Domain registration and renewal fees are not covered by the 30-day money-back guarantee.',
  },
  bn: {
    title: 'ডোমেইন',
    description: '.com, .com.bd, .net, .org সহ আরও ডোমেইন রেজিস্টার করুন, আর এক ধাপেই RaishaHost হোস্টিংয়ের সাথে যুক্ত করুন।',
    kicker: 'ডোমেইন',
    h1: <>আপনার <em className='sky'>নাম খুঁজুন।</em></>,
    lede: 'একটি ডোমেইন খুঁজুন আর একই চেকআউটে হোস্টিংসহ রেজিস্টার করুন।',
    fine: 'ডোমেইন রেজিস্ট্রেশন ও রিনিউয়ের ফি ৩০ দিনের মানি-ব্যাক গ্যারান্টির আওতায় পড়ে না।',
  },
}

const tlds = ['.com', '.com.bd', '.net', '.org', '.xyz']

export const domainsMetadata = (lang: Lang) => pageMeta('/domains', lang, t[lang])

export default function DomainsView({ lang }: { lang: Lang }) {
  const c = t[lang]
  return (
    <InnerPage lang={lang} kicker={c.kicker} title={c.h1} lede={c.lede}>
      <section className='sec tight gut'>
        <div className='in rv'>
          <DomainSearch lang={lang} />
          <div className='tlds'>{tlds.map((x) => <span key={x}><b>{x}</b></span>)}</div>
          <p className='fine' style={{ marginTop: 24 }}>{c.fine}</p>
        </div>
      </section>
    </InnerPage>
  )
}
