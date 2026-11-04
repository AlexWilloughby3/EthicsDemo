import type { LevelInfo, Paper } from '../types'
import { implUnderstood, specUnderstood } from './results'

/**
 * Computes a paper's understanding level from its listed Lean results. People declare what they
 * understand; the level itself is never chosen by hand.
 *
 * "Own" results are the paper's main Lean results. "Cited" results come from other papers.
 *
 * Level 1, Fully understood: someone declares understanding of the spec and proof of every own result,
 *   and every cited result has a declared-understood proof and (if on this site) comes from a
 *   Level 1 paper. This is strict: the check runs transitively through the citation chain.
 * Level 2, Partially understood: someone declares understanding of every own result's spec, and of
 *   at least one own proof. (A paper with no own Lean results qualifies if its only problem is a
 *   dependency.)
 * Level 3, Verified only: everything else.
 */
export function computeLevel(paper: Paper, levelOf: (id: string) => LevelInfo | undefined): LevelInfo {
  const own = paper.results.filter((r) => !r.cited)
  const cited = paper.results.filter((r) => r.cited)

  const specMissing = own.filter((r) => !specUnderstood(r))
  const implMissing = own.filter((r) => !implUnderstood(r))

  const depIssues: string[] = []
  for (const r of cited) {
    if (!implUnderstood(r)) {
      depIssues.push(`Depends on "${r.name}", whose proof no one has declared they understand`)
    } else if (r.citedPaperId) {
      const dep = levelOf(r.citedPaperId)
      if (dep && dep.level !== 1) {
        depIssues.push(`Depends on "${r.name}" from arXiv:${r.citedPaperId}, which is not fully understood`)
      }
    }
  }

  const specIssues = specMissing.map((r) => `No one has declared they understand the specification of "${r.name}"`)
  const implIssues = implMissing.map((r) => `No one has declared they understand the proof of "${r.name}"`)

  if (specMissing.length === 0 && implMissing.length === 0 && depIssues.length === 0) {
    return { level: 1, issues: [] }
  }

  const someProofUnderstood = own.length === 0 || implMissing.length < own.length
  if (specMissing.length === 0 && someProofUnderstood) {
    return { level: 2, issues: [...implIssues, ...depIssues] }
  }

  return {
    level: 3,
    issues: [
      ...specIssues,
      ...(someProofUnderstood ? implIssues : ['No one has declared they understand any of the paper’s proofs']),
      ...depIssues,
    ],
  }
}
