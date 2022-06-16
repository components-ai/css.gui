import { startCase } from 'lodash-es'
import { useEffect, useState } from 'react'
import { Copy } from 'react-feather'
import { codegen } from '../../lib'
import { extractStyles } from '../../lib/codegen/extract-styles'
import { useCopyToClipboard } from '../../useCopyToClipboard'
import { HtmlNode } from './types'

const PRE_STYLES = {
  overflow: 'auto',
  height: '80vh',
  border: 'thin solid',
  borderColor: 'border',
  backgroundColor: 'rgba(0, 0, 0, 0.02)',
  p: 2,
  m: 3,
}

const CODEGEN_DISPLAY_NAMES: Record<string, string> = {
  css: 'CSS',
  html: 'HTML + CSS',
  unstyledHtml: 'HTML',
  themeUI: 'Theme UI',
  styledJsx: 'Styled JSX',
}

type ExportProps = {
  value: HtmlNode
}
export const Export = ({ value }: ExportProps) => {
  const [src, setSrc] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [copied, setCopied] = useState<boolean>(true)
  const [format, setFormat] = useState<string>('html')
  const copyToClipboard = useCopyToClipboard()

  useEffect(() => {
    setLoading(true)
    setSrc('')

    // @ts-ignore
    let gen = codegen[format]
    if (format === 'css') {
      gen = codegen.html
    }

    gen(value).then((v: string) => {
      setLoading(false)

      if (format === 'css') {
        return extractStyles(v).then((res) => {
          setSrc(res.styles)
        })
      }

      setSrc(v)
    })
  }, [value, format])

  useEffect(() => {
    if (!copied) {
      return
    }

    const clearCopiedTimer = setTimeout(() => setCopied(false), 1000)
    return () => clearTimeout(clearCopiedTimer)
  }, [copied])

  const handleCopyToClipboard = () => {
    copyToClipboard(src)
    setCopied(true)
  }

  if (loading) {
    return <pre sx={PRE_STYLES}>Exporting...</pre>
  }

  return (
    <>
      <pre sx={PRE_STYLES}>{src}</pre>
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
          {Object.keys(codegen).map((f) => {
            return (
              <option key={f} value={f}>
                {CODEGEN_DISPLAY_NAMES[f] ?? startCase(f)}
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
          onClick={handleCopyToClipboard}
        >
          <Copy size={14} sx={{ mr: 2 }} />
          {copied ? 'Copied to clipboard!' : 'Copy to clipboard'}
        </button>
      </div>
    </>
  )
}
