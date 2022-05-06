import { useState } from 'react'
import Link from 'next/link'
import { Editor, Inputs, styled, codegen } from '@compai/css-gui'
import { initialStyles } from '../../data/initial-styles-font-family-preview'
import { defaultTheme } from '../../data/default-theme'

export function FontFamilyPreview() {
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
            fontWeight: '900',
            fontSize: '192px',
            height: '300px',
            color: 'text',
          }}>
          <styled.p styles={styles} style={{ margin: 0, lineHeight: 1, height: '100%', 
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
            Aa
          </styled.p>
        </section>
        <Editor styles={styles} onChange={setStyles} theme={defaultTheme}>
          <div
            sx={{
              color: 'text',
              px: 5, pt: 4,
              width: '100%',
              '& > div': { 
                display: 'grid',
                gap: '.5rem',
              },
            }}
          >
            <Inputs.FontFamily />
          </div>
        </Editor>
      <div sx={{ 
        mt: 'auto', 
        px: 5,
        pb: 4,
        maxWidth: '100%',
        color: 'text',
        overflow: 'auto',
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
