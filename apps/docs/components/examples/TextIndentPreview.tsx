import { useState } from 'react'
import Link from 'next/link'
import { Editor, Inputs, styled, codegen } from '@compai/css-gui'
import { initialStyles } from '../../data/initial-styles-text-indent-preview'
import { defaultTheme } from '../../data/default-theme'

export function TextIndentPreview() {
  const [styles, setStyles] = useState<any>(initialStyles)

  return (
    <>
      <article 
      id='text-indent'
      sx={{ 
        color: 'muted',
        width: '100%', 
        boxShadow: 'inset 0 0 0px 1px currentColor', 
        borderRadius: '6px',
        overflow: 'hidden',
        }}>
      
        <code sx={{ color: 'text', px: 3, py: 2, width: '100%', display: 'block', borderBottom: '1px solid', borderBottomColor: 'muted', }}>
          &lt;Inputs.TextIndent /&gt;
        </code>
        <section sx={{
            fontSize: '10px',
            height: '192px',
            px: 4,
            py: 3,
            borderBottom: '1px solid',
          }}>
          <styled.p styles={styles} style={{ margin: 0, lineHeight: '1.5',}}>
            <span sx={{color:'text',}}>
              A common stylistic choice for books and printed material. Indenting
              the first line of paragraphs is often used both digitally and in
              print when there is no vertical spacing between paragraphs. 
            </span>
          </styled.p>
          <styled.p styles={styles} style={{ margin: 0, lineHeight: '1.5' }}>
            <span sx={{color:'text',}}>Indent text forwards or backwards with positive and negative values. Paragraphs that are flush often have indented text.</span>
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
            <Inputs.TextIndent />
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
