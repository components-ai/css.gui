import { Editor } from '../Editor'
import { HtmlNode, ElementPath } from './types'
import * as Collapsible from '@radix-ui/react-collapsible'
import * as Tabs from '@radix-ui/react-tabs'
import { Fragment, useState } from 'react'
import { Code, Layers } from 'react-feather'
import { useHtmlEditor } from './Provider'
import { isVoidElement } from '../../lib/elements'
import {
  addChildAtPath,
  getChildAtPath,
  isSamePath,
  removeChildAtPath,
  replaceAt,
  setChildAtPath,
} from './util'
import { Export } from './Export'
import { useTheme } from '../providers/ThemeContext'
import { NodeEditor } from './NodeEditor'

interface HtmlEditorProps {
  onChange(value: HtmlNode): void
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

const TABS_TRIGGER_STYLES: any = {
  all: 'unset',
  cursor: 'pointer',
  fontSize: 0,
  fontWeight: 500,
  px: 2,
  py: 1,
  color: 'muted',
  display: 'inline-flex',
  gap: '.5em',
  alignItems: 'center',
  '&[data-state="active"]': {
    color: 'text',
  },
}
const TABS_CONTENT_STYLES: any = {
  width: 400,
  height: 'calc(100vh - 81px)',
  overflow: 'auto',
  resize: 'horizontal',
  borderRightWidth: '1px',
  borderRightStyle: 'solid',
  borderColor: 'border',
  '&::-webkit-scrollbar': { display: 'none' },
  scrollbarWidth: 0,
}

/**
 * An HTML tree-based editor that lets you add HTML nodes and mess around with their styles
 */
export function HtmlEditor({ onChange }: HtmlEditorProps) {
  const { value, selected: providedSelected, setSelected } = useHtmlEditor()
  const theme = useTheme()

  const selected = providedSelected || []
  const nodeValue = getChildAtPath(value, selected)

  return (
    <div
      sx={{
        display: 'flex',
        width: 'auto',
        height: '100%',
        '*': {
          boxSizing: 'border-box',
          //outline: '1px solid rgba(125,125,180,.5)',
        },
        '*:before': {
          boxSizing: 'border-box',
        },
        '*:after': {
          boxSizing: 'border-box',
        },
      }}
    >
      <Tabs.Root defaultValue="node">
        <Tabs.List
          sx={{
            px: 2,
            width: '100%',
            borderRight: 'thin solid',
            borderBottom: 'thin solid',
            borderColor: 'border',
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'nowrap',
            overflowX: 'auto',
          }}
        >
          <Tabs.Trigger sx={TABS_TRIGGER_STYLES} value="node">
            🎨 Styles
          </Tabs.Trigger>
          <Tabs.Trigger sx={TABS_TRIGGER_STYLES} value="tree">
            <Layers size={12} /> Layers
          </Tabs.Trigger>
          <Tabs.Trigger sx={TABS_TRIGGER_STYLES} value="export">
            <Code size={12} /> Export
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content sx={TABS_CONTENT_STYLES} value="node">
          <div sx={{ pt: 3, px: 3 }}>
            <Editor
              key={selected.join('-')}
              theme={theme}
              styles={nodeValue.style ?? {}}
              onChange={(newStyles) => {
                const newItem = { ...nodeValue, style: newStyles }
                onChange(setChildAtPath(value, selected, newItem))
              }}
              showRegenerate
              showAddProperties
            />
          </div>
        </Tabs.Content>
        <Tabs.Content sx={TABS_CONTENT_STYLES} value="tree">
          <div>
            <NodeEditor
              value={nodeValue}
              onChange={(newItem) =>
                onChange(setChildAtPath(value, selected, newItem))
              }
              onParentChange={(newItem) => {
                const parentPath = [...(selected || [])]
                parentPath.pop()
                const newValue = setChildAtPath(value, parentPath, newItem)
                onChange(newValue)
              }}
              onRemove={() => {
                onChange(removeChildAtPath(value, selected))
                const newPath = [...selected]
                newPath.pop()
                setSelected(newPath)
              }}
            />
            <TreeNode
              value={value}
              onSelect={setSelected}
              path={[]}
              onChange={onChange}
            />
          </div>
        </Tabs.Content>
        <Tabs.Content sx={TABS_CONTENT_STYLES} value="export">
          <Export value={value} theme={theme} />
        </Tabs.Content>
      </Tabs.Root>
    </div>
  )
}

interface EditorProps {
  value: HtmlNode
  onChange(value: HtmlNode): void
}
interface TreeNodeProps extends EditorProps {
  path: ElementPath
  onSelect(path: ElementPath | null): void
}

function TreeNode({ value, path, onSelect, onChange }: TreeNodeProps) {
  const { selected } = useHtmlEditor()
  const [open, setOpen] = useState(true)
  const isSelected = isSamePath(path, selected)

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
      }}
      onClick={() => onSelect(path)}
    >
      &lt;{value.tagName}
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
