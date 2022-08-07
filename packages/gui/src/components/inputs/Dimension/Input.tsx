import { CSSUnitValue, Dimension } from '../../../types/css'
import { Number, UnitSelect } from '../../primitives'
import { EditorPropsWithLabel } from '../../../types/editor'
import { UnitConversions } from '../../../lib/convert'
import { convertUnits } from '../../../lib/convert'
import { X } from 'react-feather'
import IconButton from '../../ui/IconButton'

// Mapping of units to [min, max] tuple
type UnitRanges = Record<string, [min: number, max: number]>
export type Range = UnitRanges | 'nonnegative'
// Mapping of units to steps
type UnitSteps = Record<string, number>

export interface DimensionInputProps extends EditorPropsWithLabel<Dimension> {
  range?: Range
  steps?: UnitSteps
  units?: readonly string[]
  conversions?: UnitConversions
}

export function DimensionInput(props: DimensionInputProps) {
  const {
    value = {},
    onChange,
    range: providedRange,
    units = [],
    steps,
    conversions = {},
  } = props

  const range =
    providedRange === 'nonnegative' ? nonnegativeRange(units) : providedRange

  const normedValue = value as CSSUnitValue

  const allUnits = units

  return (
    <div
      sx={{
        display: 'flex',
        alignItems: 'center',
        borderRadius: '0.25rem',
        border: '1px solid',
        borderColor: 'border',
        px: 2,
      }}
    >
      <Number
        value={normedValue.value}
        step={steps?.[normedValue.unit]}
        min={range?.[normedValue.unit]?.[0]}
        max={range?.[normedValue.unit]?.[1]}
        onChange={(newValue: number) => {
          onChange({
            ...normedValue,
            value: newValue,
          })
        }}
      />
      <UnitSelect
        units={allUnits}
        value={normedValue.unit}
        onChange={(newUnit) => {
          onChange({
            unit: newUnit,
            value: convertUnits(
              newUnit,
              normedValue,
              conversions,
              steps
            ) as any,
          })
        }}
      />
    </div>
  )
}

export function nonnegativeRange(units: readonly string[]): UnitRanges {
  return Object.fromEntries(units.map((unit) => [unit, [0, Infinity]]))
}
interface DeleteProps {
  onRemove(): void
}
export const DeletePropButton = ({ onRemove }: DeleteProps) => {
  return (
    <IconButton
      onClick={() => onRemove()}
    >
      <X size={16} strokeWidth={3} color="currentColor" />
    </IconButton>
  )
}
