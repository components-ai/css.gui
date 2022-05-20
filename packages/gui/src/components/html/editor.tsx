import { ElementData } from './types'
import * as Collapsible from '@radix-ui/react-collapsible'
import { useState } from 'react'

interface EditorProps {
  value: ElementData
  onChange(value: ElementData): void
}

type ElementPath = number[]

/**
 * An HTML tree-based editor that lets you add HTML nodes and mess around with their styles
 */
export function HtmlEditor({ value, onChange }: EditorProps) {
  const [selected, setSelected] = useState<ElementPath | null>(null)
  return (
    <div sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
      <TreeNode
        value={value}
        onSelect={setSelected}
        path={[]}
        onChange={onChange}
      />
      {selected && (
        <Editor
          value={getChildAtPath(value, selected)}
          onChange={(newItem) =>
            onChange(setChildAtPath(value, selected, newItem))
          }
        />
      )}
    </div>
  )
}

function Editor({ value, onChange }: EditorProps) {
  return (
    <div>
      <div>
        <label>tagName</label>{' '}
        <input
          type="text"
          value={value.tagName}
          onChange={(e) => onChange({ ...value, tagName: e.target.value })}
        />
      </div>
    </div>
  )
}

interface TreeNodeProps extends EditorProps {
  path: ElementPath
  onSelect(path: ElementPath): void
}

function TreeNode({ value, path, onSelect, onChange }: TreeNodeProps) {
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
        onClick={() => onSelect(path)}
      >
        &lt;{value.tagName}
        {!open && '/'}&gt;
      </button>
      <Collapsible.Content>
        <div sx={{ ml: 4 }}>
          {value.children.map((child, i) => {
            if (typeof child === 'string') {
              return <div>"{child}"</div>
            }
            return (
              <TreeNode
                value={child}
                onSelect={onSelect}
                path={[...path, i]}
                onChange={onChange}
              />
            )
          })}
        </div>
        <div sx={{ ml: '1rem' }}>&lt;/{value.tagName}&gt;</div>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}

function getChildAtPath(element: ElementData, path: ElementPath): ElementData {
  if (path.length === 0) {
    return element
  }
  const [head, ...rest] = path
  const child = element.children?.[head]
  if (!child || typeof child === 'string') {
    throw new Error('bad path')
  }
  return getChildAtPath(child, rest)
}

function setChildAtPath(
  element: ElementData,
  path: ElementPath,
  newChild: ElementData
): ElementData {
  // if no path, replace the element
  if (path.length === 0) {
    return newChild
  }
  const [head, ...rest] = path
  const child = element.children?.[head]
  if (!child || typeof child === 'string') {
    throw new Error('bad path')
  }
  return {
    ...element,
    children: replaceAt(
      element.children,
      head,
      setChildAtPath(child, rest, newChild)
    ),
  }
}

function replaceAt<T>(items: T[], index: number, newItem: T) {
  const spliced = [...items]
  spliced.splice(index, 1, newItem)
  return spliced
}
