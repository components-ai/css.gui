import * as React from 'react'
import {
  CalcOperand,
  CSSFunctionCalc,
  CSSUnitValue,
  Dimension,
} from '../../../types/css'
import { Number, ThemeValue, UnitSelect } from '../../primitives'
import { EditorPropsWithLabel } from '../../../types/editor'
import { UnitConversions } from '../../../lib/convert'
import { compact, kebabCase } from 'lodash-es'
import { CalcInput } from '../../primitives/CalcInput'
import { KeywordSelect } from '../../primitives/KeywordSelect'
import { InputHeader } from '../../ui/InputHeader'
import { useThemeProperty } from '../../providers/ThemeContext'
import { convertUnits } from '../../../lib/convert'
import { X } from 'react-feather'

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

// const getInitialValue = (
//   value: CSSUnitValue
//   themeProperty: string = '',
//   themeValues: any[]
// ): CSSUnitValue => {
//   for (var i = 0; i < (themeValues.length || []); i++) {
//     const themeValue = themeValues[i]
//     if (
//       isCSSUnitValue(value) &&
//       themeValue.unit === value.unit &&
//       themeValue.value === value.value &&
//       themeProperty
//     ) {
//       return {
//         value: themeValue.value,
//         unit: themeValue.unit,
//         themePath: `${themeProperty}.${i}`,
//       }
//     }
//   }
//   return value
// }

export function DimensionInput(props: DimensionInputProps) {
  const {
    value = {},
    onChange,
    // label,
    range: providedRange,
    units = [],
    // keywords = [],
    steps,
    conversions = {},
    // topLevel,
  } = props

  // const themeValues = useThemeProperty(themeProperty) || providedThemeValues

  // const id = `${React.useId()}-${kebabCase(label)}`
  const range =
    providedRange === 'nonnegative' ? nonnegativeRange(units) : providedRange

  const normedValue = value as CSSUnitValue
  // const normedValue = getInitialValue(
  //   value as CSSUnitValue,
  //   // themeProperty,
  //   // themeValues
  // )

  const allUnits = units

  // const allUnits = compact([
  //   themeValues.length > 0 && 'theme',
  //   ...units,
  //   keywords.length > 0 && 'keyword',
  //   'calc',
  // ])

  return (
    // <InputHeader {...props}>
    <div
      sx={{
        display: 'flex',
        alignItems: 'center',
        borderRadius: '0.25rem',
        border: '1px solid',
        borderColor: 'border',
        px: 1,
      }}
    >
      {/* {normedValue.unit === 'keyword' ? (
          <KeywordSelect
            hideIcon
            value={`${normedValue.value}`}
            options={keywords}
            topLevel={topLevel}
            onChange={(value) => {
              onChange({
                ...normedValue,
                value,
              })
            }}
          /> */}

      {/* // ) : normedValue.themePath ? (
        //   <ThemeValue
        //     value={parseInt(normedValue.themePath!.match(/[0-9]+/)![0]) + 1}
        //     onChange={(newValue: number) => {
        //       const idx = Math.max(0, newValue - 1)
        //       const themeValue = themeValues[idx]
        //       onChange({ ...themeValue, themePath: `${themeProperty}.${idx}` })
        //     }}
        //     themeValues={themeValues}
        //   />
        // ) : normedValue.unit === 'calc' ? (
        //   <CalcInput
        //     units={allUnits}
        //     onChange={onChange}
        //     //@ts-ignore
        //     value={value}
        //     label={label}
        //     steps={steps}
        //     range={range}
        //     conversions={conversions}
        //     themeValues={themeValues}
        //   />
        ) : ( */}
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
            value: convertUnits(newUnit, normedValue, conversions, steps),
          })
        }}
      />
    </div>
    // </InputHeader>
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
    <button
      sx={{
        cursor: 'pointer',
        appearance: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'right',
        p: 0,
        bg: 'rgba(0,0,0,0)',
        border: 0,
        color: 'muted',
        transition: '.2s color ease-in-out',
        ':hover': {
          color: 'text',
        },
      }}
      onClick={() => onRemove()}
    >
      <X size={14} strokeWidth={3} color="currentColor" />
    </button>
  )
}
