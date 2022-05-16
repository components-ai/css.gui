import { useState } from 'react'
import Link from 'next/link'
import { Editor, Inputs, styled, codegen } from '@compai/css-gui'
import { initialStyles } from '../../data/initial-styles-appearance-preview'
import { defaultTheme } from '../../data/default-theme'

export function AppearancePreview() {
  const [styles, setStyles] = useState<any>(initialStyles)

  return (
    <>
      <article 
      id='appearance'
      sx={{ 
        display: 'flex',
        flexDirection: 'column',
        color: 'muted',
        width: '100%', 
        boxShadow: 'inset 0 0 0px 1px currentColor', 
        borderRadius: '6px',
        overflow: 'hidden',
        }}>
        <section sx={{
          borderBottomColor: 'muted',
          borderBottomStyle: 'solid',
          borderBottomWidth: '1px',
          color: 'text',
          fontWeight: 400,
          height: '300px',
          maxWidth: '100%',
          position: 'relative',
          overflow: 'hidden',
          py: 4,
          px: 3,
          mb: 2,
        }}>
          <label>
            <span sx={{display: 'block', mb: 1 }}>Object</span>
            <styled.input autoFocus={true} type='text' value={JSON.stringify(styles)} styles={styles} style={{ appearance: 'none', border: '1px solid', borderRadius: '6px', padding: '12px', width: '100%' }} />
          </label>
          <div sx={{ mt: 2, mb: 3, display: 'flex', gap: '1em', }}>
            <label>
              <styled.input checked={true} type='radio' name='bool' styles={styles} />
              <span>Yes</span>
            </label>
            <label>
              <styled.input name='bool' type='radio' styles={styles} />
              <span>No</span>
            </label>
            <label sx={{ml: 'auto', mr: 3}}>
              <styled.input checked={false} type='checkbox' styles={styles} />
              <span>One</span>
            </label>
            <label sx={{ mr: 3 }}>
              <styled.input checked={true} type='checkbox' styles={styles} />
              <span>Two</span>
            </label>
            <label sx={{ mr: 3 }}>
              <styled.input checked={true} name='bool' type='checkbox' styles={styles} />
              <span>Three</span>
            </label>
          </div>
            <label sx={{ display: 'block', mt: 2}}>
              <span sx={{ display: 'block' }}>Value</span>
              <styled.input type='range' min={0} max={100} value={32} styles={styles} style={{width: '100%' }}/>
            </label>
            <label sx={{ display: 'block', mt: 2}}>
              <span sx={{ display: 'block' }}>Progress</span>
              <styled.progress min={0} max={427} value={280} styles={styles} style={{width: '100%' }}/>
            </label>
        </section>
        <Editor styles={styles} onChange={setStyles} theme={defaultTheme}>
          <div
            sx={{
              px: 3,
              pt: 3,
              width: '100%',
              color: 'text',
              '& > div': { 
                display: 'grid',
                gap: '.5rem',
              },
            }}
          >
            <Inputs.Appearance />
          </div>
        </Editor>
      <div sx={{
        mt: 'auto',
        px: 3,
        pb: 4,
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
