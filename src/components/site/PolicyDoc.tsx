import DocMotion from './DocMotion'
import { ui, type Lang } from '@/i18n'

export interface PolicySection {
  id: string
  title: string
  content: React.ReactNode
}

/** A readable policy document: a contents list that follows you down the page, beside plain sections. */
export default function PolicyDoc({ sections, updated, lang = 'en' }: { sections: PolicySection[]; updated?: string; lang?: Lang }) {
  const t = ui[lang]
  return (
    <section className='sec tight gut'>
      <DocMotion />
      <div className='in doc'>
        <nav className='toc' aria-label={t.onThisPage}>
          <span>{t.onThisPage}</span>
          {sections.map((s) => (
            <a key={s.id} href={`#${s.id}`}>{s.title}</a>
          ))}
        </nav>
        <div className='prose'>
          {updated && <p className='fine' style={{ marginTop: 0 }}>{t.lastUpdated}: {updated}</p>}
          {sections.map((s) => (
            <section key={s.id} id={s.id} className='rv'>
              <h2>{s.title}</h2>
              {s.content}
            </section>
          ))}
        </div>
      </div>
    </section>
  )
}
