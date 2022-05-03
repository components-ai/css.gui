import { ComponentType, ReactNode } from 'react'

interface Props {
  preview?: ComponentType<{ value: string }>
  text: string
}

/**
 * A header component for use with editors/layers that displays
 * a visual preview and text.
 */
export default function LayerHeader({ preview: Preview, text }: Props) {
  return (
    <div
      sx={{
        height: '3rem',
        textAlign: 'start',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {Preview && (
        <div
          sx={{
            width: '2rem',
            height: '2rem',
            border: '1px solid',
            borderColor: 'border',
            borderRadius: 8,
            overflow: 'hidden',
            mr: 2,
          }}
        >
          <Preview value={text} />
        </div>
      )}
      <div
        sx={{
          position: 'relative',
          width: '100%',
          height: '1rem',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          pr: '2rem',
          wordBreak: 'break-all',
          color: 'text',
          // Fade out overflowing text using a gradient.
          // TODO this still fails for dark mode on first load?
          WebkitTextFillColor: 'transparent',
          WebkitBackgroundClip: 'text',
          backgroundImage: ({ rawColors }) =>
            `linear-gradient(90deg, ${rawColors?.text} 0%, ${rawColors?.text} 80%, rgba(0, 0, 0, 0) 90%)`,
        }}
      >
        {text}
      </div>
    </div>
  )
}
