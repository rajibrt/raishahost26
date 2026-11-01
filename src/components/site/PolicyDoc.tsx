import DocMotion from './DocMotion'

export interface PolicySection {
  id: string
  title: string
  content: React.ReactNode
}

/** A readable policy document: a contents list that follows you down the page, beside plain sections. */
export default function PolicyDoc({ sections, updated }: { sections: PolicySection[]; updated?: string }) {
  return (
    <section className='sec tight gut'>
      <DocMotion />
      <div className='in doc'>
        <nav className='toc' aria-label='On this page'>
          <span>On this page</span>
          {sections.map((s) => (
            <a key={s.id} href={`#${s.id}`}>{s.title}</a>
          ))}
        </nav>
        <div className='prose'>
          {updated && <p className='fine' style={{ marginTop: 0 }}>Last updated: {updated}</p>}
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
