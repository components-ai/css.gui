import * as React from 'react'
import { randomElementID } from '../../lib'
import {
  AbsoluteLengthUnits,
  CSSUnitValue,
  Length,
  LengthUnit,
  ThemeUnits,
} from '../../types/css'
import { Label, Number, UnitSelect } from '../primitives'
import { reducer } from './reducer'
import { State } from './types'
import { useTheme, useThemeProperty } from '../providers/ThemeContext'
import { Theme } from '../../types/theme'

const themeValuesForProperty = (property: string, theme: Theme): any[] => {
  switch (property) {
    case 'fontSize':
      return theme.fontSizes || []
    case 'lineHeight':
      return theme.lineHeights || []
    default:
      return []
  }
}
export type LengthInputProps = {
  value: Length
  id?: string
  label?: string
  property?: string
  onChange: (length: Length) => void
}
export const LengthInput = ({
  value: providedValue,
  onChange,
  label,
  property,
  id = randomElementID(),
}: LengthInputProps) => {
  const value: CSSUnitValue =
    providedValue === '0' ? { value: 0, unit: 'number' } : providedValue
  const [state, dispatch] = React.useReducer(reducer, {
    value: value?.value || AbsoluteLengthUnits.Px,
    unit: value?.unit || 0,
    key: 0,
    step: 1,
  } as State)
  React.useEffect(() => {
    if (state.value !== value?.value || state.unit !== value?.unit) {
      onChange({
        value: state.value,
        unit: state.unit,
      })
    }
  }, [state])

  const propertyValues = useThemeProperty(property) 

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Label htmlFor={id}>{label ?? 'Number'}</Label>
      {state.unit === ThemeUnits.Theme ? (
        <select
          onChange={(e) => {
            const themeValue = propertyValues?.find((p) => p.id === e.target.value)
            dispatch({
              type: 'CHANGED_INPUT_VALUE',
              value: `${themeValue.value}${themeValue.unit}`,
              themeId: e.target.value
            })
          }}
        >
          {propertyValues?.map(({ value, unit, id }) => {
            return <option value={id}>{value}{unit}</option>
          })}
        </select>
      ) :
      <Number
        id={id}
        key={state.key}
        value={state.value}
        step={state.step}
        min={state.min}
        max={state.max}
        property={property}
        onChange={(newValue: number) => {
          dispatch({
            type: 'CHANGED_INPUT_VALUE',
            value: newValue,
          })
        }}
      />}
      <UnitSelect
        value={state.unit}
        property={property}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          let themeValue = null
          // When the unit is changed to theme we need to set the first themeId
          // so it doesnt break when converting to another unit.
          const themeId = e.target.value === ThemeUnits.Theme 
            ? propertyValues.length && propertyValues[0].id
            : null
          if (themeId || state.themeId) {
            const id = themeId || state.themeId 
            themeValue = propertyValues?.find((p) => p.id === id)
          }
          
          dispatch({
            type: 'CHANGED_UNIT_VALUE',
            unit: e.target.value as LengthUnit,
            themeValue,
            themeId: themeValue?.id
          })
        }}
        style={{ marginLeft: 8 }}
      />
    </div>
  )
}
