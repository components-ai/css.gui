import { useState } from 'react'
import Link from 'next/link'
import { Editor, Inputs, styled, codegen } from '@compai/css-gui'
import { defaultTheme } from '../../data/default-theme'

const initialStyles = {
  // Font
  fontSize: {
    value: 2,
    unit: 'rem',
  },
  letterSpacing: 'normal',
  lineHeight: {
    value: 1.5,
    unit: 'number',
  },
  fontFamily: 'Space Mono',
  background: [
    {
      image: {
        name: 'url',
        arguments: 'https://source.unsplash.com/random',
      },
      position: {
        x: 'center',
        y: 'center',
      },
      repeat: ['no-repeat'],
      size: [{ value: 100, unit: '%' }],
      attachment: 'fixed',
      origin: 'border-box',
      clip: 'border-box',
    },
  ],
  padding: {
    top: {
      value: 128,
      unit: 'px',
    },
  },
}

export default function TextDecoration() {
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
            <section sx={{ display: 'grid', gap: '.5rem', width: '320px' }}>
              <h3 sx={{ mt: 4, mb: 0 }}>Backgrounds</h3>
              <Inputs.Background />
              <Inputs.BackgroundBlendMode />
              <h3 sx={{ mt: 4, mb: 0 }}>Typography</h3>
              <Inputs.FontFamily />
              <Inputs.FontSize />
              <Inputs.LineHeight />
              <Inputs.LetterSpacing />

              <h3 sx={{ mt: 4, mb: 0 }}>Space</h3>
              <Inputs.Padding />
              <Inputs.Margin />
            </section>
          </Editor>
        </div>
        <div sx={{ flexGrow: 1, padding: 5 }}>
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
