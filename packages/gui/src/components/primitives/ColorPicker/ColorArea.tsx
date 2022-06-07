import { useCallback, useEffect, useRef } from 'react'
import { clamp } from './util'
import ColorMarker from './ColorMarker'

interface Props {
  value: [number, number]
  onChange(value: [number, number]): void
  track: JSX.Element
  thumb: JSX.Element
}

/**
 * Represents a two-dimensional input for controlling color channel info
 * across two axes.
 */
export default function ColorArea({ value, onChange, track, thumb }: Props) {
  const canvas = useRef<any>(null)
  const dragging = useRef(false)

  const onMouseMove = useCallback(
    (e: any) => {
      if (dragging.current) {
        // update hinting of current stop based on relative mouse position
        const rect = canvas.current.getBoundingClientRect()
        const x = clamp((e.clientX - rect.left) / rect.width, 0, 1)
        const y = clamp((e.clientY - rect.top) / rect.height, 0, 1)
        onChange([x, y])
        // Prevent text from being highlighted on drag
        e.preventDefault()
      }
    },
    [onChange]
  )

  const onMouseUp = useCallback(() => {
    dragging.current = false
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [onMouseMove])

  useEffect(() => {
    window.addEventListener('mouseup', onMouseUp)
    return () => {
      window.removeEventListener('mouseup', onMouseUp)
    }
  }, [onMouseUp])

  return (
    <div
      ref={canvas}
      sx={{
        position: 'relative',
        width: '100%',
        height: '14rem',
      }}
      onMouseDown={(e) => {
        dragging.current = true
        onMouseMove(e)
      }}
    >
      {track}
      <ColorMarker
        tabIndex={0}
        style={{
          position: 'absolute',
          transform: 'translate(-50%, -50%)',
          left: value[0] * 100 + '%',
          top: value[1] * 100 + '%',
          //':focus': {
          //transform: 'translate(-50%, -50%)scale(1.2)',
          //},
        }}
        onKeyDown={(e) => {
          switch (e.key) {
            case 'ArrowLeft':
              onChange([value[0] - 0.01, value[1]])
              break
            case 'ArrowRight':
              onChange([value[0] + 0.01, value[1]])
              break
            case 'ArrowUp':
              onChange([value[0], value[1] - 0.01])
              break
            case 'ArrowDown':
              onChange([value[0], value[1] + 0.01])
              break
          }
          e.stopPropagation()
        }}
      >
        {thumb}
      </ColorMarker>
    </div>
  )
}
