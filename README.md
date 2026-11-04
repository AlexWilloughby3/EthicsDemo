# arXiv concept redesign: declarations of understanding and Lean-verified results

Group 14 ethics project prototype. This is a static React + Vite site that works like arXiv, with:

- **Computed understanding level** (Level 1 fully understood / Level 2 partially / Level 3 verified only), derived from each paper's declared results and its citations
- **Declarations of understanding**: no AI disclosure; named people declare which results' *spec* and *proof* they understand, so errors are traceable to a person
- **Results list**: each result's Lean verification (independent kernels + institutions) and who understands it
- **Funding Landscape** and **Reasons & Implications** pages

It has no backend. All content is synthetic markdown in `content/`. Not affiliated with or endorsed by arXiv or Cornell University.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # static site in dist/
```

Pushing to `main` deploys to GitHub Pages automatically (`.github/workflows/deploy.yml`): https://alexwilloughby3.github.io/EthicsDemo/

## Editing content (no React needed)

- Papers: `content/papers/*.md`. See `content/README.md` for the format.
- Funding report (Jiya): `content/reports/funding.md`
- Reasons & implications (Shane): `content/reports/implications.md`
- Guidelines text / About page: `content/reports/guidelines.md`, `content/reports/about.md`
- Images: put them in `public/` and reference them as `/name.png`

## Code map

- `src/data/parsePaper.ts`: markdown → paper parser (frontmatter, results, sections, traces)
- `src/data/taxonomy.ts`: categories, AI levels, tag colors and labels
- `src/pages/`: Home, Listing (`/list`), Abstract (`/abs/:id`), Tagged reader (`/html/:id`), Guidelines, report pages
- `src/components/`: badges, understanding bar, disclosure card, layout
