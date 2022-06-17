import { optionsSchema } from './options'
import { DataTypeSchema } from './types'

export function joinSchemas<S extends DataTypeSchema<any>>(
  schemas: S[],
  type?: string
): DataTypeSchema<ExtractDataType<S>> {
  let variants = {}

  for (const variant of schemas) {
    if (variant.variants) {
      variants = { ...variants, ...variant.variants }
    } else {
      variants = { ...variants, [variant.type]: variant }
    }
  }
  // TODO keep the conversion function
  return optionsSchema({ variants, type })
}

type ExtractDataType<S> = S extends DataTypeSchema<infer T> ? T : never
