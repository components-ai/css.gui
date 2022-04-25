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

type UnitRanges = Record<string, [number, number]>

export interface DimensionInputProps extends EditorProps<CSSUnitValue> {
  label?: string
  property?: string
  range?: UnitRanges
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
  conversions = {},
}: DimensionInputProps) => {
  const id = React.useId()
  const fullId = `${id}-${property || 'length'}`
  const [state, dispatch] = React.useReducer(reducer, {
    value: value?.value || AbsoluteLengthUnits.Px,
    unit: value?.unit || 0,
    themeId: value?.themeId,
    key: 0,
    step: 1,
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
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <div
        sx={{
          display: 'flex',
          flexGrow: 1,
          alignItems: 'center',
          marginRight: 'auto',
        }}
      >
        <Label htmlFor={fullId} sx={{ marginRight: 1, minWidth: 16 }}>
          {label ?? 'Number'}
        </Label>

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
              step={state.step}
              min={range?.[state.unit]?.[0]}
              max={range?.[state.unit]?.[1]}
              property={property}
              onChange={(newValue: number) => {
                dispatch({
                  type: 'CHANGED_INPUT_VALUE',
                  value: newValue,
                })
              }}
            />
          )}
      </div>
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
            conversions,
          })
        }}
        sx={{ marginLeft: 1, minHeight: '1.6em', width: 72 }}
      />
    </div>
  )
}
