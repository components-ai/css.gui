import { useState } from 'react'
import Link from 'next/link'
import { Editor, Inputs, styled, codegen } from '@compai/css-gui'
import { initialStyles } from '../../data/initial-styles-font-size-preview'
import { defaultTheme } from '../../data/default-theme'

export function FontSizePreview() {
  const [styles, setStyles] = useState<any>(initialStyles)

  return (
    <>
      <article 
      id='font-size'
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
          &lt;Input.FontSize /&gt;
        </code>
        <section sx={{
          fontWeight: 900,
          borderBottom: '1px solid',
          height: '192px',
          maxWidth: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          textAlign: 'center',
          overflow: 'hidden',
          mb: 3,
          }}>
          <styled.p styles={styles} style={{ margin: 0, lineHeight: 1 }}>
            <span sx={{color: "text"}}>Aa</span>
          </styled.p>
        </section>
        <section>
        <Editor styles={styles} onChange={setStyles} theme={defaultTheme}>
          <div
            sx={{
              px: 3,
              width: '100%',
              color: 'text',
              '& > div': { 
                display: 'grid',
                gap: '.5rem',
              },
            }}
          >
            <Inputs.FontSize />
          </div>
        </Editor>
      <div sx={{
        px: 3,
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
      </section>
      </article>
    </>
  )
}
