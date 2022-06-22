import { optionsSchema } from './options'
import { DataTypeSchema } from './types'

interface JoinSchemaOptions<S> {
  type?: string
  convert?(oldValue: ExtractDataType<S>, newType: string): S | undefined
}

export function joinSchemas<S extends DataTypeSchema<any>>(
  schemas: S[],
  { type, convert }: JoinSchemaOptions<S> = {}
): DataTypeSchema<ExtractDataType<S>> {
  let variants = {}

  for (const variant of schemas) {
    if (variant.variants) {
      variants = { ...variants, ...variant.variants }
    } else {
      variants = { ...variants, [variant.type]: variant }
    }
  }
  // TODO Keep conversion functions from sub-variants
  // if a `convert` function is defined, it is not propagated to the joined schema right now
  return optionsSchema({ variants, type, convert: convert as any })
}

type ExtractDataType<S> = S extends DataTypeSchema<infer T> ? T : never
