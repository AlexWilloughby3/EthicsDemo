import { Link } from 'react-router-dom'
import type { Paper } from '../types'
import { getLevel } from '../data/papers'
import { LEVELS } from '../data/taxonomy'
import { LevelBadge } from './Badges'
import { InlineMath } from './Markdown'

/** Sidebar box showing the computed level and the reasons the paper is not at a higher level. */
export default function LevelCard({ paper }: { paper: Paper }) {
  const { level, issues } = getLevel(paper)
  return (
    <div className="side-box">
      <h3>Understanding level</h3>
      <LevelBadge level={level} />
      <p className="small muted">{LEVELS[level].description}</p>
      {issues.length > 0 && (
        <>
          <div className="small">
            <strong>Why not a higher level:</strong>
          </div>
          <ul className="small level-issues">
            {issues.map((issue, i) => (
              <li key={i}>
                <InlineMath>{issue}</InlineMath>
              </li>
            ))}
          </ul>
        </>
      )}
      <div className="small">
        <Link to="/guidelines">Computed from the declared results ›</Link>
      </div>
    </div>
  )
}
