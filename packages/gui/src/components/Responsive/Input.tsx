import * as React from 'react'
import { ToggleRight, ToggleLeft } from 'react-feather'
import { Breakpoint } from '../../types/theme'
import { useTheme } from '../providers/ThemeContext'
import { Label } from '../primitives'
import { useEditorConfig } from '../providers/EditorConfigContext'
import { DeletePropButton } from '../inputs/Dimension/Input'
import { omit } from 'lodash-es'

const DEFAULT_BREAKPOINT_COUNT = 3

export type Responsive<T> = T | T[]
type ResponsiveInputProps<T> = {
  value?: Responsive<T>
  onChange: (newValue: Responsive<T>) => void
  onRemove?: () => void
  label: string
  property?: string
  defaultValue?: T
  // TODO: Type this component
  Component: React.ComponentType<any>
  componentProps?: any
}
export function ResponsiveInput<T>({
  value,
  onChange,
  onRemove,
  label,
  Component,
  componentProps = {},
  property,
}: ResponsiveInputProps<T>) {
  const { theme } = useTheme()
  const breakpoints = theme.breakpoints
  const breakpointCount = breakpoints?.length || DEFAULT_BREAKPOINT_COUNT

  const handleResponsiveChange =
    (breakpointIndex: number) => (newItemValue: Responsive<T>) => {
      const newValue: any[] = Array.isArray(value) ? [...value] : []
      newValue[breakpointIndex] = newItemValue
      onChange(newValue)
    }

  const handleChange = (newItemValue: Responsive<T>) => {
    onChange(newItemValue)
  }

  const handleSwitchToResponsive = () => {
    const newValue: any[] = Array(breakpointCount).fill(value ?? null)
    onChange(newValue)
  }

  const handleSwitchFromResponsive = () => {
    const newValue: Responsive<T> = Array.isArray(value) ? value[0] : value!
    onChange(newValue)
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
      {...omit(componentProps, ['label', 'value', 'onChange', 'onRemove'])}
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
          <div sx={{ display: 'flex' }}>
            <ResponsiveToggle
              isResponsive={isResponsiveControls}
              onSwitchFromResponsive={handleSwitchFromResponsive}
              onSwitchToResponsive={handleSwitchToResponsive}
            />
            {onRemove ? <DeletePropButton onRemove={onRemove} /> : null}
          </div>
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
      sx={{
        all: 'unset',
        color: 'muted',
        display: 'flex',
        alignItems: 'center',
        gap: '.5em',
        cursor: 'pointer',
        mr: 2,
      }}
      onClick={onSwitchFromResponsive}
    >
      Responsive{' '}
      <ToggleRight size={16} strokeWidth={2} sx={{ color: 'text' }} />
    </button>
  ) : (
    <button
      title="Switch to responsive controls"
      sx={{
        all: 'unset',
        cursor: 'pointer',
        color: 'muted',
        display: 'flex',
        alignItems: 'center',
        gap: '.5em',
        mr: 2,
      }}
      onClick={onSwitchToResponsive}
    >
      Responsive <ToggleLeft size={16} strokeWidth={2} />
    </button>
  )
}
