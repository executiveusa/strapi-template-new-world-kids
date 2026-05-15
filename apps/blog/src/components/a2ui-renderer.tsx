'use client'

import { ArrowUpRight } from 'lucide-react'

import { Button } from '@/components/ui/button'

type A2UIAction = {
  label: string
  href: string
  variant?: 'primary' | 'secondary'
}

type A2UIBlock =
  | {
      id: string
      type: 'callout'
      title: string
      body: string
      tone?: 'default' | 'accent'
    }
  | {
      id: string
      type: 'pillars'
      title: string
      items: string[]
    }
  | {
      id: string
      type: 'citations'
      title: string
      items: string[]
    }
  | {
      id: string
      type: 'actions'
      title: string
      items: A2UIAction[]
    }

export type A2UIDocument = {
  version: '0.1'
  kind: 'article-assistant'
  blocks: A2UIBlock[]
}

export function A2UIRenderer({ document }: { document: A2UIDocument }) {
  return (
    <div className="space-y-3">
      {document.blocks.map((block) => {
        if (block.type === 'callout') {
          return (
            <div
              key={block.id}
              className={`rounded-sm border p-4 ${
                block.tone === 'accent'
                  ? 'border-[#9e8251]/40 bg-[#9e8251]/10'
                  : 'border-border bg-card'
              }`}
            >
              <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {block.title}
              </div>
              <div className="text-sm leading-7 text-foreground">{block.body}</div>
            </div>
          )
        }

        if (block.type === 'pillars') {
          return (
            <div key={block.id} className="rounded-sm border border-border bg-card p-4">
              <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {block.title}
              </div>
              <div className="flex flex-wrap gap-2">
                {block.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-sm border border-[#9e8251]/30 bg-[#9e8251]/10 px-2.5 py-1 text-xs tracking-[0.08em] text-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )
        }

        if (block.type === 'citations') {
          return (
            <div key={block.id} className="rounded-sm border border-border bg-card p-4">
              <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {block.title}
              </div>
              <div className="space-y-2">
                {block.items.map((item, index) => (
                  <div key={`${block.id}-${index}`} className="text-xs leading-6 text-muted-foreground">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )
        }

        return (
          <div key={block.id} className="rounded-sm border border-border bg-card p-4">
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {block.title}
            </div>
            <div className="flex flex-wrap gap-2">
              {block.items.map((item) => (
                <a key={`${block.id}-${item.href}-${item.label}`} href={item.href}>
                  <Button
                    variant={item.variant === 'primary' ? 'default' : 'outline'}
                    className="gap-2"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="size-3.5" />
                  </Button>
                </a>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
