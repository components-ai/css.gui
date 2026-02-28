import { useState } from 'react'
import Link from 'next/link'
import { Editor, Fieldset, Inputs, styled, codegen } from '@compai/css-gui'
import { initialStyles } from '../../data/initial-styles-box-shadow-preview'
import { defaultTheme } from '../../data/default-theme'

export function BoxShadowPreview() {
  const [styles, setStyles] = useState<any>(initialStyles)

  return (
    <>
      <article 
      id='box-shadow'
      sx={{ 
        color: 'muted',
        width: '100%', 
        boxShadow: 'inset 0 0 0px 1px currentColor', 
        borderRadius: '6px',
        overflow: 'hidden',
        cursor: 'pointer',
        }}>
        <code sx={{ color: 'text', px: 3, py: 2, width: '100%', display: 'block', borderBottom: '1px solid', borderBottomColor: 'muted', }}>
          &lt;Inputs.BoxShadow /&gt;
        </code>
      <section sx={{
            fontSize: '48px',
            lineHeight: '1.5',
            fontWeight: 700,
            height: '192px',
            borderBottom: '1px solid',
            px: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <styled.a 
              styles={styles} 
              style={{ 
                //borderRadius: '6px',
                overflow: 'hidden',
                margin: 0, 
                lineHeight: 1, 
                height: '60%', 
                width: '100%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                backgroundImage: 'url(https://dlu344star2bj.cloudfront.net/i/3090-0015.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                transition: 'all .2s ease-in-out',
              }}>
          </styled.a>
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
            <Inputs.BoxShadow />
            <Fieldset type='pseudo-class' name='hover'>
              <h4 sx={{ mb: 0, fontSize: 0, }}>Hover :hover</h4>
              <Inputs.BoxShadow />
            </Fieldset>
          </div>
        </Editor>
        
<div sx={{ 
        px: 3,
        pb: 4,
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
