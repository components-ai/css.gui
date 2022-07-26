import { Color, Length } from './css'

export type Theme = {
  borderRadius?: BorderRadius[]
  borderStyles?: BorderStyle[]
  borderWidths?: BorderWidth[]
  boxShadows?: BoxShadowEntry[]
  breakpoints?: Breakpoint[]
  colors?: ColorGroup[]
  durations?: Duration[]
  fonts?: Record<string, string>
  fontSizes?: FontSize[]
  fontWeights?: FontWeight[]
  gradients?: Gradient[]
  letterSpacings?: LetterSpacing[]
  lineHeights?: LineHeight[]
  space?: Spacing[]
  text?: TextStyle[]
  textShadows?: TextShadowEntry[]
  transitions?: Transition[]
  sizes?: Size[]
}

export type BorderRadius = {
  id: string
  value: number | string
  unit: string
  name?: string
}

export type BorderStyle = {
  id: string
  value: string
}

export type BorderWidth = {
  id: string
  value: number | string
  unit: string
  name?: string
}

export type BoxShadow = {
  inset?: boolean
  offsetX: Length
  offsetY: Length
  spread: Length
  blur: Length
  color: Color
}

export type BoxShadowEntry = {
  id: string
  value: BoxShadow[]
  name: string
}

export type Breakpoint = {
  id: string
  value: number
  unit: string
}

export type ColorMode = {
  id: string
  name: string
  colors: ColorModeColor[]
}

export type ColorModeColor = {
  id: string
  name: string
  value: string
}

export type ColorGroup = {
  id: string
  name: string
  colors: ColorGroupColor[]
}

type ColorGroupColor = {
  id: string
  value: string
}

export type Duration = {
  id: string
  value: number
  unit: string
}

export type FontFamily = {
  id: string
  name: string
  stack: string
  meta?: FontMeta
}

type FontMeta = {
  primaryFont?: string
  weights: FontWeight[]
}

type FontWeight = {
  id: string
  weight: string
  active?: boolean
}

export type FontSize = {
  id: string
  value: number | string
  unit: string
}

export type Gradient = {
  id: string
  value: string
  name: string
}

export type LetterSpacing = {
  id: string
  value: number
  name?: string
  unit: string
}

export type LineHeight = {
  id: string
  value: number | string
  name?: string
  unit: string
}

export type Spacing = {
  id: string
  value: number | string
  unit: string
  name?: string
}

export type Size = {
  id: string
  value: number | string
  unit: string
}

export type TextShadow = {
  offsetX: Length
  offsetY: Length
  blur: Length
  color: Color
}

export type TextShadowEntry = {
  id: string
  name: string
  value: TextShadow[]
}

export type TextStyle = {
  id: string
  name: string
  styles: TextStyleProperty[]
}

export type TextStyleProperty = {
  id: string
  aliasId?: string
  name: string
  value: any
  unit?: string
}

export type Transition = {
  id: string
  name: string
}
