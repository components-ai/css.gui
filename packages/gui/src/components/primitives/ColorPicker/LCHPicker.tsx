import * as culori from 'culori'
import Checkerboard from './Checkerboard'
import ColorSlider from './ColorSlider'
import { useEffect, useState } from 'react'
import { isValidColor, format, withFallback } from './util'
import { range } from 'lodash-es'
import { Color } from '../../../types/css'

interface LchValue {
  l: number
  c: number
  h: number
  alpha?: number
}

interface Props {
  value: Color
  onChange(value: Color): void
  mode: string
}

interface InternalProps {
  value: LchValue
  onChange(value: LchValue): void
}

/**
 * A 'standard' color picker based on the HSV color space.
 */
export default function LchColorPicker({ value, onChange, mode }: Props) {
  const [lchValue, setLchValue] = useState<LchValue>(culori.lch(value))

  const handleChange = (value: LchValue) => {
    setLchValue(value)
    onChange(format(value, mode))
  }

  useEffect(() => {
    if (isValidColor(value) && value !== format(lchValue, mode)) {
      setLchValue(culori.lch(value))
    }
  }, [value])

  return (
    <div sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <LchSlider
        channel="l"
        range={[0, 100]}
        value={lchValue}
        onChange={handleChange}
      />
      <LchSlider
        channel="c"
        range={[0, 132]}
        value={lchValue}
        onChange={handleChange}
      />
      <LchSlider
        channel="h"
        numStops={24}
        range={[0, 360]}
        value={lchValue}
        onChange={handleChange}
      />
      <AlphaSlider value={lchValue} onChange={handleChange} />
    </div>
  )
}

interface SliderProps {
  channel: keyof LchValue
  range: [number, number]
  numStops?: number
  value: LchValue
  onChange(value: LchValue): void
}

// A general LCH slider that can be used
function LchSlider({
  channel,
  range: [min, max],
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
      track={
        <div
          sx={{
            position: 'absolute',
            inset: 0,
            // Traverse all main color points in even intervals
            background: `linear-gradient(to right, ${range(numStops + 1)
              .map((n) => {
                const ratio = n / numStops
                const lch = culori.formatCss({
                  ...value,
                  [channel]: min + ratio * (max - min),
                })
                return `${lch} ${ratio * 100}%`
              })
              .join(', ')})`,
            '@supports not (color: lch(0% 0 0))': {
              background: `linear-gradient(to right, ${range(numStops + 1)
                .map((n: number) => {
                  const ratio = n / numStops
                  const lch = culori.formatHex({
                    ...value,
                    [channel]: min + ratio * (max - min),
                  })
                  return `${lch} ${ratio * 100}%`
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
