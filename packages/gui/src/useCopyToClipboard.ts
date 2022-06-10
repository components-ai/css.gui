import writeText from 'copy-to-clipboard'
import { useCallback, useState, useRef, useEffect } from 'react'

const useMountedState = () => {
  const mountedRef = useRef(false)
  const get = useCallback(() => mountedRef.current, [])

  useEffect(() => {
    mountedRef.current = true

    return () => {
      mountedRef.current = false
    }
  })

  return get
}

type ClipboardState = {
  value?: string | number | null
  error?: Error
  noUserInteraction?: boolean
}

export const useCopyToClipboard = () => {
  const isMounted = useMountedState()
  const [state, setState] = useState<ClipboardState>({
    value: undefined,
    error: undefined,
    noUserInteraction: true,
  })

  const copyToClipboard = useCallback((value: string | null) => {
    if (!isMounted()) {
      return
    }
    let noUserInteraction
    let normalizedValue
    try {
      // only strings and numbers casted to strings can be copied to clipboard
      if (typeof value !== 'string' && typeof value !== 'number') {
        const error = new Error(
          `Cannot copy typeof ${typeof value} to clipboard, must be a string`
        )
        if (process.env.NODE_ENV === 'development') console.error(error)
        const newState: ClipboardState = {
          value,
          error,
          noUserInteraction: true,
        }
        return setState(newState)
      }
      // empty strings are also considered invalid
      else if (value === '') {
        const error = new Error(`Cannot copy empty string to clipboard.`)
        if (process.env.NODE_ENV === 'development') console.error(error)
        setState({
          value,
          error,
          noUserInteraction: true,
        })
        return
      }
      normalizedValue = value.toString()
      noUserInteraction = writeText(normalizedValue)
      setState({
        value: normalizedValue,
        error: undefined,
        noUserInteraction,
      })
    } catch (error) {
      const newState: ClipboardState = {
        value: normalizedValue,
        error: error as Error,
        noUserInteraction,
      }
      setState(newState)
    }
  }, [])

  return copyToClipboard
}
