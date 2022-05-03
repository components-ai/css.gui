import { useState } from 'react'
import Link from 'next/link'
import { Editor, Inputs, styled, codegen } from '@compai/css-gui'
import { initialStyles } from '../../data/initial-styles'
import { defaultTheme } from '../../data/default-theme'

export function Demo() {
  const [styles, setStyles] = useState<any>(initialStyles)

  return (
    <>
      <div
        className="full-bleed"
        sx={{
          mt: 5,
          display: 'grid',
          gridTemplateColumns: '320px 1fr',
          borderTopWidth: 'thin',
          borderTopStyle: 'solid',
          borderColor: 'border',
        }}
      >
          <Editor styles={styles} onChange={setStyles} theme={defaultTheme}>
            <div sx={{ display: 'grid', gap: '.5rem', borderRightWidth: '1px', borderRightStyle: 'solid', borderColor: 'border', p: 4 }}>
              <h3 sx={{ my: 0 }}>Typography</h3>
              <Inputs.FontFamily />
              <Inputs.FontSize />
              <Inputs.LineHeight />
              <Inputs.TextAlign />
              <Inputs.FontStyle />
              <Inputs.FontStretch />
              <h3 sx={{ mt: 4, mb: 0 }}>Colors</h3>
              <div sx={{ display: 'flex' }}>
                <div sx={{ mr: 2 }}>
                  <Inputs.Color />
                </div>
                <div>
                  <Inputs.BackgroundColor />
                </div>
              </div>
              <h3 sx={{ mt: 4, mb: 0 }}>Borders</h3>
              <Inputs.BorderRadius />
              <Inputs.BorderImageSource />
              <Inputs.BorderImageSlice />
              <Inputs.BorderWidth />
              <Inputs.BorderStyle />
              <Inputs.BorderColor />

              <h3 sx={{ mt: 4, mb: 0 }}>Spacing</h3>
              <Inputs.Margin />
              <Inputs.Padding />
              <h3 sx={{ mt: 4, mb: 0 }}>Size</h3>
              <Inputs.Width />
              <Inputs.MinWidth />
              <Inputs.MaxWidth />
              <Inputs.Height />
              <Inputs.MinHeight />
              <Inputs.MaxHeight />
            </div>
          </Editor>
        <section>
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
        </section>
      </div>
      <div className="full-bleed">
        <pre
          sx={{
            p: [2, 3, 5],
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
