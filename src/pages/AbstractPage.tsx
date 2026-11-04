import { Link, useParams } from 'react-router-dom'
import { getPaper } from '../data/papers'
import { CATEGORIES } from '../data/taxonomy'
import DeclarationsCard from '../components/DeclarationsCard'
import LevelCard from '../components/LevelCard'
import ResultsList from '../components/ResultsList'
import Markdown, { InlineMath } from '../components/Markdown'
import NotFound from './NotFound'

export default function AbstractPage() {
  const paper = getPaper(useParams().id)
  if (!paper) return <NotFound />

  const primary = paper.categories[0]
  const latest = paper.versions[paper.versions.length - 1]

  return (
    <div className="abs-layout">
      <article className="abs-main">
        <div className="breadcrumb">
          Mathematics &gt; <Link to={`/list/${primary}`}>{CATEGORIES[primary] ?? primary}</Link>
        </div>
        <div className="small muted">
          [Submitted on {paper.submitted}
          {latest && paper.versions.length > 1 ? ` (${latest.label}), last revised ${latest.date}` : ''}]
        </div>
        <h1 className="abs-title"><InlineMath>{paper.title}</InlineMath></h1>
        <div className="abs-authors">{paper.authors.join(', ')}</div>

        <blockquote className="abstract">
          <span className="descriptor">Abstract:</span>
          <Markdown>{paper.abstract}</Markdown>
        </blockquote>

        <ResultsList paper={paper} />

        <table className="meta-table">
          <tbody>
            {paper.comments && (
              <tr>
                <td className="descriptor">Comments:</td>
                <td>{paper.comments}</td>
              </tr>
            )}
            <tr>
              <td className="descriptor">Subjects:</td>
              <td>{paper.categories.map((c) => `${CATEGORIES[c] ?? c} (${c})`).join('; ')}</td>
            </tr>
            <tr>
              <td className="descriptor">Cite as:</td>
              <td>arXiv:{paper.id}</td>
            </tr>
          </tbody>
        </table>
      </article>

      <aside className="abs-side">
        <div className="side-box">
          <h3>Access Paper:</h3>
          <ul>
            <li>
              <Link to={`/html/${paper.id}`}>View tagged HTML</Link>
            </li>
            <li>
              <span className="fake-link" title="Demo only">
                View PDF
              </span>
            </li>
            {paper.leanRepo && (
              <li>
                <span className="fake-link" title="Demo only: no real repository">
                  Lean development
                </span>
              </li>
            )}
          </ul>
        </div>

        <LevelCard paper={paper} />

        <DeclarationsCard paper={paper} />

        <div className="side-box">
          <h3>Submission history</h3>
          <ul className="small">
            {paper.versions.map((v) => (
              <li key={v.label}>
                <strong>[{v.label}]</strong> {v.date}
                {v.note && <span className="muted"> ({v.note})</span>}
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  )
}
