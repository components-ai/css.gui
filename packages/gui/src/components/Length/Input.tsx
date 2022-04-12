import * as React from 'react'
import { AbsoluteLengthUnits, Length, LengthUnit } from '../../types/css'
import { Number } from '../primitives'
import { UnitSelect } from '../UnitSelect'
import { reducer } from './reducer'
import { State } from './types'

type LengthProps = {
  value: Length
  id: string
  onChange: (length: Length) => void
}
export const LengthInput = ({ value, onChange, id }: LengthProps) => {
  const [state, dispatch] = React.useReducer(reducer, {
    value: value?.value || AbsoluteLengthUnits.Px,
    unit: value?.unit || 0,
    key: 0,
  } as State)

  React.useEffect(() => {
    onChange({
      value: state.value,
      unit: state.unit,
    })
  }, [state])

  console.log(state)

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Number
        id={id}
        key={state.key}
        value={state.value}
        onChange={(newValue: number) => {
          dispatch({
            type: 'CHANGED_INPUT_VALUE',
            value: newValue,
          })
        }}
      />
      <UnitSelect
        value={state.unit}
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
