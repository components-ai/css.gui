import * as React from 'react'
import {
  AbsoluteLengthUnits,
  CalcOperand,
  CSSFunctionCalc,
  CSSUnitValue,
  Dimension,
  KeywordUnits,
  ThemeUnits,
  UnitlessUnits,
} from '../../../types/css'
import { Number, ThemeValue, UnitSelect } from '../../primitives'
import { reducer } from './reducer'
import { State } from './types'
import { EditorPropsWithLabel } from '../../../types/editor'
import { UnitConversions } from '../../../lib/convert'
import { compact, kebabCase } from 'lodash-es'
import { CalcInput } from '../../primitives/CalcInput'
import { X } from 'react-feather'
import { isCSSUnitValue } from '../../../lib/codegen/to-css-object'
import { KeywordSelect } from '../../primitives/KeywordSelect'
import { InputHeader } from '../../ui/InputHeader'
import { useThemeProperty } from '../../providers/ThemeContext'

// Mapping of units to [min, max] tuple
type UnitRanges = Record<string, [min: number, max: number]>
export type Range = UnitRanges | 'nonnegative'
// Mapping of units to steps
type UnitSteps = Record<string, number>

const getInitialState = (
  value: Dimension,
  themeValues?: (CSSUnitValue & { id: string })[],
  themeProp?: string,
  units?: readonly string[]
): State => {
  const defaultState = {
    value: (value as CSSUnitValue)?.value || 0,
    unit:
      (value as CSSUnitValue)?.unit ||
      (units && units[0]) ||
      AbsoluteLengthUnits.Px,
    themePath: (value as CSSUnitValue)?.themePath,
    key: 0,
  }

  for (var i = 0; i < (themeValues?.length || []); i++) {
    //@ts-ignore
    const { unit, value: themeValue } = themeValues[i]
    if (
      isCSSUnitValue(value) &&
      unit === value.unit &&
      themeValue === value.value
    ) {
      return {
        value: themeValue,
        unit,
        themePath: `${themeProp}[${i}]`,
        key: 0,
      }
    }
  }

  return defaultState
}

export interface DimensionInputProps<K>
  extends EditorPropsWithLabel<Dimension, K> {
  range?: Range
  steps?: UnitSteps
  units?: readonly string[]
  /** The available keyword values for the property. If provided, 'keyword' will be appended as a unit */
  keywords?: K[]
  /** The available theme values for the property. If provided, 'theme' will be appended as a unit */
  themeValues?: (CSSUnitValue & { id: string })[]
  conversions?: UnitConversions
  property?: string
  themeProp?: string
}

export function DimensionInput<K extends string = never>(
  props: DimensionInputProps<K>
) {
  const {
    value,
    onChange,
    label,
    range: providedRange,
    units = [],
    keywords = [],
    themeValues: providedThemeValues = [],
    steps,
    conversions = {},
    topLevel,
    themeProp,
  } = props

  const themeValues = useThemeProperty(themeProp) || providedThemeValues
  const id = `${React.useId()}-${kebabCase(label)}`
  const range =
    providedRange === 'nonnegative' ? nonnegativeRange(units) : providedRange

  const [state, dispatch] = React.useReducer(
    reducer,
    getInitialState(value as any, themeValues, themeProp, units)
  )

  React.useEffect(() => {
    if ((value as CSSFunctionCalc)?.type === 'calc') return
    const unitValue = value as CSSUnitValue
    if (
      // Only want to call on change when the value differs
      state.value !== unitValue?.value ||
      state.unit !== unitValue?.unit ||
      state.themePath !== unitValue?.themePath
    ) {
      const newValue: CSSUnitValue = {
        value: state.value,
        unit: state.unit,
      }
      if (state.themePath) {
        newValue.themePath = state.themePath
      }
      onChange(newValue)
    }
  }, [state])

  const allUnits = compact([
    themeValues.length > 0 && 'theme',
    ...units,
    keywords.length > 0 && 'keyword',
    UnitlessUnits.Calc,
  ])

  return (
    <InputHeader {...props}>
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
        {state.unit === KeywordUnits.Keyword ? (
          <KeywordSelect
            hideIcon
            value={`${state.value}`}
            options={keywords}
            topLevel={topLevel}
            onChange={(value) => {
              dispatch({
                type: 'CHANGED_INPUT_VALUE',
                value,
              })
            }}
          />
        ) : state.themePath ? (
          <ThemeValue
            value={themeValues.findIndex((tv) => tv.id === state.themePath) + 1}
            onChange={(newValue: number) => {
              const idx = Math.max(0, newValue - 1)
              const themeValue = themeValues[idx]
              dispatch({
                type: 'CHANGED_INPUT_TO_THEME_VALUE',
                value: themeValue?.value ?? 0,
                unit: (themeValue?.unit as any) ?? 'px',
                themePath: `${themeProp}[${idx}]`,
              })
            }}
            themeValues={themeValues}
          />
        ) : state.unit === UnitlessUnits.Calc ? (
          <CalcInput
            units={allUnits}
            onChange={onChange}
            //@ts-ignore
            value={value}
            label={label}
            steps={steps}
            range={range}
            conversions={conversions}
            themeValues={themeValues}
          />
        ) : (
          <Number
            id={id}
            key={state.key}
            value={state.value}
            step={steps?.[state.unit]}
            min={range?.[state.unit]?.[0]}
            max={range?.[state.unit]?.[1]}
            onChange={(newValue: number) => {
              dispatch({
                type: 'CHANGED_INPUT_VALUE',
                value: newValue,
              })
            }}
          />
        )}
        <UnitSelect
          units={allUnits}
          value={state.themePath ? ThemeUnits.Theme : state.unit}
          onChange={(newUnit) => {
            if (newUnit === KeywordUnits.Keyword) {
              dispatch({
                type: 'CHANGED_INPUT_VALUE',
                value: keywords[0],
              })
            }

            if (newUnit === UnitlessUnits.Calc) {
              onChange({
                arguments: {
                  valueX: value as CSSUnitValue,
                  valueY: { value: 1, unit: 'px' },
                  operand: CalcOperand.Plus,
                },
                type: 'calc',
              })
            }
            if (
              state.unit === UnitlessUnits.Calc &&
              newUnit !== UnitlessUnits.Calc
            ) {
              const unitValue = (value as CSSFunctionCalc).arguments.valueX
                .value

              onChange({ value: unitValue, unit: newUnit })
              dispatch({
                value: unitValue,
                type: 'CHANGED_INPUT_VALUE',
              })
            }

            if (newUnit === ThemeUnits.Theme) {
              const themeValue = themeValues?.[0]
              return dispatch({
                type: 'CHANGED_INPUT_TO_THEME_VALUE',
                value: themeValue?.value ?? 0,
                unit: (themeValue?.unit as any) ?? 'px',
                themePath: `${themeProp}.${0}`,
              })
            }

            dispatch({
              type: 'CHANGED_UNIT_VALUE',
              unit: newUnit,
              steps: steps,
              conversions,
            })
          }}
        />
      </div>
    </InputHeader>
  )
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

function nonnegativeRange(units: readonly string[]): UnitRanges {
  return Object.fromEntries(units.map((unit) => [unit, [0, Infinity]]))
}
