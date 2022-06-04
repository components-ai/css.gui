import { objectSchema } from './object'
import { DataTypeSchema } from './types'

interface CreateFunction<T extends object, K> {
  fields: {
    [Property in keyof T]: DataTypeSchema<T[Property]>
  }
  keyOrder?: (keyof T)[]
  stringify?(values: Record<keyof T, string>): string
  separator?: string
  keywords?: K[]
  defaultValue?: Partial<T>
}

/**
 * Wrapper on an object schema representing a CSS function
 */
export function functionSchema<T extends object, K extends string = never>(
  name: string,
  { separator = ', ', ...props }: CreateFunction<T, K>
): DataTypeSchema<T | K> {
  return objectSchema({
    ...props,
    separator,
    wrapStringify: (value) => `${name}(${value})`,
  })
}
