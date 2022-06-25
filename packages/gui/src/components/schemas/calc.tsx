import { functionSchema } from './function'
import { joinSchemas } from './joinSchemas'
import { objectSchema } from './object'
import { keyword, number } from './primitives'
import { DataTypeSchema } from './types'

export function calc<T>(schema: DataTypeSchema<T>) {
  const calcValue = () => schema
  const calcProduct = () =>
    objectSchema({
      type: '* /',
      fields: {
        x: calcValue(),
        operator: keyword(['*', '/']),
        y: number({ defaultValue: 1 }),
      },
    })

  const productOrValue = joinSchemas([calcValue(), calcProduct()])

  // TODO should be a list
  const calcSum: () => DataTypeSchema<any> = () =>
    objectSchema({
      type: '+ -',
      fields: {
        x: productOrValue,
        operator: keyword(['+', '-']),
        y: productOrValue,
      },
    })
  return functionSchema('calc', joinSchemas([calcSum(), calcProduct()]))
}
