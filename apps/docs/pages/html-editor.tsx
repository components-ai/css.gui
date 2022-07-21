import { HtmlEditor, HtmlRenderer, HtmlEditorProvider } from '@compai/css-gui'
import { useState } from 'react'
import { defaultTheme } from '../data/default-theme'
import { initialValue } from '../data/initial-html-editor-data'

export default function HtmlEditorExample() {
  const [html, setHtml] = useState(initialValue)

  return (
    <HtmlEditorProvider value={html} onChange={setHtml} theme={defaultTheme}>
      <div
        sx={{
          display: 'grid',
          gridTemplateAreas: '"nav content"',
          gridTemplateColumns: 'auto 1fr',
          gridTemplateRows: 'auto',
          height: 'calc(100vh - 54px)',
          overflow: 'hidden',
        }}
      >
        <div
          sx={{
            gridArea: 'nav',
            height: '100%',
          }}
        >
          <HtmlEditor />
        </div>
        <div
          sx={{
            overflow: 'auto',
            width: '100%',
            gridArea: 'content',
            '&::-webkit-scrollbar': { display: 'none' },
          }}
        >
          <HtmlRenderer value={html} />
        </div>
      </div>
    </HtmlEditorProvider>
  )
}
