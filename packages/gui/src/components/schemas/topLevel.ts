import { GLOBAL_KEYWORDS } from '../../data/global-keywords'
import { joinSchemas } from './joinSchemas'
import { keyword } from './primitives'
import { responsive } from './responsive'
import { DataTypeSchema } from './types'

const NO_GLOBAL_SCHEMA_PROPERTIES = ['fontFamily', 'fontVariationSettings']

export function topLevel<T>(schema: DataTypeSchema<T>, property: string) {
  if (NO_GLOBAL_SCHEMA_PROPERTIES.includes(property)) {
    return schema
  }
  const withGlobal = joinSchemas([schema, global])
  const responsiveInput = responsive(withGlobal)
  return joinSchemas([withGlobal, responsiveInput], {
    convert(oldValue, newType) {
      // If converting *from* a responsive input, take the first value
      if (responsiveInput.validate(oldValue)) {
        return oldValue.values[0] as any
      }
      // If converting *to* a responsive input, triplicate the current input
      if (newType === 'responsive') {
        return { type: 'responsive', values: [oldValue, oldValue, oldValue] }
      }
      return undefined
    },
  })
}

const global = keyword(GLOBAL_KEYWORDS, { type: 'global' })
