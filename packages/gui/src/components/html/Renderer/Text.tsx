import { FormEvent, useCallback, useState } from 'react'
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
  const [text, setText] = useState<string>(providedValue.value as string)
  const [editing, setEditing] = useState(false)

  const textRef = useCallback(() => {
    if (!editing) {
      return setText(providedValue.value as string)
    }
  }, [providedValue])

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
      ref={textRef}
      sx={{
        outline: 'none',
      }}
      contentEditable={true}
      onInput={handleInput}
      onBlur={() => setEditing(false)}
      onClick={() => setEditing(true)}
    >
      {text}
    </span>
  )
}
