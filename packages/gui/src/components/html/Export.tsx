import { useEffect, useState } from 'react'
import { Copy } from 'react-feather'
import { codegen } from '../../lib'
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

type ExportProps = {
  value: HtmlNode
}
export const Export = ({ value }: ExportProps) => {
  const [html, setHtml] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [copied, setCopied] = useState<boolean>(true)
  const copyToClipboard = useCopyToClipboard()

  useEffect(() => {
    codegen.html(value).then((v: string) => {
      setHtml(v)
      setLoading(false)
    })
  }, [value])

  useEffect(() => {
    if (!copied) {
      return
    }

    const clearCopiedTimer = setTimeout(() => setCopied(false), 1000)
    return () => clearTimeout(clearCopiedTimer)
  }, [copied])

  const handleCopyToClipboard = () => {
    copyToClipboard(html)
    setCopied(true)
  }

  if (loading) {
    return <pre sx={PRE_STYLES}>Exporting...</pre>
  }

  return (
    <>
      <pre sx={PRE_STYLES}>{html}</pre>
      <div sx={{px: 3, pb: 4 }}>
      <button
        sx={{
          appearance: 'none',
          WebkitAppearance: 'none',
          boxSizing: 'border-box',
          border: '0',
          borderRadius: '6px',
          color: 'text',
          bg: 'primary',
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
            bg: 'primaryHover',
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
