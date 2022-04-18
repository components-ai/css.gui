import * as culori from 'culori'
import { InputHTMLAttributes } from 'react'
import { round } from './util'

type Color = string

interface Props {
  value: Color
  onChange(value: Color): void
}

export default function ChannelFields(props: Props & { mode: string }) {
  return (
    <div sx={{ display: 'flex', gap: 2, mb: 2 }}>
      <PropertyFields {...props} />
    </div>
  )
}

// text/number inputs for individual channels
export function PropertyFields({
  mode,
  value,
  onChange,
}: Props & { mode: string }) {
  console.log(HexInput)
  switch (mode) {
    case 'hex':
      return <HexInput value={value} onChange={onChange} />
    case 'rgb':
      return <RgbInput value={value} onChange={onChange} />
    case 'hsl':
      return <HslInput value={value} onChange={onChange} />
    case 'lab':
      return <LabInput value={value} onChange={onChange} />
    case 'lch':
      return <LchInput value={value} onChange={onChange} />
    case 'p3':
      return <P3Input value={value} onChange={onChange} />
  }
  return <div />
}

function HexInput({ value, onChange }: Props) {
  const hex = culori.formatHex8(value).slice(1)
  const vals = {
    r: hex.slice(0, 2),
    g: hex.slice(2, 4),
    b: hex.slice(4, 6),
    a: hex.slice(6, 8),
  } as any
  return (
    <>
      {['r', 'g', 'b', 'a'].map((field) => {
        return (
          <ChannelField
            key={field}
            label={field.toUpperCase()}
            type="text"
            maxLength={2}
            value={vals[field]}
            onChange={(e) => onChange(`${vals.r}${vals.g}${vals.b}${vals.a}`)}
          />
        )
      })}
    </>
  )
}

function RgbInput({ value, onChange }: Props) {
  const rgba = culori.rgb(value)
  return (
    <>
      {['r', 'g', 'b'].map((field) => {
        return (
          <ChannelField
            key={field}
            label={field.toUpperCase()}
            type="number"
            value={Math.round(rgba[field] * 255)}
            onChange={(e) =>
              onChange(
                culori.formatRgb({ ...rgba, [field]: +e.target.value / 255 })
              )
            }
          />
        )
      })}
      <ChannelField
        label="A"
        type="number"
        value={rgba.alpha ?? 1}
        step={0.01}
        onChange={(e) =>
          onChange(culori.formatRgb({ ...rgba, alpha: +e.target.value }))
        }
      />
    </>
  )
}

function LabInput({ value, onChange }: Props) {
  const lab = culori.lab(value)
  return (
    <>
      <ChannelField
        label="L"
        type="number"
        value={round(lab.l ?? 1, 2)}
        onChange={(e) =>
          onChange(culori.formatCss({ ...lab, alpha: +e.target.value }))
        }
      />
      {['a', 'b', 'alpha'].map((field) => {
        return (
          <ChannelField
            key={field}
            label={field === 'alpha' ? 'A' : field}
            type="number"
            value={round(lab[field], 2)}
            step={0.01}
            onChange={(e) =>
              onChange(culori.formatCss({ ...lab, [field]: +e.target.value }))
            }
          />
        )
      })}
    </>
  )
}

function LchInput({ value, onChange }: Props) {
  const lch = culori.lch(value)
  return (
    <>
      {['l', 'c', 'h'].map((field) => {
        return (
          <ChannelField
            key={field}
            label={field.toUpperCase()}
            type="number"
            value={Math.round(lch[field])}
            onChange={(e) =>
              onChange(culori.formatCss({ ...lch, [field]: +e.target.value }))
            }
          />
        )
      })}
      <ChannelField
        label="A"
        type="number"
        value={round(lch.alpha ?? 1, 4)}
        step={0.01}
        onChange={(e) =>
          onChange(culori.formatCss({ ...lch, alpha: +e.target.value }))
        }
      />
    </>
  )
}

function HslInput({ value, onChange }: Props) {
  const hsla = culori.hsl(value)
  return (
    <>
      <ChannelField
        label="H"
        type="number"
        value={round(hsla.h, 2)}
        onChange={(e) =>
          onChange(culori.formatHsl({ ...hsla, h: +e.target.value }))
        }
      />
      {['s', 'l'].map((field) => {
        return (
          <ChannelField
            key={field}
            label={field.toUpperCase()}
            type="number"
            value={round(hsla[field] * 100, 2)}
            step={0.01}
            onChange={(e) =>
              onChange(
                culori.formatHsl({ ...hsla, [field]: +e.target.value / 100 })
              )
            }
          />
        )
      })}
      <ChannelField
        label="A"
        type="number"
        value={round(hsla.alpha ?? 1, 4)}
        step={0.01}
        onChange={(e) =>
          onChange(culori.formatHsl({ ...hsla, alpha: +e.target.value }))
        }
      />
    </>
  )
}

function P3Input({ value, onChange }: Props) {
  const p3 = culori.p3(value)
  return (
    <>
      {['r', 'g', 'b'].map((field) => {
        return (
          <ChannelField
            key={field}
            label={field.toUpperCase()}
            type="number"
            value={p3[field]}
            step={0.01}
            onChange={(e) =>
              onChange(culori.formatCss({ ...p3, [field]: +e.target.value }))
            }
          />
        )
      })}
      <ChannelField
        label="A"
        type="number"
        value={p3.alpha ?? 1}
        step={0.01}
        onChange={(e) =>
          onChange(culori.formatCss({ ...p3, alpha: +e.target.value }))
        }
      />
    </>
  )
}

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

function ChannelField({ label, ...props }: FieldProps) {
  return (
    <label style={{ display: 'flex', gap: 1, alignItems: 'center' }}>
      <span style={{ fontSize: 14, fontWeight: 600 }}>{label}</span>
      <input
        sx={{
          width: '100%',
          appearance: 'none',
          WebkitAppearance: 'none',
          MozAppearance: 'textfield',
          backgroundColor: 'background',
          color: 'text',
          border: '1px solid',
          borderColor: 'border',
          padding: 1,
        }}
        {...props}
      />
    </label>
  )
}
