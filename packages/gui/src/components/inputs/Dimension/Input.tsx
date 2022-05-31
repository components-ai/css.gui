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
import {
  Label,
  Number,
  ThemeValue,
  UnitSelect,
  ValueSelect,
} from '../../primitives'
import { reducer } from './reducer'
import { State } from './types'
import { EditorProps, EditorPropsWithLabel } from '../../../types/editor'
import { UnitConversions } from '../../../lib/convert'
import { compact, kebabCase } from 'lodash-es'
import { CalcInput } from '../../primitives/CalcInput'
import { X } from 'react-feather'
import { isCSSUnitValue } from '../../../lib/codegen/to-css-object'
import { GLOBAL_KEYWORDS } from '../../../data/global-keywords'

// Mapping of units to [min, max] tuple
type UnitRanges = Record<string, [min: number, max: number]>
// Mapping of units to steps
type UnitSteps = Record<string, number>

const getInitialState = (
  value: Dimension,
  themeValues?: (CSSUnitValue & { id: string })[],
  units?: readonly string[]
): State => {
  const defaultState = {
    value: (value as CSSUnitValue)?.value || 0,
    unit:
      (value as CSSUnitValue)?.unit ||
      (units && units[0]) ||
      AbsoluteLengthUnits.Px,
    themeId: (value as CSSUnitValue)?.themeId,
    key: 0,
  }

  for (const { unit, value: themeValue, id } of themeValues || []) {
    if (
      isCSSUnitValue(value) &&
      unit === value.unit &&
      themeValue === value.value
    ) {
      return {
        value: themeValue,
        unit,
        themeId: id,
        key: 0,
      }
    }
  }

  return defaultState
}

export interface DimensionInputProps extends EditorPropsWithLabel<Dimension> {
  range?: UnitRanges
  steps?: UnitSteps
  units?: readonly string[]
  /** The available keyword values for the property. If provided, 'keyword' will be appended as a unit */
  keywords?: string[]
  /** The available theme values for the property. If provided, 'theme' will be appended as a unit */
  themeValues?: (CSSUnitValue & { id: string })[]
  conversions?: UnitConversions
  property?: string
}
export const DimensionInput = ({
  value,
  onChange,
  onRemove,
  label,
  range,
  units = [],
  keywords = [],
  themeValues = [],
  steps,
  conversions = {},
  topLevel,
  property,
}: DimensionInputProps) => {
  const id = `${React.useId()}-${kebabCase(label)}`

  const [state, dispatch] = React.useReducer(
    reducer,
    getInitialState(value, themeValues, units)
  )

  React.useEffect(() => {
    if ((value as CSSFunctionCalc)?.type === 'calc') return
    const unitValue = value as CSSUnitValue
    if (
      // Only want to call on change when the value differs
      state.value !== unitValue?.value ||
      state.unit !== unitValue?.unit ||
      state.themeId !== unitValue?.themeId
    ) {
      const newValue: CSSUnitValue = {
        value: state.value,
        unit: state.unit,
      }
      if (state.themeId) {
        newValue.themeId = state.themeId
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
    <div
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        width: 'min-content',
      }}
    >
      {label && (
        <Label htmlFor={id} sx={{ display: 'block', width: 'max-content' }}>
          {label}
        </Label>
      )}
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
          <ValueSelect
            value={`${state.value}`}
            values={topLevel ? [...keywords, ...GLOBAL_KEYWORDS] : keywords}
            onChange={(value) => {
              dispatch({
                type: 'CHANGED_INPUT_VALUE',
                value,
              })
            }}
          />
        ) : state.themeId ? (
          <ThemeValue
            value={themeValues.findIndex((tv) => tv.id === state.themeId) + 1}
            onChange={(newValue: number) => {
              const themeValue = themeValues[Math.max(0, newValue - 1)]
              dispatch({
                type: 'CHANGED_INPUT_TO_THEME_VALUE',
                value: themeValue?.value ?? 0,
                unit: (themeValue?.unit as any) ?? 'px',
                themeId: themeValue.id,
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
          value={state.themeId ? ThemeUnits.Theme : state.unit}
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
                themeId: themeValue?.id,
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
      {onRemove && <DeletePropButton onRemove={onRemove} />}
    </div>
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
