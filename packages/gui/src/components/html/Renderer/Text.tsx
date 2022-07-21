import { FormEvent, FormEventHandler } from 'react'
import { useHtmlEditor } from '../Provider'
import { ElementPath, HtmlNode } from '../types'
import { setChildAtPath } from '../util'

type TextRendererProps = {
  value: HtmlNode
  path: ElementPath
}
export function TextRenderer({ value, path }: TextRendererProps) {
  const { value: fullValue } = useHtmlEditor()

  const handleInput = (e: FormEvent) => {
    const newText = e.currentTarget.textContent || ''
    const newTextNode = {
      ...value,
      value: newText,
    }

    // We still handle the text and component types a little funky so
    // TS isn't happy here. Need to fix that...
    // @ts-ignore
    const newFullValue = setChildAtPath(fullValue, path, newTextNode)
  }

  return (
    <span
      sx={{
        outline: 'none',
      }}
      contentEditable={true}
      onInput={handleInput}
    >
      {value.value as string}
    </span>
  )
}
