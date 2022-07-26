import { v4 as uuid } from 'uuid'
import { ColorModesScale, get as themeUIGet } from 'theme-ui'
import { THEME_SCALES } from './constants'
import { ColorGroup, Theme } from '../types/theme'

type GetArguments = {
  theme: any
  path: string | number
  property: string
}
export const themeGet = ({ theme, path, property }: GetArguments) => {
  const scale = THEME_SCALES[property]
  const fullPath = [scale, path].filter(Boolean).join('.')
  return themeUIGet(theme, fullPath) ?? path ?? property
}

export const isThemeable = (property?: string): boolean =>
  !!THEME_SCALES[property || '']

export const importColors = (colors?: ColorModesScale): ColorGroup[] => {
  if (!colors) {
    return []
  }

  return Object.entries(colors)
    .filter(
      ([name, group]) => name !== 'modes' && !!group && Array.isArray(group)
    )
    .map(([name, group]) => {
      return {
        id: uuid(),
        name,
        //@ts-ignore
        colors: group?.map((value: string) => {
          return {
            id: uuid(),
            value: value,
          }
        }),
      }
    })
}

type FontsObject = Record<string, string>
type FontsArray = string[]
type Fonts = FontsObject | FontsArray
export const importFonts = (fonts: Fonts) => {
  if (Array.isArray(fonts)) {
    return fonts.reduce((acc, value: string) => {
      return {
        ...acc,
        [value]: value,
      }
    }, {})
  }
}

type RawLength = number | string
type FullLength = {
  id: string
  value: number | string
  unit: string
  name?: string
}
export const importRawLengths = (fontSizes: RawLength[]): FullLength[] => {
  // TODO: Handle object mappings
  if (Array.isArray(fontSizes)) {
    return fontSizes?.map((value: number | string) => {
      // TODO: If a string we should parse for other units and/or keywords
      const unit =
        typeof value === 'string' ? `${value.match(/-?[a-zA-Z]+/)}` : 'px'
      const parsedValue =
        typeof value === 'string' ? Number(value.match(/-?[\d.]+/)) : value

      return {
        id: uuid(),
        value: parsedValue,
        unit,
      }
    })
  }

  return []
}

export const importTheme = (theme: any): Theme => {
  // const colors = importColors(theme.colors)
  const colors = theme.colors
  const fonts = importFonts(theme.fonts || [])
  const fontSizes = importRawLengths(theme.fontSizes || [])
  const lineHeights = importRawLengths(theme.lineHeights || [])
  const space = importRawLengths(theme.space || [])
  const borderWidths = importRawLengths(theme.borderWidths || [])
  const borderRadius = importRawLengths(theme.borderRadius || [])

  return {
    colors,
    fonts,
    fontSizes,
    lineHeights,
    space,
    borderWidths,
    borderRadius,
  }
}
