import { Fragment, HTMLAttributes } from 'react'
import { toCSSObject } from '../../lib'
import { ElementData, ElementPath } from './types'
import { HTMLFontTags } from './FontTags'
import { useHtmlEditor } from './Provider'
import { isVoidElement } from '../../lib/elements'
import { isSamePath } from './util'

interface HtmlRendererProps {
  value: ElementData
  path?: ElementPath
  canvas?: boolean
}
export function HtmlRenderer({ value, canvas = true }: HtmlRendererProps) {
  return (
    <>
      <HTMLFontTags htmlTree={value} />
      <ElementRenderer value={value} canvas={canvas} path={[] as ElementPath} />
    </>
  )
}

interface ElementRendererProps {
  value: ElementData
  path: ElementPath
  canvas: boolean
}
function ElementRenderer({ value, canvas, path }: ElementRendererProps) {
  const { selected, setSelected } = useHtmlEditor()
  const { attributes = {}, style = {}, children = [] } = value
  const Tag: any = value.tagName || 'div'

  const Wrap = canvas ? ElementWrap : Fragment
  const sx = toCSSObject(style)

  if (isSamePath(path, selected)) {
    sx.outlineWidth = 'thin'
    sx.outlineStyle = 'solid'
    sx.outlineColor = 'primary'
  }

  const props = {
    ...(canvas ? cleanAttributes(attributes) : attributes),
    sx,
    onClick: (e: MouseEvent) => {
      e.stopPropagation()
      setSelected(path)
    },
  }

  if (isVoidElement(Tag)) {
    return (
      <Wrap>
        <Tag {...props} />
      </Wrap>
    )
  }

  return (
    <Wrap>
      <Tag {...props}>
        {children.map((child, i) => {
          if (child.type === 'text') {
            return child.value
          }
          return (
            <ElementRenderer
              key={i}
              value={child}
              canvas={canvas}
              path={[...path, i]}
            />
          )
        })}
      </Tag>
    </Wrap>
  )
}

function ElementWrap(props: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span sx={{ cursor: 'default', a: { cursor: 'default' } }} {...props} />
  )
}

const cleanAttributes = (attributes: Record<string, string>) => {
  const newAttributes = { ...attributes }

  if (newAttributes.href) {
    delete newAttributes.href
  }

  if (newAttributes.class) {
    newAttributes.className = newAttributes.class
    delete newAttributes.class
  }

  return newAttributes
}
