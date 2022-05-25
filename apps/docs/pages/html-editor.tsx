import { HtmlEditor, HtmlRenderer, HtmlEditorProvider } from '@compai/css-gui'
import { useState } from 'react'

const initialValue: any = {
  tagName: 'div',
  attributes: { className: 'section' },
  style: {},
  children: [
    {
      tagName: 'h1',
      attributes: {},
      style: {},
      children: ['Hello, world!'],
    },
    {
      tagName: 'h2',
      attributes: {},
      style: {},
      children: ['Weeee!'],
    },
    {
      attributes: {},
      style: {},
      tagName: 'button',
      children: ["I'm a CTA"],
    },
    {
      attributes: { href: 'https://components.ai' },
      style: {},
      tagName: 'a',
      children: ["I'm a link!"],
    },
  ],
}

export default function HtmlEditorExample() {
  const [html, setHtml] = useState(initialValue)

  return (
    <div sx={{ display: 'flex' }}>
      <HtmlEditorProvider value={html}>
        <HtmlEditor onChange={setHtml} />
        <div sx={{ width: '100%' }}>
          <HtmlRenderer value={html} />
        </div>
      </HtmlEditorProvider>
    </div>
  )
}
