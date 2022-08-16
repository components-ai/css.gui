import { ComponentType } from 'react'
import { split } from '../../lib/array'
import FieldArray, { FieldArrayProps } from '../FieldArray'
import { DataTypeSchema, RegenOptions } from './types'

interface CreateList<T> {
  itemSchema: DataTypeSchema<T>
  separator?: string
  input?: ComponentType<FieldArrayProps<T>>
  addItem?(currentValue: T[]): T
  stringify?(value: T[]): string
}

export function listSchema<T>({
  itemSchema,
  addItem,
  separator = ', ',
  input: Input,
  stringify,
}: CreateList<T>): DataTypeSchema<T[]> {
  if (!stringify) {
    stringify = (value: T[], ...args: any[]) => {
      const stringified = value.map((item) =>
        itemSchema.stringify(item, ...args)
      )
      return stringified.join(separator)
    }
  }
  const defaultValue = [itemSchema.defaultValue]

  function regenerate({ theme, previousValue }: RegenOptions<T[]>) {
    return previousValue.map((value) => {
      return itemSchema.regenerate?.({ theme, previousValue: value }) ?? value
    })
  }

  return {
    type: `${itemSchema.type} list`,
    stringify,
    defaultValue,
    input(props) {
      if (Input) {
        return <Input {...props} itemSchema={itemSchema} />
      }
      return <FieldArray {...props} itemSchema={itemSchema} addItem={addItem} />
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
