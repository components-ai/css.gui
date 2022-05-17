import { useState } from 'react'
import Link from 'next/link'
import { Editor, Inputs, styled, codegen } from '@compai/css-gui'
import { initialStyles } from '../../data/initial-styles-cursor-preview'
import { defaultTheme } from '../../data/default-theme'

export function CursorPreview() {
  const [styles, setStyles] = useState<any>(initialStyles)

  return (
    <>
      <article 
      id='cursor'
      sx={{ 
        display: 'flex',
        flexDirection: 'column',
        color: 'muted',
        width: '100%', 
        boxShadow: 'inset 0 0 0px 1px currentColor', 
        borderRadius: '6px',
        overflow: 'hidden',
        }}>
        <code sx={{ color: 'text', px: 3, py: 2, width: '100%', display: 'block', borderBottom: '1px solid', borderBottomColor: 'muted', }}>
          &lt;Inputs.Cursor /&gt;
        </code>
        <section sx={{
          fontWeight: 900,
          height: '192px',
          borderBottom: '1px solid',
          maxWidth: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          textAlign: 'center',
          overflow: 'hidden',
          }}>
          <styled.div styles={styles} style={{ 
            height: '100%', 
            width: '100%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            px: 4, 
            }}>
            <span sx={{color: 'text', fontSize: '24px', fontWeight: '500'}}>Hover for cursor preview</span>
          </styled.div>
        </section>
        <Editor styles={styles} onChange={setStyles} theme={defaultTheme}>
          <div
            sx={{
              px: 3,
              pt: 3,
              width: '100%',
              color: 'text',
              '& > div > span': { 
                display: 'grid',
                gap: '.5rem',
              },
            }}
          >
            <Inputs.Cursor />
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
