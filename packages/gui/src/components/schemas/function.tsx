import { objectSchema } from './object'
import { DataTypeSchema } from './types'

interface CreateFunction<T extends object> {
  fields: {
    [Property in keyof T]: DataTypeSchema<T[Property]>
  }
  keyOrder?: (keyof T)[]
  stringify?(values: Record<keyof T, string>): string
  separator?: string
  defaultValue?: Partial<T>
}

/**
 * Wrapper on an object schema representing a CSS function
 */
export function functionSchema<T extends object>(
  name: string,
  { separator = ', ', ...props }: CreateFunction<T>
): DataTypeSchema<T> {
  const object = objectSchema({ ...props, separator })
  return {
    ...object,
    stringify: (value) => `${name}(${object.stringify(value)})`,
  }
}
