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
    paddingLeft: {
      value: 64,
      unit: 'px',
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
        fontSize: {
          value: 10,
          unit: 'rem',
        },
        fontWeight: 900,
        fontFamily: 'Inter',
        letterSpacing: { value: -8, unit: 'px',},
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
        }
      },
      children: ['CSS.GUI'],
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
        }
      },
      children: ['Quickly build components with custom styling panels. No coding required.'],
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
        }
      },
      children: ['Click anywhere on the canvas to start. Go ahead. Click away.'],
    },
    {
      attributes: {
        href: '#0'
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
        textDecorationThickness: { value: 0, unit: 'px', },
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
          unit: 'px'
        },
        whiteSpace: 'nowrap',
        ':hover':{
          backgroundColor: 'primary',
          borderColor: 'primary',
        }
      },
      tagName: 'a',
      children: ["Primary CTA"],
    },
    {
      attributes: { href: 'https://components.ai' },
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
        textDecorationThickness: { value: 0, unit: 'px', },
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
          unit: 'px'
        },
        ':hover':{
          color: 'primary',
        }
      },
      tagName: 'a',
      children: ["Secondary link"],
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
