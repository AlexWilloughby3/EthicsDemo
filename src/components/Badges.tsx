import type { UnderstandingLevel } from '../types'
import { LEVELS } from '../data/taxonomy'

export function LevelBadge({ level }: { level: UnderstandingLevel }) {
  const info = LEVELS[level]
  return (
    <span className={`level-badge level-badge-${level}`} title={info.description}>
      {info.short} · {info.label}
    </span>
  )
}
