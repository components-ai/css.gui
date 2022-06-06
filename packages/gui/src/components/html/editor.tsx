import { Editor } from '../Editor'
import { HtmlNode, HTMLTag, ElementPath } from './types'
import * as Collapsible from '@radix-ui/react-collapsible'
import { Fragment, useState } from 'react'
import { isNil } from 'lodash-es'
import IconButton from '../ui/IconButton'
import { X } from 'react-feather'
import { Label, Combobox } from '../primitives'
import { SelectInput } from '../inputs/SelectInput'
import { AttributeEditor } from './AttributeEditor'
import { DEFAULT_STYLES } from './default-styles'
import { useHtmlEditor } from './Provider'
import { isVoidElement } from '../../lib/elements'
import { isSamePath } from './util'

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
]

interface HtmlEditorProps {
  onChange(value: HtmlNode): void
}

/**
 * An HTML tree-based editor that lets you add HTML nodes and mess around with their styles
 */
export function HtmlEditor({ onChange }: HtmlEditorProps) {
  const { value, selected, setSelected } = useHtmlEditor()

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
      <div
        sx={{
          pt: 3,
          pb: 3,
          borderColor: 'border',
          borderRightWidth: '1px',
          borderRightStyle: 'solid',
          borderBottomWidth: '1px',
          borderBottomStyle: 'solid',
          width: '320px',
          overflowX: 'auto',
          resize: 'horizontal',
          minHeight: '100svh',
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
            const newPath = [...selected]
            newPath.pop()
            setSelected(newPath)
          }}
        />
      )}
    </div>
  )
}

interface EditorProps {
  value: HtmlNode
  onChange(value: HtmlNode): void
}
interface TagEditorProps extends EditorProps {
  onRemove(): void
}

function NodeEditor({ value, onChange, onRemove }: TagEditorProps) {
  const nodeType = value.type === 'text' ? 'text' : 'tag'
  return (
    <div
      sx={{
        resize: 'horizontal',
        overflowX: 'auto',
        width: '320px',
        borderRightWidth: '1px',
        borderRightStyle: 'solid',
        borderBottomWidth: '1px',
        borderBottomStyle: 'solid',
        borderColor: 'border',
        minHeight: '100%',
      }}
    >
      <div
        sx={{ mb: 2, display: 'flex', alignItems: 'flex-end', px: 3, pt: 3 }}
      >
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
            element={value.tagName as string}
          />
        </div>
      </article>
      <div sx={{ pt: 3, px: 3 }}>
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
          {value.children?.map((child, i) => {
            return (
              <Fragment key={i}>
                <AddChildButton
                  onClick={() => {
                    onChange(
                      addChildAtPath(value, [i], {
                        type: 'text',
                        value: '',
                      })
                    )
                    onSelect([i])
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
              onChange(
                addChildAtPath(value, [value.children?.length ?? 0], {
                  type: 'text',
                  value: '',
                })
              )
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

function AddChildButton({ onClick }: { onClick(): void }) {
  return (
    <button
      onClick={onClick}
      sx={{
        cursor: 'default',
        display: 'block',
        background: 'none',
        border: 'none',
        textAlign: 'left',
        color: 'transparent',
        fontSize: 0,
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
