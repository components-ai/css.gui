import { isMultidimensionalLength } from '../../../lib/util'
import { Length, MultidimensionalLength } from '../../../types/css'

export const convertToMultidimensional = (
  value: Length | MultidimensionalLength,
  dimensions: number = 2
): MultidimensionalLength => {
  if (isMultidimensionalLength(value)) {
    return value as MultidimensionalLength
  }

  const values = Array(dimensions).fill(value)

  return {
    type: 'multidimensionalLength',
    values: values,
  }
}
