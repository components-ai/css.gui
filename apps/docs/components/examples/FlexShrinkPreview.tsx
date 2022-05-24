import { useState } from 'react'
import Link from 'next/link'
import { Editor, Inputs, styled, codegen } from '@compai/css-gui'
import { initialStyles } from '../../data/initial-styles-flex-shrink-preview'
import { defaultTheme } from '../../data/default-theme'

export function FlexShrinkPreview() {
  const [styles, setStyles] = useState<any>(initialStyles)

  return (
    <>
      <article 
      id='flex-shrink'
      sx={{ 
        color: 'muted',
        width: '100%', 
        boxShadow: 'inset 0 0 0px 1px currentColor', 
        borderRadius: '6px',
        overflow: 'hidden',
        }}>
      
        <code sx={{ color: 'text', px: 3, py: 2, width: '100%', display: 'block', borderBottom: '1px solid', borderBottomColor: 'muted', }}>
          &lt;Inputs.FlexShrink /&gt;
        </code>
        <section sx={{
            fontSize: '10px',
            height: '192px',
            px: 4,
            py: 3,
            borderBottom: '1px solid',
          }}>
          <article 
            sx={{ 
              color: 'text',
              display: 'flex', 
              paddingTop: '.5rem',
              paddingBottom: '.5rem',
              alignItems: 'stretch',
              margin: 0, 
              lineHeight: '1.5',
              height: '100%',
            }}>
            <styled.div styles={styles} style={{ flexBasis: '100px', flexGrow: 1, maxHeight: '100%', minHeight: 48, padding: '8px',  outline: '1px solid', color: 'text', }}>1</styled.div>
            <div sx={{ flexBasis: '100px', flexGrow: 1, flexShrink: 1, width: '100%', maxHeight: '100%', minHeight: 48, p: 2, outline: '1px solid', color: 'text', }}>2</div>
            <div sx={{ flexBasis: '100px', flexGrow: 1, flexShrink: 1, width: '100%', maxHeight: '100%', minHeight: 48, p: 2, outline: '1px solid', color: 'text', }}>3</div>
          </article>
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
            <Inputs.FlexShrink />
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
