import * as React from 'react'
import { randomElementID } from '../../lib'
import { AbsoluteLengthUnits, Length, LengthUnit, ThemeUnits } from '../../types/css'
import { Label, Number } from '../primitives'
import { UnitSelect } from '../UnitSelect'
import { reducer } from './reducer'
import { State } from './types'
import { useTheme } from '../providers/ThemeContext'
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
  value?: Length
  id?: string
  label?: string
  property?: string
  onChange: (length: Length) => void
}
export const LengthInput = ({
  value,
  onChange,
  label,
  property,
  id = randomElementID(),
}: LengthInputProps) => {
  const [state, dispatch] = React.useReducer(reducer, {
    value: value?.value || AbsoluteLengthUnits.Px,
    unit: value?.unit || 0,
    key: 0,
    step: 1
  } as State)
  React.useEffect(() => {
    onChange({
      value: state.value,
      unit: state.unit,
    })
  }, [state])
  
  const theme = useTheme()
  const propertyValues = themeValuesForProperty(property!, theme)
  
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
            const themeFont = propertyValues?.find((f) => f.id === e.target.value)

            if (themeFont) {
              dispatch({
                type: 'CHANGED_INPUT_VALUE',
                value: themeFont.value,
                themeUnit: themeFont.unit
              })
            }
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
          dispatch({
            type: 'CHANGED_UNIT_VALUE',
            unit: e.target.value as LengthUnit,
          })
        }}
        style={{ marginLeft: 8 }}
      />
    </div>
  )
}
