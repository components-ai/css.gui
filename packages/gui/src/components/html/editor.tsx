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
  const [selected, setSelected] = useState<ElementData | null>(null)
  return (
    <div sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
      <TreeNode value={value} onSelect={setSelected} />
      {selected && <Editor value={selected} />}
    </div>
  )
}

function Editor({ value }: EditorProps) {
  return <div>tagName: {value.tagName}</div>
}

interface TreeNodeProps extends EditorProps {
  onSelect(element: ElementData): void
}

function TreeNode({ value, onSelect }: TreeNodeProps) {
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
      ></Collapsible.Trigger>
      <button
        sx={{
          border: 'none',
          backgroundColor: 'background',
          color: 'text',
          fontSize: '1rem',
        }}
        onClick={() => onSelect(value)}
      >
        &lt;{value.tagName}
        {!open && '/'}&gt;
      </button>
      <Collapsible.Content>
        <div sx={{ ml: 4 }}>
          {value.children.map((child) => {
            if (typeof child === 'string') {
              return <div>"{child}"</div>
            }
            return <TreeNode value={child} onSelect={onSelect} />
          })}
        </div>
        <div sx={{ ml: '1rem' }}>&lt;/{value.tagName}&gt;</div>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}
