import * as React from 'react'
import {
  AbsoluteLengthUnits,
  CSSUnitValue,
  KeywordUnits,
  FullLengthUnit,
  ThemeUnits,
} from '../../types/css'
import { GLOBAL_KEYWORDS } from '../../data/global-keywords'
import { Label, Number, UnitSelect, ValueSelect } from '../primitives'
import { reducer } from './reducer'
import { State } from './types'
import { useThemeProperty } from '../providers/ThemeContext'
import { EditorProps } from '../editors/types'
import { UnitConversions } from '../../lib/convert'

// Mapping of units to [min, max] tuple
type UnitRanges = Record<string, [min: number, max: number]>
// Mapping of units to steps
type UnitSteps = Record<string, number>

export interface DimensionInputProps extends EditorProps<CSSUnitValue> {
  label?: string
  property?: string
  range?: UnitRanges
  steps?: UnitSteps
  keywords?: string[]
  units?: readonly string[]
  conversions?: UnitConversions
}
export const DimensionInput = ({
  value,
  onChange,
  label,
  property,
  range,
  keywords,
  units = [],
  steps,
  conversions = {},
}: DimensionInputProps) => {
  const id = React.useId()
  const fullId = `${id}-${property || 'length'}`
  const [state, dispatch] = React.useReducer(reducer, {
    value: value?.value || 0,
    unit: value?.unit || AbsoluteLengthUnits.Px,
    themeId: value?.themeId,
    key: 0,
  } as State)
  React.useEffect(() => {
    if (
      // Only want to call on change when the value differs
      state.value !== value?.value ||
      state.unit !== value?.unit ||
      state.themeId !== value?.themeId
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

  const propertyValues = useThemeProperty(property)
  const allKeywords = [...(keywords ?? []), ...GLOBAL_KEYWORDS]

  return (
    <div>
      {label &&
       <Label htmlFor={fullId} sx={{ display: 'block', }}>
         {label}
       </Label>
      }
      <div sx={{
        display: 'flex', 
        width: '100%',
        alignItems: 'center',
        }}>
        {state.unit === KeywordUnits.Keyword && (
          <ValueSelect
            values={allKeywords}
            onChange={(e: any) => {
              dispatch({
                type: 'CHANGED_INPUT_VALUE',
                value: e.target.value,
              })
            }}
          />
        )}
        {state.themeId && (
          <ValueSelect
            onChange={(e: any) => {
              const themeValue = propertyValues?.find(
                (p) => p.id === e.target.value
              )
              dispatch({
                type: 'CHANGED_INPUT_TO_THEME_VALUE',
                value: themeValue.value,
                unit: themeValue.unit,
                themeId: e.target.value,
              })
            }}
            values={propertyValues ?? []}
          />
        )}
        {state.unit !== ThemeUnits.Theme &&
          state.unit !== KeywordUnits.Keyword && (
            <Number
              id={fullId}
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
        units={units}
        value={state.themeId ? ThemeUnits.Theme : state.unit}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          const newUnit = e.target.value as FullLengthUnit

          if (newUnit === ThemeUnits.Theme) {
            const themeValue = propertyValues[0]
            return dispatch({
              type: 'CHANGED_INPUT_TO_THEME_VALUE',
              value: themeValue.value,
              unit: themeValue.unit,
              themeId: themeValue.id,
            })
          }

          if (newUnit === KeywordUnits.Keyword) {
            dispatch({
              type: 'CHANGED_INPUT_VALUE',
              value: allKeywords[0],
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
