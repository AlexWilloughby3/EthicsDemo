# Content guide

Everything on the site comes from markdown files in this folder. You don't need to touch any React code.

- `papers/*.md`: one file per paper. Adding a file adds the paper to the site automatically.
- `reports/*.md`: the long-form pages (`funding`, `implications`, `guidelines`, `about`).

Math uses LaTeX: `$inline$` and `$$display$$`.

## Paper format

```markdown
---
id: 2611.00999
title: My Paper Title with $\LaTeX$
authors: First Author; Second Author
categories: math.NT, math.CO
submitted: 2026-11-04
comments: 8 pages
leanRepo: github.com/example/repo (synthetic)
versions: v1 2026-11-01; v2 2026-11-04 (fixed a typo)
abstract: One paragraph (must stay on one line).
---

:::result
name: Theorem 1 (main theorem)
statement: For all $n \ge 1$, …
lean: MyPaper.main_theorem
source: This paper, §2
usedIn: Main result
kernels: Lean 4, lean4lean, nanoda
institutions: 12
understoodBy: First Author; Second Author
:::

:::result
name: Theorem 3 (main bound)
statement: For all $n \ge 1$, …
lean: MyPaper.main_bound
source: This paper, §3
usedIn: §4, §5
kernels: Lean 4, lean4lean, nanoda
institutions: 12
specUnderstoodBy: First Author; J. Doe (referee)
note: Optional extra context. No one has declared they understand the proof yet.
:::

:::result
name: A cited result
source: arXiv:2611.00301, Theorem 2
kernels: Lean 4, lean4lean
institutions: 30
specUnderstoodBy: First Author
:::

## 1. Introduction

Section text in markdown + LaTeX…

:::trace
Optional reasoning-trace excerpt, shared voluntarily, shown in a collapsible box.
:::
```

Notes:

- **Frontmatter values must each fit on one line.** Separate authors, versions, and names with `;`, and categories and kernels with `,`.
- **Result blocks** (`:::result`) go between the frontmatter and the first `##` section. List **the paper's main Lean results**, plus **every cited Lean result whose proof is not fully understood**. Natural-language claims are not listed. They determine the paper's **understanding level**, which the site computes automatically.
  - `specUnderstoodBy`: `;`-separated names of people who declare the statement (and its Lean formalization) says what the paper claims.
  - `implUnderstoodBy`: `;`-separated names of people who declare they understand why the proof works.
  - `understoodBy`: shorthand that adds the names to **both** lists.
  - `kernels` / `institutions`: the independent Lean kernels that accepted the proof, and how many institutions re-checked it.
  - `lean`, `statement`, `usedIn`, `note` are optional. Use `cited: yes` for a result cited from outside this site.
  - Writing `arXiv:2611.00213` in `source` links to that paper **and** makes its level count: citing a paper that is not Level 1 keeps yours out of Level 1.
- **Levels:** 1 = someone understands the spec and proof of every own result, and every dependency is fully understood. 2 = every own spec is understood by someone, and at least one own proof is. 3 = everything else.
- Categories currently recognized: `math.NT`, `math.CO`, `math.PR`, `math.AG`, `math.LO` (add more in `src/data/taxonomy.ts`).
