import { useState } from 'react'
import { Editor, Inputs, styled, codegen } from '@compai/css-gui'
import { defaultTheme } from '../../data/default-theme'

export function TextAlignPreview() {
  const [styles, setStyles] = useState<any>({})

  return (
    <>
      <article
        id='text-align'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          color: 'muted',
          width: '100%',
          boxShadow: 'inset 0 0 0px 1px currentColor',
          borderRadius: '6px',
          overflow: 'hidden',
        }}
      >
        <code sx={{ color: 'text', px: 3, py: 2, width: '100%', borderBottom: '1px solid', borderBottomColor: 'muted', }}>
          &lt;Input.TextAlign /&gt;
        </code>
        <section
          sx={{
            fontWeight: 900,
            height: '192px',
            borderBottom: '1px solid',
            borderBottomColor: 'muted',
            maxWidth: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            textAlign: 'center',
            overflow: 'hidden',
            mb: 3,
            color: 'text',
          }}
        >
          <styled.p
            styles={styles}
            style={{
              margin: 0,
              lineHeight: '1.5',
              fontSize: '16px',
              fontWeight: 400,
              paddingLeft: '32px',
              paddingRight: '32px',
              color: 'inherit',
            }}
          >
            The parameters comprise sequences which are theoretically infinite
            but limits are, of course, set to them in practice. 
          </styled.p>
        </section>
        <Editor styles={styles} onChange={setStyles} theme={defaultTheme}>
          <div
            sx={{
              px: 3,
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
        <div
          sx={{
            mt: 0,
            px: 3,
            pb: 3,
            maxWidth: '100%',
            overflow: 'auto',
            color: 'text',
          }}
        >
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
