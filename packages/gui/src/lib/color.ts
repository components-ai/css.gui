import { isBoolean, isNumber, isObject, isString, sample } from 'lodash-es'
import { ThemeColor } from '../components/primitives/ColorPicker/PalettePicker'
import { RegenOptions } from '../components/schemas/types'
import { Color } from '../types/css'

export function randomColor({
  theme,
  ruleset,
  property,
}: RegenOptions<Color | ThemeColor>) {
  console.log('!!!!', ruleset, property)
  if (theme && theme.colors) {
    const path = sample(Object.keys(flatten(theme.colors)))

    return path
  }

  return randomHexColor()
}

export function randomHexColor() {
  return (
    '#' +
    ('000000' + Math.floor(Math.random() * 16777215).toString(16)).slice(-6)
  )
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
