import { useState } from 'react'
import Link from 'next/link'
import { Editor, Fieldset, Inputs, styled, codegen } from '@compai/css-gui'
import { initialStyles } from '../../data/initial-styles-color-pair-preview'
import { defaultTheme } from '../../data/default-theme'

export function ColorPairPreview() {
  const [styles, setStyles] = useState<any>(initialStyles)

  return (
    <>
      <article sx={{ 
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
            Aa
            <span sx={{display: 'block', fontSize: '.5em'}}></span>
          </styled.p>
        </section>
        <Editor styles={styles} onChange={setStyles} theme={defaultTheme}>
          <div
            sx={{
              px: 5,
              pt: 3,
              width: '100%',
              color: 'text',
              display: 'flex',
              gap: '3em',
            }}
          >
            <article>
                <Inputs.Color />
                <Inputs.BackgroundColor />
            </article>
          </div>
        </Editor>
      <div sx={{
        mt: 'auto',
        px: 5,
        pb: 4,
        maxWidth: '100%',
        overflow: 'auto',
            color: 'text',
        }}>
        <pre
          sx={{
            width: '100%',
            fontSize: 2,
          }}
        >
          {codegen.css(styles)}
        </pre>
      </div>
      </article>
    </>
  )
}
