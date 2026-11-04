import { Link } from 'react-router-dom'
import { PAPERS } from '../data/papers'
import { CATEGORIES } from '../data/taxonomy'

export default function HomePage() {
  return (
    <div className="home">
      <p className="lede">
        A concept redesign of arXiv's mathematics section for the age of AI-generated proofs. Papers don't disclose which
        tools they used. Instead, named people <strong>declare which results they understand</strong>, both the statement
        and the proof, and are accountable for those declarations. From the declarations and Lean verification, each
        paper receives an <strong>understanding level</strong>: fully understood, partially understood, or verified
        only.
      </p>

      <section>
        <h2>Mathematics</h2>
        <ul className="cat-list">
          {Object.entries(CATEGORIES).map(([code, name]) => {
            const n = PAPERS.filter((p) => p.categories.includes(code)).length
            return (
              <li key={code}>
                <strong>{name}</strong> ({code}){' '}
                <Link to={`/list/${code}`}>new</Link>
                <span className="muted"> · {n} {n === 1 ? 'paper' : 'papers'}</span>
              </li>
            )
          })}
        </ul>
        <p>
          <Link to="/list">Browse all submissions →</Link>
        </p>
      </section>
    </div>
  )
}
