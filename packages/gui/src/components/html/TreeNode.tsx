import { HtmlNode, ElementPath } from './types'
import * as Collapsible from '@radix-ui/react-collapsible'
import { Fragment, useEffect, useState } from 'react'
import { useHtmlEditor } from './Provider'
import { isVoidElement } from '../../lib/elements'
import { addChildAtPath, getChildAtPath, isSamePath, replaceAt } from './util'
import { NodeEditorDropdown } from '../ui/dropdowns/NodeEditorDropdown'
import { Combobox } from '../primitives'
import { HTML_TAGS } from './data'
import { DEFAULT_ATTRIBUTES, DEFAULT_STYLES } from './default-styles'

interface EditorProps {
  value: HtmlNode
  onChange(value: HtmlNode): void
}
interface TreeNodeProps extends EditorProps {
  path: ElementPath
  onSelect(path: ElementPath | null): void
}

export function TreeNode({ value, path, onSelect, onChange }: TreeNodeProps) {
  const { selected } = useHtmlEditor()
  const [open, setOpen] = useState(true)
  const [editing, setEditing] = useState(false)
  const isSelected = isSamePath(path, selected)

  if (editing && !isSelected) {
    setEditing(false)
  }

  if (value.type === 'text') {
    return (
      <div sx={{ cursor: 'default' }}>
        <button
          sx={{
            appearance: 'none',
            border: 'none',
            backgroundColor: 'background',
            color: 'text',
            fontWeight: isSelected ? 600 : 400,
            textAlign: 'start',
            fontSize: 0,
          }}
          onClick={() => onSelect(path)}
        >
          "{value.value}"
        </button>
      </div>
    )
  }

  if (value.type === 'slot') {
    return (
      <div sx={{ cursor: 'default' }}>
        <button
          sx={{
            appearance: 'none',
            border: 'none',
            backgroundColor: 'background',
            color: 'text',
            fontWeight: isSelected ? 600 : 400,
            textAlign: 'start',
            fontSize: 0,
          }}
          onClick={() => onSelect(path)}
        >
          {value.name}: "{value.value}"
        </button>
      </div>
    )
  }

  const tagEditor = editing ? (
    <Combobox
      key={selected?.join('-')}
      onFilterItems={(filterValue) => {
        return HTML_TAGS.filter((el) => el.startsWith(filterValue))
      }}
      onItemSelected={(selectedItem) => {
        const defaultStyles = DEFAULT_STYLES[selectedItem] || {}
        const mergedStyles = { ...defaultStyles, ...value.style }
        const defaultAttributes = DEFAULT_ATTRIBUTES[selectedItem] || {}
        const mergedAttributes = {
          ...defaultAttributes,
          ...(value.attributes || {}),
        }
        setEditing(false)
        onChange({
          ...value,
          attributes: mergedAttributes,
          tagName: selectedItem,
          style: mergedStyles,
        })
      }}
      items={HTML_TAGS}
      value={value.tagName}
    />
  ) : (
    <button
      sx={{
        cursor: isSelected ? 'text' : 'pointer',
        border: 'none',
        backgroundColor: 'transparent',
        color: 'text',
        margin: 0,
        padding: 0,
      }}
      onClick={() => {
        if (isSelected) {
          setEditing(true)
        }
      }}
    >
      {value.tagName}
    </button>
  )

  const tagButton = (
    <button
      sx={{
        cursor: 'pointer',
        border: 'none',
        backgroundColor: 'background',
        color: 'text',
        fontSize: 1,
        fontWeight: isSelected ? 600 : 400,
        px: 0,
        mr: 0,
        ml: 0,
        textAlign: 'start',
        display: 'inline-flex',
      }}
      onClick={() => onSelect(path)}
    >
      &lt;{tagEditor}
      {!open || isSelfClosing(value) ? ' /' : null}&gt;
    </button>
  )

  if (isSelfClosing(value)) {
    return tagButton
  }

  return (
    <Collapsible.Root open={open} onOpenChange={setOpen}>
      <Collapsible.Trigger
        sx={{
          border: 'none',
          backgroundColor: 'background',
          color: 'text',
          cursor: 'pointer',
          width: '16px',
          height: '16px',
          display: 'inline-flex',
          alignItems: 'center',
          fontFamily: 'monospace',
          ':before': {
            cursor: 'default',
            content: open ? '"▼"' : '"▶︎"',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            width: '100%',
          },
        }}
      />
      <span sx={{ lineHeight: 1, fontFamily: 'monospace' }}>{tagButton}</span>
      <Collapsible.Content>
        <div sx={{ ml: 4 }}>
          {value.children?.length ? (
            value.children?.map((child, i) => {
              return (
                <Fragment key={i}>
                  <AddChildButton
                    onClick={() => {
                      onChange(addChildAtPath(value, [i], DEFAULT_CHILD_NODE))
                      onSelect([...path, i])
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
                  <AddChildButton
                    onClick={() => {
                      onChange(
                        addChildAtPath(
                          value,
                          [value.children?.length ?? 0],
                          DEFAULT_CHILD_NODE
                        )
                      )
                      onSelect(null)
                    }}
                  />
                </Fragment>
              )
            })
          ) : (
            <AddChildButton
              onClick={() => {
                onChange(addChildAtPath(value, [0], DEFAULT_CHILD_NODE))
                onSelect([0])
              }}
            />
          )}
        </div>
        <div sx={{ display: 'flex', alignItems: 'center' }}>
          <div
            sx={{
              border: '0',
              backgroundColor: 'background',
              color: 'text',
              cursor: 'pointer',
              width: '16px',
              height: '16px',
              display: 'flex',
              alignItems: 'center',
              fontFamily: 'monospace',
              fontSize: 1,
              p: 0,
              mr: '1px',
              ':before': {
                boxSizing: 'border-box',
                cursor: 'default',
                content: '" "',
                whiteSpace: 'pre',
                height: '100%',
                width: '100%',
              },
            }}
          ></div>
          <div
            sx={{
              fontWeight: isSelected ? 600 : 400,
              lineHeight: 1,
              p: 0,
              fontSize: 1,
              fontFamily: 'monospace',
            }}
          >
            &lt;/{value.tagName}&gt;
          </div>
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}

const isSelfClosing = (node: HtmlNode) => {
  if (node.type === 'slot') {
    return false
  }

  return node.type === 'component' || isVoidElement(node.tagName as string)
}

const DEFAULT_CHILD_NODE: HtmlNode = {
  type: 'element',
  tagName: 'div',
  children: [
    {
      type: 'text',
      value: '',
    },
  ],
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
        fontSize: 0,
        pt: 2,
        whiteSpace: 'nowrap',
        color: 'muted',
        zIndex: '99',
        transition: 'color .2s ease-in-out',
        ':hover': {
          color: 'text',
        },
      }}
    >
      + Add child
    </button>
  )
}
