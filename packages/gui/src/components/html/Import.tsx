import { startCase } from 'lodash-es'
import { useState } from 'react'
import { htmlToEditorSchema } from '../../lib'
import { HtmlNode } from './types'

const PRE_STYLES = {
  overflow: 'auto',
  height: '80vh',
  border: 'thin solid',
  borderColor: 'border',
  backgroundColor: 'rgba(0, 0, 0, 0.02)',
  display: 'block',
  width: '-webkit-fill-available',
  p: 2,
  m: 3,
}

const FORMATS: string[] = ['html', 'markdown']

const DISPLAY_NAMES: Record<string, string> = {
  html: 'HTML',
}

type ImportProps = {
  value: HtmlNode
}
export const Import = ({ value }: ImportProps) => {
  const [src, setSrc] = useState<string>('')
  const [format, setFormat] = useState<string>('html')

  const handleImport = () => {}

  return (
    <>
      <textarea
        sx={PRE_STYLES}
        value={src}
        onChange={(e) => setSrc(e.target.value)}
        onPaste={(e) => {
          e.preventDefault()

          // todo — no html?
          const htmlContent = e.clipboardData.getData('text/html')

          // need to wrap as editor requires single parent node
          const htmlString = `<div>${htmlContent.replace(
            '<!DOCTYPE html>',
            ''
          )}</div>`

          const data = htmlToEditorSchema(htmlString)

          console.log(data)
          // temporary — just show what's been pasted but don't store
          e.target.value = htmlString
        }}
      />
      <div sx={{ px: 3, pb: 4, display: 'flex', alignItems: 'center' }}>
        <select
          value={format}
          onChange={(e) => setFormat(e.target.value)}
          sx={{
            mr: 2,
            px: 1,
            py: 1,
          }}
        >
          {FORMATS.map((f) => {
            return (
              <option key={f} value={f}>
                {DISPLAY_NAMES[f] ?? startCase(f)}
              </option>
            )
          })}
        </select>
        <button
          sx={{
            appearance: 'none',
            WebkitAppearance: 'none',
            boxSizing: 'border-box',
            border: '0',
            borderRadius: '6px',
            color: '#fff',
            bg: '#6465ff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 1,
            fontWeight: 500,
            width: '100%',
            px: 3,
            py: 2,
            cursor: 'pointer',
            '&:hover': {
              bg: '#4e4fec',
            },
          }}
          onClick={handleImport}
        >
          Import
        </button>
      </div>
    </>
  )
}
