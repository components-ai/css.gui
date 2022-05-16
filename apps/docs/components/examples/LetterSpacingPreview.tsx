import { useState } from 'react'
import Link from 'next/link'
import { Editor, Inputs, styled, codegen } from '@compai/css-gui'
import { initialStyles } from '../../data/initial-styles-font-family-preview'
import { defaultTheme } from '../../data/default-theme'

export function LetterSpacingPreview() {
  const [styles, setStyles] = useState<any>(initialStyles)

  return (
    <>
      <article 
      id='letter-spacing'
      sx={{ 
        color: 'muted',
        width: '100%', 
        boxShadow: 'inset 0 0 0px 1px currentColor', 
        borderRadius: '6px',
        overflow: 'hidden',
        }}>
      
        <code sx={{ color: 'text', px: 3, py: 2, width: '100%', display: 'block', borderBottom: '1px solid', borderBottomColor: 'muted', }}>
          &lt;Input.LetterSpacing /&gt;
        </code>
        <section sx={{
            fontSize: '16px',
            height: '192px',
            px: 4,
            borderBottom: '1px solid',
          }}>
          <styled.p styles={styles} style={{ margin: 0, lineHeight: '1.5', height: '100%', 
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
            <span sx={{color:'text',}}>Anyone who would letter-space lower case would steal sheep.</span>
          </styled.p>
        </section>
        <Editor styles={styles} onChange={setStyles} theme={defaultTheme}>
          <div
            sx={{
              color: 'text',
              px: 3, pt: 3,
              width: '100%',
              '& > div': { 
                display: 'grid',
                gap: '.5rem',
              },
            }}
          >
            <Inputs.LetterSpacing />
          </div>
        </Editor>
<div sx={{ 
        px: 3,
        pb: 3,
        maxWidth: '100%',
        color: 'text',
        overflow: 'auto',
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
