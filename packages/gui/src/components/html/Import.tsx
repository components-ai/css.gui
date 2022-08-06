import { startCase } from 'lodash-es'
import { ChangeEvent, useState } from 'react'
import { HtmlNode } from './types'
import * as parsers from '../../lib/parsers'
import { htmlToMd, mdToHtml } from '../../lib'

const PRE_STYLES = {
  overflow: 'auto',
  height: '80vh',
  border: 'thin solid',
  borderColor: 'border',
  backgroundColor: 'rgba(0, 0, 0, 0.02)',
  display: 'block',
  minWidth: '100%',
  width: '-webkit-fill-available',
  p: 2,
  my: 3,
}

const FORMATS: string[] = ['html', 'md']

const DISPLAY_NAMES: Record<string, string> = {
  html: 'HTML',
  md: 'Markdown',
}

type ImportProps = {
  onChange(newValue: HtmlNode): void
}
export const Import = ({ onChange }: ImportProps) => {
  const [src, setSrc] = useState<string>('')
  const [format, setFormat] = useState<string>('html')

  const handleSetFormat = (e: ChangeEvent<HTMLSelectElement>) => {
    const newFormat = e.target.value

    let newSrc = src
    if (newFormat === 'md') {
      newSrc = htmlToMd(src)
    } else if (newFormat === 'html') {
      newSrc = mdToHtml(src)
    }

    setFormat(newFormat)
    setSrc(newSrc)
  }

  const handleImport = () => {
    // @ts-ignore
    const newValue = parsers[format](src)
    onChange(newValue)
  }

  return (
    <div sx={{px: 3}}>
      <textarea
        sx={PRE_STYLES}
        value={src}
        onChange={(e) => setSrc(e.target.value)}
      />
      <div sx={{ pb: 4, display: 'flex', alignItems: 'center' }}>
        <select
          value={format}
          onChange={handleSetFormat}
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
            color: '#ffffff',
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
            transition: '.2s background-color ease-in-out',
            '&:hover': {
              bg: '#4e4fec',
            },
          }}
          onClick={handleImport}
        >
          Import
        </button>
      </div>
    </div>
  )
}
