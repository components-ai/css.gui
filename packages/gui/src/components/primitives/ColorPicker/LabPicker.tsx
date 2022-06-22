import * as culori from 'culori'
import Checkerboard from './Checkerboard'
import ColorSlider from './ColorSlider'
import { useEffect, useState } from 'react'
import { isValidColor, format, withFallback } from './util'
import { range } from 'lodash-es'
import { Color } from '../../../types/css'

interface LabValue {
  l: number
  a: number
  b: number
  alpha?: number
}

interface Props {
  value: Color
  onChange(value: Color): void
  mode: string
}

interface InternalProps {
  value: LabValue
  onChange(value: LabValue): void
}

/**
 * A 'standard' color picker based on the HSV color space.
 */
export default function LabColorPicker({ value, onChange, mode }: Props) {
  const [labValue, setLabValue] = useState<LabValue>(culori.lab(value))

  const handleChange = (value: LabValue) => {
    setLabValue(value)
    onChange(format(value, mode))
  }

  useEffect(() => {
    if (isValidColor(value) && value !== format(labValue, mode)) {
      setLabValue(culori.lab(value))
    }
  }, [value])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <LabSlider
        channel="l"
        range={[0, 100]}
        value={labValue}
        onChange={handleChange}
      />
      <LabSlider
        channel="a"
        range={[-100, 100]}
        step={0.01}
        value={labValue}
        onChange={handleChange}
      />
      <LabSlider
        channel="b"
        numStops={24}
        range={[-100, 100]}
        step={0.01}
        value={labValue}
        onChange={handleChange}
      />
      <AlphaSlider value={labValue} onChange={handleChange} />
    </div>
  )
}

interface SliderProps {
  channel: keyof LabValue
  range: [number, number]
  step?: number
  numStops?: number
  value: LabValue
  onChange(value: LabValue): void
}

// A general LAB slider that can be used
function LabSlider({
  channel,
  range: [min, max],
  step = 1,
  numStops = 10,
  value,
  onChange,
}: SliderProps) {
  return (
    <ColorSlider
      value={value[channel] ?? 0}
      onValueChange={(channelVal) => {
        onChange({ ...value, [channel]: channelVal })
      }}
      min={min}
      max={max}
      step={step}
      track={
        <div
          sx={{
            position: 'absolute',
            inset: 0,
            // Traverse all main color points in even intervals
            background: `linear-gradient(to right, ${range(numStops + 1)
              .map((n: number) => {
                const ratio = n / numStops
                const lab = culori.formatCss({
                  ...value,
                  [channel]: min + ratio * (max - min),
                })
                return `${lab} ${ratio * 100}%`
              })
              .join(', ')})`,
            '@supports not (color: lab(0% 0 0))': {
              background: `linear-gradient(to right, ${range(numStops + 1)
                .map((n) => {
                  const ratio = n / numStops
                  const lab = culori.formatHex({
                    ...value,
                    [channel]: min + ratio * (max - min),
                  })
                  return `${lab} ${ratio * 100}%`
                })
                .join(', ')})`,
            },
          }}
        />
      }
      thumb={
        <div
          sx={{
            position: 'absolute',
            inset: 0,
            ...withFallback(
              culori.formatCss({ ...value, alpha: 1 }),
              (color) => ({
                backgroundColor: color,
              })
            ),
          }}
        />
      }
    />
  )
}

function AlphaSlider({ value, onChange }: InternalProps) {
  const opaqueValue = culori.formatCss({ ...value, alpha: 1 })
  return (
    <ColorSlider
      value={value.alpha ?? 1}
      onValueChange={(alpha) => onChange({ ...value, alpha })}
      min={0}
      max={1}
      step={0.01}
      track={
        <>
          <Checkerboard sx={{ position: 'absolute', inset: 0 }} />
          <div
            sx={{
              position: 'absolute',
              inset: 0,
              ...withFallback(opaqueValue, (color) => ({
                background: `linear-gradient(to right, rgba(0%,0%,0%,0%) 0%, ${color})`,
              })),
            }}
          />
        </>
      }
      thumb={
        <>
          <Checkerboard sx={{ position: 'absolute', inset: 0 }} />
          <div
            sx={{
              position: 'absolute',
              inset: 0,
              ...withFallback(culori.formatCss(value), (color) => ({
                backgroundColor: color,
              })),
            }}
          />
        </>
      }
    />
  )
}
