import * as React from 'react'
import { Monitor, Smartphone, X } from 'react-feather'
import { AbsoluteLengthUnits, Length, ResponsiveLength } from '../../types/css'
import { Breakpoint } from '../../types/theme'
import { LengthInputProps } from '../Length/Input'
import { useTheme } from '../providers/ThemeContext'

const DEFAULT_BREAKPOINT_COUNT = 3
// TODO: Base this on the type of property
const DEFAULT_LENGTH: Length = { value: 0, unit: AbsoluteLengthUnits.Px }

type ResponsiveInputProps = {
  value?: Length | ResponsiveLength
  onChange: (newValue: Length | ResponsiveLength) => void
  label: string
  property?: string
  // TODO: Type this component
  Component: React.ComponentType<LengthInputProps>
  componentProps?: any
}
export const ResponsiveInput = ({
  value,
  onChange,
  label,
  Component,
  componentProps = {},
  property,
}: ResponsiveInputProps) => {
  const { breakpoints } = useTheme()
  const breakpointCount = breakpoints?.length || DEFAULT_BREAKPOINT_COUNT

  const handleResponsiveChange =
    (breakpointIndex: number) => (newItemValue: Length) => {
      const newValue: ResponsiveLength = Array.isArray(value) ? [...value] : []
      newValue[breakpointIndex] = newItemValue
      onChange(newValue)
    }

  const handleChange = (newItemValue: Length) => {
    onChange(newItemValue)
  }

  const handleSwitchToResponsive = () => {
    const newValue: ResponsiveLength = Array(breakpointCount).fill(
      value ?? null
    )
    onChange(newValue)
  }

  const handleSwitchFromResponsive = () => {
    const newValue: Length | undefined = Array.isArray(value) ? value[0] : value
    onChange(newValue ?? DEFAULT_LENGTH)
  }

  const isResponsiveControls = Array.isArray(value)

  const editors = isResponsiveControls ? (
    Array(breakpointCount)
      .fill(null)
      .map((breakpoint: Breakpoint, i: number) => {
        return (
          <div key={breakpoints?.[i].id ?? i} sx={{ pb: 1 }}>
            <Component
              value={value[i] ?? null}
              onChange={handleResponsiveChange(i)}
              label={i.toString()}
              property={property}
              {...componentProps}
            />
          </div>
        )
      })
  ) : (
    <Component
      value={value}
      onChange={handleChange}
      label="All"
      property={property}
      {...componentProps}
    />
  )

  return (
    <div sx={{ py: 2 }}>
      <h3
        sx={{ lineHeight: 1, pb: 1, margin: 0, fontSize: 0, fontWeight: 500 }}
      >
        <div
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          {label}
          {isResponsiveControls ? (
            <button
              title="Remove responsive controls"
              sx={{ all: 'unset', color: 'muted' }}
              onClick={handleSwitchFromResponsive}
            >
              <X size={14} sx={{ position: 'relative', top: '1px' }} />
            </button>
          ) : (
            <button
              title="Switch to responsive controls"
              sx={{ all: 'unset', color: 'muted' }}
              onClick={handleSwitchToResponsive}
            >
              <Smartphone
                size={8}
                sx={{ position: 'relative', right: '-1px', top: '-1px' }}
              />
              <Monitor size={13} />
            </button>
          )}
        </div>
      </h3>
      {editors}
    </div>
  )
}
