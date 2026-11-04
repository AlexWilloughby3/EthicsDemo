import type { ReactNode } from 'react'
import Markdown from '../components/Markdown'
import { getReport } from '../data/reports'

/** Renders content/reports/<name>.md, with optional extra content (e.g. charts) above it. */
export default function ReportPage({ name, children }: { name: string; children?: ReactNode }) {
  return (
    <div className="report">
      {children}
      <Markdown>{getReport(name)}</Markdown>
    </div>
  )
}
