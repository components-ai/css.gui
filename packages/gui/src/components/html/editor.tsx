import { ElementData } from './types'
import * as Collapsible from '@radix-ui/react-collapsible'
import { useState } from 'react'

interface EditorProps {
  value: ElementData
  // onChange(value: ElementData): void
}

/**
 * An HTML tree-based editor that lets you add HTML nodes and mess around with their styles
 */
export function HtmlEditor({ value }: EditorProps) {
  return (
    <div>
      <TreeNode value={value} />
    </div>
  )
}

function TreeNode({ value }: EditorProps) {
  const [open, setOpen] = useState(true)
  return (
    <Collapsible.Root open={open} onOpenChange={setOpen}>
      <Collapsible.Trigger
        sx={{
          border: 'none',
          backgroundColor: 'background',
          color: 'text',
          ':before': {
            content: open ? '"▼"' : '"▶︎"',
            width: '1rem',
            height: '1rem',
          },
        }}
      >
        &lt;{value.tagName}
        {!open && '/'}&gt;
      </Collapsible.Trigger>
      <Collapsible.Content>
        <div sx={{ ml: 4 }}>
          {value.children.map((child) => {
            if (typeof child === 'string') {
              return <div>"{child}"</div>
            }
            return <TreeNode value={child} />
          })}
        </div>
        &lt;/{value.tagName}&gt;
      </Collapsible.Content>
    </Collapsible.Root>
  )
}
