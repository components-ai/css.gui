import * as React from 'react'
import {
  AbsoluteLengthUnits,
  CalcOperand,
  CSSFunctionCalc,
  CSSUnitValue,
  KeywordUnits,
  ThemeUnits,
  UnitlessUnits,
} from '../../../types/css'
import { Label, Number, UnitSelect, ValueSelect } from '../../primitives'
import { reducer } from './reducer'
import { State } from './types'
import { EditorProps } from '../../../types/editor'
import { UnitConversions } from '../../../lib/convert'
import { compact, kebabCase } from 'lodash-es'
import { CalcInput } from '../../primitives/CalcInput'

// Mapping of units to [min, max] tuple
type UnitRanges = Record<string, [min: number, max: number]>
// Mapping of units to steps
type UnitSteps = Record<string, number>

export interface DimensionInputProps extends EditorProps<CSSUnitValue | CSSFunctionCalc> {
  label?: string
  range?: UnitRanges
  steps?: UnitSteps
  units?: readonly string[]
  /** The available keyword values for the property. If provided, 'keyword' will be appended as a unit */
  keywords?: string[]
  /** The available theme values for the property. If provided, 'theme' will be appended as a unit */
  themeValues?: (CSSUnitValue & { id: string })[]
  conversions?: UnitConversions
}
export const DimensionInput = ({
  value,
  onChange,
  label,
  range,
  units = [],
  keywords = [],
  themeValues = [],
  steps,
  conversions = {},
}: DimensionInputProps) => {
  const id = `${React.useId()}-${kebabCase(label)}`
  const [state, dispatch] = React.useReducer(reducer, {
    value: (value as CSSUnitValue)?.value || 0,
    unit: (value as CSSUnitValue)?.unit || units[0] || AbsoluteLengthUnits.Px,
    themeId: (value as CSSUnitValue)?.themeId,
    key: 0,
  } as State)
  React.useEffect(() => {
    if ((value as CSSFunctionCalc).type === 'calc') return
    const unitValue = value as CSSUnitValue 
    if (
      // Only want to call on change when the value differs
      (state.value !== unitValue?.value ||
      state.unit !== unitValue?.unit ||
      state.themeId !== unitValue?.themeId)
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
    <div sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      {label && (
        <Label htmlFor={id} sx={{ display: 'block' }}>
          {label}
        </Label>
      )}
      <div
        sx={{
          display: 'flex',
          width: '100%',
          alignItems: 'center',
        }}
      >
        {state.unit === KeywordUnits.Keyword ? (
          <ValueSelect
            value={state.value}
            values={keywords}
            onChange={(e: any) => {
              dispatch({
                type: 'CHANGED_INPUT_VALUE',
                value: e.target.value,
              })
            }}
          />
        ) : state.themeId ? (
          <ValueSelect
            onChange={(e: any) => {
              const themeValue = themeValues?.find(
                (p) => p.id === e.target.value
              )
              dispatch({
                type: 'CHANGED_INPUT_TO_THEME_VALUE',
                value: themeValue?.value ?? 0,
                unit: (themeValue?.unit as any) ?? 'px',
                themeId: e.target.value,
              })
            }}
            values={themeValues ?? []}
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
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            const newUnit = e.target.value

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
                  operand: CalcOperand.Plus
                },
                type: 'calc'
              })
            }
            if (state.unit === UnitlessUnits.Calc && newUnit !== UnitlessUnits.Calc) {
              const unitValue = (value as CSSFunctionCalc).arguments.valueX.value
              
              onChange({ value: unitValue, unit: newUnit})
              dispatch({
                value: unitValue,
                type: 'CHANGED_INPUT_VALUE'
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
          sx={{ marginLeft: 1, minHeight: '1.6em', width: 72 }}
        />
      </div>
    </div>
  )
}
