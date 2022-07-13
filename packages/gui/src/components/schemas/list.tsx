import { split } from '../../lib/array'
import FieldArray from '../FieldArray'
import { DataTypeSchema, RegenOptions } from './types'

interface CreateList<T> {
  itemSchema: DataTypeSchema<T>
  separator?: string
}

export function listSchema<T>({
  itemSchema,
  separator = ', ',
}: CreateList<T>): DataTypeSchema<T[]> {
  const stringify = (value: T[], ...args: any[]) => {
    const stringified = value.map((item) => itemSchema.stringify(item, ...args))
    return stringified.join(separator)
  }
  const defaultValue = [itemSchema.defaultValue]

  function regenerate({ previousValue }: RegenOptions<T[]>) {
    return previousValue.map((value) => {
      return itemSchema.regenerate?.({ previousValue: value }) ?? value
    })
  }

  return {
    type: `${itemSchema.type} list`,
    stringify,
    defaultValue,
    input(props) {
      return <FieldArray {...props} itemSchema={itemSchema} />
    },
    regenerate,
    validate: ((value: any) => {
      if (!(value instanceof Array)) {
        return false
      }
      return value.every((item) => itemSchema.validate(item))
    }) as any,
    parse(tokens) {
      const parseSeperator = separator.trim()
      // Split the tokens based on the separator
      const ensplittenedTokens = parseSeperator
        ? split(tokens, parseSeperator)
        : tokens.map((t) => [t])

      const results = []
      for (const tokenGroup of ensplittenedTokens) {
        const [result, rest] = itemSchema.parse!(tokenGroup)
        // Make sure the item schema parses the group *entirely* without loose ends
        if (!result || rest.length > 0) {
          return [undefined, tokens]
        }
        results.push(result)
      }
      // When parsed, the list should take up the remaining tokens
      return [results, []]
    },
  }
}
