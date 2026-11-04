import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

const remarkPlugins = [remarkMath]
const rehypePlugins = [rehypeKatex]

/**
 * remark-math only renders `$$…$$` as display math when the fences sit in their own block.
 * Authors naturally write `$$x$$` inside a paragraph, so split those out into display blocks.
 */
function normalizeDisplayMath(src: string): string {
  const parts = src.split(/(```[\s\S]*?```)/g) // leave code blocks alone
  return parts
    .map((part, i) =>
      i % 2 === 1 ? part : part.replace(/\$\$([\s\S]+?)\$\$/g, (_, tex: string) => `\n\n$$\n${tex.trim()}\n$$\n\n`),
    )
    .join('')
}

export default function Markdown({ children }: { children: string }) {
  return (
    <div className="md">
      <ReactMarkdown remarkPlugins={remarkPlugins} rehypePlugins={rehypePlugins}>
        {normalizeDisplayMath(children)}
      </ReactMarkdown>
    </div>
  )
}

/** Renders a single line (e.g. a title) with inline LaTeX, without wrapping <p> tags. */
export function InlineMath({ children }: { children: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={remarkPlugins}
      rehypePlugins={rehypePlugins}
      components={{ p: ({ children }) => <>{children}</> }}
    >
      {children}
    </ReactMarkdown>
  )
}
