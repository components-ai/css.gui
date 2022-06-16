import { DataTypeSchema, RegenOptions } from './types'
import * as Select from '../ui/Select'

interface CreateOptions<T extends Record<string, any>> {
  variants: { [V in keyof T]: DataTypeSchema<T[V]> }
  order?: (keyof T)[]
  getType<K extends keyof T>(value: T[K]): K
  convert?(oldValue: Unionize<T>[any], newType: keyof T): T | undefined
}

/**
 * Create a schema that lets a user choose between several types,
 * each with a distinct structure as specified by the given `variants`.
 */
export function optionsSchema<T extends Record<string, any>>({
  variants,
  order = Object.keys(variants),
  convert,
  getType,
}: CreateOptions<T>): DataTypeSchema<Unionize<T>> {
  function regenerate({
    previousValue,
  }: RegenOptions<Unionize<T>>): Unionize<T> {
    const type = getType(previousValue)
    const newValue = variants[type].regenerate?.({
      previousValue: previousValue,
    })
    return newValue ?? previousValue
  }

  return {
    inlineInput(props) {
      const type = getType(props.value)
      const InlineInput = variants[type].inlineInput
      // Render the select
      return (
        <div sx={{ display: 'flex' }}>
          {InlineInput ? <InlineInput {...props} /> : type.toString()}
          <Select.Root
            value={type.toString()}
            onValueChange={(newType) => {
              props.onChange(
                convert?.(props.value, newType) ??
                  (variants[newType].defaultValue as any)
              )
            }}
          >
            <Select.Trigger>
              <Select.Value>{''}</Select.Value>
              <Select.Icon />
            </Select.Trigger>
            <Select.Content>
              {order.map((typeOption: any) => {
                return (
                  <Select.Item key={typeOption} value={typeOption}>
                    <Select.ItemText>{typeOption}</Select.ItemText>
                    <Select.ItemIndicator />
                  </Select.Item>
                )
              })}
            </Select.Content>
          </Select.Root>
        </div>
      )
    },
    input(props) {
      const type = getType(props.value)
      const Component = variants[type].input
      return Component ? <Component {...props} /> : null
    },
    stringify(value) {
      const type = getType(value)
      return variants[type].stringify(value)
    },
    defaultValue: {
      ...variants[order[0]].defaultValue,
      type: order[0],
    },
    regenerate,
  }
}

// Utility types to help typecheck these options correctly,
// based on: https://stackoverflow.com/questions/62591230/typescript-convert-a-tagged-union-into-an-union-type
type Unionize<T> = { [K in keyof T]: T[K] }[keyof T]
