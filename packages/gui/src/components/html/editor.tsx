import { Editor } from '../Editor'
import { HtmlNode, HTMLTag, ElementPath, ElementData } from './types'
import * as Collapsible from '@radix-ui/react-collapsible'
import * as Tabs from '@radix-ui/react-tabs'
import { Fragment, useState } from 'react'
import { isNil } from 'lodash-es'
import { Code, Layers, X } from 'react-feather'
import { Label, Combobox } from '../primitives'
import { SelectInput } from '../inputs/SelectInput'
import { AttributeEditor } from './AttributeEditor'
import { DEFAULT_ATTRIBUTES, DEFAULT_STYLES } from './default-styles'
import { useHtmlEditor } from './Provider'
import { isVoidElement } from '../../lib/elements'
import { isSamePath } from './util'
import { Export } from './Export'
import { NodeEditorDropdown } from '../ui/dropdowns/NodeEditorDropdown'
import { useTheme } from '../providers/ThemeContext'

const HTML_TAGS = [
  HTMLTag.A,
  HTMLTag.Abbr,
  HTMLTag.Address,
  HTMLTag.Article,
  HTMLTag.Aside,
  HTMLTag.Audio,
  HTMLTag.B,
  HTMLTag.Bdi,
  HTMLTag.Bdo,
  HTMLTag.Blockquote,
  HTMLTag.Br,
  HTMLTag.Button,
  HTMLTag.Caption,
  HTMLTag.Cite,
  HTMLTag.Code,
  HTMLTag.Col,
  HTMLTag.Colgroup,
  HTMLTag.Data,
  HTMLTag.Datalist,
  HTMLTag.Dd,
  HTMLTag.Del,
  HTMLTag.Details,
  HTMLTag.Dfn,
  HTMLTag.Dialog,
  HTMLTag.Div,
  HTMLTag.Dl,
  HTMLTag.Dt,
  HTMLTag.Em,
  HTMLTag.Fieldset,
  HTMLTag.Figcaption,
  HTMLTag.Figure,
  HTMLTag.Footer,
  HTMLTag.Form,
  HTMLTag.H1,
  HTMLTag.H2,
  HTMLTag.H3,
  HTMLTag.H4,
  HTMLTag.H5,
  HTMLTag.H6,
  HTMLTag.Header,
  HTMLTag.Hr,
  HTMLTag.I,
  HTMLTag.Img,
  HTMLTag.Input,
  HTMLTag.Ins,
  HTMLTag.Kbd,
  HTMLTag.Label,
  HTMLTag.Legend,
  HTMLTag.Li,
  HTMLTag.Main,
  HTMLTag.Mark,
  HTMLTag.Menu,
  HTMLTag.Menuitem,
  HTMLTag.Meter,
  HTMLTag.Nav,
  HTMLTag.Noscript,
  HTMLTag.Ol,
  HTMLTag.Optgroup,
  HTMLTag.Option,
  HTMLTag.Output,
  HTMLTag.P,
  HTMLTag.Picture,
  HTMLTag.Pre,
  HTMLTag.Progress,
  HTMLTag.Q,
  HTMLTag.Rp,
  HTMLTag.Rt,
  HTMLTag.Rtc,
  HTMLTag.Ruby,
  HTMLTag.S,
  HTMLTag.Samp,
  HTMLTag.Span,
  HTMLTag.Section,
  HTMLTag.Select,
  HTMLTag.Source,
  HTMLTag.Slot,
  HTMLTag.Small,
  HTMLTag.Sub,
  HTMLTag.Summary,
  HTMLTag.Sup,
  HTMLTag.Table,
  HTMLTag.Tbody,
  HTMLTag.Td,
  HTMLTag.Template,
  HTMLTag.TextArea,
  HTMLTag.Tfoot,
  HTMLTag.Th,
  HTMLTag.Thead,
  HTMLTag.Time,
  HTMLTag.Tr,
  HTMLTag.Track,
  HTMLTag.U,
  HTMLTag.Ul,
  HTMLTag.Var,
  HTMLTag.Video,
  HTMLTag.Wbr,
  HTMLTag.Svg,
  HTMLTag.Circle,
  HTMLTag.Line,
  HTMLTag.Rect,
  HTMLTag.Path,
  HTMLTag.Text,
]

interface HtmlEditorProps {
  onChange(value: HtmlNode): void
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
          <div sx={{}}>
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
          <Export value={value} />
        </Tabs.Content>
      </Tabs.Root>
    </div>
  )
}

interface EditorProps {
  value: HtmlNode
  onChange(value: HtmlNode): void
}
interface TagEditorProps extends EditorProps {
  onRemove(): void
  onParentChange?(parentValue: HtmlNode): void
}

function NodeEditor({
  value,
  onChange,
  onRemove,
  onParentChange,
}: TagEditorProps) {
  const { value: fullValue, selected } = useHtmlEditor()
  const nodeType = value.type === 'text' ? 'text' : 'tag'
  return (
    <div sx={{ pb: 3, overflowY: 'auto', overflowX: 'hidden' }}>
      <div
        sx={{
          mb: 2,
          display: 'flex',
          alignItems: 'center',
          px: 3,
          pt: 3,
          width: '100%',
        }}
      >
        <div sx={{ flexGrow: 1 }}>
          <SelectInput
            label="Type"
            value={nodeType}
            onChange={(value) => {
              if (value === 'text') {
                onChange({ type: 'text', value: '' })
              } else {
                onChange({
                  type: 'element',
                  tagName: 'div',
                  children: [],
                })
              }
            }}
            options={['text', 'tag']}
          />
        </div>
        <div sx={{ mr: -2 }}>
          <NodeEditorDropdown
            onRemove={onRemove}
            onDuplicate={() => {
              const parentPath = [...(selected || [])]
              const childIndex = parentPath.pop() // Remove child from parent path

              const parent = getChildAtPath(fullValue, parentPath)
              const newParent = addChildAtPath(parent, [childIndex ?? 0], {
                ...value,
              })

              const onChangeForParent = onParentChange
                ? onParentChange
                : onChange
              onChangeForParent(newParent)
            }}
            onWrap={() => {
              const wrappedNode: HtmlNode = {
                type: 'element',
                tagName: 'div',
                children: [value],
              }
              return onChange(wrappedNode)
            }}
          />
        </div>
      </div>
      <NodeSwitch value={value} onChange={onChange} />
    </div>
  )
}

function NodeSwitch({ value, onChange }: EditorProps) {
  const { selected } = useHtmlEditor()

  if (value.type === 'text') {
    return (
      <div sx={{ px: 3 }}>
        <Label>
          <span sx={{ display: 'block' }}>Content</span>
          <textarea
            rows={8}
            sx={{
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
          pb: 3,
        }}
      >
        <div sx={{ mb: 2, px: 3 }}>
          <Label>Tag name</Label>{' '}
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
        </div>
        <div>
          <AttributeEditor
            value={value.attributes ?? {}}
            onChange={(newAttributes) =>
              onChange({ ...value, attributes: newAttributes })
            }
            element={value.tagName as string}
          />
        </div>
      </article>
    </div>
  )
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
      {!open || isVoidElement(value.tagName as string) ? ' /' : null}&gt;
    </button>
  )

  if (isVoidElement(value.tagName as string)) {
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
