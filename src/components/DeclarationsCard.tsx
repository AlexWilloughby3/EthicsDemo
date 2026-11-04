import type { Paper } from '../types'
import { InlineMath } from './Markdown'

/**
 * Who has put their name to what. If a result turns out to be wrong or mis-specified,
 * this is where accountability lies (not with whatever tools produced it).
 */
export default function DeclarationsCard({ paper }: { paper: Paper }) {
  const byPerson = new Map<string, { spec: string[]; impl: string[] }>()
  for (const r of paper.results) {
    for (const p of r.specUnderstoodBy) {
      if (!byPerson.has(p)) byPerson.set(p, { spec: [], impl: [] })
      byPerson.get(p)!.spec.push(r.name)
    }
    for (const p of r.implUnderstoodBy) {
      if (!byPerson.has(p)) byPerson.set(p, { spec: [], impl: [] })
      byPerson.get(p)!.impl.push(r.name)
    }
  }

  return (
    <div className="side-box">
      <h3>Declarations of understanding</h3>
      {byPerson.size === 0 ? (
        <p className="small">No one has declared understanding of any result in this paper.</p>
      ) : (
        <ul className="declarations">
          {[...byPerson.entries()].map(([person, { spec, impl }]) => {
            const both = spec.filter((n) => impl.includes(n))
            const specOnly = spec.filter((n) => !impl.includes(n))
            const implOnly = impl.filter((n) => !spec.includes(n))
            return (
              <li key={person}>
                <strong>{person}</strong> declares they understand:
                <ul>
                  {both.map((n) => (
                    <li key={`b-${n}`}>
                      <InlineMath>{n}</InlineMath> <span className="muted">(spec + proof)</span>
                    </li>
                  ))}
                  {specOnly.map((n) => (
                    <li key={`s-${n}`}>
                      <InlineMath>{n}</InlineMath> <span className="muted">(spec only)</span>
                    </li>
                  ))}
                  {implOnly.map((n) => (
                    <li key={`i-${n}`}>
                      <InlineMath>{n}</InlineMath> <span className="muted">(proof only)</span>
                    </li>
                  ))}
                </ul>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
