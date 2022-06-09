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
      <button
        sx={{
          all: 'unset',
          m: 3,
          border: 'thin solid',
          borderRadius: 4,
          borderColor: 'border',
          display: 'flex',
          alignItems: 'center',
          fontSize: 1,
          fontWeight: 500,
          px: 3,
          py: 1,
          '&:hover': {
            color: 'primary',
            borderColor: 'primary',
          },
        }}
        onClick={handleCopyToClipboard}
      >
        <Copy size={14} sx={{ mr: 2 }} />
        {copied ? 'Copied to clipboard!' : 'Copy to clipboard'}
      </button>
    </>
  )
}
