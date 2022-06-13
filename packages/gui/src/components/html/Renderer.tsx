import { Fragment, HTMLAttributes } from 'react'
import { toCSSObject } from '../../lib'
import { ElementData, ElementPath } from './types'
import { HTMLFontTags } from './FontTags'
import { useHtmlEditor } from './Provider'
import { isVoidElement } from '../../lib/elements'
import { isSamePath } from './util'
import { useTheme } from '../providers/ThemeContext'
import { transformValueToSchema } from '../../components/html/Provider'

interface HtmlRendererProps {
  value: ElementData
  path?: ElementPath
  canvas?: boolean
}
export function HtmlRenderer({ value, canvas = true }: HtmlRendererProps) {
  const transformedVal = transformValueToSchema(value)
  return (
    <>
      <HTMLFontTags htmlTree={transformedVal} />
      <ElementRenderer value={transformedVal} canvas={canvas} path={[] as ElementPath} />
    </>
  )
}

const DEFAULT_ELEMENT_STYLES_IN_CANVAS = {
  cursor: 'default',
}

interface ElementRendererProps {
  value: ElementData
  path: ElementPath
  canvas: boolean
}
function ElementRenderer({ value, canvas, path }: ElementRendererProps) {
  const { selected, setSelected } = useHtmlEditor()
  const theme = useTheme()
  const { attributes = {}, style = {}, children = [] } = value
  const Tag: any = value.tagName || 'div'

  const sx = toCSSObject({
    ...style,
    ...DEFAULT_ELEMENT_STYLES_IN_CANVAS,
  }, theme)

  if (isSamePath(path, selected) && canvas) {
    sx.outlineWidth = 'thin'
    sx.outlineStyle = 'solid'
    sx.outlineColor = 'primary'
    sx.outlineOffset = '4px'
    sx.userSelect = 'none'
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
    return <Tag {...props} />
  }

  return (
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
  )
}

const cleanAttributes = (attributes: Record<string, string>) => {
  const newAttributes = { ...attributes }

  if (newAttributes.href) {
    newAttributes.href = '#!'
  }

  if (newAttributes.class) {
    newAttributes.className = newAttributes.class
    delete newAttributes.class
  }

  return newAttributes
}
