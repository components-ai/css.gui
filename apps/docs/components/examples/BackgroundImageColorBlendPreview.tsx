import { useState } from 'react'
import Link from 'next/link'
import { Editor, Inputs, styled, codegen } from '@compai/css-gui'
import { initialStyles } from '../../data/initial-styles-background-blend-mode-preview'
import { defaultTheme } from '../../data/default-theme'

export function BackgroundBlendModePreview() {
  const [styles, setStyles] = useState<any>(initialStyles)

  return (
    <>
      <article sx={{ 
        display: 'flex',
        flexDirection: 'column',
        color: 'muted',
        width: '100%', 
        boxShadow: 'inset 0 0 0px 1px currentColor', 
        borderRadius: '6px',
        overflow: 'hidden',
        }}>
        <section sx={{
          fontWeight: 900,
          height: '300px',
          borderBottom: '1px solid',
          maxWidth: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          textAlign: 'center',
          overflow: 'hidden',
          mb: 3,
          }}>
          <styled.div styles={styles} style={{ 
            backgroundColor: '#6465ff',
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundSize: 'cover',
            height: '100%',
            width: '100%',
          }}>


          </styled.div>
        </section>
        <Editor styles={styles} onChange={setStyles} theme={defaultTheme}>
          <div
            sx={{
              px: 5,
              pt: 3,
              width: '100%',
              color: 'text',
              '& > div': { 
                display: 'grid',
                gap: '.5rem',
              },
            }}
          >
            <Inputs.BackgroundBlendMode />
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
