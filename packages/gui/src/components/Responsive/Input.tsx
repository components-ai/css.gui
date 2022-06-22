import * as React from 'react'
import { ToggleRight, ToggleLeft } from 'react-feather'
import { Breakpoint } from '../../types/theme'
import { useTheme } from '../providers/ThemeContext'
import { Label } from '../primitives'
import { useEditorConfig } from '../providers/EditorConfigContext'
import { DeletePropButton } from '../inputs/Dimension/Input'
import { omit } from 'lodash-es'
import { replace } from '../../lib/array'
import { EditorProps } from '../../types/editor'
import { DataTypeSchema } from '../schemas/types'
import FieldArray from '../FieldArray'

const DEFAULT_BREAKPOINT_COUNT = 3

export type Responsive<T> = { type: 'responsive'; values: T[] }
type ResponsiveInputProps<T> = {
  value: Responsive<T>
  onChange: (newValue: Responsive<T>) => void
  itemSchema: DataTypeSchema<T>
}
export function ResponsiveInput<T>({
  value,
  onChange,
  itemSchema,
}: ResponsiveInputProps<T>) {
  return (
    <FieldArray
      label=""
      itemSchema={itemSchema}
      value={value.values}
      onChange={(newValues) => {
        onChange({ ...value, values: newValues })
      }}
    />
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

export function isResponsive<T>(value: Responsive<T>): value is Responsive<T> {
  if (value instanceof Object && value.type === 'responsive') {
    return true
  }
  return false
}
