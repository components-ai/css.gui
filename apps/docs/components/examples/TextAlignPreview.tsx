import { useState } from 'react'
import Link from 'next/link'
import { Editor, Inputs, styled, codegen } from '@compai/css-gui'
import { initialStyles } from '../../data/initial-styles-text-align-preview'
import { defaultTheme } from '../../data/default-theme'

export function TextAlignPreview() {
  const [styles, setStyles] = useState<any>(initialStyles)

  return (
    <>
      <article sx={{ 
        display: 'flex',
        flexDirection: 'column',
        color: 'muted',
        width: '100%', 
        boxShadow: 'inset 0 0 0px 1px currentColor', 
        borderRadius: '6px',
        overflow: 'hidden',
        }}>
        <section sx={{
          fontWeight: 900,
          height: '300px',
          borderBottom: '1px solid',
          maxWidth: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          textAlign: 'center',
          overflow: 'hidden',
          mb: 3,
          color: 'text',
          }}>
          <styled.p styles={styles} style={{ margin: 0, lineHeight: '1.5', fontSize: '18px', fontWeight: 400, paddingLeft: '32px', paddingRight: '32px', color: 'inherit' }}>
The parameters comprise sequences which are theoretically infinite but limits are, of course, set to them in practice. There is an upward limit to size and certainly a downward one... Within these sequences there are reasonable bounds; extremes set by technical and functional experience.

          </styled.p>
        </section>
        <Editor styles={styles} onChange={setStyles} theme={defaultTheme}>
          <div
            sx={{
              px: 5,
              pt: 3,
              width: '100%',
              color: 'text',
              '& [role="label"]': { 
                display: 'grid',
                gap: '.5rem',
              },
            }}
          >
            <Inputs.TextAlign />
          </div>
        </Editor>
      <div sx={{
        mt: 'auto',
        px: 5,
        pb: 4,
        maxWidth: '100%',
        overflow: 'auto',
            color: 'text',
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
      </article>
    </>
  )
}
