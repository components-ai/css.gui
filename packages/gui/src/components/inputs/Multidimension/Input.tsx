import * as React from 'react'
import {
  CSSUnitValue,
  Length,
  MultidimensionalLengthUnit,
} from '../../../types/css'
import { reducer } from './reducer'
import { State } from './types'
import { EditorProps } from '../../../types/editor'
import { UnitConversions } from '../../../lib/convert'
import { DimensionInput } from '../Dimension'
import { DEFAULT_LENGTH } from '../../../lib/constants'

// Mapping of units to [min, max] tuple
type UnitRanges = Record<string, [min: number, max: number]>
// Mapping of units to steps
type UnitSteps = Record<string, number>

export interface MultidimensionInputProps
  extends EditorProps<MultidimensionalLengthUnit | Length> {
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
    isMultidimensional: Array.isArray(
      (value as MultidimensionalLengthUnit)?.values
    ),
    key: 0,
  } as State)
  React.useEffect(() => {
    onChange(state.value)
  }, [state])

  const handleChange = (value: Length) => {
    dispatch({
      type: 'CHANGED_VALUE',
      value,
    })
  }

  const handleDimensionChange = (dimension: number) => (value: Length) => {
    dispatch({
      type: 'CHANGED_VALUE',
      dimension,
      value,
    })
  }

  console.log(JSON.stringify({ ...props, ...state }, null, 2))

  return (
    <div>
      {state.isMultidimensional ? (
        <div
          sx={{
            display: 'flex',
            width: '100%',
            alignItems: 'flex-start',
          }}
        >
          <div>
            {(state.value as MultidimensionalLengthUnit).values.map(
              (val: CSSUnitValue, dimension: number) => {
                return (
                  <div
                    key={dimension}
                    sx={{
                      display: 'flex',
                      width: '100%',
                      alignItems: 'center',
                      pt: 1,
                    }}
                  >
                    <DimensionInput
                      label={''}
                      value={val}
                      onChange={handleDimensionChange(dimension)}
                      {...props}
                    />
                  </div>
                )
              }
            )}
          </div>
        </div>
      ) : (
        <>
          <DimensionInput
            label=""
            value={(state.value || DEFAULT_LENGTH) as CSSUnitValue}
            onChange={handleChange}
            {...props}
          />
          <div sx={{ pt: 1 }}>
            <DimensionInput
              label=""
              value={DEFAULT_LENGTH as CSSUnitValue}
              onChange={handleDimensionChange(1)}
              {...props}
            />
          </div>
        </>
      )}
    </div>
  )
}
