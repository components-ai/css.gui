import { useState } from 'react'
import Link from 'next/link'
import { Editor, Inputs, styled, codegen } from '@compai/css-gui'
import { initialStyles } from '../../data/initial-styles-background-image-preview'
import { defaultTheme } from '../../data/default-theme'

export function BackgroundImagePreview() {
  const [styles, setStyles] = useState<any>(initialStyles)

  return (
    <>
      <article 
      id='background-image'
      sx={{ 
        color: 'muted',
        width: '100%', 
        boxShadow: 'inset 0 0 0px 1px currentColor', 
        borderRadius: '6px',
        overflow: 'hidden',
        }}>
        <code sx={{ color: 'text', px: 3, py: 2, width: '100%', display: 'block', borderBottom: '1px solid', borderBottomColor: 'muted', }}>
          &lt;Inputs.BackgroundImage /&gt;
        </code>
        <section sx={{
          fontWeight: 900,
          height: '192px',
          borderBottom: '1px solid',
          maxWidth: '100%',
          position: 'relative',
          textAlign: 'center',
          overflow: 'hidden',
          mb: 3,
          }}>
          <styled.div styles={styles} style={{ margin: 0, height: '100%', width: '100%', backgroundSize: 'cover', backgroundPosition: 'center center', backgroundColor: 'salmon', backgroundRepeat: 'no-repeat' }}>
          </styled.div>
        </section>
        <Editor styles={styles} onChange={setStyles} theme={defaultTheme}>
          <div
            sx={{
              px: 3,
              width: '100%',
              color: 'text',
              '& > div': { 
                display: 'grid',
                gap: '.5rem',
              },
            }}
          >
            <Inputs.BackgroundImage />
          </div>
        </Editor>
      <div sx={{
        px: 3,
        pb: 3,
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
