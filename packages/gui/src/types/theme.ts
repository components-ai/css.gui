import { Color, Length, LengthPercentageUnit, NumberUnit } from './css'

export interface Theme {
  borderRadius?: BorderRadius[]
  borderStyles?: BorderStyle[]
  borderWidths?: BorderWidth[]
  boxShadows?: BoxShadowEntry[]
  breakpoints?: Breakpoint[]
  colors?: ColorGroup[]
  durations?: Duration[]
  fonts?: FontFamily[]
  fontSizes?: FontSize[]
  gradients?: Gradient[]
  letterSpacings?: LetterSpacing[]
  lineHeights?: LineHeight[]
  space?: Spacing[]
  text?: TextStyle[]
  textShadows?: TextShadowEntry[]
}

export interface BorderRadius {
  id: string
  value: number
  unit: string
}

export interface BorderStyle {
  id: string
  value: string
}

export interface BorderWidth {
  id: string
  value: number
  unit: string
}

export interface BoxShadow {
  inset?: boolean
  offsetX: Length
  offsetY: Length
  spread: Length
  blur: Length
  color: Color
}

export interface BoxShadowEntry {
  id: string
  value: BoxShadow[]
  name: string
}

export interface Breakpoint {
  id: string
  value: number
  unit: string
}

export interface ColorMode {
  id: string
  name: string
  colors: ColorModeColor[]
}

export interface ColorModeColor {
  id: string
  name: string
  value: string
}

export interface ColorGroup {
  id: string
  name: string
  colors: ColorGroupColor[]
}

interface ColorGroupColor {
  id: string
  value: string
}

export interface Duration {
  id: string
  value: number
  unit: string
}

export interface FontFamily {
  id: string
  name: string
  stack: string
  meta?: FontMeta
}

interface FontMeta {
  primaryFont?: string
  weights: FontWeight[]
}

interface FontWeight {
  id: string
  weight: string
  active?: boolean
}

export interface FontSize {
  id: string
  value: number
  unit: string
}

export interface Gradient {
  id: string
  value: string
  name: string
}

export interface LetterSpacing {
  id: string
  value: number
  name: string
  unit: string
}

export interface LineHeight {
  id: string
  value: number
  name: string
  unit: LengthPercentageUnit | NumberUnit
}

export interface Spacing {
  id: string
  value: number
  unit: string
}

export interface TextShadow {
  offsetX: Length
  offsetY: Length
  blur: Length
  color: Color
}

export interface TextShadowEntry {
  id: string
  name: string
  value: TextShadow[]
}

export interface TextStyle {
  id: string
  name: string
  styles: TextStyleProperty[]
}

export interface TextStyleProperty {
  id: string
  aliasId?: string
  name: string
  value: any
  unit?: string
}
