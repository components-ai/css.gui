import { Editor } from '../Editor'
import { HtmlNode, HTMLTag } from './types'
import * as Collapsible from '@radix-ui/react-collapsible'
import { Fragment, useState } from 'react'
import { isNil } from 'lodash-es'
import IconButton from '../ui/IconButton'
import { X } from 'react-feather'
import { Label, Combobox } from '../primitives'
import { SelectInput } from '../inputs/SelectInput'
import { AttributeEditor } from './AttributeEditor'
import { DEFAULT_STYLES } from './default-styles'

const HTML_TAGS = [
  HTMLTag.P,
  HTMLTag.Img,
  HTMLTag.Button,
  HTMLTag.A,
  HTMLTag.Input,
  HTMLTag.H1,
  HTMLTag.H2,
  HTMLTag.H3,
  HTMLTag.H4,
  HTMLTag.H5,
  HTMLTag.H6,
  HTMLTag.Span,
  HTMLTag.Div,
]

interface EditorProps {
  value: HtmlNode
  onChange(value: HtmlNode): void
}

type ElementPath = number[]

/**
 * An HTML tree-based editor that lets you add HTML nodes and mess around with their styles
 */
export function HtmlEditor({ value, onChange }: EditorProps) {
  const [selected, setSelected] = useState<ElementPath | null>(
    value ? [0] : null
  )
  return (
    <div
      sx={{
        display: 'flex',
        width: 'auto',
      }}
    >
      <div
        sx={{
          pt: 3,
          pb: 3,
          borderColor: 'border',
          borderRightWidth: '1px',
          borderRightStyle: 'solid',
          borderBottomWidth: '1px',
          borderBottomStyle: 'solid',
          overflowX: 'auto',
          resize: 'horizontal',
        }}
      >
        <TreeNode
          value={value}
          onSelect={setSelected}
          path={[]}
          onChange={onChange}
        />
      </div>
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
    <div
      sx={{
        resize: 'horizontal',
        overflowX: 'auto',
        p: 3,
        borderRightWidth: '1px',
        borderRightStyle: 'solid',
        borderBottomWidth: '1px',
        borderBottomStyle: 'solid',
        borderColor: 'border',
      }}
    >
      <div sx={{ mb: 2, display: 'flex', alignItems: 'flex-end' }}>
        <SelectInput
          label="Type"
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
        <div sx={{ position: 'relative', top: '-4px' }}>
          <IconButton onClick={onRemove}>
            <X size={14} />
          </IconButton>
        </div>
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
      <article
        sx={{
          borderBottomWidth: '1px',
          borderBottomStyle: 'solid',
          borderBottomColor: 'border',
          mb: 3,
        }}
      >
        <div sx={{ mb: 2 }}>
          <Label>Tag name</Label>{' '}
          <Combobox
            onFilterItems={(filterValue) => {
              return HTML_TAGS.filter((el) => el.startsWith(filterValue))
            }}
            onItemSelected={(selectedItem) => {
              const defaultStyles = DEFAULT_STYLES[selectedItem] || {}
              const mergedStyles = { ...defaultStyles, ...value.style }
              onChange({
                ...value,
                tagName: selectedItem,
                style: mergedStyles,
              })
            }}
            items={HTML_TAGS}
            value={value.tagName}
          />
        </div>
        <div>
          <AttributeEditor
            value={value.attributes ?? {}}
            onChange={(newAttributes) =>
              onChange({ ...value, attributes: newAttributes })
            }
            element={value.tagName}
          />
        </div>
      </article>
      <div>
        <Label> 🎨 Styles</Label>
        <div sx={{ mt: 2 }}>
          <Editor
            styles={value.style ?? {}}
            onChange={(newStyles) => onChange({ ...value, style: newStyles })}
            showAddProperties
          />
        </div>
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
            cursor: 'pointer',
            content: open ? '"▼"' : '"▶︎"',
            display: 'inline-block',
            width: '1rem',
            height: '1rem',
            position: 'relative',
            top: '-2px',
          },
        }}
      ></Collapsible.Trigger>
      <button
        sx={{
          cursor: 'pointer',
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
              <Fragment key={i}>
                <AddChildButton
                  onClick={() => {
                    onChange(addChildAtPath(value, [i], ''))
                    onSelect(null)
                  }}
                />
                <TreeNode
                  value={child}
                  onSelect={onSelect}
                  path={[...path, i]}
                  onChange={(newChild) => {
                    onChange({
                      ...value,
                      children: replaceAt(value.children ?? [], i, newChild),
                    })
                  }}
                />
              </Fragment>
            )
          })}
          <AddChildButton
            onClick={() => {
              onChange(addChildAtPath(value, [value.children?.length ?? 0], ''))
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
        cursor: 'pointer',
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
        whiteSpace: 'nowrap',
        zIndex: '99',
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

interface AttributeEditorProps {
  value: Record<string, string>
  onChange(value: Record<string, string>): void
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
  console.log({ element, path })
  // if no path, replace the element
  if (path.length === 0) {
    throw new Error('Cannot add to root path')
  }
  if (typeof element === 'string') {
    return element
  }
  if (path.length === 1) {
    console.log('path length 1')
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
