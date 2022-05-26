import { HtmlEditor, HtmlRenderer, HtmlEditorProvider } from '@compai/css-gui'
import { useState } from 'react'

const initialValue: any = {
  tagName: 'figure',
  attributes: {},
  style: {},
  children: [
    {
      tagName: 'blockquote',
      attributes: {},
      style: {},
      children: [
        {
          tagName: 'p',
          attributes: {},
          style: {},
          children: [
            'A sample quote of great importance that helps people understand something really well.',
          ],
        },
      ],
    },
    {
      tagName: 'figcaption',
      attributes: {},
      style: {},
      children: [
        {
          tagName: 'span',
          attributes: {},
          style: {},
          children: ['Author name'],
        },
        {
          tagName: 'cite',
          attributes: {},
          style: {},
          children: ['Book or article name'],
        },
      ],
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
