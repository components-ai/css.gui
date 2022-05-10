import * as React from 'react'
import { Monitor, Smartphone, X } from 'react-feather'
import { AbsoluteLengthUnits, Length, ResponsiveLength } from '../../types/css'
import { Breakpoint } from '../../types/theme'
import { useTheme } from '../providers/ThemeContext'
import { Label } from '../primitives'
import { useEditorConfig } from '../providers/EditorConfigContext'

const DEFAULT_BREAKPOINT_COUNT = 3
// TODO: Base this on the type of property
const DEFAULT_LENGTH: Length = { value: 0, unit: AbsoluteLengthUnits.Px }

export type Responsive<T> = T | T[]
type ResponsiveInputProps<T> = {
  value?: Responsive<T>
  onChange: (newValue: Responsive<T>) => void
  label: string
  property?: string
  // TODO: Type this component
  Component: React.ComponentType<any>
  componentProps?: any
}
export function ResponsiveInput<T>({
  value,
  onChange,
  label,
  Component,
  componentProps = {},
  property,
}: ResponsiveInputProps<T>) {
  const { breakpoints } = useTheme()
  const breakpointCount = breakpoints?.length || DEFAULT_BREAKPOINT_COUNT

  const handleResponsiveChange =
    (breakpointIndex: number) => (newItemValue: Length) => {
      const newValue: any[] = Array.isArray(value) ? [...value] : []
      newValue[breakpointIndex] = newItemValue
      onChange(newValue)
    }

  const handleChange = (newItemValue: Length) => {
    onChange(newItemValue)
  }

  const handleSwitchToResponsive = () => {
    const newValue: any[] = Array(breakpointCount).fill(value ?? null)
    onChange(newValue)
  }

  const handleSwitchFromResponsive = () => {
    const newValue: ResponsiveInputValueType | undefined = Array.isArray(value)
      ? value[0]
      : value
    onChange(newValue ?? DEFAULT_LENGTH)
  }

  const isResponsiveControls = Array.isArray(value)

  const editors = isResponsiveControls ? (
    Array(breakpointCount)
      .fill(null)
      .map((_breakpoint: Breakpoint, i: number) => {
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
      property={property}
      {...componentProps}
    />
  )

  return (
    <div>
      <Label
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
          <span>{label}</span>
          <ResponsiveToggle
            isResponsive={isResponsiveControls}
            onSwitchFromResponsive={handleSwitchFromResponsive}
            onSwitchToResponsive={handleSwitchToResponsive}
          />
        </div>
      </Label>
      {editors}
    </div>
  )
}

type ResponsiveToggleProps = {
  isResponsive: boolean
  onSwitchFromResponsive: () => void
  onSwitchToResponsive: () => void
}
const ResponsiveToggle = ({
  isResponsive,
  onSwitchFromResponsive,
  onSwitchToResponsive,
}: ResponsiveToggleProps) => {
  const { hideResponsiveControls } = useEditorConfig()

  if (hideResponsiveControls) {
    return null
  }

  return isResponsive ? (
    <button
      title="Remove responsive controls"
      sx={{ all: 'unset', color: 'muted' }}
      onClick={onSwitchFromResponsive}
    >
      <X size={14} sx={{ position: 'relative', top: '1px' }} />
    </button>
  ) : (
    <button
      title="Switch to responsive controls"
      sx={{ all: 'unset', color: 'muted' }}
      onClick={onSwitchToResponsive}
    >
      <Smartphone
        size={8}
        sx={{ position: 'relative', right: '-1px', top: '-1px' }}
      />
      <Monitor size={13} />
    </button>
  )
}
