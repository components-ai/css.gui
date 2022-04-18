import * as React from 'react'
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
}
export const ResponsiveInput = ({
  value,
  onChange,
  label,
  Component,
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
      .map((_breakpoint: Breakpoint, i: number) => {
        return (
          <Component
            value={value[i] ?? null}
            onChange={handleResponsiveChange(i)}
            label={i.toString()}
            property={property}
          />
        )
      })
  ) : (
    <Component
      value={value}
      onChange={handleChange}
      label="All"
      property={property}
    />
  )

  return (
    <div style={{ border: 'thin solid #ccc' }}>
      <h3 style={{ lineHeight: 1, padding: 0, margin: 0, fontSize: 16 }}>
        {label}
        {isResponsiveControls ? (
          <button onClick={handleSwitchFromResponsive}>x</button>
        ) : (
          <button onClick={handleSwitchToResponsive}>responsive</button>
        )}
      </h3>
      {editors}
    </div>
  )
}
