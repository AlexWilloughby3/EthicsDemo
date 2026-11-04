import { Link, useParams, useSearchParams } from 'react-router-dom'
import { getLevel, PAPERS } from '../data/papers'
import { CATEGORIES, LEVEL_ORDER, LEVELS } from '../data/taxonomy'
import { LevelBadge } from '../components/Badges'
import { InlineMath } from '../components/Markdown'
import { resultsSummary } from '../components/ResultsList'
import type { UnderstandingLevel } from '../types'

export default function ListingPage() {
  const { category } = useParams()
  const [params, setParams] = useSearchParams()
  const q = (params.get('q') ?? '').toLowerCase()
  const levelParam = params.get('level')
  const selected = new Set<string>(levelParam ? levelParam.split(',') : LEVEL_ORDER.map(String))

  function toggleLevel(lvl: UnderstandingLevel) {
    const key = String(lvl)
    const next = new Set(selected)
    if (next.has(key)) next.delete(key)
    else next.add(key)
    const p = new URLSearchParams(params)
    if (next.size === LEVEL_ORDER.length) p.delete('level')
    else p.set('level', LEVEL_ORDER.map(String).filter((l) => next.has(l)).join(','))
    setParams(p)
  }

  const papers = PAPERS.filter((p) => {
    if (category && !p.categories.includes(category)) return false
    if (!selected.has(String(getLevel(p).level))) return false
    if (q) {
      const hay = `${p.title} ${p.authors.join(' ')} ${p.abstract} ${p.id}`.toLowerCase()
      if (!hay.includes(q)) return false
    }
    return true
  })

  const heading = category ? `${CATEGORIES[category] ?? category} (${category})` : 'All categories'

  return (
    <div>
      <h1 className="list-title">
        Mathematics &gt; {heading}
      </h1>
      <h2 className="list-sub">
        {q ? <>Search results for “{params.get('q')}”</> : 'New submissions'}{' '}
        <span className="muted">
          (showing {papers.length} of {PAPERS.length} entries)
        </span>
      </h2>

      <fieldset className="level-filter">
        <legend>
          Filter by human understanding (<Link to="/guidelines">what do these mean?</Link>)
        </legend>
        {LEVEL_ORDER.map((lvl) => (
          <label key={lvl} title={LEVELS[lvl].description}>
            <input type="checkbox" checked={selected.has(String(lvl))} onChange={() => toggleLevel(lvl)} />
            {LEVELS[lvl].short}: {LEVELS[lvl].label}
          </label>
        ))}
      </fieldset>

      <dl className="listing">
        {papers.map((p, i) => (
          <div key={p.id} className="listing-entry">
            <dt>
              <span className="muted">[{i + 1}]</span> <Link to={`/abs/${p.id}`}>arXiv:{p.id}</Link>{' '}
              <span className="muted">
                [<Link to={`/html/${p.id}`}>html</Link>]
              </span>{' '}
              <LevelBadge level={getLevel(p).level} />
            </dt>
            <dd>
              <div className="list-paper-title">
                <Link to={`/abs/${p.id}`}><InlineMath>{p.title}</InlineMath></Link>
              </div>
              <div className="list-authors">{p.authors.join(', ')}</div>
              {p.comments && (
                <div className="small">
                  <span className="descriptor">Comments:</span> {p.comments}
                </div>
              )}
              <div className="small">
                <span className="descriptor">Subjects:</span>{' '}
                {p.categories.map((c) => `${CATEGORIES[c] ?? c} (${c})`).join('; ')}
              </div>
              <div className="small">
                <span className="descriptor">Results:</span> {resultsSummary(p)}
              </div>
            </dd>
          </div>
        ))}
        {papers.length === 0 && <p>No papers match these filters.</p>}
      </dl>
    </div>
  )
}
