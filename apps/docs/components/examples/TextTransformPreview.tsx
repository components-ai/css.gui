import { useState } from 'react'
import Link from 'next/link'
import { Editor, Inputs, styled, codegen } from '@compai/css-gui'
import { initialStyles } from '../../data/initial-styles-text-transform-preview'
import { defaultTheme } from '../../data/default-theme'

export function TextTransformPreview() {
  const [styles, setStyles] = useState<any>(initialStyles)

  return (
    <>
      <article 
      id='text-transform'
      sx={{ 
        color: 'muted',
        width: '100%', 
        boxShadow: 'inset 0 0 0px 1px currentColor', 
        borderRadius: '6px',
        overflow: 'hidden',
        }}>
        <code sx={{ color: 'text', px: 3, py: 2, width: '100%', display: 'block', borderBottom: '1px solid', borderBottomColor: 'muted', }}>
          &lt;Input.TextTransform /&gt;
        </code>
      <section sx={{
            fontSize: '24px',
            lineHeight: '1.5',
            fontWeight: 700,
            height: '192px',
            borderBottom: '1px solid',
            px: 4,
          }}>
          <styled.p styles={styles} style={{ margin: 0, lineHeight: 1, height: '100%', 
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
            <span sx={{color:'text',}}>A demo of the text-transform CSS property</span>
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
            <Inputs.TextTransform />
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
