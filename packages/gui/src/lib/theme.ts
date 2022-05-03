import { v4 as uuid } from 'uuid'
import { Theme, ColorModesScale } from 'theme-ui'
import { THEME_SCALES } from './constants'
import { ColorGroup, Theme as CSSGUITheme } from '../types/theme'

export const isThemeable = (property?: string): boolean =>
  !!THEME_SCALES[property || '']

/**
 * Turn a system-ui color object into an internally compatible shape
 *
 * {
 *   gray: ['#000', '#111', '#999'],
 *   tomato: 'tomato'
 * }
 */
export const importColors = (colors?: ColorModesScale): ColorGroup[] => {
  if (!colors) {
    return []
  }

  return Object.entries(colors).map(([name, group]) => {
    if (!Array.isArray(group)) {
      return {
        id: uuid(),
        name,
        colors: [
          {
            id: uuid(),
            value: group,
          },
        ],
      }
    }

    return {
      id: uuid(),
      name,
      colors: group.map((value) => {
        return {
          id: uuid(),
          value: value,
        }
      }),
    }
  })
}

export const importThemeFromSpec = (theme: Theme): CSSGUITheme => {
  const colors = importColors(theme.colors)

  return {
    colors,
  }
}
