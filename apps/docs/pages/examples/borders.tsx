import { useState } from 'react'
import Link from 'next/link'
import { Editor, Inputs, styled, codegen } from '@compai/css-gui'
import { defaultTheme } from '../../data/default-theme'
import { Container } from '../../components/Container'

const initialStyles = {
  padding: {
    top: {
      value: 64,
      unit: 'px',
    },
  },
  margin: {
    top: {
      value: 0,
      unit: 'px',
    },
  },
  borderTopLeftRadius: [
    {
      value: 16,
      unit: 'px',
    },
  ],
  borderTopRightRadius: [
    {
      value: 16,
      unit: 'px',
    },
  ],
  borderBottomLeftRadius: [
    {
      value: 16,
      unit: 'px',
    },
  ],
  borderBottomRightRadius: [
    {
      value: 16,
      unit: 'px',
    },
  ],
  borderLeftColor:  '#6465ff',
  borderLeftStyle: 'double',
  borderLeftWidth: {
    value: 16,
    unit: 'px',
  },
  borderRightColor:  '#6465ff',
  borderRightStyle: 'groove',
  borderRightWidth: {
    value: 16,
    unit: 'px',
  },
  borderTopColor: '#6465ff' ,
  borderTopStyle: 'dotted',
  borderTopWidth: {
    value: 16,
    unit: 'px',
  },
  borderBottomColor: '#6465ff',
  borderBottomStyle: 'dashed',
  borderBottomWidth: {
    value: 16,
    unit: 'px',
  },
}

export default function BorderImage() {
  const [styles, setStyles] = useState<any>(initialStyles)

  return (
    <>
      <div
        sx={{
          py: [2, 3, 4],
          px: 5,
          borderTopWidth: 'thin',
        }}
      >
        <div sx={{ flexGrow: 1, fontSize: [4, 5, 5], my: 4 }}>
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
                <a style={{ color: 'inherit' }}>Designing Programmes</a>
              </Link>{' '}
              by Karl Gerstner
            </em>
          </styled.p>
        </div>
        <Editor styles={styles} onChange={setStyles} theme={defaultTheme}>
          <div>
            <h4>Borders</h4>
            <article
              sx={{
                display: 'grid',
                gap: '1rem',
                gridTemplateColumns: '1.25fr 2fr 2fr',
                maxWidth: '32rem',
                width: '100%',
              }}
            >
              <Inputs.BorderLeftColor />
              <Inputs.BorderLeftStyle />
              <Inputs.BorderLeftWidth />
              <Inputs.BorderRightColor />
              <Inputs.BorderRightStyle />
              <Inputs.BorderRightWidth />
              <Inputs.BorderTopColor />
              <Inputs.BorderTopStyle />
              <Inputs.BorderTopWidth />
              <Inputs.BorderBottomColor />
              <Inputs.BorderBottomStyle />
              <Inputs.BorderBottomWidth />
            </article>
            <article sx={{ maxWidth: '32rem', width: '100%' }}>
              <h4>Radius</h4>
              <Inputs.BorderTopLeftRadius />
              <Inputs.BorderTopRightRadius />
              <Inputs.BorderBottomLeftRadius />
              <Inputs.BorderBottomRightRadius />
            </article>
            <article sx={{ maxWidth: '32rem', width: '100%' }}>
              <h4>Spacing</h4>
              <Inputs.Padding />
              <Inputs.Margin />
            </article>
          </div>
        </Editor>
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
