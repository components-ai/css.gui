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
            }
          },
          children: [
            {
              type: 'text',
              value: 'Click anywhere on the canvas to start. Go ahead. Click away.',
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
        { 
          tagName: 'img',
          attributes: {
            src: 'https://source.unsplash.com/random/1920x1280',
            title: 'Image - <img />'
          },
          style: {
            width: { value: 100, unit: '%' },
            maxWidth: { value: 100, unit: '%' },
            height: { value: 'auto', unit: 'keyword' },
            borderRadius: { value: 0, unit: 'px' }
          }
        },
        { 
          tagName: 'video',
          attributes: {
            title: 'Video - <video>',
            src: 'http://dc28c2r6oodom.cloudfront.net/vid/cube-loop.mp4',
            loop: 'true',
            autoplay: 'true',
            playsinline: 'true',
          },
          style: {
            width: { value: 100, unit: '%' }
          }
        },
        // TODO
        //{ 
        //  tagName: 'audio',
        //  attributes: {
        //    src: 'https
        //  }
        //},
        { 
          tagName: 'a',
          attributes: { href: '#0', title: 'Anchor link: <a>' },
          style: {
            color: 'text',
            backgroundColor: 'background',
            fontWeight: 'inherit',
            textDecoration: {
              color: 'currentColor',
              line: 'underline',
              style: 'solid',
              thickness: { value: 1, unit: 'px' }
            }
          },
          children: [
            { type: 'text', value: 'A text link' }
          ]
        },
        { 
          tagName: 'p',
          attributes: {  title: 'Paragraph: <p>' },
          style: {
            color: 'text',
            backgroundColor: 'background',
            fontSize: { value: 1, unit: 'em', },
            marginTop: { value: 0, unit: 'px' },
            marginBottom: { value: 0, unit: 'px' },
            lineHeight: {
              value: 1.25, unit: 'number',
            },
            maxWidth: {
              value: 40,
              unit: 'em',
            }
          },
          children: [
            { type: 'text', value: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.' }
          ]
        },
        { 
          tagName: 'input',
          style: {
            appearance: 'none',
            color: 'text',
            backgroundColor: 'transparent',
            borderWidth: { 
              top: { value: 1, unit: 'px' },
              bottom: { value: 1, unit: 'px' },
              left: { value: 1, unit: 'px' },
              right: { value: 1, unit: 'px' },
            },
            borderColor: {
              top: 'currentColor',
              bottom: 'currentColor',
              left: 'currentColor',
              right: 'currentColor',
            },
            borderStyle: {
              top: 'solid',
              bottom: 'solid',
              left: 'solid',
              right: 'solid',
            },
            fontSize: { value: 1, unit: 'rem' },
            padding: {
              top: { value: .5, unit: 'rem' },
              bottom: { value: .5, unit: 'rem' },
              left: { value: .5, unit: 'rem' },
              right: { value: .5, unit: 'rem' },
            },
            borderRadius: { value: 0, unit: 'px' }
          },
          attributes: {
            type: 'text',
            placeholder: 'Placeholder text',
            title: 'Text input: <input type="text" />'
          },
        },
        { 
          tagName: 'input',
          style: {
            appearance: 'none',
            color: 'text',
            backgroundColor: 'transparent',
            borderWidth: { 
              top: { value: 1, unit: 'px' },
              bottom: { value: 1, unit: 'px' },
              left: { value: 1, unit: 'px' },
              right: { value: 1, unit: 'px' },
            },
            borderColor: {
              top: 'currentColor',
              bottom: 'currentColor',
              left: 'currentColor',
              right: 'currentColor',
            },
            borderStyle: {
              top: 'solid',
              bottom: 'solid',
              left: 'solid',
              right: 'solid',
            },
            fontSize: { value: 1, unit: 'rem' },
            padding: {
              top: { value: .5, unit: 'rem' },
              bottom: { value: .5, unit: 'rem' },
              left: { value: .5, unit: 'rem' },
              right: { value: .5, unit: 'rem' },
            },
            borderRadius: { value: 0, unit: 'px' }
          },
          attributes: {
            type: 'password',
            placeholder: 'Password',
            title: 'Password input: <input type="password" />'
          },
        },
        { 
          tagName: 'input',
          style: {
            appearance: 'none',
            color: 'text',
            backgroundColor: 'transparent',
            borderWidth: { 
              top: { value: 1, unit: 'px' },
              bottom: { value: 1, unit: 'px' },
              left: { value: 1, unit: 'px' },
              right: { value: 1, unit: 'px' },
            },
            borderColor: {
              top: 'currentColor',
              bottom: 'currentColor',
              left: 'currentColor',
              right: 'currentColor',
            },
            borderStyle: {
              top: 'solid',
              bottom: 'solid',
              left: 'solid',
              right: 'solid',
            },
            fontSize: { value: 1, unit: 'rem' },
            padding: {
              top: { value: .5, unit: 'rem' },
              bottom: { value: .5, unit: 'rem' },
              left: { value: .5, unit: 'rem' },
              right: { value: .5, unit: 'rem' },
            },
            borderRadius: { value: 0, unit: 'px' }
          },
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
          style: {
            appearance: 'none',
            color: 'text',
            backgroundColor: 'transparent',
            borderWidth: { 
              top: { value: 1, unit: 'px' },
              bottom: { value: 1, unit: 'px' },
              left: { value: 1, unit: 'px' },
              right: { value: 1, unit: 'px' },
            },
            borderColor: {
              top: 'currentColor',
              bottom: 'currentColor',
              left: 'currentColor',
              right: 'currentColor',
            },
            borderStyle: {
              top: 'solid',
              bottom: 'solid',
              left: 'solid',
              right: 'solid',
            },
            fontSize: { value: 1, unit: 'rem' },
            padding: {
              top: { value: .5, unit: 'rem' },
              bottom: { value: .5, unit: 'rem' },
              left: { value: .5, unit: 'rem' },
              right: { value: .5, unit: 'rem' },
            },
            borderRadius: { value: 0, unit: 'px' }
          },
          attributes: {
            type: 'date',
          },
        },
        { 
          tagName: 'input',
          style: {
            color: 'text',
            backgroundColor: 'transparent',
            borderWidth: { 
              top: { value: 1, unit: 'px' },
              bottom: { value: 1, unit: 'px' },
              left: { value: 1, unit: 'px' },
              right: { value: 1, unit: 'px' },
            },
            borderColor: {
              top: 'currentColor',
              bottom: 'currentColor',
              left: 'currentColor',
              right: 'currentColor',
            },
            borderStyle: {
              top: 'solid',
              bottom: 'solid',
              left: 'solid',
              right: 'solid',
            },
            fontSize: { value: .75, unit: 'rem' },
            padding: {
              top: { value: .5, unit: 'rem' },
              bottom: { value: .5, unit: 'rem' },
              left: { value: .5, unit: 'rem' },
              right: { value: .5, unit: 'rem' },
            },
            borderRadius: { value: 0, unit: 'px' }
          },
          attributes: {
            type: 'file',
          },
        },
        { 
          tagName: 'input',
          style: {
            color: 'text',
            backgroundColor: 'transparent',
            borderWidth: { 
              top: { value: 1, unit: 'px' },
              bottom: { value: 1, unit: 'px' },
              left: { value: 1, unit: 'px' },
              right: { value: 1, unit: 'px' },
            },
            borderColor: {
              top: 'currentColor',
              bottom: 'currentColor',
              left: 'currentColor',
              right: 'currentColor',
            },
            borderStyle: {
              top: 'solid',
              bottom: 'solid',
              left: 'solid',
              right: 'solid',
            },
            fontSize: { value: 1, unit: 'rem' },
            padding: {
              top: { value: .5, unit: 'rem' },
              bottom: { value: .5, unit: 'rem' },
              left: { value: .5, unit: 'rem' },
              right: { value: .5, unit: 'rem' },
            },
            borderRadius: { value: 0, unit: 'px' }
          },
          attributes: {
            type: 'number',
            value: 32,
            min: -100,
            max: 100,
          },
        },
        { 
          tagName: 'input',
          style: {
            color: 'text',
            backgroundColor: 'transparent',
            borderWidth: { 
              top: { value: 1, unit: 'px' },
              bottom: { value: 1, unit: 'px' },
              left: { value: 1, unit: 'px' },
              right: { value: 1, unit: 'px' },
            },
            borderColor: {
              top: 'currentColor',
              bottom: 'currentColor',
              left: 'currentColor',
              right: 'currentColor',
            },
            borderStyle: {
              top: 'solid',
              bottom: 'solid',
              left: 'solid',
              right: 'solid',
            },
            fontSize: { value: 1, unit: 'rem' },
            padding: {
              top: { value: .5, unit: 'rem' },
              bottom: { value: .5, unit: 'rem' },
              left: { value: .5, unit: 'rem' },
              right: { value: .5, unit: 'rem' },
            },
            borderRadius: { value: 0, unit: 'px' }
          },
          attributes: {
            type: 'month',
            value: '2048-02',
          },
        },
        { 
          tagName: 'input',
          style: {
            color: 'text',
            backgroundColor: 'transparent',
            borderWidth: { 
              top: { value: 1, unit: 'px' },
              bottom: { value: 1, unit: 'px' },
              left: { value: 1, unit: 'px' },
              right: { value: 1, unit: 'px' },
            },
            borderColor: {
              top: 'currentColor',
              bottom: 'currentColor',
              left: 'currentColor',
              right: 'currentColor',
            },
            borderStyle: {
              top: 'solid',
              bottom: 'solid',
              left: 'solid',
              right: 'solid',
            },
            fontSize: { value: 1, unit: 'rem' },
            padding: {
              top: { value: .5, unit: 'rem' },
              bottom: { value: .5, unit: 'rem' },
              left: { value: .5, unit: 'rem' },
              right: { value: .5, unit: 'rem' },
            },
            borderRadius: { value: 0, unit: 'px' }
          },
          attributes: {
            type: 'week',
            value: '2048-W32',
          },
        },
        { 
          tagName: 'input',
          style: {
            accentColor: '#6465ff', 
          },
          attributes: {
            type: 'range',
          },
        },
        { 
          tagName: 'input',
          style: {
            color: 'text',
            backgroundColor: 'transparent',
            borderWidth: { 
              top: { value: 1, unit: 'px' },
              bottom: { value: 1, unit: 'px' },
              left: { value: 1, unit: 'px' },
              right: { value: 1, unit: 'px' },
            },
            borderColor: {
              top: 'currentColor',
              bottom: 'currentColor',
              left: 'currentColor',
              right: 'currentColor',
            },
            borderStyle: {
              top: 'solid',
              bottom: 'solid',
              left: 'solid',
              right: 'solid',
            },
            fontSize: { value: 1, unit: 'rem' },
            padding: {
              top: { value: .5, unit: 'rem' },
              bottom: { value: .5, unit: 'rem' },
              left: { value: .5, unit: 'rem' },
              right: { value: .5, unit: 'rem' },
            },
            borderRadius: { value: 0, unit: 'px' }
          },
          attributes: {
            type: 'search',
          },
        },
        { 
          tagName: 'input',
          style: {
            cursor: 'pointer',
            color: 'text',
            backgroundColor: 'transparent',
            fontSize: { value: 1, unit: 'rem' },
            fontWeight: 600,
            borderRadius: { value: 6, unit: 'px' },
            paddingTop: { value: 16, unit: 'px' },
            paddingBottom: { value: 16, unit: 'px' },
            paddingLeft: { value: 64, unit: 'px' },
            paddingRight: { value: 64, unit: 'px'},
            appearance: 'none',
            boxShadow: [{
              inset: true,
              spread: { value: 2, unit: 'px' },
              blur: { value: 0, unit: 'px' },
              offsetX: { value: 0, unit: 'px' },
              offsetY: { value: 0, unit: 'px' },
              color: 'currentColor',
            }],
            borderStyle: {
              top: 'none',
              bottom: 'none',
              left: 'none',
              right: 'none',
            },
            borderWidth: { value: 0, unit: 'px' },
            borderColor: 'transparent',
            transition: 'all .2s ease-in-out',
            ':hover': {
              color: 'primary',
            }
          },
          attributes: {
            type: 'button',
            value: 'Button input',
          },
        },
        { 
          tagName: 'input',
          style: {
            color: 'text',
            backgroundColor: 'transparent',
            borderWidth: { 
              top: { value: 1, unit: 'px' },
              bottom: { value: 1, unit: 'px' },
              left: { value: 1, unit: 'px' },
              right: { value: 1, unit: 'px' },
            },
            borderColor: {
              top: 'currentColor',
              bottom: 'currentColor',
              left: 'currentColor',
              right: 'currentColor',
            },
            borderStyle: {
              top: 'solid',
              bottom: 'solid',
              left: 'solid',
              right: 'solid',
            },
            fontSize: { value: 1, unit: 'rem' },
            padding: {
              top: { value: .5, unit: 'rem' },
              bottom: { value: .5, unit: 'rem' },
              left: { value: .5, unit: 'rem' },
              right: { value: .5, unit: 'rem' },
            },
            borderRadius: { value: 0, unit: 'px' }
          },
          attributes: {
            type: 'tel',
          },
        },
        { 
          tagName: 'input',
          style: {
            color: 'text',
            backgroundColor: 'transparent',
            borderWidth: { 
              top: { value: 1, unit: 'px' },
              bottom: { value: 1, unit: 'px' },
              left: { value: 1, unit: 'px' },
              right: { value: 1, unit: 'px' },
            },
            borderColor: {
              top: 'currentColor',
              bottom: 'currentColor',
              left: 'currentColor',
              right: 'currentColor',
            },
            borderStyle: {
              top: 'solid',
              bottom: 'solid',
              left: 'solid',
              right: 'solid',
            },
            fontSize: { value: 1, unit: 'rem' },
            padding: {
              top: { value: .5, unit: 'rem' },
              bottom: { value: .5, unit: 'rem' },
              left: { value: .5, unit: 'rem' },
              right: { value: .5, unit: 'rem' },
            },
            borderRadius: { value: 0, unit: 'px' }
          },
          attributes: {
            type: 'url',
            value: 'https://components.ai'
          },
        },
        { 
          tagName: 'input',
          style: {
            cursor: 'pointer',
            color: 'primary',
            backgroundColor: 'text',
            fontSize: { value: 1, unit: 'rem' },
            fontWeight: 600,
            borderRadius: { value: 6, unit: 'px' },
            paddingTop: { value: 16, unit: 'px' },
            paddingBottom: { value: 16, unit: 'px' },
            paddingLeft: { value: 64, unit: 'px' },
            paddingRight: { value: 64, unit: 'px'},
            appearance: 'none',
            boxShadow: [{
              inset: false,
              spread: { value: 0, unit: 'px' },
              blur: { value: 0, unit: 'px' },
              offsetX: { value: 0, unit: 'px' },
              offsetY: { value: 0, unit: 'px' },
              color: 'transparent',
            }],
            borderStyle: {
              top: 'none',
              bottom: 'none',
              left: 'none',
              right: 'none',
            },
            borderWidth: { value: 0, unit: 'px' },
            borderColor: 'transparent',
            transition: 'all .2s ease-in-out',
            ':hover': {
              color: 'primaryHover',
            }
          },
          attributes: {
            type: 'submit',
          },
        },
        {
          tagName: 'div',
          children: [
            { 
                tagName: 'input',
                style: {
                  accentColor: '#6465ff', 
                },
                attributes: {
                  type: 'checkbox',
                  checked: true,
                },
            },
            { 
              tagName: 'input',
              style: {
                accentColor: '#6465ff', 
              },
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
            style: {
              accentColor: '#6465ff', 
            },
            attributes: {
              type: 'radio',
              checked: true,
            },
          },
          { 
            tagName: 'input',
            style: {
              accentColor: '#6465ff', 
            },
            attributes: {
              type: 'radio',
              checked: false,
            },
          }]
        },
        { 
          tagName: 'button',
          style: {
            cursor: 'pointer',
            color: 'text',
            backgroundColor: 'primary',
            fontSize: { value: 1, unit: 'rem' },
            fontWeight: 600,
            borderRadius: { value: 6, unit: 'px' },
            paddingTop: { value: 16, unit: 'px' },
            paddingBottom: { value: 16, unit: 'px' },
            paddingLeft: { value: 64, unit: 'px' },
            paddingRight: { value: 64, unit: 'px'},
            appearance: 'none',
            borderWidth: { value: 0, unit: 'px' },
            borderColor: 'transparent',
            borderStyle: {
              top: 'none',
              bottom: 'none',
              left: 'none',
              right: 'none',
            },
            transition: 'all .2s ease-in-out',
            ':hover': {
              backgroundColor: 'primaryHover',
            }
          },
          children: [
            { type: 'text', value: 'Primary Button' }
          ]
        },
        { 
          tagName: 'button',
          style: {
            cursor: 'pointer',
            color: 'primary',
            backgroundColor: 'transparent',
            fontSize: { value: 1, unit: 'rem' },
            fontWeight: 600,
            borderRadius: { value: 6, unit: 'px' },
            paddingTop: { value: 16, unit: 'px' },
            paddingBottom: { value: 16, unit: 'px' },
            paddingLeft: { value: 64, unit: 'px' },
            paddingRight: { value: 64, unit: 'px'},
            appearance: 'none',
            boxShadow: [{
              inset: true,
              spread: { value: 2, unit: 'px' },
              blur: { value: 0, unit: 'px' },
              offsetX: { value: 0, unit: 'px' },
              offsetY: { value: 0, unit: 'px' },
              color: 'currentColor',
            }],
            borderStyle: {
              top: 'none',
              bottom: 'none',
              left: 'none',
              right: 'none',
            },
            borderWidth: { value: 0, unit: 'px' },
            borderColor: 'transparent',
            transition: 'all .2s ease-in-out',
            ':hover': {
              color: 'text',
            }
          },
          children: [
            { type: 'text', value: 'Button Outline' }
          ]
        },
        { 
          tagName: 'progress',
          style: { 
            accentColor: '#6465ff', 
          },
          attributes: { max: 100, value: 61.8 }
        },
        { 
          tagName: 'textarea',
          attributes: { rows: 8 },
          style: {
            appearance: 'none',
            color: 'text',
            backgroundColor: 'transparent',
            borderWidth: { 
              top: { value: 1, unit: 'px' },
              bottom: { value: 1, unit: 'px' },
              left: { value: 1, unit: 'px' },
              right: { value: 1, unit: 'px' },
            },
            borderColor: {
              top: 'currentColor',
              bottom: 'currentColor',
              left: 'currentColor',
              right: 'currentColor',
            },
            borderStyle: {
              top: 'solid',
              bottom: 'solid',
              left: 'solid',
              right: 'solid',
            },
            fontSize: { value: 1, unit: 'rem' },
            padding: {
              top: { value: 1, unit: 'rem' },
              bottom: { value: 1, unit: 'rem' },
              left: { value: 1, unit: 'rem' },
              right: { value: 1, unit: 'rem' },
            },
            borderRadius: { value: 0, unit: 'px' }
          },
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
          tagName: 'header',
          children: [
        { 
          tagName: 'h1',
          style: {
            color: 'text',
            backgroundColor: 'background',
            marginBottom: { value: 1, unit: 'em' },
            fontFamily: 'heading',
            fontSize: { value: 3, unit: 'rem', },
            fontWeight: 800,
            lineHeight: { value: 1.25, unit: 'number', },
            marginTop: { value: 0, unit: 'px' },
            marginBottom: { value: 1, unit: 'em' },
            textTransform: 'normal',
            letterSpacing: { value: 'normal', unit: 'keyword' },
          },
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
        ]},
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
          tagName: 'blockquote',
          style: {
            borderLeftWidth: { value: 4, unit: 'px', },
            borderLeftColor: 'primary',
            borderLeftStyle: 'solid',
            marginLeft: { value: 0, unit: 'px', },
            paddingLeft: { value: 32, unit: 'px', },
          },
          children: [
            { type: 'text', value: '"The aim of every typographic work - the delivery of a message in the shortest, most efficient manner." - Jan Tschichold' }
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
