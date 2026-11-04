import { Link, useParams } from 'react-router-dom'
import { getLevel, getPaper } from '../data/papers'
import { LevelBadge } from '../components/Badges'
import Markdown, { InlineMath } from '../components/Markdown'
import ResultsList from '../components/ResultsList'
import NotFound from './NotFound'

export default function ReaderPage() {
  const paper = getPaper(useParams().id)
  if (!paper) return <NotFound />

  return (
    <div className="reader-layout">
      <aside className="reader-toc">
        <div className="toc-sticky">
          <h4>Contents</h4>
          <ol>
            {paper.sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} onClick={(e) => {
                  e.preventDefault()
                  document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' })
                }}>
                  {s.heading}
                </a>
              </li>
            ))}
          </ol>
        </div>
      </aside>

      <article className="reader">
        <div className="small">
          <Link to={`/abs/${paper.id}`}>← arXiv:{paper.id}</Link> <LevelBadge level={getLevel(paper).level} />
        </div>
        <h1 className="reader-title"><InlineMath>{paper.title}</InlineMath></h1>
        <div className="reader-authors">{paper.authors.join(', ')}</div>

        <section className="reader-abstract">
          <h2>Abstract</h2>
          <Markdown>{paper.abstract}</Markdown>
        </section>

        <ResultsList paper={paper} />

        {paper.sections.map((s) => (
          <section key={s.id} id={s.id} className="paper-section">
            <h2>{s.heading}</h2>
            <Markdown>{s.body}</Markdown>
            {s.reasoningTrace && (
              <details className="trace">
                <summary>Reasoning trace excerpt (shared voluntarily by the authors)</summary>
                <Markdown>{s.reasoningTrace}</Markdown>
              </details>
            )}
          </section>
        ))}
      </article>
    </div>
  )
}
