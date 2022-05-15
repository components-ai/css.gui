import { useState } from 'react'
import Link from 'next/link'
import { Editor, Fieldset, Inputs, styled, codegen } from '@compai/css-gui'
import { initialStyles } from '../../data/initial-styles-box-shadow-preview'
import { defaultTheme } from '../../data/default-theme'

export function BoxShadowPreview() {
  const [styles, setStyles] = useState<any>(initialStyles)

  return (
    <>
      <article sx={{ 
        display: 'flex',
        flexDirection: 'column-reverse',
        color: 'muted',
        width: '100%', 
        boxShadow: 'inset 0 0 0px 1px currentColor', 
        borderRadius: '6px',
        overflow: 'hidden',
        cursor: 'pointer',
        }}>
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
            <Inputs.BoxShadow />
            <Fieldset type='pseudo-class' name='hover'>
              <h4 sx={{ mb: 0 }}>Hover :hover</h4>
              <Inputs.BoxShadow />
            </Fieldset>
          </div>
        </Editor>
        <section sx={{
            fontSize: '48px',
            lineHeight: '1.5',
            fontWeight: 700,
            height: '300px',
            borderBottom: '1px solid',
            px: 5,
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
                backgroundImage: 'url(https://source.unsplash.com/random/1920x1080)',
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                transition: 'all .2s ease-in-out',
              }}>
          </styled.a>
        </section>
      </article>
    </>
  )
}
