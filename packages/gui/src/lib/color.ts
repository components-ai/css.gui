import {
  cloneDeep,
  isBoolean,
  isNumber,
  isObject,
  isString,
  sample,
} from 'lodash-es'
import getContrast from 'get-contrast'
import * as culori from 'culori'
import { ThemeColor } from '../components/primitives/ColorPicker/PalettePicker'
import { RegenOptions } from '../components/schemas/types'
import { Color } from '../types/css'
import { themeGet } from './theme'

const CONTRAST_THRESHOLD = 4.5
const CONTRAST_PROPERTY_MAP: Record<string, string> = {
  color: 'backgroundColor',
  backgroundColor: 'color',
}

const getColorToContrastWith = (
  property: string,
  ruleset: Record<string, any>,
  theme?: any
) => {
  const contrastProperty = CONTRAST_PROPERTY_MAP[property]
  if (!contrastProperty) {
    return null
  }

  const valueOrPath = ruleset[contrastProperty]
  if (!valueOrPath) {
    return null
  }

  return themeGet({
    theme,
    path: valueOrPath?.path || valueOrPath,
    property: 'color',
  })
}

const hasContrastToCheck = (
  property?: string,
  ruleset?: Record<string, any>,
  theme?: any
) => {
  if (!property || !ruleset) {
    return false
  }

  return !!getColorToContrastWith(property, ruleset, theme)
}

export function randomColor({
  theme,
  ruleset,
  property,
}: RegenOptions<Color | ThemeColor>) {
  if (!theme?.colors) {
    return randomHexColor()
  }

  const allColors = cloneDeep(theme.colors)
  // @ts-ignore
  delete allColors.modes

  const colors = flatten(allColors)

  if (!hasContrastToCheck(property, ruleset, theme)) {
    return sample(Object.keys(colors))
  }

  const colorToContrastWith = getColorToContrastWith(property!, ruleset, theme)
  const colorsWithContrast = Object.entries(colors).reduce(
    (acc: string[], curr) => {
      const [path, value] = curr

      try {
        if (hasAlpha(value)) {
          return acc
        }

        if (
          getContrast.ratio(value, colorToContrastWith) >= CONTRAST_THRESHOLD
        ) {
          return [...acc, path]
        }
      } catch (e) {}

      return acc
    },
    []
  )

  return colorsWithContrast.length
    ? sample(colorsWithContrast)
    : sample(Object.keys(colors))
}

export function randomHexColor() {
  return (
    '#' +
    ('000000' + Math.floor(Math.random() * 16777215).toString(16)).slice(-6)
  )
}

export function hasAlpha(color: string) {
  if (!isValidColor(color)) {
    return false
  }
  const { alpha = 1 } = culori.parse(color)
  return alpha !== 1
}

export function isValidColor(value: Color) {
  return !!culori.parse(value)
}

type Key = string | number
type KeyPath = Key[]
type Obj = Record<string, any>
const keyify = (keys: KeyPath) => keys.join('.')
const flatten = (obj: Obj, parentKeys?: KeyPath): Obj =>
  Object.keys(obj).reduce((acc: Obj, key: Key) => {
    const val = obj[key]
    const keys: KeyPath = (parentKeys || []).concat([key])

    if (isString(val) || isBoolean(val) || isNumber(val)) {
      acc[keyify(keys)] = val
      return acc
    } else if (isObject(val)) {
      return Object.assign(acc, flatten(val, keys))
    }

    val.forEach((v: any, i: number) => {
      const key = keyify(keys.concat([i]))
      acc[key] = v
    })

    return acc
  }, {})
