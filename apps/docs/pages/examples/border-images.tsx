import { useState } from 'react'
import Link from 'next/link'
import { Editor, Inputs, styled, codegen } from '@compai/css-gui'
import { defaultTheme } from '../../data/default-theme'

const initialStyles = {
  padding: {
    value: 64,
    unit: 'px',
  },
  borderStyle: {
    top: 'solid',
  },
  borderRadius: {
    value: 0,
    unit: 'px',
  },
  borderImage: {
    source: {
      value: 'https://source.unsplash.com/random',
      type: 'url',
    },
    slice: {
      value: {
        top: {
          value: 15,
          unit: '%',
        },
      },
      fill: false,
    },
    width: {
      top: {
        value: 25,
        unit: 'px',
      },
    },
    outset: {
      top: {
        value: 54,
        unit: 'px',
      },
    },
    repeat: ['stretch'],
  },
}

export default function BorderImage() {
  const [styles, setStyles] = useState<any>(initialStyles)

  return (
    <>
      <div
        sx={{
          display: 'flex',
          py: [2, 3, 4],
          borderTopWidth: 'thin',
        }}
      >
        <div sx={{ px: [2, 3, 4] }}>
          <Editor styles={styles} onChange={setStyles} theme={defaultTheme}>
            <div sx={{ display: 'grid', gap: '.5rem', width: '240px' }}>
              <Inputs.BorderImage />
              <Inputs.BorderRadius />
              <Inputs.BorderStyle />
              <Inputs.Padding />
            </div>
          </Editor>
        </div>
        <div sx={{ flexGrow: 1, pr: 4 }}>
          <styled.p styles={styles}>
            “The parameters comprise sequences which are theoretically infinite
            but limits are, of course, set to them in practice. There is an
            upward limit to size and certainly a downward one... Within these
            sequences there are reasonable bounds; extremes set by technical and
            functional experience”
            <br /> <br />
            <em>
              In{' '}
              <Link
                href="https://www.lars-mueller-publishers.com/designing-programmes-0"
                passHref={true}
              >
                <a style={{ color: styles.color }}>Designing Programmes</a>
              </Link>{' '}
              by Karl Gerstner
            </em>
          </styled.p>
        </div>
      </div>
      <div>
        <pre
          sx={{
            p: [2, 3, 4],
            borderTop: 'thin solid',
            borderColor: 'border',
            width: '100%',
            fontSize: 3,
          }}
        >
          {codegen.css(styles)}
        </pre>
      </div>
    </>
  )
}
