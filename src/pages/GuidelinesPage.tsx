import { LevelBadge } from '../components/Badges'
import { LEVEL_ORDER, LEVELS } from '../data/taxonomy'
import { UnderstandingChip } from '../components/ResultsList'
import Markdown from '../components/Markdown'
import { getReport } from '../data/reports'

export default function GuidelinesPage() {
  return (
    <div className="report">
      <h1>Submission Guidelines</h1>

      <h2>How each result is labeled</h2>
      <table className="levels-table">
        <tbody>
          <tr>
            <td>
              <span className="chip chip-lean">✓ Lean-verified · 3 independent kernels · 42 institutions</span>
            </td>
            <td>
              <strong>Correctness.</strong> The number of <em>independent</em> Lean kernel implementations that accepted
              the proof, and the number of institutions that re-checked it on their own trusted infrastructure.
              Independent kernels guard against checker bugs. Institutional re-checks guard against a tampered or
              misreported result.
            </td>
          </tr>
          <tr>
            <td>
              <UnderstandingChip axis="spec" people={['A. Researcher']} />
            </td>
            <td>
              <strong>Who understands the specification.</strong> These people declare that the statement, including its
              Lean formalization, says what the paper claims. If a verified result turns out to prove the wrong
              statement, responsibility lies with the people named here.
            </td>
          </tr>
          <tr>
            <td>
              <UnderstandingChip axis="impl" people={['B. Researcher']} />
            </td>
            <td>
              <strong>Who understands the proof.</strong> These people declare they understand <em>why</em> the proof
              works, not just that Lean accepts it.
            </td>
          </tr>
        </tbody>
      </table>

      <h2>Understanding levels</h2>
      <p>
        Levels are <strong>computed</strong> from the declarations, not chosen by authors. The rule is strict: citing a
        result whose proof no one understands keeps a paper out of Level 1.
      </p>
      <table className="levels-table">
        <tbody>
          {LEVEL_ORDER.map((lvl) => (
            <tr key={lvl}>
              <td>
                <LevelBadge level={lvl} />
              </td>
              <td>{LEVELS[lvl].description}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Markdown>{getReport('guidelines')}</Markdown>
    </div>
  )
}
