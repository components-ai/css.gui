import * as React from 'react'
import { CSSUnitValue, MultidimensionalLengthUnit } from '../../../types/css'
import { Label } from '../../primitives'
import { reducer } from './reducer'
import { State } from './types'
import { EditorProps } from '../../../types/editor'
import { UnitConversions } from '../../../lib/convert'
import { kebabCase } from 'lodash-es'
import { DimensionInput } from '../Dimension'
import { Maximize, Minimize } from 'react-feather'

// Mapping of units to [min, max] tuple
type UnitRanges = Record<string, [min: number, max: number]>
// Mapping of units to steps
type UnitSteps = Record<string, number>

export interface MultidimensionInputProps
  extends EditorProps<MultidimensionalLengthUnit | CSSUnitValue> {
  label?: string
  range?: UnitRanges
  steps?: UnitSteps
  units?: readonly string[]
  keywords?: string[]
  conversions?: UnitConversions
  dimensions: number
}
export const MultidimensionInput = ({
  value,
  onChange,
  dimensions,
  label,
  ...props
}: MultidimensionInputProps) => {
  const id = `${React.useId()}-${kebabCase(label)}`
  const [state, dispatch] = React.useReducer(reducer, {
    value,
    dimensions,
    isMultidimensional: Array.isArray(
      (value as MultidimensionalLengthUnit)?.values
    ),
    key: 0,
  } as State)
  React.useEffect(() => {
    onChange(state.value)
  }, [state])

  const handleChange = (value: CSSUnitValue) => {
    dispatch({
      type: 'CHANGED_VALUE',
      value,
    })
  }

  const handleDimensionChange =
    (dimension: number) => (value: CSSUnitValue) => {
      dispatch({
        type: 'CHANGED_VALUE',
        dimension,
        value,
      })
    }

  const handleToggle = () => {
    dispatch({
      type: 'TOGGLE_MULTIDIMENSIONAL',
    })
  }

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
          <Toggle
            isMultidimensional={state.isMultidimensional}
            onToggle={handleToggle}
          />
        </div>
      ) : (
        <div
          sx={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
          }}
        >
          <DimensionInput
            value={state.value as CSSUnitValue}
            onChange={handleChange}
            {...props}
          />
          <Toggle
            isMultidimensional={state.isMultidimensional}
            onToggle={handleToggle}
          />
        </div>
      )}
    </div>
  )
}

type ToggleProps = {
  isMultidimensional: boolean
  onToggle: () => void
}
const Toggle = ({ isMultidimensional, onToggle }: ToggleProps) => {
  return (
    <button
      onClick={onToggle}
      sx={{
        all: 'unset',
        ml: 1,
        color: 'muted',
      }}
    >
      {isMultidimensional ? <Maximize size={14} /> : <Minimize size={14} />}
    </button>
  )
}
