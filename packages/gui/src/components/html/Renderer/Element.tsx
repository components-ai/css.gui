import { isVoidElement } from '../../../lib/elements'
import { useCanvasProps } from '../CanvasProvider'
import { ComponentProvider, useComponent } from '../Component'
import { mergeComponentAttributes } from '../Component/util'
import { ComponentData, ElementPath, HtmlNode, Slot } from '../types'
import { TextRenderer } from './Text'

interface RendererProps {
  value: HtmlNode
  path: ElementPath
}
export function ElementRenderer({ value, path }: RendererProps) {
  const props = useCanvasProps({ value, path })

  if (value.type === 'slot') {
    return <SlotRenderer value={value} path={path} />
  } else if (value.type === 'component') {
    return <ComponentRenderer value={value} path={path} />
  }

  const Tag: any = value.tagName || 'div'

  if (isVoidElement(Tag)) {
    return <Tag {...props} />
  }

  return (
    <Tag {...props}>
      <ChildrenRenderer value={value.children} path={path} />
    </Tag>
  )
}

interface ChildrenRendererProps {
  value?: HtmlNode[]
  path: ElementPath
}
function ChildrenRenderer({ value = [], path }: ChildrenRendererProps) {
  return (
    <>
      {value.map((child, i) => {
        if (child.type === 'text') {
          return <TextRenderer key={i} value={child} />
        }

        return <ElementRenderer key={i} value={child} path={[...path, i]} />
      })}
    </>
  )
}

interface ComponentRendererProps {
  value: ComponentData
  path: ElementPath
}
export function ComponentRenderer({ value, path }: ComponentRendererProps) {
  const props = useCanvasProps({ value, path })
  const fullValue = {
    ...value.value,
    attributes: mergeComponentAttributes(value),
  }

  return (
    <ComponentProvider value={value} path={path}>
      <div {...props}>
        <ElementRenderer value={fullValue} path={path} />
      </div>
    </ComponentProvider>
  )
}

interface SlotRendererProps {
  value: Slot
  path: ElementPath
}
function SlotRenderer({ value, path }: SlotRendererProps) {
  const { value: outerValue } = useComponent()

  const outerProps = outerValue?.props || {}
  const hasSlottedChildren = value.name === 'children' && outerValue?.children

  if (hasSlottedChildren) {
    return <ChildrenRenderer value={outerValue.children!} path={path} />
  }

  return <>{outerProps[value.name] || value.value || null}</>
}
