import type { LevelInfo, Paper } from '../types'
import { parsePaper } from './parsePaper'
import { computeLevel } from './levels'

// Every .md file in content/papers becomes a paper. Drop a new file in to add one.
const files = import.meta.glob('/content/papers/*.md', { query: '?raw', import: 'default', eager: true }) as Record<
  string,
  string
>

export const PAPERS: Paper[] = Object.entries(files)
  .map(([path, raw]) => parsePaper(raw, path))
  .sort((a, b) => b.id.localeCompare(a.id))

export function getPaper(id: string | undefined): Paper | undefined {
  return PAPERS.find((p) => p.id === id)
}

const levelCache = new Map<string, LevelInfo>()

/** The paper's computed understanding level (memoized; follows citations transitively). */
export function getLevel(paper: Paper): LevelInfo {
  const cached = levelCache.get(paper.id)
  if (cached) return cached
  // Guard against citation cycles: a paper in a cycle can't be Level 1 through itself.
  levelCache.set(paper.id, { level: 3, issues: ['Circular citation'] })
  const info = computeLevel(paper, (id) => {
    const dep = getPaper(id)
    return dep ? getLevel(dep) : undefined
  })
  levelCache.set(paper.id, info)
  return info
}

/** Papers on the site that cite one of this paper's results. */
export function citedBy(id: string): Paper[] {
  return PAPERS.filter((p) => p.id !== id && p.results.some((r) => r.citedPaperId === id))
}
