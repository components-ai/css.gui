import { optionsSchema } from './options'
import { DataTypeSchema } from './types'

function literalSchema<T>(type: string, value: T): DataTypeSchema<T> {
  return {
    type,
    defaultValue: value,
    validate: ((testValue: unknown) => testValue === value) as any,
    stringify: (stringifyValue) => String(stringifyValue),
    parse(tokens) {
      return tokens[0] === String(value)
        ? [value, tokens.slice(1)]
        : [undefined, tokens]
    },
  }
}

describe('optionsSchema()', () => {
  it('accepts parsed falsey variant values', () => {
    const schema = optionsSchema({
      variants: {
        zero: literalSchema('zero', 0),
        empty: literalSchema('empty', ''),
      },
    })

    expect(schema.parse!(['0'])).toEqual([0, []])
    expect(schema.parse!([''])).toEqual(['', []])
  })
})
