import {
  HtmlEditor,
  HtmlRenderer,
  HtmlEditorProvider,
  htmlToEditorSchema,
} from '@compai/css-gui'
import { useState } from 'react'

const initialValue: any = {
  tagName: 'a',
  href: '#',
  style: {
    position: 'relative',
    display: 'flex',
    alignItems: 'stretch',
    flexDirection: 'column',
    textDecoration: 'none',
    overflow: ['hidden'],
    height: 'auto',
  },
  children: [
    {
      tagName: 'section',
      style: {
        overflow: ['hidden'],
        maxHeight: { value: 40, unit: 'vh' },
        minHeight: [
          { value: 160, unit: 'px' },
          { value: 256, unit: 'px' },
          { value: 256, unit: 'px' },
        ],
      },
      children: [
        {
          tagName: 'img',
          style: {
            width: { value: 100, unit: '%' },
            display: 'block',
          },
          attributes: {
            src: 'https://source.unsplash.com/random',
          },
          children: [],
        },
      ],
    },
    {
      tagName: 'div',
      style: {
        height: { value: 100, unit: '%' },
        display: 'flex',
        flexDirection: 'column',
        paddingTop: { value: 32, unit: 'px' },
        paddingBottom: { value: 32, unit: 'px' },
      },
      children: [
        {
          tagName: 'h2',
          style: {
            marginTop: { value: 0, unit: 'px' },
            marginBottom: { value: 0, unit: 'px' },
            fontWeight: 900,
            fontSize: [
              { value: 24, unit: 'px' },
              { value: 32, unit: 'px' },
              { value: 48, unit: 'px' },
            ],
            lineHeight: { value: 1.25, unit: 'number' },
          },
          children: ['Hello, world!'],
        },
        {
          tagName: 'h3',
          style: {
            marginTop: { value: 8, unit: 'px' },
            marginBottom: { value: 0, unit: 'px' },
            fontWeight: 600,
            opacity: 0.7,
            fontSize: [
              { value: 14, unit: 'px' },
              { value: 16, unit: 'px' },
              { value: 20, unit: 'px' },
            ],
            lineHeight: { value: 1.25, unit: 'number' },
          },
          children: ['This is a subtitle'],
        },
        {
          tagName: 'p',
          style: {
            fontSize: [
              { value: 14, unit: 'px' },
              { value: 16, unit: 'px' },
              { value: 16, unit: 'px' },
            ],
            lineHeight: { value: 1.5, unit: 'number' },
            marginTop: { value: 16, unit: 'px' },
            marginBottom: { value: 24, unit: 'px' },
          },
          children: [
            `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
             Fusce pellentesque varius molestie. Integer viverra dui at
             mauris tempus, a posuere turpis tincidunt. Etiam vitae aliquet
             nunc.`,
          ],
        },
        {
          tagName: 'section',
          style: {},
          children: [
            {
              tagName: 'button',
              style: {
                all: 'unset',
                backgroundColor: 'tomato',
                color: '#fff',
                display: 'inline-flex',
                fontSize: [
                  { value: 14, unit: 'px' },
                  { value: 16, unit: 'px' },
                  { value: 16, unit: 'px' },
                ],
                fontWeight: 800,
                justifyContent: 'center',
                maxWidth: {
                  value: 100,
                  unit: 'px',
                },
                textAlign: 'center',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                paddingLeft: { value: 16, unit: 'px' },
                paddingRight: { value: 16, unit: 'px' },
                paddingTop: { value: 4, unit: 'px' },
                paddingBottom: { value: 4, unit: 'px' },
              },
              children: ['Click me!'],
            },
          ],
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
