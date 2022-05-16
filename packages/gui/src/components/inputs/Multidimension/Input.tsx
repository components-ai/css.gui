import * as React from 'react'
import {
  CSSUnitValue,
  Length,
  MultidimensionalLength,
} from '../../../types/css'
import { reducer } from './reducer'
import { State } from './types'
import { EditorProps } from '../../../types/editor'
import { DEFAULT_LENGTH } from '../../../lib/constants'
import { LengthInput } from '../LengthInput'
import { isMultidimensionalLength } from '../../../lib/util'

// Mapping of units to [min, max] tuple
type UnitRanges = Record<string, [min: number, max: number]>
// Mapping of units to steps
type UnitSteps = Record<string, number>

export interface MultidimensionInputProps
  extends EditorProps<MultidimensionalLength | Length> {
  label?: string
  dimensions: number
}
export const MultidimensionInput = ({
  value,
  onChange,
  dimensions,
  label,
  ...props
}: MultidimensionInputProps) => {
  const [state, dispatch] = React.useReducer(reducer, {
    value: value ?? DEFAULT_LENGTH,
    dimensions,
    isMultidimensional: isMultidimensionalLength(value),
    key: 0,
  } as State)
  React.useEffect(() => {
    onChange(state.value)
  }, [state])

  const handleDimensionChange = (dimension: number) => (value: Length) => {
    dispatch({
      type: 'CHANGED_VALUE',
      dimension,
      value,
    })
  }

  return (
    <div>
      <>
        <LengthInput
          label=""
          value={(state.value || DEFAULT_LENGTH) as CSSUnitValue}
          onChange={handleDimensionChange(0)}
          {...props}
        />
        <div sx={{ pt: 1 }}>
          <LengthInput
            label=""
            value={DEFAULT_LENGTH as CSSUnitValue}
            onChange={handleDimensionChange(1)}
            {...props}
          />
        </div>
      </>
    </div>
  )
}
