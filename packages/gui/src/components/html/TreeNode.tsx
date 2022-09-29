import { HtmlNode, ElementPath } from './types'
import * as Collapsible from '@radix-ui/react-collapsible'
import { useState } from 'react'
import { useHtmlEditor } from './Provider'
import { isProseElement, isVoidElement } from '../../lib/elements'
import { addChildAtPath, isSamePath, replaceAt } from './util'
import { hasChildrenSlot } from '../../lib/codegen/util'
import { Combobox } from '../primitives'
import { HTML_TAGS } from './data'
import { DEFAULT_ATTRIBUTES, DEFAULT_STYLES } from './default-styles'
import { Plus } from 'react-feather'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { useNodeTypes } from './Editors/util'

interface EditorProps {
  value: HtmlNode
  onChange(value: HtmlNode): void
}
interface TreeNodeProps extends EditorProps {
  path: ElementPath
  onSelect(path: ElementPath | null): void
}

export function TreeNode({ value, path, onSelect, onChange }: TreeNodeProps) {
  const { selected, isEditing, setEditing, components } = useHtmlEditor()
  const [open, setOpen] = useState(true)
  const isSelected = isSamePath(path, selected)
  const isEditingNode = isSelected && isEditing

  function handleSelect() {
    // If we are selecting a different node than the currently selected node, move out of editing mode
    if (!isSelected) {
      setEditing(false)
    }
    onSelect(path)
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
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }}
          onClick={() => {
            handleSelect()
          }}
        >
          {isEditingNode ? (
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
          onClick={() => handleSelect()}
        >
          {value.name}: "{value.value}"
        </button>
      </div>
    )
  }

  const tagEditor = isEditingNode ? (
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
        const fullValue = {
          ...value,
          attributes: mergedAttributes,
          tagName: selectedItem,
          style: mergedStyles,
        }
        if (isProseElement(selectedItem) && !fullValue.children?.length) {
          fullValue.children = [{ type: 'text', value: '' }]
        }
        setEditing(false)
        onChange(fullValue)
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
        fontSize: '14px',
        fontFamily: 'monospace',
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
        appearance: 'none',
        WebkitAppearance: 'none',
        cursor: 'pointer',
        border: 'none',
        backgroundColor: isSelected ? '#d128dd' : 'background',
        color: 'text',
        fontSize: '14px',
        fontFamily: 'monospace',
        fontWeight: isSelected ? 700 : 400,
        borderRadius: '6px',
        px: 2,
        mr: 0,
        ml: 0,
        textAlign: 'start',
        display: 'inline-flex',
      }}
      onClick={() => {
        handleSelect()
      }}
    >
      &lt;{tagEditor}
      {!open || isSelfClosing(value) ? ' /' : null}&gt;
    </button>
  )

  if (isSelfClosing(value)) {
    return tagButton
  }

  function handleAddChild(i: number, type: string) {
    let child = DEFAULT_TEXT
    if (type === 'tag') {
      child = DEFAULT_TAG
    } else if (type === 'component') {
      child = components![0]
    } else if (type === 'slot') {
      child = DEFAULT_SLOT
    }

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
      <span sx={{ fontSize: 1, lineHeight: 1, fontFamily: 'monospace' }}>
        {tagButton}
      </span>
      <Collapsible.Content>
        <div sx={{ ml: 4, py: '0.0625rem' }}>
          {value.children?.map((child, i) => {
            return (
              <div key={i}>
                <AddChildButton
                  onClick={(childType) => {
                    handleAddChild(i, childType)
                    onSelect([...path, i])
                    setEditing(true)
                  }}
                />
                <div sx={{ py: '0.0625rem' }}>
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
                </div>
              </div>
            )
          })}
          <AddChildButton
            onClick={(childType) => {
              const index = value.children?.length ?? 0
              handleAddChild(index, childType)
              onSelect([...path, index])
              setEditing(true)
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
              lineHeight: 1,
              py: 0,
              px: 2,
              fontSize: '14px',
              fontFamily: 'monospace',
              bg: isSelected ? '#d128dd' : 'background',
              fontWeight: isSelected ? 700 : 400,
              borderRadius: '6px',
              transition: 'background-color .2s ease-in-out',
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

const DEFAULT_SLOT: HtmlNode = {
  type: 'slot',
  name: 'newSlot',
  value: '',
}

function AddChildButton({ onClick }: { onClick(type: string): void }) {
  const [hovered, setHovered] = useState(false)
  const [open, setOpen] = useState(false)
  const nodeTypes = useNodeTypes()

  return (
    <div sx={{ position: 'relative' }}>
      <DropdownMenu.Root open={open} onOpenChange={setOpen}>
        <DropdownMenu.Trigger
          sx={{
            '--height': '0.5rem',
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
              backgroundColor: hovered || open ? 'muted' : 'transparent',
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
          {nodeTypes.map((childType) => {
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
