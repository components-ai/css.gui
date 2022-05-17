import { useState } from 'react'
import Link from 'next/link'
import { Editor, Inputs, styled, codegen } from '@compai/css-gui'
import { initialStyles } from '../../data/initial-styles-font-weight-preview'
import { defaultTheme } from '../../data/default-theme'

export function FontWeightPreview() {
  const [styles, setStyles] = useState<any>(initialStyles)

  return (
    <>
      <article 
      id='font-weight'
      sx={{ 
        color: 'muted',
        width: '100%', 
        boxShadow: 'inset 0 0 0px 1px currentColor', 
        borderRadius: '6px',
        overflow: 'hidden',
        }}>
        <code sx={{ color: 'text', px: 3, py: 2, width: '100%', display: 'block', borderBottom: '1px solid', borderBottomColor: 'muted', }}>
          &lt;Input.FontWeight /&gt;
        </code>
      
        <section sx={{
            fontSize: '64px',
            height: '192px',
            borderBottom: '1px solid',
          }}>
          <styled.p styles={styles} style={{ margin: 0, lineHeight: 1, height: '100%', 
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
            <span sx={{color:'text',}}>Aa</span>
          </styled.p>
        </section>
        <Editor styles={styles} onChange={setStyles} theme={defaultTheme}>
          <div
            sx={{
              color: 'text',
              px: 3, pt: 3,
              width: '100%',
              '& > div > span': { 
                display: 'grid',
                gap: '.5rem',
              },
            }}
          >
            <Inputs.FontWeight />
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
