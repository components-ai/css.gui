import { useState } from 'react'
import Link from 'next/link'
import { Editor, Fieldset, Inputs, styled, codegen } from '@compai/css-gui'
import { initialStyles } from '../../data/initial-styles-text-shadow-preview'
import { defaultTheme } from '../../data/default-theme'

export function TextShadowPreview() {
  const [styles, setStyles] = useState<any>(initialStyles)

  return (
    <>
      <article 
        id='text-shadow'
        sx={{ 
          color: 'muted',
          width: '100%', 
          boxShadow: 'inset 0 0 0px 1px currentColor', 
          borderRadius: '6px',
          overflow: 'hidden',
        }}>
        <code sx={{ color: 'text', px: 3, py: 2, width: '100%', display: 'block', borderBottom: '1px solid', borderBottomColor: 'muted', }}>
          &lt;Inputs.TextShadow /&gt;
        </code>
      <section sx={{
            fontSize: '128px',
            lineHeight: '1.5',
            fontWeight: 700,
            height: '192px',
            borderBottom: '1px solid',
            px: 5,
          }}>
          <styled.p styles={styles} style={{ transition: 'all .25s ease-in-out', cursor: 'pointer', margin: 0, lineHeight: 1, height: '100%', 
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
              '& > div': { 
                display: 'grid',
                gap: '.5rem',
              },
            }}
          >
            <Inputs.TextShadow />
            <Fieldset type='pseudo-class' name='hover'>
              <h4 sx={{ mb: 0, fontSize: 0 }}>Hover :hover</h4>
              <Inputs.TextShadow />
            </Fieldset>
          </div>
        </Editor>
        
<div sx={{ 
        mt: 'auto', 
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
