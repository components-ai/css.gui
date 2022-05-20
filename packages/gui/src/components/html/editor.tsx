import { Editor } from '../Editor'
import { HtmlNode } from './types'
import * as Collapsible from '@radix-ui/react-collapsible'
import { useState } from 'react'
import { isNil } from 'lodash-es'
import IconButton from '../ui/IconButton'
import { Trash2 } from 'react-feather'
import { Label } from '../primitives'
import { SelectInput } from '../inputs/SelectInput'

interface EditorProps {
  value: HtmlNode
  onChange(value: HtmlNode): void
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
        <NodeEditor
          value={getChildAtPath(value, selected)}
          onChange={(newItem) =>
            onChange(setChildAtPath(value, selected, newItem))
          }
          onRemove={() => {
            onChange(removeChildAtPath(value, selected))
            setSelected(null)
          }}
        />
      )}
    </div>
  )
}

interface TagEditorProps extends EditorProps {
  onRemove(): void
}

function NodeEditor({ value, onChange, onRemove }: TagEditorProps) {
  const nodeType = typeof value === 'string' ? 'text' : 'tag'
  return (
    <div>
      <div sx={{ display: 'grid', gridTemplateColumns: '1fr max-content' }}>
        <SelectInput
          label="type"
          value={nodeType}
          onChange={(value) => {
            if (value === 'text') {
              onChange('')
            } else {
              onChange({
                tagName: 'div',
              })
            }
          }}
          options={['text', 'tag']}
        />
        <IconButton onClick={onRemove}>
          <Trash2 size={16} />
        </IconButton>
      </div>
      <NodeSwitch value={value} onChange={onChange} />
    </div>
  )
}

function NodeSwitch({ value, onChange }: EditorProps) {
  if (typeof value === 'string') {
    return (
      <div>
        <Label>
          Content
          <input value={value} onChange={(e) => onChange(e.target.value)} />
        </Label>
      </div>
    )
  }
  return (
    <div>
      <div>
        <Label>Tag name</Label>{' '}
        {/* TODO should probably be a select/combobox instead for validity */}
        <input
          type="text"
          value={value.tagName}
          onChange={(e) => onChange({ ...value, tagName: e.target.value })}
        />
      </div>
      <div>
        <Label>Styles</Label>
        <Editor
          styles={value.style ?? {}}
          onChange={(newStyles) => onChange({ ...value, style: newStyles })}
          showAddProperties
        />
      </div>
    </div>
  )
}

interface TreeNodeProps extends EditorProps {
  path: ElementPath
  onSelect(path: ElementPath | null): void
}

function TreeNode({ value, path, onSelect, onChange }: TreeNodeProps) {
  const [open, setOpen] = useState(true)
  if (typeof value === 'string') {
    return (
      <div>
        <button
          sx={{
            border: 'none',
            backgroundColor: 'background',
            color: 'text',
          }}
          onClick={() => onSelect(path)}
        >
          "{value}"
        </button>
      </div>
    )
  }
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
          {value.children?.map((child, i) => {
            return (
              <>
                <AddChildButton
                  onClick={() => {
                    onChange(addChildAtPath(value, [...path, i], ''))
                    onSelect(null)
                  }}
                />
                <TreeNode
                  value={child}
                  onSelect={onSelect}
                  path={[...path, i]}
                  onChange={onChange}
                />
              </>
            )
          })}
          <AddChildButton
            onClick={() => {
              onChange(
                addChildAtPath(
                  value,
                  [...path, (value.children || []).length],
                  ''
                )
              )
              onSelect(null)
            }}
          />
        </div>
        <div sx={{ ml: '1rem' }}>&lt;/{value.tagName}&gt;</div>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}

function AddChildButton({ onClick }: { onClick(): void }) {
  return (
    <button
      onClick={onClick}
      sx={{
        display: 'block',
        background: 'none',
        border: 'none',
        textAlign: 'left',
        color: 'transparent',
        fontSize: '0.75rem',
        height: '0.25rem',
        m: 0,
        p: 0,
        transition: 'height 250ms',
        ':hover': {
          color: 'muted',
          height: '1rem',
        },
      }}
    >
      + Add child
    </button>
  )
}

function getChildAtPath(element: HtmlNode, path: ElementPath): HtmlNode {
  if (path.length === 0) {
    return element
  }
  if (typeof element === 'string') {
    return element
  }
  const [head, ...rest] = path
  const child = element.children?.[head]
  if (isNil(child)) {
    throw new Error('bad path')
  }
  return getChildAtPath(child, rest)
}

function addChildAtPath(
  element: HtmlNode,
  path: ElementPath,
  item: HtmlNode
): HtmlNode {
  // if no path, replace the element
  if (path.length === 0) {
    throw new Error('Cannot add to root path')
  }
  if (typeof element === 'string') {
    return element
  }
  if (path.length === 1) {
    return {
      ...element,
      children: addAt(element.children ?? [], path[0], item),
    }
  }
  const [head, ...rest] = path
  const child = element.children?.[head]
  if (isNil(child)) {
    throw new Error('bad path')
  }
  return {
    ...element,
    children: replaceAt(
      element.children ?? [],
      head,
      addChildAtPath(child, rest, item)
    ),
  }
}

function setChildAtPath(
  element: HtmlNode,
  path: ElementPath,
  newChild: HtmlNode
): HtmlNode {
  // if no path, replace the element
  if (path.length === 0) {
    return newChild
  }
  if (typeof element === 'string') {
    return element
  }
  const [head, ...rest] = path
  const child = element.children?.[head]
  if (isNil(child)) {
    throw new Error('bad path')
  }
  return {
    ...element,
    children: replaceAt(
      element.children ?? [],
      head,
      setChildAtPath(child, rest, newChild)
    ),
  }
}

function removeChildAtPath(element: HtmlNode, path: ElementPath): HtmlNode {
  // if no path, invalid
  if (path.length === 0) {
    throw new Error('Cannot remove top-level')
  }
  if (typeof element === 'string') {
    return element
  }
  if (path.length === 1) {
    return {
      ...element,
      children: removeAt(element.children ?? [], path[0]),
    }
  }
  const [head, ...rest] = path
  const child = element.children?.[head]
  if (isNil(child)) {
    throw new Error('bad path')
  }
  return {
    ...element,
    children: replaceAt(
      element.children ?? [],
      head,
      removeChildAtPath(child, rest)
    ),
  }
}

function addAt<T>(items: T[], index: number, newItem: T) {
  const spliced = [...items]
  spliced.splice(index, 0, newItem)
  return spliced
}

function replaceAt<T>(items: T[], index: number, newItem: T) {
  const spliced = [...items]
  spliced.splice(index, 1, newItem)
  return spliced
}

function removeAt<T>(items: T[], index: number) {
  const spliced = [...items]
  spliced.splice(index, 1)
  return spliced
}
