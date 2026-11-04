import type { Paper, PaperResult, PaperSection } from '../types'

/**
 * Parses a paper markdown file. See content/README.md for the format.
 *
 * Frontmatter is simple `key: value` lines between `---` fences.
 * Before the first section, `:::result ... :::` blocks (key: value lines) list the paper's
 * own main results and any results it cites that are not fully human-understood.
 * Each `## Heading` starts a section. A section may contain a `:::trace ... :::` block
 * (optional reasoning-trace excerpt). HTML comments are ignored.
 */
const isYes = (v: string | undefined) => /^(yes|true)$/i.test((v ?? '').trim())
const names = (v: string | undefined) => splitList(v, ';')

function parseKeyValues(block: string): Record<string, string> {
  const out: Record<string, string> = {}
  for (const line of block.split('\n')) {
    const idx = line.indexOf(':')
    if (idx === -1) continue
    out[line.slice(0, idx).trim()] = line.slice(idx + 1).trim()
  }
  return out
}

const ID_IN_SOURCE = /arXiv:(\d{4}\.\d{5})/

function parseResults(body: string): PaperResult[] {
  const results: PaperResult[] = []
  for (const m of body.matchAll(/^:::result\n([\s\S]*?)\n:::[ \t]*$/gm)) {
    const kv = parseKeyValues(m[1])
    // `understoodBy` is shorthand for people who understand both the spec and the proof.
    const both = names(kv.understoodBy)
    const citedPaperId = kv.source?.match(ID_IN_SOURCE)?.[1]
    results.push({
      name: kv.name ?? 'Unnamed result',
      citedPaperId,
      cited: !!citedPaperId || isYes(kv.cited),
      statement: kv.statement,
      leanName: kv.lean,
      source: kv.source ?? '',
      usedIn: kv.usedIn,
      kernels: splitList(kv.kernels, ','),
      institutions: Number(kv.institutions ?? 0),
      specUnderstoodBy: [...new Set([...both, ...names(kv.specUnderstoodBy)])],
      implUnderstoodBy: [...new Set([...both, ...names(kv.implUnderstoodBy)])],
      note: kv.note,
    })
  }
  return results
}

function splitList(value: string | undefined, sep: string): string[] {
  if (!value) return []
  return value.split(sep).map((s) => s.trim()).filter(Boolean)
}

function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export function parsePaper(raw: string, file: string): Paper {
  const text = raw.replace(/\r\n/g, '\n')
  const fm = text.match(/^---\n([\s\S]*?)\n---\n?/)
  if (!fm) throw new Error(`${file}: missing frontmatter`)

  const meta = parseKeyValues(fm[1])

  const body = text.slice(fm[0].length)
  const results = parseResults(body)
  const chunks = body.split(/^## /m).slice(1)

  const sections: PaperSection[] = chunks.map((chunk, i) => {
    const nl = chunk.indexOf('\n')
    const heading = (nl === -1 ? chunk : chunk.slice(0, nl)).trim()
    let rest = nl === -1 ? '' : chunk.slice(nl + 1)

    let reasoningTrace: string | undefined
    const trace = rest.match(/^:::trace\n([\s\S]*?)\n:::\s*$/m)
    if (trace) {
      reasoningTrace = trace[1].trim()
      rest = rest.replace(trace[0], '')
    }

    rest = rest.replace(/<!--[\s\S]*?-->/g, '').trim()

    return { id: `s${i + 1}-${slugify(heading)}`, heading, body: rest, reasoningTrace }
  })

  return {
    id: meta.id ?? file,
    title: meta.title ?? 'Untitled',
    authors: splitList(meta.authors, ';'),
    categories: splitList(meta.categories, ','),
    submitted: meta.submitted ?? '',
    comments: meta.comments,
    abstract: meta.abstract ?? '',
    leanRepo: meta.leanRepo || undefined,
    versions: splitList(meta.versions, ';').map((v) => {
      const [label, date, ...note] = v.split(/\s+/)
      return { label, date, note: note.join(' ').replace(/^\((.*)\)$/, '$1') || undefined }
    }),
    results,
    sections,
  }
}
