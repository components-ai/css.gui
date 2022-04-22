import * as React from 'react'
import { getPropertyData } from '../../data/properties'
import {
  AbsoluteLengthUnits,
  CSSUnitValue,
  KeywordUnits,
  FullLengthUnit,
  Length,
  ThemeUnits,
  UnitlessUnits,
} from '../../types/css'
import { Label, Number, UnitSelect, ValueSelect } from '../primitives'
import { reducer } from './reducer'
import { State } from './types'
import { useThemeProperty } from '../providers/ThemeContext'

type UnitRanges = Record<string, [number, number]>

export type LengthInputProps = {
  value: Length
  label?: string
  property?: string
  onChange: (length: Length) => void
  range?: UnitRanges
}
export const LengthInput = ({
  value: providedValue,
  onChange,
  label,
  property,
  range,
}: LengthInputProps) => {
  const id = React.useId()
  const fullId = `${id}-${property || 'length'}`
  const value: CSSUnitValue =
    providedValue === '0' ? { value: 0, unit: 'number' } : providedValue
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
      const newValue: Length = {
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
            values={getPropertyData(property)?.keywords ?? []}
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
        value={state.themeId ? ThemeUnits.Theme : state.unit}
        property={property}
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
              value: getPropertyData(property)?.keywords[0]!,
            })
          }

          dispatch({
            type: 'CHANGED_UNIT_VALUE',
            unit: newUnit,
          })
        }}
        sx={{ marginLeft: 1, minHeight: '1.6em', width: 72 }}
      />
    </div>
  )
}
