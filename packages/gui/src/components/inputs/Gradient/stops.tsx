import { HTMLAttributes, useCallback, useEffect, useRef, useState } from 'react'
import { clamp } from 'lodash-es'
import produce from 'immer'
import { Minus, Plus } from 'react-feather'
import { randomColor } from '../../../lib/color'
import { ColorInput } from '../ColorInput'
import { NumberInput } from '../NumberInput'
import { getInputProps } from '../../../lib/util'
import { GradientStop as GradientStopValue } from './types'
import { getDeclarationValue } from './stringify'

interface StopsProps {
  value: GradientStopValue[]
  onChange: any
  repeating: boolean
}

export default function GradientStopsField({
  onChange,
  value,
  repeating,
}: StopsProps) {
  const track = useRef<any>(null)
  const [selected, setSelected] = useState(-1)
  const [dragIndex, setDragIndex] = useState(-1)

  const onMouseMove = useCallback(
    (e: any) => {
      if (dragIndex >= 0) {
        // update hinting of current stop based on relative mouse position
        const rect = track.current.getBoundingClientRect()
        const updated = clamp(
          Math.round(((e.clientX - rect.left) / rect.width) * 100),
          0,
          100
        )

        const newValue = produce(value, (draft: any) => {
          draft[dragIndex].hinting = updated
        })

        onChange(newValue)
      }
    },
    [dragIndex]
  )

  const onMouseUp = useCallback(() => {
    setDragIndex(-1)
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
    <div>
      <label>Stops</label>
      <Toolbar
        onAdd={() => {
          setSelected(value.length)
          onChange([
            ...value,
            {
              color: randomColor(),
              hinting: 69,
            },
          ])
        }}
        onDelete={() => {
          if (selected === value.length - 1) {
            setSelected((selected) => selected - 1)
          }

          const newValue = produce(value, (draft: any) => {
            draft.splice(selected, 1)
          })

          onChange(newValue)
        }}
      />
      <div
        ref={track}
        sx={{
          position: 'relative',
          width: '100%',
          height: '2rem',
        }}
      >
        <Track value={value} repeating={repeating} />
        {value.map((stop, i) => {
          return (
            <Marker
              tabIndex={0}
              key={i}
              value={stop}
              role="slider"
              aria-valuenow={stop.hinting}
              isSelected={i === selected}
              onFocus={() => setSelected(i)}
              onMouseDown={() => {
                setSelected(i)
                setDragIndex(i)
              }}
              onKeyDown={(e) => {
                switch (e.key) {
                  case 'ArrowLeft': {
                    const newValue = produce(value, (draft: any) => {
                      draft[i].hinting = newValue[i].hinting - 1
                    })
                    onChange(newValue)
                    break
                  }
                  case 'ArrowRight': {
                    const newValue = produce(value, (draft: any) => {
                      draft[i].hinting = newValue[i].hinting + 1
                    })

                    onChange(newValue)
                    break
                  }
                }
                e.stopPropagation()
              }}
            />
          )
        })}
      </div>
      {selected !== -1 && value[selected] && (
        <StopFields
          value={value[selected]}
          onChange={(newStopValue: GradientStopValue) => {
            const newValue = produce(value, (draft: any) => {
              draft[selected] = newStopValue
            })
            onChange(newValue)
          }}
        />
      )}
    </div>
  )
}

interface ToolbarProps {
  onAdd(): void
  onDelete(): void
}
function Toolbar({ onAdd, onDelete }: ToolbarProps) {
  return (
    <div
      sx={{
        display: 'flex',
        my: 1,
        '> button': {
          p: 1,
          borderRadius: '9999px',
          aspectRatio: '1 / 1',
          display: 'flex',
          alignItems: 'center',
          ':hover': {
            backgroundColor: 'backgroundOffset',
          },
        },
      }}
    >
      <Plus size={12} onClick={onAdd} />
      <Minus size={12} onClick={onDelete} />
    </div>
  )
}

interface TrackProps {
  repeating: boolean
  value: GradientStopValue[]
}
function Track({ repeating, value }: TrackProps) {
  return (
    <div
      sx={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        '::before': {
          content: "''",
          position: 'absolute',
          inset: 0,
          ...opacityPattern,
        },
        '::after': {
          content: "''",
          position: 'absolute',
          inset: 0,
          backgroundImage: getDeclarationValue({
            type: repeating ? 'repeating-linear' : 'linear',
            degrees: 90,
            stops: value,
          }),
        },
      }}
    />
  )
}

interface StopFieldsProps {
  value: GradientStopValue
  onChange: (newValue: GradientStopValue) => void
}
function StopFields(props: StopFieldsProps) {
  return (
    <div sx={{ display: 'grid', gridTemplateColumns: '2fr 1fr', mt: 2 }}>
      <ColorInput {...getInputProps(props, 'color')} />
      <NumberInput {...getInputProps(props, 'hinting')} />
    </div>
  )
}

interface MarkerProps extends HTMLAttributes<HTMLDivElement> {
  value: GradientStopValue
  isSelected: boolean
}
function Marker({ value, isSelected, ...props }: MarkerProps) {
  return (
    <div
      {...props}
      sx={{
        overflow: 'hidden',
        position: 'absolute',
        borderRadius: '9999px',
        width: '2rem',
        aspectRatio: '1 / 1',
        border: '2px solid',
        borderColor: 'white',
        cursor: 'grab',
        boxShadow:
          '0 0 2px 1px rgba(0,0,0,.15), 0 0 2px 1px rgba(255,255,255,.15)',
        left: `calc(${value.hinting}% - 1rem)`,
        transform: isSelected ? 'scale(1.25)' : 'initial',
        // Move the selected marker to the front
        zIndex: isSelected ? 10 : 'initial',
        '::before': {
          content: "''",
          position: 'absolute',
          inset: 0,
          ...opacityPattern,
        },
        '::after': {
          content: "''",
          position: 'absolute',
          inset: 0,
          backgroundColor: value.color,
        },
      }}
    />
  )
}

// Checkerboard pattern from: https://stackoverflow.com/a/51054396
const opacityPattern = {
  /* tint image */
  backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.9) 0 100%),
  /* checkered effect */
  linear-gradient(to right, black 50%, white 50%),
  linear-gradient(to bottom, black 50%, white 50%)`,
  backgroundBlendMode: `normal, difference, normal`,
  backgroundSize: `1em 1em`,
}
