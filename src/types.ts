/** Computed understanding level. */
export type UnderstandingLevel = 1 | 2 | 3

export interface LevelInfo {
  level: UnderstandingLevel
  issues: string[] // why the paper is not at a higher level (markdown + LaTeX)
}

/**
 * A Lean result in the paper (one of its own main results) or a Lean result it cites.
 * Natural-language claims are not listed, since they can't be discretized reliably. Named people
 * declare what they understand, so any error can be traced to a person.
 */
export interface PaperResult {
  name: string
  statement?: string // informal statement, markdown + LaTeX
  leanName?: string // name of the formal declaration
  source: string // e.g. "This paper, §3" or "arXiv:2611.00213"
  cited: boolean // true if this result comes from another paper rather than this one
  citedPaperId?: string // set when the source cites another paper on the site
  usedIn?: string
  kernels: string[] // independent Lean kernel implementations that accepted the proof
  institutions: number // institutions that independently re-checked it
  specUnderstoodBy: string[] // people who declare the statement says what is intended
  implUnderstoodBy: string[] // people who declare they understand why the proof works
  note?: string
}

export interface PaperSection {
  id: string
  heading: string
  body: string // markdown + LaTeX
  reasoningTrace?: string
}

export interface Version {
  label: string // "v1"
  date: string
  note?: string
}

export interface Paper {
  id: string
  title: string
  authors: string[]
  categories: string[]
  submitted: string
  comments?: string
  abstract: string
  leanRepo?: string
  versions: Version[]
  results: PaperResult[]
  sections: PaperSection[]
}
