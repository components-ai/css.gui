import { useState } from 'react'
import Link from 'next/link'
import { Editor, Inputs, styled, codegen } from '@compai/css-gui'
import { initialStyles } from '../../data/initial-styles-link-preview'
import { defaultTheme } from '../../data/default-theme'

export function LinkPreview() {
  const [styles, setStyles] = useState<any>(initialStyles)

  return (
    <>
      <article 
      id='link'
      sx={{ 
        display: 'flex',
        flexDirection: 'column',
        width: '100%', 
        overflow: 'hidden',
        }}>
        <section sx={{
          fontWeight: 900,
          maxWidth: '100%',
          position: 'relative',
          overflow: 'hidden',
          mb: 3,
          }}>
          <styled.a styles={styles} href='https://github.com/components-ai/css.gui'>
            <h1 style={{ margin: 0, fontSize: '1.25em' }}>A cool title</h1>
            
            <p style={{ fontSize: '.75em', fontWeight: 400 }}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>

          </styled.a>
        </section>
        <Editor styles={styles} onChange={setStyles} theme={defaultTheme}>
          <div
            sx={{
              px: 5,
              pt: 3,
              width: '100%',
              color: 'text',
              '& > div': { 
                display: 'grid',
                gap: '.5rem',
              },
            }}
          >
            <Inputs.Color />
            <Inputs.BackgroundColor />
            <Inputs.BorderImageSlice />
            <Inputs.BorderImageWidth />
            <Inputs.BorderImageSource />
            <Inputs.FontSize />
            <Inputs.FontFamily />
            <Inputs.TextAlign />
            <Inputs.Display />
            <Inputs.BoxShadow />
            <Inputs.Width />
            <Inputs.Padding />
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
