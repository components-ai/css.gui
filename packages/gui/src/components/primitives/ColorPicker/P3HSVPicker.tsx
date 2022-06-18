import * as culori from 'culori'
import { useEffect, useState } from 'react'
import Checkerboard from './Checkerboard'
import ColorSlider from './ColorSlider'
import ColorArea from './ColorArea'
import { range } from 'lodash-es'
import { isValidColor, format, withFallback } from './util'
import { Color } from '../../../types/css'

interface HsvValue {
  mode: 'hsv'
  h: number
  s: number
  v: number
  alpha?: number
}

interface Props {
  value: Color
  onChange(value: Color): void
  mode: string
}

interface InternalProps {
  value: HsvValue
  onChange(value: HsvValue): void
}

/**
 * A 'standard' color picker based on the HSV color space.
 */
export default function P3HsvColorPicker({ value, onChange, mode }: Props) {
  const [hsvValue, setHsvValue] = useState<HsvValue>(getP3Hsv(value))

  const handleChange = (value: HsvValue) => {
    setHsvValue(value)
    onChange(formatP3Picker(value, mode))
  }

  useEffect(() => {
    if (isValidColor(value) && value !== format(hsvValue, mode)) {
      setHsvValue(getP3Hsv(value))
    }
  }, [value])
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <SVPicker value={hsvValue} onChange={handleChange} />
      <HueSlider
        value={hsvValue.h}
        onChange={(h) => {
          handleChange({ ...hsvValue, h })
        }}
      />
      <AlphaSlider value={hsvValue} onChange={handleChange} />
    </div>
  )
}

function SVPicker({ value, onChange }: InternalProps) {
  const { h, s, v, alpha } = value
  const fullValue = formatP3({ ...value, s: 1, v: 1, alpha: 1 })
  return (
    <ColorArea
      value={[s, 1 - v]}
      onChange={([x, y]) => {
        onChange({ ...value, s: x, v: 1 - y })
      }}
      track={
        <>
          <div
            sx={{
              position: 'absolute',
              inset: 0,
              '@supports (color: color(display-p3 1 1 1))': {
                backgroundColor: fullValue,
                backgroundImage:
                  'linear-gradient(to top, color(display-p3 0 0 0) 0%, color(display-p3 0 0 0 / 0) 100%),linear-gradient(to right, color(display-p3 1 1 1) 0%, color(display-p3 0 0 0 / 0) 100%)',
              },
              backgroundColor: culori.formatHex(fullValue),
              backgroundImage:
                'linear-gradient(to top, black 0%, transparent 100%),linear-gradient(to right, white 0%, transparent 100%)',
            }}
          />
          <BoundaryOverlay hue={h} />
        </>
      }
      thumb={
        <div
          sx={{
            position: 'absolute',
            inset: 0,
            ...withFallback(formatP3(value), (color) => ({
              backgroundColor: color,
            })),
          }}
        />
      }
    />
  )
}

function HueSlider({
  value,
  onChange,
}: {
  value: number
  onChange: (val: number) => void
}) {
  return (
    <ColorSlider
      value={value}
      onValueChange={onChange}
      min={0}
      max={359}
      track={
        <div
          sx={{
            position: 'absolute',
            inset: 0,
            // Traverse all main color points in even intervals
            '@supports (color: color(display-p3 1 1 1))': {
              background:
                'linear-gradient(to right, color(display-p3 1 0 0) 0%, color(display-p3 1 1 0) 17%, color(display-p3 0 1 0) 33%, color(display-p3 0 1 1) 50%, color(display-p3 0 0 1) 67%, color(display-p3 1 0 1) 83%, color(display-p3 1 0 0) 100%)',
            },
            // Display fallback if P3 is not supported
            background:
              'linear-gradient(to right, red 0%, yellow 17%, lime 33%, cyan 50%, blue 67%, magenta 83%, red 100%)',
          }}
        />
      }
      thumb={
        <div
          sx={{
            position: 'absolute',
            inset: 0,
            ...withFallback(
              formatP3({
                mode: 'hsv',
                h: value,
                s: 1,
                v: 1,
              }),
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
  const opaqueValue = formatP3({ ...value, alpha: 1 })
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
                background: `linear-gradient(to right, transparent 0%, ${color})`,
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
              ...withFallback(formatP3(value), (color) => ({
                backgroundColor: color,
              })),
            }}
          />
        </>
      }
    />
  )
}

function formatP3(value: HsvValue) {
  const srgb = culori.rgb(value)
  return culori.formatCss({ ...srgb, mode: 'p3' })
}

function BoundaryOverlay({ hue }: { hue: number }) {
  const points = getBorderPoints(hue)
  return (
    <svg viewBox="0 0 1 1" sx={{ position: 'absolute', inset: 0 }}>
      <polyline
        points={points.map(([x, y]: number[]) => `${x},${1 - y}`).join(' ')}
        sx={{ stroke: 'white', strokeWidth: 0.0025, fill: 'none' }}
      />
    </svg>
  )
}

function getBorderPoints(hue: number) {
  return getSaturationPoints(hue).concat(getValuePoints(hue))
}

function getSaturationPoints(hue: number) {
  return range(0, 1, 0.01).map((sat: number) => {
    const srgb = { mode: 'hsv', h: hue, s: sat, v: 1 }
    const { r, g, b } = culori.p3(srgb)
    const { s, v } = culori.hsv({ mode: 'rgb', r, g, b })
    return [s, v]
  })
}
function getValuePoints(hue: number) {
  return range(1, 0, -0.01).map((value: number) => {
    const srgb = { mode: 'hsv', h: hue, s: 1, v: value }
    const { r, g, b } = culori.p3(srgb)
    const { s, v } = culori.hsv({ mode: 'rgb', r, g, b })
    return [s, v]
  })
}

// Get the internal value, storing the HSV coordinates
// mapped to P3 instead of sRGB
function getP3Hsv(value: string) {
  // convert the raw value to p3
  const p3 = culori.p3(value)
  // Treat the p3 value as sRGB and use that logic to calculate HSV
  return culori.hsv({ ...p3, mode: 'rgb' })
}

function formatP3Picker(value: HsvValue, mode: string) {
  // convert the P3 HSV back to P3
  const p3 = { ...culori.rgb(value), mode: 'p3' }
  // pass in the p3 value and format it to the desired mode
  return format(p3, mode)
}
