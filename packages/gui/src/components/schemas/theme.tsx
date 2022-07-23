import { useTheme } from '../providers/ThemeContext'
import { get, range } from 'lodash-es'
import { ThemeNamedValue, ThemeValue } from '../../types/css'
import { SelectInput } from '../inputs/SelectInput'
import { DataTypeSchema } from './types'

export function themeScale(path: string): DataTypeSchema<ThemeValue> {
  return {
    type: 'theme',
    validate: ((value: any) => {
      if (typeof value !== 'object') return false
      return (
        value.type === 'theme' &&
        typeof value.path === 'string' &&
        typeof value.index === 'number'
      )
    }) as any,
    stringify(value, theme) {
      return get(theme, `${value.path}.${value.index}`)
    },
    inlineInput(props) {
      const theme = useTheme()
      const numOptions = get(theme, path)?.length || 0
      return (
        <SelectInput
          label=""
          value={`${props.value.index}`}
          onChange={(value) =>
            props.onChange({
              ...props.value,
              index: +value,
            })
          }
          options={range(0, numOptions).map((x) => x.toString())}
        />
      )
      // return null
    },
    // TODO function version of defaultValue, pass in theme
    defaultValue: { type: 'theme', path, index: 0 },
    parse(tokens) {
      return [undefined, tokens]
    },
  }
}

// Theme properties for stuff represented by a string names
export function themeRecord(path: string): DataTypeSchema<ThemeNamedValue> {
  return {
    type: 'theme',
    validate: ((value: any) => {
      if (typeof value !== 'object') return false
      return (
        value.type === 'theme' &&
        typeof value.path === 'string' &&
        typeof value.key === 'string'
      )
    }) as any,
    stringify(value, theme) {
      return get(theme, `${value.path}.${value.key}`)
    },
    inlineInput(props) {
      const theme = useTheme()
      const options = get(theme, path)
      return (
        <SelectInput
          label=""
          value={`${props.value.key}`}
          onChange={(value) =>
            props.onChange({
              ...props.value,
              key: value,
            })
          }
          options={Object.keys(options)}
        />
      )
      // return null
    },
    // TODO function version of defaultValue, pass in theme
    defaultValue: { type: 'theme', path, key: '' },
    parse(tokens) {
      return [undefined, tokens]
    },
  }
}
