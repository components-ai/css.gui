import { HtmlNode, ElementPath } from './types'
import * as Collapsible from '@radix-ui/react-collapsible'
import { Fragment, useState } from 'react'
import { useHtmlEditor } from './Provider'
import { isVoidElement } from '../../lib/elements'
import { addChildAtPath, isSamePath, replaceAt } from './util'
import { hasChildrenSlot } from '../../lib/codegen/util'
import { Combobox } from '../primitives'
import { HTML_TAGS } from './data'
import { DEFAULT_ATTRIBUTES, DEFAULT_STYLES } from './default-styles'
import { Plus } from 'react-feather'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

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
            width: '100%',
          }}
          onClick={() => onSelect(path)}
        >
          {editing ? (
            <textarea
              sx={{
                display: 'block',
                width: '100%',
              }}
              value={value.value}
              onChange={(e) =>
                onChange({
                  ...value,
                  value: e.target.value,
                })
              }
            />
          ) : (
            <button
              sx={{
                textAlign: 'left',
                cursor: isSelected ? 'text' : 'pointer',
                fontWeight: isSelected ? 600 : 400,
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
              "{value.value}"
            </button>
          )}
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
        fontWeight: isSelected ? 600 : 400,
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

  function handleAddChild(i: number, type: string) {
    const child = type === 'tag' ? DEFAULT_TAG : DEFAULT_TEXT
    onChange(addChildAtPath(value, [i], child))
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
          {value.children?.map((child, i) => {
            return (
              <Fragment key={i}>
                <AddChildButton
                  onClick={(childType) => {
                    handleAddChild(i, childType)
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
              </Fragment>
            )
          })}
          <AddChildButton
            onClick={(childType) => {
              handleAddChild(value.children?.length ?? 0, childType)
              onSelect(null)
            }}
          />
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
  if (node.type !== 'component') {
    return isVoidElement(node.tagName as string)
  }

  return !hasChildrenSlot(node.value)
}

const DEFAULT_TAG: HtmlNode = {
  type: 'element',
  tagName: 'div',
}

const DEFAULT_TEXT: HtmlNode = {
  type: 'text',
  value: '',
}

function AddChildButton({ onClick }: { onClick(type: string): void }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div sx={{ position: 'relative' }}>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger
          sx={{
            '--height': '1rem',
            display: 'flex',
            alignItems: 'center',
            position: 'absolute',
            height: 'var(--height)',
            top: 'calc(var(--height) / -2 )',
            width: '100%',
            cursor: 'pointer',
            ':hover': {
              color: 'muted',
            },

            background: 'transparent',
            border: 'none',

            '::before': {
              content: '""',
              backgroundColor: hovered ? 'muted' : 'transparent',
              display: 'block',
              height: '2px',
              width: '100%',
            },
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <Plus size={16} />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content
          sx={{
            minWidth: '12rem',
            border: '1px solid',
            borderColor: 'border',
            borderRadius: '0.25rem',
            backgroundColor: 'background',
            py: 2,
          }}
        >
          {['tag', 'text'].map((childType) => {
            return (
              <DropdownMenu.Item
                key={childType}
                onClick={() => {
                  onClick(childType)
                }}
                sx={{
                  cursor: 'pointer',
                  px: 3,
                  ':hover': {
                    backgroundColor: 'backgroundOffset',
                  },
                }}
              >
                Add {childType}
              </DropdownMenu.Item>
            )
          })}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  )
}
