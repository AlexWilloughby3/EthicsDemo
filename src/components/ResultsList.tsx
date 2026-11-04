import { Link } from 'react-router-dom'
import type { Paper, PaperResult } from '../types'
import { UNDERSTANDING_AXES } from '../data/taxonomy'
import { implUnderstood, specUnderstood } from '../data/results'
import Markdown, { InlineMath } from './Markdown'

const ID_PATTERN = /(arXiv:\d{4}\.\d{5})/g

/** Turns "arXiv:2611.00213" references into links to that paper. */
function Source({ text }: { text: string }) {
  return (
    <>
      {text.split(ID_PATTERN).map((part, i) =>
        /^arXiv:\d{4}\.\d{5}$/.test(part) ? (
          <Link key={i} to={`/abs/${part.slice(6)}`}>
            {part}
          </Link>
        ) : (
          // markdown trims edge whitespace, so restore it around links
          part.trim() && (
            <span key={i}>
              {/^\s/.test(part) && ' '}
              <InlineMath>{part}</InlineMath>
              {/\s$/.test(part) && ' '}
            </span>
          )
        ),
      )}
    </>
  )
}

export function LeanChip({ result }: { result: PaperResult }) {
  const k = result.kernels.length
  return (
    <span
      className="chip chip-lean"
      title={`Accepted by independent Lean kernels: ${result.kernels.join(', ')}. Re-checked by ${result.institutions} institutions.`}
    >
      ✓ Lean-verified · {k} independent kernel{k === 1 ? '' : 's'} · {result.institutions} institution
      {result.institutions === 1 ? '' : 's'}
    </span>
  )
}

export function UnderstandingChip({ axis, people }: { axis: 'spec' | 'impl'; people: string[] }) {
  const info = UNDERSTANDING_AXES[axis]
  const ok = people.length > 0
  return (
    <span className={`chip ${ok ? 'chip-ok' : 'chip-warn'}`} title={info.description}>
      {ok ? '✓' : '○'} {info.label}: {ok ? `understood by ${people.join(', ')}` : 'no one has declared understanding'}
    </span>
  )
}

export function resultsSummary(paper: Paper): string {
  const rs = paper.results
  if (rs.length === 0) return 'None declared'
  const flags: string[] = []
  const spec = rs.filter((r) => !specUnderstood(r)).length
  const impl = rs.filter((r) => !implUnderstood(r)).length
  if (impl) flags.push(`${impl} proof${impl === 1 ? '' : 's'} no one understands`)
  if (spec) flags.push(`${spec} spec${spec === 1 ? '' : 's'} no one has checked`)
  return `${rs.length} result${rs.length === 1 ? '' : 's'}${flags.length ? `; ${flags.join(', ')}` : ', all understood'}`
}

export default function ResultsList({ paper }: { paper: Paper }) {
  const results = paper.results
  if (results.length === 0) return null

  return (
    <details className="results">
      <summary>
        <strong>Results and who understands them</strong> <span className="muted">({resultsSummary(paper)})</span>
      </summary>
      <ol>
        {results.map((r, i) => (
          <li key={i} className="result">
            <div className="result-name">
              <InlineMath>{r.name}</InlineMath>
              {r.cited && <span className="cited-tag">cited</span>}
            </div>
            {r.statement && (
              <div className="result-statement">
                <Markdown>{r.statement}</Markdown>
              </div>
            )}
            <div className="chips">
              <LeanChip result={r} />
              <UnderstandingChip axis="spec" people={r.specUnderstoodBy} />
              <UnderstandingChip axis="impl" people={r.implUnderstoodBy} />
            </div>
            <div className="small muted">
              {r.leanName && (
                <>
                  <span className="descriptor">Lean:</span>
                  <code>{r.leanName}</code>
                  {' · '}
                </>
              )}
              <span className="descriptor">Source:</span>
              <Source text={r.source} />
              {r.usedIn && (
                <>
                  {' · '}
                  <span className="descriptor">Used in:</span>
                  {r.usedIn}
                </>
              )}
            </div>
            <div className="small muted">
              <span className="descriptor">Kernels:</span>
              {r.kernels.join(', ')}
            </div>
            {r.note && (
              <div className="small result-note">
                <InlineMath>{r.note}</InlineMath>
              </div>
            )}
          </li>
        ))}
      </ol>
    </details>
  )
}
