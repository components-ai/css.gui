import { HtmlEditor, HtmlRenderer } from '@compai/css-gui'
import { useState } from 'react'
const initialValue: any = {
  tagName: 'div',
  children: [
    'hello ',
    {
      tagName: 'span',
      children: ['world'],
      style: {
        color: 'tomato',
      },
    },
  ],
}

export default function HtmlEditorExample() {
  const [html, setHtml] = useState(initialValue)
  return (
    <div sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      <HtmlEditor value={html} onChange={setHtml} />
      <HtmlRenderer value={html} />
    </div>
  )
}
