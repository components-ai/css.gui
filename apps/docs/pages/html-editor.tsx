import { HtmlEditor, HtmlRenderer, HtmlEditorProvider } from '@compai/css-gui'
import { useState } from 'react'

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
      tagName: 'section',
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
            color: 'primary',
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
          tagName: 'a',
          attributes: {
            href: '#0',
          },
          style: {
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
          children: [
            {
              type: 'text',
              value: 'Primary CTA',
            },
          ],
        },
        {
          tagName: 'a',
          attributes: { href: 'https://components.ai' },
          style: {
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
          children: [
            {
              type: 'text',
              value: 'Secondary link',
            },
          ],
        },
      ],
    },
    {
      tagName: 'section',
      style: {
        borderTopWidth: { value: 1, unit: 'px' },
        borderTopStyle: 'solid',
        borderTopColor: 'border',
        marginTop: { value: 128, unit: 'px' },
        paddingTop: { value: 128, unit: 'px' },
        paddingBottom: { value: 128, unit: 'px' },
        paddingLeft: { value: 64, unit: 'px' },
        paddingRight: { value: 64, unit: 'px' },
        display: 'grid',
        gap: '2em',
        justifyItems: 'space-between',
        gridTemplateColumns: 'repeat(4, 1fr)',
        boxSizing: 'border-box',
      },
      children: [
        { tagName: 'div',
          children: [
            {
              tagName: 'h2',
              children: [
              { type: 'text', value: 'Click on elements to edit and customize styles' }
              ]
            },
            {
              tagName: 'h2',
              children: [
              { type: 'text', value: 'Click on elements to edit and customize styles' }
              ]
            },
          ]
        },
        { 
          tagName: 'img',
          attributes: {
            src: 'https://source.unsplash.com/random'
          },
          style: {
            width: { value: 100, unit: '%' },
            height: { value: 'auto', unit: 'keyword' },
            borderRadius: { value: 0, unit: 'px' }
          }
        },
        { 
          tagName: 'video',
          attributes: {
            src: 'http://dc28c2r6oodom.cloudfront.net/vid/cube-loop.mp4',
            loop: 'true',
            autoplay: 'true',
            playsinline: 'true',
          },
          style: {
            width: { value: 100, unit: '%' }
          }
        },
        { 
          tagName: 'a',
          attributes: { href: '#0' },
          children: [
            { type: 'text', value: 'A text link' }
          ]
        },
        { 
          tagName: 'input',
          attributes: {
            type: 'text',
            placeholder: 'Placeholder text',
          },
        },
        { 
          tagName: 'input',
          attributes: {
            type: 'password',
            value: 'Averylongpasswordcombo',
          },
        },
        { 
          tagName: 'input',
          attributes: {
            type: 'email',
            value: 'email@email.com',
          },
        },
        { 
          tagName: 'input',
          attributes: {
            type: 'color',
            value: '#ff33cc',
          },
        },
        { 
          tagName: 'input',
          attributes: {
            type: 'date',
          },
        },
        { 
          tagName: 'input',
          attributes: {
            type: 'file',
          },
        },
        { 
          tagName: 'input',
          attributes: {
            type: 'number',
          },
        },
        { 
          tagName: 'input',
          attributes: {
            type: 'month',
            value: '2048-02',
          },
        },
        { 
          tagName: 'input',
          attributes: {
            type: 'week',
            value: '2048-W32',
          },
        },
        { 
          tagName: 'input',
          attributes: {
            type: 'range',
          },
        },
        { 
          tagName: 'input',
          attributes: {
            type: 'search',
          },
        },
        { 
          tagName: 'input',
          attributes: {
            type: 'button',
            value: 'Button input',
          },
        },
        { 
          tagName: 'input',
          attributes: {
            type: 'tel',
          },
        },
        { 
          tagName: 'input',
          attributes: {
            type: 'url',
          },
        },
        { 
          tagName: 'input',
          attributes: {
            type: 'submit',
          },
        },
        {
          tagName: 'div',
          children: [
            { 
                tagName: 'input',
                attributes: {
                  type: 'checkbox',
                  checked: true,
                },
            },
            { 
              tagName: 'input',
              attributes: {
                type: 'checkbox',
                checked: false,
              },
            },
          ]
        },
        {
          tagName: 'div',
          children: [{ 
            tagName: 'input',
            attributes: {
              type: 'radio',
              checked: true,
            },
          },
          { 
            tagName: 'input',
            attributes: {
              type: 'radio',
              checked: false,
            },
          }]
        },
        { 
          tagName: 'button',
          children: [
            { type: 'text', value: 'A button' }
          ]
        },
        { 
          tagName: 'progress',
          attributes: { max: 100, value: 61.8 }
        },
        { 
          tagName: 'textarea',
          children: [
            { type: 'text', value: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.' }
          ]
        },
        { 
          tagName: 'b',
          children: [
            { type: 'text', value: 'Bold text' }
          ]
        },
        { 
          tagName: 'strong',
          children: [
            { type: 'text', value: 'Strong text' }
          ]
        },
        { 
          tagName: 'i',
          children: [
            { type: 'text', value: 'Italic text' }
          ]
        },
        { 
          tagName: 'em',
          children: [
            { type: 'text', value: 'Emphasized text' }
          ]
        },
        { 
          tagName: 'u',
          children: [
            { type: 'text', value: 'Underlined text' }
          ]
        },
        { 
          tagName: 's',
          children: [
            { type: 'text', value: 'Strikethrough text' }
          ]
        },
        { 
          tagName: 'small',
          children: [
            { type: 'text', value: 'Small text' }
          ]
        },
        { 
          tagName: 'sub',
          children: [
            { type: 'text', value: 'Subscript text' }
          ]
        },
        { 
          tagName: 'sup',
          children: [
            { type: 'text', value: 'Superscript text' }
          ]
        },
        { 
          tagName: 'time',
          children: [
            { type: 'text', value: '5 OCT 2048' }
          ]
        },
        { 
          tagName: 'code',
          children: [
            { type: 'text', value: 'const x = 1024;' },
            { tagName: 'br', },
            { type: 'text', value: 'const y = 512;' },
            { tagName: 'br', },
            { type: 'text', value: 'const coordinate = [x,y];' },
          ]
        },
        { 
          tagName: 'p',
          children: [
            { type: 'text', value: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.' }
          ]
        },
        { 
          tagName: 'h1',
          children: [
            { type: 'text', value: 'Heading 1' }
          ]
        },
        { 
          tagName: 'h2',
          children: [
            { type: 'text', value: 'Heading 2' }
          ]
        },
        { 
          tagName: 'h3',
          children: [
            { type: 'text', value: 'Heading 3' }
          ]
        },
        { 
          tagName: 'h4',
          children: [
            { type: 'text', value: 'Heading 4' }
          ]
        },
        { 
          tagName: 'h5',
          children: [
            { type: 'text', value: 'Heading 5' }
          ]
        },
        { 
          tagName: 'h6',
          children: [
            { type: 'text', value: 'Heading 6' }
          ]
        },
        {
          tagName: 'ul',
          children: [{ 
            tagName: 'li',
            children: [
              { type: 'text', value: 'Oranges', }
            ],
          },
          { 
            tagName: 'li',
            children: [
              { type: 'text', value: 'Apples', }
            ],
          },
          { 
            tagName: 'li',
            children: [
              { type: 'text', value: 'Peaches', }
            ],
          },
          { 
            tagName: 'li',
            children: [
              { type: 'text', value: 'Plums', }
            ],
          },
          { 
            tagName: 'li',
            children: [
              { type: 'text', value: 'Mangos', }
            ],
          }
          ]
        },
        {
          tagName: 'ol',
          children: [{ 
            tagName: 'li',
            children: [
              { type: 'text', value: 'Item 1', }
            ],
          },
          { 
            tagName: 'li',
            children: [
              { type: 'text', value: 'Item 2', }
            ],
          },
          { 
            tagName: 'li',
            children: [
              { type: 'text', value: 'Item 3', }
            ],
          },
          { 
            tagName: 'li',
            children: [
              { type: 'text', value: 'Item 4', }
            ],
          },
          { 
            tagName: 'li',
            children: [
              { type: 'text', value: 'Item 5', }
            ],
          }
          ]
        },
        {
          tagName: 'dl',
          children: [{ 
            tagName: 'dt',
            style: {
              color: 'inherit',
              backgroundColor: 'inherit',
              fontSize: { value: 1, unit: 'rem' },
              fontWeight: 400,
            },
            children: [
              { type: 'text', value: 'Generated designs', }
            ],
          },
          { 
            tagName: 'dd',
            style: { 
              color: 'inherit',
              backgroundColor: 'inherit',
              fontSize: { value: 2, unit: 'rem' },
              fontWeight: 600,
              marginLeft: { value: 0, unit: 'px', }
            },
            children: [
              { type: 'text', value: '3.4 Million', }
            ],
          },
          ]
        },
        { 
          tagName: 'audio',
          children: [
            { type: 'text', value: 'hello' }
          ]
        },
        { 
          tagName: 'blockquote',
          children: [
            { type: 'text', value: '"The aim of every typographic work - the delivery of a message in the shortest, most efficient manner." - Jan Tschichold' }
          ]
        },
        { 
          tagName: 'button',
          children: [
            { type: 'text', value: 'Button' }
          ]
        },
        { 
          tagName: 'caption',
          children: [
            { type: 'text', value: 'Caption text' }
          ]
        },
        { 
          tagName: 'abbr',
          attributes: { title: 'Cascading Style Sheets' }, children: [
            { type: 'text', value: 'CSS' }
          ]
        },
        { 
          tagName: 'cite',
          children: [
            { type: 'text', value: 'Cite element' }
          ]
        },
        { 
          tagName: 'mark',
          style: {
            color: 'inherit',
            backgroundColor: '#6465ff',
            fontStyle: 'normal',
            fontWeight: 'inherit',
          },
          children: [
            { type: 'text', value: 'This text is marked' }
          ],
        
        },
      ]
    }
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
