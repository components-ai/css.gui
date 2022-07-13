import { toCSSObject } from '../../lib'
import { ElementPath, HtmlNode, Slot } from './types'
import { HTMLFontTags } from './FontTags'
import { useHtmlEditor } from './Provider'
import { isVoidElement } from '../../lib/elements'
import { isSamePath } from './util'
import { useTheme } from '../providers/ThemeContext'
import { transformValueToSchema } from '../../components/html/Provider'
import { toReactProps } from '../../lib/codegen/to-react-props'
import { ComponentProvider, useComponent } from './ComponentProvider'

interface HtmlRendererProps {
  value: HtmlNode
  path?: ElementPath
  canvas?: boolean
}
export function HtmlRenderer({ value, canvas = true }: HtmlRendererProps) {
  const transformedVal = transformValueToSchema(value)
  return (
    <>
      <HTMLFontTags htmlTree={transformedVal} />
      <ElementRenderer
        value={transformedVal}
        canvas={canvas}
        path={[] as ElementPath}
      />
    </>
  )
}

const DEFAULT_ELEMENT_STYLES_IN_CANVAS = {
  cursor: 'default',
}

interface ElementRendererProps {
  value: HtmlNode
  path: ElementPath
  canvas: boolean
}
function ElementRenderer({ value, canvas, path }: ElementRendererProps) {
  const { selected, setSelected } = useHtmlEditor()
  const theme = useTheme()

  if (value.type === 'slot') {
    return <SlotRenderer value={value} />
  }

  const { attributes = {}, style = {}, children = [] } = value
  const Tag: any = value.tagName || 'div'

  const sx = toCSSObject(
    {
      ...(canvas ? DEFAULT_ELEMENT_STYLES_IN_CANVAS : {}),
      ...style,
    },
    theme
  )

  if (isSamePath(path, selected) && canvas) {
    sx.outlineWidth = 'thin'
    sx.outlineStyle = 'solid'
    sx.outlineColor = 'primary'
    sx.outlineOffset = '4px'
    sx.userSelect = 'none'
  }

  const handleSelect = (e: MouseEvent) => {
    e.stopPropagation()
    setSelected(path)
  }

  const props = toReactProps({
    ...(canvas ? cleanAttributes(attributes) : attributes),
    sx,
    onClick: handleSelect,
  })

  if (value.type === 'component') {
    return (
      <ComponentProvider value={value}>
        <div sx={sx}>
          <ElementRenderer value={value.value} canvas={false} path={path} />
        </div>
      </ComponentProvider>
    )
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

interface SlotRendererProps {
  value: HtmlNode
}
function SlotRenderer({ value: providedValue }: SlotRendererProps) {
  const { value: outerValue } = useComponent()

  const value = providedValue as Slot
  const slot = outerValue?.propTypes?.find((prop) => prop.name === value.name)

  return <>{slot?.defaultValue || value.value || null}</>
}

const cleanAttributes = (attributes: Record<string, string>) => {
  const newAttributes = { ...attributes }

  if (newAttributes.href) {
    newAttributes.href = '#!'
  }

  return newAttributes
}
