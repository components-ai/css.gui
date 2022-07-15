import { ElementPath, HtmlNode, Slot } from './types'
import { HTMLFontTags } from './FontTags'
import { isVoidElement } from '../../lib/elements'
import { transformValueToSchema } from '../../components/html/Provider'
import { ComponentProvider, useComponent } from './ComponentProvider'
import { CanvasProvider, useCanvasProps } from './CanvasProvider'

interface HtmlRendererProps {
  value: HtmlNode
  path?: ElementPath
  canvas?: boolean
}
export function HtmlRenderer({ value, canvas = true }: HtmlRendererProps) {
  const transformedVal = transformValueToSchema(value)

  return (
    <CanvasProvider canvas={canvas}>
      <>
        <HTMLFontTags htmlTree={transformedVal} />
        <ElementRenderer
          value={transformedVal}
          canvas={canvas}
          path={[] as ElementPath}
        />
      </>
    </CanvasProvider>
  )
}

interface ElementRendererProps {
  value: HtmlNode
  path: ElementPath
  canvas: boolean
}
function ElementRenderer({ value, canvas, path }: ElementRendererProps) {
  const props = useCanvasProps({ value, path })

  if (value.type === 'slot') {
    return <SlotRenderer value={value} path={path} canvas={canvas} />
  }

  const { children = [] } = value
  const Tag: any = value.tagName || 'div'

  if (value.type === 'component') {
    const fullValue = {
      ...value.value,
      attributes: {
        ...(value.value.attributes || {}),
        ...(value.attributes || {}),
      },
    }
    return (
      <ComponentProvider value={value}>
        <div {...props}>
          <ElementRenderer value={fullValue} canvas={false} path={path} />
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
  path: ElementPath
  canvas: boolean
}
function SlotRenderer({ value: providedValue, canvas }: SlotRendererProps) {
  const { value: outerValue } = useComponent()

  const value = providedValue as Slot
  const outerProps = outerValue?.props || {}
  let propValue = outerProps[value.name] || value.value || null

  if (value.name === 'children' && outerValue?.children) {
    return (
      <>
        {outerValue.children.map((child: HtmlNode, index: number) => {
          if (child.type === 'text') {
            return <>{child.value}</>
          }

          return (
            <ElementRenderer
              key={index}
              path={[]}
              canvas={false}
              value={child}
            />
          )
        })}
      </>
    )
  }

  return <>{propValue}</>
}
