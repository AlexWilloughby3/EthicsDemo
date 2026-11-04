// Long-form pages written in markdown, so teammates can edit them without touching React.
const files = import.meta.glob('/content/reports/*.md', { query: '?raw', import: 'default', eager: true }) as Record<
  string,
  string
>

export function getReport(name: string): string {
  return files[`/content/reports/${name}.md`] ?? `*Missing report: content/reports/${name}.md*`
}
