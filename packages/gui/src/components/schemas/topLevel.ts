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
      console.log(schema)
      // If converting *from* a responsive input, take the first value
      if (responsiveInput.validate(oldValue)) {
        const newValue = oldValue.values[0] as any
        console.log('sch conv', oldValue, newType, schema.convert)
        if (!schema.convert) {
          return newValue
        }

        console.log('CONVERTING!!!')
        return schema.convert(newValue, newType as any)
      }
      // If converting *to* a responsive input, triplicate the current input
      if (newType === 'responsive') {
        return { type: 'responsive', values: [oldValue, oldValue, oldValue] }
      }

      if (schema.convert) {
        return schema.convert(oldValue as T, newType as any)
      }

      return undefined
    },
  })
}

const global = keyword(GLOBAL_KEYWORDS, { type: 'global' })
