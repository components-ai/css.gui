import { flattenDeep, get, sample } from 'lodash-es'
import { Theme } from '../types/theme'

export function randomColor(theme?: Theme) {
  if (theme && theme.colors) {
    const path = sample(Object.keys(flattenDeep(theme.colors))) ?? ''
    const group = get(theme.colors, path?.split('.'))
    return sample(group.colors).value
  }

  return randomHexColor()
}

export function randomHexColor() {
  return (
    '#' +
    ('000000' + Math.floor(Math.random() * 16777215).toString(16)).slice(-6)
  )
}
