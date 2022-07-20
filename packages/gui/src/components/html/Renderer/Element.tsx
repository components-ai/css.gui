import { isVoidElement } from '../../../lib/elements'
import { CanvasElementProps, useCanvasProps } from '../CanvasProvider'
import { ComponentProvider, useComponent } from '../Component'
import { mergeComponentAttributes } from '../Component/util'
import { ComponentData, ElementPath, HtmlNode, Slot } from '../types'
import { removeTailFromPath } from '../util'
import { TextRenderer } from './Text'

export function ElementRenderer({
  value,
  path,
  ...canvasElementProps
}: CanvasElementProps) {
  const { selectComponent } = useComponent()
  const { onClick, ...props } = useCanvasProps({
    value,
    path,
    ...canvasElementProps,
  })

  if (value.type === 'slot') {
    return <SlotRenderer value={value} path={path} />
  } else if (value.type === 'component') {
    return <ComponentRenderer value={value} path={path} />
  }

  const Tag: any = value.tagName || 'div'

  const handleClick = (e: MouseEvent) => {
    if (selectComponent) {
      return selectComponent(e)
    }

    onClick(e)
  }

  if (isVoidElement(Tag)) {
    return <Tag {...props} onClick={handleClick} />
  }

  if (Tag === 'textarea' && value.children) {
    return (
      <Tag {...props} onClick={handleClick}>
        {value.children.map((child) => child.value).join(' ')}
      </Tag>
    )
  }

  return (
    <Tag {...props} onClick={handleClick}>
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
        const childPath: ElementPath = [...path, i]
        if (child.type === 'text') {
          return <TextRenderer key={i} value={child} path={path} />
        }

        return <ElementRenderer key={i} value={child} path={childPath} />
      })}
    </>
  )
}

interface ComponentRendererProps {
  value: ComponentData
  path: ElementPath
}
export function ComponentRenderer({ value, path }: ComponentRendererProps) {
  const fullValue = {
    ...value.value,
    attributes: mergeComponentAttributes(value),
  }

  return (
    <ComponentProvider value={value} path={path}>
      <ElementRenderer value={fullValue} path={path} />
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
    // Slots are essentially "fragments" when it comes to rendering. As such, we
    // don't want their rendering to count as part of the constructed path. Since
    // we're going to pass the children to the ChildrenRenderer which automatically
    // increments the path for the component's direct children, we can remove the
    // tail of the path which is currently pointing to the slot itself.
    //
    // The slot is being rendered from a ChildrenRenderer so the path construction
    // by default will look something like:
    //   * component (path of [0]) -> renders children/slots with paths of [0, n]
    //   * slot receives path of [0, 0] -> renders children with paths of [0, 0, n]
    //   * children receive path of [0, 0, n]
    //
    // This results in [0, 0, n] for the component's children when we want [0, n].
    //
    // With this change we end up with the following:
    //   * component (path of [0]) -> renders children/slots with paths of [0, n]
    //   * slot receives path of [0, n] then passes [0] to render paths of [0, n]
    //   * children receive paths of [0, n]
    //
    // With the proper paths being passed to the component's child slots, the canvas
    // selection and node editing target the proper elements. Yay.
    const passThroughPath = removeTailFromPath(path)
    return (
      <ChildrenRenderer value={outerValue.children!} path={passThroughPath} />
    )
  }

  const slotValue = outerProps[value.name] || value.value
  const textNode: HtmlNode = { type: 'text', value: slotValue as string }
  return <TextRenderer value={textNode} path={path} />
}
