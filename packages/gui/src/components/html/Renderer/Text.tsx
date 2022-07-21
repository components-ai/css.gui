import { FormEvent, FormEventHandler, useRef } from 'react'
import { useCanvas } from '../CanvasProvider'
import { useHtmlEditor } from '../Provider'
import { ElementPath, HtmlNode } from '../types'
import { setChildAtPath } from '../util'

type TextRendererProps = {
  value: HtmlNode
  path: ElementPath
}
export function TextRenderer({
  value: providedValue,
  path,
}: TextRendererProps) {
  const { value: fullValue, update } = useHtmlEditor()
  const { canvas } = useCanvas()
  const value = useRef(providedValue.value)

  const handleInput = (e: FormEvent) => {
    const newText = e.currentTarget.textContent || ''
    const newTextNode = {
      ...providedValue,
      value: newText,
    }

    // We still handle the text and component types a little funky so
    // TS isn't happy here. Need to fix that...
    // @ts-ignore
    const newFullValue = setChildAtPath(fullValue, path, newTextNode)
    update(newFullValue)
  }

  if (!canvas) {
    return <>{providedValue.value || null}</>
  }

  return (
    <span
      sx={{
        outline: 'none',
      }}
      contentEditable={true}
      onInput={handleInput}
    >
      {value.current as string}
    </span>
  )
}
