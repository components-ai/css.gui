import { HtmlEditor, HtmlRenderer, HtmlEditorProvider } from '@compai/css-gui'
import { useState } from 'react'

const initialValue: any = {
  tagName: 'div',
  attributes: { className: 'section' },
  style: {
    paddingTop: {
      value: 128,
      unit: 'px',
    },
    paddingBottom: {
      value: 128,
      unit: 'px',
    },
    paddingLeft: { value: 64, unit: 'px',
    },
    paddingRight: {
      value: 64,
      unit: 'px',
    },
  },
  children: [
    {
      tagName: 'h1',
      attributes: {},
      style: {
        color: 'primary',
        fontSize: [
          {
            value: 4,
            unit: 'rem',
          },
          {
            value: 6,
            unit: 'rem',
          },
          {
            value: 10,
            unit: 'rem',
          },
        ],
        fontWeight: 900,
        fontFamily: 'Inter',
        letterSpacing: { value: -8, unit: 'px' },
        marginTop: {
          value: 0,
          unit: 'px',
        },
        marginBottom: {
          value: 0,
          unit: 'px',
        },
        lineHeight: {
          value: 1.25,
          unit: 'number',
        },
      },
      children: [{ type: 'text', value: 'CSS.GUI' }],
    },
    {
      tagName: 'h2',
      attributes: {},
      style: {
        marginBottom: {
          value: 0,
          unit: 'px',
        },
        fontSize: {
          value: 48,
          unit: 'px',
        },
        maxWidth: {
          value: 40,
          unit: 'em',
        },
        lineHeight: {
          value: 1.25,
          unit: 'number',
        },
      },
      children: [
        {
          type: 'text',
          value:
            'Quickly build components with custom styling panels. No coding required.',
        },
      ],
    },
    {
      tagName: 'p',
      attributes: {},
      style: {
        marginBottom: {
          value: 96,
          unit: 'px',
        },
        fontSize: {
          value: 20,
          unit: 'px',
        },
      },
      children: [
        {
          type: 'text',
          value: 'Click anywhere on the canvas to start. Go ahead. Click away.',
        },
      ],
    },
    {
      attributes: {
        href: '#0',
      },
      style: {
        paddingTop: {
          value: 16,
          unit: 'px',
        },
        paddingBottom: {
          value: 16,
          unit: 'px',
        },
        paddingLeft: {
          value: 32,
          unit: 'px',
        },
        paddingRight: {
          value: 32,
          unit: 'px',
        },
        textDecorationColor: 'transparent',
        textDecorationThickness: { value: 0, unit: 'px' },
        textDecorationStyle: 'none',
        textDecorationLine: 'none',
        color: 'background',
        backgroundColor: 'text',
        borderWidth: {
          value: 2,
          unit: 'px',
        },
        borderStyle: 'solid',
        borderColor: 'text',
        marginRight: {
          value: 8,
          unit: 'px',
        },
        borderRadius: {
          value: 6,
          unit: 'px',
        },
        whiteSpace: 'nowrap',
        ':hover': {
          backgroundColor: 'primary',
          borderColor: 'primary',
        },
      },
      tagName: 'a',
      children: [
        {
          type: 'text',
          value: 'Primary CTA',
        },
      ],
    },
    {
      attributes: { href: 'https://components.ai' },
      style: {
        boxSizing: 'border-box',
        display: 'inline-block',
        paddingTop: {
          value: 16,
          unit: 'px',
        },
        paddingBottom: {
          value: 16,
          unit: 'px',
        },
        paddingLeft: {
          value: 32,
          unit: 'px',
        },
        paddingRight: {
          value: 32,
          unit: 'px',
        },
        textDecorationColor: 'transparent',
        textDecorationThickness: { value: 0, unit: 'px' },
        textDecorationStyle: 'none',
        textDecorationLine: 'none',
        color: 'text',
        whiteSpace: 'nowrap',
        borderWidth: {
          value: 2,
          unit: 'px',
        },
        borderStyle: 'solid',
        borderColor: 'currentColor',
        borderRadius: {
          value: 6,
          unit: 'px',
        },
        ':hover': {
          color: 'primary',
        },
      },
      tagName: 'a',
      style: {
        display: 'inline-block',
      },
      children: [
        {
          type: 'text',
          value: 'Secondary link',
        },
      ],
    },
    {
      tagName: 'section',
      style: {
        borderTopWidth: { value: 1, unit: 'px' },
        borderTopStyle: 'solid',
        display: 'block',
        paddingTop: { value: 128, unit: 'px' },
        marginTop: { value: 128, unit: 'px' }
      },
      children: [
        { 
          tagName: 'label',
          style: { display: 'block' },
          children: [ 
            {
              tagName: 'span', 
              style: { display: 'block' },
              children : [{
                type: 'text',
                value: 'Username',
              }]
            },
            {
              tagName: 'input',
              attributes: { type: 'text' },
            },
          ],
        },
        {
          tagName: 'progress',
          attributes: { min: 0, max: 100, value: 20 },
        },
        {
          tagName: 'input',
          attributes: { type: 'range' },
        },
        {
          tagName: 'input',
          attributes: { type: 'password' },
        },
        {
          tagName: 'input',
          attributes: { type: 'radio' },
        },
        {
          tagName: 'input',
          attributes: { type: 'checkbox' },
        },
        {
          tagName: 'button',
        },
        {
          tagName: 'img',
          style: { display: 'block', width: '100%',  },
          attributes: { src: 'https://source.unsplash.com/1920x1080' },
        },
        {
          tagName: 'h1', 
          children : [{
            type: 'text',
            value: 'Heading One',
          }]
        },
        {
          tagName: 'h2', 
          children : [{
            type: 'text',
            value: 'Heading Two',
          }]
        },
        {
          tagName: 'h3', 
          children : [{
            type: 'text',
            value: 'Heading Three',
          }]
        },
        {
          tagName: 'h4', 
          children : [{
            type: 'text',
            value: 'Heading Four',
          }]
        },
        {
          tagName: 'h5', 
          children : [{
            type: 'text',
            value: 'Heading Five',
          }]
        },
        {
          tagName: 'h6', 
          children : [{
            type: 'text',
            value: 'Heading Six',
          }]
        },
        {
          tagName: 'hr', 
        },
        {
          tagName: 'p', 
          children : [{
            type: 'text',
            value: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
          }]
        },
        {
          tagName: 'dl', 
          children : [
          {
            tagName: 'dt', 
            children : [{
              type: 'text',
              value: 'Definition term',
            }]
          },
          {
            tagName: 'dd', 
            children : [{
              type: 'text',
              value: 'Definition description',
            }]
          },
          ]
        },
      ]
    }, // end of section
  ],
}

export default function HtmlEditorExample() {
  const [html, setHtml] = useState(initialValue)

  return (
    <HtmlEditorProvider value={html}>
      <div
        sx={{
          display: 'grid',
          gridTemplateAreas: '"nav content"',
          gridTemplateColumns: 'auto 1fr',
          gridTemplateRows: 'auto',
          height: 'calc(100vh - 64px)',
        }}
      >
        <div
          sx={{
            gridArea: 'nav',
            maxheight: 'calc(100vh - 64px)',
            overflow: 'auto',
          }}
        >
          <HtmlEditor onChange={setHtml} />
        </div>
        <div sx={{ overflow: 'auto', width: '100%', gridArea: 'content' }}>
          <HtmlRenderer value={html} />
        </div>
      </div>
    </HtmlEditorProvider>
  )
}
