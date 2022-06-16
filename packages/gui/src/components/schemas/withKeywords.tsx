import { optionsSchema } from './options'
import { keyword } from './primitives'
import { DataTypeSchema } from './types'

export function withKeywords<K extends string, T>(
  keywords: readonly K[],
  schema: DataTypeSchema<T>
) {
  // TODO base this off the provided schema?
  return optionsSchema({
    variants: {
      value: schema,
      keyword: keyword(keywords),
    },
  })
}
