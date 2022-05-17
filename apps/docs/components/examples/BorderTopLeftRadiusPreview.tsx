import { useState } from 'react'
import Link from 'next/link'
import { Editor, Inputs, styled, codegen } from '@compai/css-gui'
import { initialStyles } from '../../data/initial-styles-border-top-left-radius-preview'
import { defaultTheme } from '../../data/default-theme'

export function BorderTopLeftRadiusPreview() {
  const [styles, setStyles] = useState<any>(initialStyles)

  return (
    <>
      <article 
      id='border-top-left-radius'
      sx={{ 
        display: 'flex',
        flexDirection: 'column',
        color: 'muted',
        width: '100%', 
        boxShadow: 'inset 0 0 0px 1px currentColor', 
        borderRadius: '6px',
        }}>
        <code sx={{ color: 'text', px: 3, py: 2, width: '100%', display: 'block', borderBottom: '1px solid', borderBottomColor: 'muted', }}>
          &lt;Inputs.BorderTopLeftRadius /&gt;
        </code>
        <section sx={{
          fontWeight: 900,
          height: '192px',
          borderBottom: '1px solid',
          maxWidth: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 3,

          }}>
          <styled.div
          styles={styles} 
          style={{ 
            margin: 0, 
            lineHeight: 1, 
            height: '128px', 
            width: '128px', 
            backgroundColor: '#6465ff' 
          }} />

        </section>
        <Editor styles={styles} onChange={setStyles} theme={defaultTheme}>
          <div
            sx={{
              px: 3,
              pt: 0,
              width: '100%',
              color: 'text',
              '& > div': { 
                display: 'grid',
                gap: '.5rem',
              },
            }}
          >
            <Inputs.BorderTopLeftRadius />
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
