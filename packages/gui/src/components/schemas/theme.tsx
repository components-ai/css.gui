import { useTheme } from '../providers/ThemeContext'
import { get, range, sample } from 'lodash-es'
import { ThemeNamedValue, ThemeValue } from '../../types/css'
import { SelectInput } from '../inputs/SelectInput'
import { DataTypeSchema } from './types'
import { joinPath } from '../providers/util'
import { randomInt } from '../../lib/random'

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
      return get(theme, joinPath(value.path, value.index))
    },
    regenerate(options) {
      const scale = get(options.theme, options.previousValue.path)
      return {
        ...options.previousValue,
        index: randomInt(0, scale.length),
      }
    },
    inlineInput(props) {
      const theme = useTheme()
      const numOptions = get(theme, path)?.length || 0
      const decorateText = (step: string) => {
        const value = get(theme, joinPath(path, step))
        return `${step} - ${value}`
      }
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
          decorateText={decorateText}
        />
      )
    },
    // TODO function version of defaultValue, pass in theme
    defaultValue: { type: 'theme', path, index: 0 },
    parse(tokens) {
      return [undefined, tokens]
    },
  }
}

// Theme properties for stuff represented by a string name
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
    regenerate(options) {
      const records = get(options.theme, options.previousValue.path)
      const paths = Object.keys(records || {})

      return {
        ...options.previousValue,
        key: sample(paths) ?? '',
      }
    },
    inlineInput(props) {
      const theme = useTheme()
      const options = Object.keys(get(theme, path))
      return (
        <SelectInput
          label=""
          value={props.value.key || options[0]}
          onChange={(value) =>
            props.onChange({
              ...props.value,
              key: value,
            })
          }
          options={options}
        />
      )
    },
    // TODO function version of defaultValue, pass in theme
    defaultValue: { type: 'theme', path, key: '' },
    parse(tokens) {
      return [undefined, tokens]
    },
  }
}
