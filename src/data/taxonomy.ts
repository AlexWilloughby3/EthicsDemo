import type { UnderstandingLevel } from '../types'

export const CATEGORIES: Record<string, string> = {
  'math.NT': 'Number Theory',
  'math.CO': 'Combinatorics',
  'math.PR': 'Probability',
  'math.AG': 'Algebraic Geometry',
  'math.LO': 'Logic',
}

export const LEVELS: Record<UnderstandingLevel, { short: string; label: string; description: string }> = {
  1: {
    short: 'Level 1',
    label: 'Fully understood',
    description:
      'For every result in the paper, a named person declares they understand both its specification and its proof. The same holds for everything it depends on, all the way down the citation chain.',
  },
  2: {
    short: 'Level 2',
    label: 'Partially understood',
    description:
      'Someone declares they understand the specification of every result in the paper, and the proofs of some of them. Some proof in the paper or in its dependencies is backed only by Lean.',
  },
  3: {
    short: 'Level 3',
    label: 'Verified only',
    description:
      'Does not qualify for Level 1 or 2: some specification has no one vouching for it, or no one has declared they understand any of its proofs.',
  },
}

export const LEVEL_ORDER: UnderstandingLevel[] = [1, 2, 3]

/** The two human-understanding axes shown for every result. */
export const UNDERSTANDING_AXES = {
  spec: {
    label: 'Spec',
    description:
      'Named people who declare that the statement (and its Lean formalization) says what the paper claims. They are accountable if it does not.',
  },
  impl: {
    label: 'Impl',
    description: 'Named people who declare they understand why the proof works, not just that Lean accepts it.',
  },
}
