import { useState } from 'react'
import Link from 'next/link'
import { Editor, Inputs, styled, codegen } from '@compai/css-gui'
import { initialStyles } from '../../data/initial-styles-text-decoration-line-preview'
import { defaultTheme } from '../../data/default-theme'

export function TextDecorationLinePreview() {
  const [styles, setStyles] = useState<any>(initialStyles)

  return (
    <>
      <article id='color'
      sx={{ 
        color: 'muted',
        width: '100%', 
        boxShadow: 'inset 0 0 0px 1px currentColor', 
        borderRadius: '6px',
        overflow: 'hidden',
        }}>
        <code sx={{ color: 'text', px: 3, py: 2, width: '100%', display: 'block', borderBottom: '1px solid', borderBottomColor: 'muted', }}>
          &lt;Inputs.TextDecorationLine /&gt;
        </code>
        <section sx={{
          color: 'text',
          fontWeight: 900,
          height: '192px',
          maxWidth: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          textAlign: 'center',
          overflow: 'hidden',
          borderbottom: '1px solid',
          borderBottomColor: 'muted',
          }}>
          <styled.p styles={styles} style={{ margin: 0, lineHeight: 1, fontSize: '4rem', 
          textDecorationThickness: '4px',
          textDecorationStyle: 'wavy', 
          textDecorationColor: '#6465ff', 
          }}>
            Aa
          </styled.p>
        </section>
        <Editor styles={styles} onChange={setStyles} theme={defaultTheme}>
          <div
            sx={{
              borderTop: '1px solid',
              borderTopColor: 'muted',
              px: 3,
              pt: 3,
              width: '100%',
              color: 'text',
              '& > div': { 
                display: 'grid',
                gap: '.5rem',
              },
            }}
          >
            <Inputs.TextDecorationLine />
          </div>
        </Editor>
      <div sx={{
        mt: 'auto',
        px: 3,
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
