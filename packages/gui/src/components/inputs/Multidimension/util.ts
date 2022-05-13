import { Length, MultidimensionalLengthUnit } from '../../../types/css'

export const convertToMultidimensional = (
  value: Length | MultidimensionalLengthUnit,
  dimensions: number = 2
): MultidimensionalLengthUnit => {
  if ((value as MultidimensionalLengthUnit).type === 'multidimensionalLength') {
    return value as MultidimensionalLengthUnit
  }

  const values = Array(dimensions).fill(value)

  return {
    type: 'multidimensionalLength',
    values: values,
  }
}
