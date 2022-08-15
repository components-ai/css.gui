import { optionsSchema } from './options'
import { DataTypeSchema } from './types'

interface JoinSchemaOptions<S> {
  type?: string
  defaultType?: string
  defaultValue?: ExtractDataType<S>
  convert?(oldValue: ExtractDataType<S>, newType: string): S | undefined
}

export function joinSchemas<S extends DataTypeSchema<any>>(
  schemas: S[],
  { type, convert, defaultType, defaultValue }: JoinSchemaOptions<S> = {}
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
  return optionsSchema({
    variants,
    type,
    convert: convert as any,
    defaultType: defaultType as any,
    defaultValue,
  })
}

type ExtractDataType<S> = S extends DataTypeSchema<infer T> ? T : never
