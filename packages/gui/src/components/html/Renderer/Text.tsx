import { FormEvent, useCallback, useState } from 'react'
import { useCanvas } from '../CanvasProvider'
import { useComponent } from '../Component'
import { useSlot } from '../Component/SlotProvider'
import { useHtmlEditor } from '../Provider'
import { ElementPath, HtmlNode, Slot } from '../types'
import { setChildAtPath } from '../util'

type TextRendererProps = {
  value: HtmlNode
  path: ElementPath
}
export function TextRenderer({
  value: providedValue,
  path,
}: TextRendererProps) {
  const { value: slot } = useSlot()
  const { updateComponent, updateComponentSlot } = useComponent()
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
    if (slot) {
      return handleSlotInput(e)
    }

    const newText = e.currentTarget.textContent || ''
    // We still handle the text and component types a little funky so
    // TS isn't happy here. Need to fix that...
    // @ts-ignore
    const newTextNode: HtmlNode = {
      ...providedValue,
      value: newText,
    }

    updateComponent!(path, newTextNode)
  }

  const handleSlotInput = (e: FormEvent) => {
    const newSlot: Slot = {
      ...(slot as Slot),
      value: e.currentTarget.textContent ?? '',
    }

    updateComponentSlot!(newSlot)
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
