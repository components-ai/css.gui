import { useState } from 'react'
import Link from 'next/link'
import { Editor, Fieldset, Inputs, styled, codegen } from '@compai/css-gui'
import { initialStyles } from '../../data/initial-styles-colors-preview'
import { defaultTheme } from '../../data/default-theme'

export function ColorsPreview() {
  const [styles, setStyles] = useState<any>(initialStyles)

  return (
    <>
      <article id='colors'
      sx={{ 
        display: 'flex',
        flexDirection: 'column',
        color: 'muted',
        width: '100%', 
        overflow: 'hidden',
        mb: 4,
        }}>
        <section sx={{
          color: 'text',
          fontWeight: 900,
          maxWidth: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          textAlign: 'center',
          overflow: 'hidden',
          mb: 3,
          }}>
          <styled.p 
            styles={styles} 
            style={{ 
              margin: 0, 
              lineHeight: 1, 
              height: '100%', 
              width: '100%', 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '96px',
            }}>
            Link
            <span sx={{display: 'block', fontSize: '.5em'}}></span>
          </styled.p>
        </section>
        <Editor styles={styles} onChange={setStyles} theme={defaultTheme}>
          <div
            sx={{
              pt: 3,
              width: '100%',
              color: 'text',
              display: 'flex',
              gap: '3em',
            }}
          >
            <article>
                <h2 sx={{ fontSize: 1, mt: 0 }}>Link :link</h2>
                <Inputs.Color />
                <Inputs.BackgroundColor />
                <Inputs.BorderColor />
            </article>
            <article>
              <Fieldset type="pseudo-class" name="hover">
                <h2 sx={{ fontSize: 1, mt: 0 }}>Hover :hover</h2>
                <Inputs.Color />
                <Inputs.BackgroundColor />
                <Inputs.BorderColor />
              </Fieldset>
            </article>
            <article>
              <Fieldset type="pseudo-class" name="focus">
                <h2 sx={{ fontSize: 1, mt: 0 }}>Focus :focus</h2>
                <Inputs.Color />
                <Inputs.BackgroundColor />
                <Inputs.BorderColor />
              </Fieldset>
            </article>
            <article>
              <Fieldset type="pseudo-class" name="visited">
                <h2 sx={{ fontSize: 1, mt: 0 }}>Visited :visited</h2>
                <Inputs.Color />
                <Inputs.BackgroundColor />
                <Inputs.BorderColor />
              </Fieldset>
            </article>
          </div>
        </Editor>
      <div sx={{
        mt: 'auto',
        pb: 4,
        maxWidth: '100%',
        overflow: 'auto',
            color: 'text',
        }}>
        <pre
          sx={{
            width: '100%',
            fontSize: 0,
          }}
        >
          {codegen.css(styles)}
        </pre>
      </div>
      </article>
    </>
  )
}
