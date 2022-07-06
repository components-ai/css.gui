import { HtmlEditor, HtmlRenderer, HtmlEditorProvider } from '@compai/css-gui'
import { useState } from 'react'
import { defaultTheme } from '../data/default-theme'

const initialValue: any = {
  tagName: 'div',
  style: {
    paddingTop: {
      value: 128,
      unit: 'px',
    },
    paddingBottom: {
      value: 128,
      unit: 'px',
    },
  },
  children: [
    {
      tagName: 'header',
      style: {
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
            color: '#4e4fec',
            fontSize: {
              type: 'responsive',
              values: [
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
            },
            fontWeight: '900',
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
          style: {
            marginBottom: {
              value: 96,
              unit: 'px',
            },
            fontSize: {
              value: 20,
              unit: 'px',
            },
            maxWidth: {
              value: 40,
              unit: 'em',
            },
          },
          children: [
            {
              type: 'text',
              value:
                'Click anywhere on the canvas to start. Go ahead. Click away.',
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
    <HtmlEditorProvider value={html} theme={defaultTheme}>
      <div
        sx={{
          display: 'grid',
          gridTemplateAreas: '"nav content"',
          gridTemplateColumns: 'auto 1fr',
          gridTemplateRows: 'auto',
          height: 'calc(100vh - 54px)',
          overflow: 'hidden',
        }}
      >
        <div
          sx={{
            gridArea: 'nav',
            height: '100%',
          }}
        >
          <HtmlEditor onChange={setHtml} />
        </div>
        <div
          sx={{
            overflow: 'auto',
            width: '100%',
            gridArea: 'content',
            '&::-webkit-scrollbar': { display: 'none' },
          }}
        >
          <HtmlRenderer value={html} />
        </div>
      </div>
    </HtmlEditorProvider>
  )
}
