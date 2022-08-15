import { DataTypeSchema, RegenOptions } from './types'
import * as Select from '../ui/Select'

interface CreateOptions<T extends Record<string, any>> {
  variants: { [V in keyof T]: DataTypeSchema<T[V]> }
  type?: string
  order?: (keyof T)[]
  convert?(oldValue: Unionize<T>[any], newType: keyof T): T | undefined
  defaultType?: keyof T
  defaultValue?: any
}

/**
 * Create a schema that lets a user choose between several types,
 * each with a distinct structure as specified by the given `variants`.
 */
export function optionsSchema<T extends Record<string, any>>({
  variants,
  type = 'options',
  order = Object.keys(variants),
  convert,
  defaultType = order[0],
  defaultValue,
}: CreateOptions<T>): DataTypeSchema<Unionize<T>> {
  function getType(value: T): keyof T {
    for (const [type, schema] of Object.entries(variants)) {
      if (schema.validate(value)) return type
    }

    throw new Error(
      `Provided value ${JSON.stringify(
        value
      )} is not one of the options [${Object.keys(variants).join(', ')}].`
    )
  }
  function regenerate({
    previousValue,
    ...options
  }: RegenOptions<Unionize<T>>): Unionize<T> {
    const type = getType(previousValue)
    const newValue = variants[type].regenerate?.({ previousValue, ...options })
    return newValue ?? previousValue
  }

  let color = false
  if (convert && String(convert).includes('!!!')) {
    color = true
    console.log(convert)
  }

  return {
    type,
    convert: convert as any,
    variants: variants as any,
    inlineInput(props) {
      const type = getType(props.value)
      const InlineInput = variants[type].inlineInput
      // Render the select
      return (
        <div sx={{ display: 'flex' }}>
          {InlineInput && <InlineInput {...props} />}
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
    hasBlockInput(value) {
      const type = getType(value)
      return !!variants[type].input
    },
    stringify(value, ...args) {
      const type = getType(value)
      return variants[type].stringify(value, ...args)
    },
    defaultValue: defaultValue ?? variants[defaultType].defaultValue,
    regenerate,
    validate: ((value: any) => {
      return Object.values(variants).some((variantSchema) =>
        variantSchema.validate(value)
      )
    }) as any,
    parse(tokens) {
      // Try to find a variant that parses the options completely, and return that variant
      // TODO deal with instances where the one of the variants just swallows up the other
      for (const variantSchema of Object.values(variants)) {
        const [result, rest] = variantSchema.parse(tokens)
        if (result) {
          return [result, rest]
        }
      }
      return [undefined, tokens]
    },
  }
}

// Utility types to help typecheck these options correctly,
// based on: https://stackoverflow.com/questions/62591230/typescript-convert-a-tagged-union-into-an-union-type
type Unionize<T> = { [K in keyof T]: T[K] }[keyof T]
