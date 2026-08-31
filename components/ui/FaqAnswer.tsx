import type { ReactNode } from 'react'

export interface FaqLink { text: string; href: string }

/**
 * Renders an FAQ answer string, turning the given substrings into links.
 * The raw string is still used verbatim for FAQPage structured data,
 * so schema and visible text stay in sync.
 */
export default function FaqAnswer({ text, links }: { text: string; links?: FaqLink[] }) {
  if (!links?.length) return <>{text}</>

  const nodes: ReactNode[] = []
  let rest = text
  let key = 0

  for (const { text: needle, href } of links) {
    const idx = rest.indexOf(needle)
    if (idx === -1) continue
    if (idx > 0) nodes.push(rest.slice(0, idx))
    const external = /^https?:\/\//.test(href)
    nodes.push(
      <a
        key={key++}
        href={href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {needle}
      </a>,
    )
    rest = rest.slice(idx + needle.length)
  }
  if (rest) nodes.push(rest)

  return <>{nodes}</>
}
