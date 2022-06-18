import * as culori from 'culori'
import Checkerboard from './Checkerboard'
import ColorSlider from './ColorSlider'
import ColorArea from './ColorArea'
import { useEffect, useState } from 'react'
import { isValidColor, format } from './util'
import { Color } from '../../../types/css'

interface HsvValue {
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
export default function HsvColorPicker({ value, onChange, mode }: Props) {
  const [hsvValue, setHsvValue] = useState<HsvValue>(culori.hsv(value))

  const handleChange = (value: HsvValue) => {
    setHsvValue(value)
    onChange(format(value, mode))
  }

  useEffect(() => {
    if (isValidColor(value) && value !== format(hsvValue, mode)) {
      setHsvValue(culori.hsv(value))
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
  const fullValue = culori.formatHex({ ...value, s: 1, v: 1, alpha: 1 })
  return (
    <ColorArea
      value={[s, 1 - v]}
      onChange={([x, y]) => {
        onChange({ ...value, s: x, v: 1 - y })
      }}
      track={
        <div
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundColor: fullValue,
            backgroundImage:
              'linear-gradient(to top, black 0%, transparent 100%),linear-gradient(to right, white 0%, transparent 100%)',
          }}
        />
      }
      thumb={
        <div
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundColor: culori.formatHex(value),
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
            backgroundColor: culori.formatHex({
              mode: 'hsv',
              h: value,
              s: 1,
              v: 1,
            }),
          }}
        />
      }
    />
  )
}

function AlphaSlider({ value, onChange }: InternalProps) {
  const opaqueValue = culori.formatHex({ ...value, alpha: 1 })
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
              background: `linear-gradient(to right, rgba(0%,0%,0%,0%) 0%, ${opaqueValue})`,
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
              backgroundColor: culori.formatHex8(value),
            }}
          />
        </>
      }
    />
  )
}
