import * as CSS from 'csstype'
import { functions } from '../data/functions'

export type ColorObject = {
  id?: string
  value: string
  themePath?: string
}

export type Color = string

export type FontFamilyType = { [k: string]: any }

export const enum FontRelativeLengthUnits {
  Ch = 'ch',
  Em = 'em',
  Ex = 'ex',
  Rem = 'rem',
}
export const enum ViewportPercentageLengthUnits {
  Vh = 'vh',
  Vw = 'vw',
  VMin = 'vmin',
  VMax = 'vmax',
}
export const enum AbsoluteLengthUnits {
  Px = 'px',
  Cm = 'cm',
  Mm = 'mm',
  In = 'in',
  Pc = 'pc',
  Pt = 'pt',
}
export const enum PercentageLengthUnits {
  Pct = '%',
}
export const enum UnitlessUnits {
  Number = 'number',
  Calc = 'calc',
}
export const enum ThemeUnits {
  Theme = 'theme',
}
export const enum KeywordUnits {
  Keyword = 'keyword',
}
export const enum CalcOperand {
  Mult = '*',
  Plus = '+',
  Sub = '-',
  Div = '/',
}
// Only use a subset for now to keep things simpler
export type LengthPercentageUnit = LengthUnit | PercentageLengthUnits.Pct

export const LENGTH_UNITS = [
  'px',
  'rem',
  'em',
  'ch',
  'ex',
  'vh',
  'vw',
  'vmin',
  'vmax',
  'cm',
  'mm',
  'in',
  'pc',
  'pt',
] as const
export type LengthUnit = typeof LENGTH_UNITS[number]
export type MultidimensionalLengthType = 'multidimensionalLength'
export type MultidimensionalLength = {
  type: MultidimensionalLengthType
  values: CSSUnitValue[]
}
export type ResponsiveMultidimensionalLength = MultidimensionalLength[]

export const TIME_UNITS = ['ms', 's'] as const
export type TimeUnit = typeof TIME_UNITS[number]
export interface Time {
  value: number
  unit: TimeUnit
}

export const ANGLE_UNITS = ['deg', 'turn', 'rad', 'grad'] as const
export type AngleUnit = typeof ANGLE_UNITS[number]
export interface Angle {
  value: number
  unit: AngleUnit
}

export const NUMBER_PERCENTAGE_UNITS = ['number', '%'] as const
export type NumberPercentageUnit = typeof NUMBER_PERCENTAGE_UNITS[number]
export interface NumberPercentage {
  value: number
  unit: NumberPercentageUnit
}

export type CSSFunctionCalc = {
  unit: 'calc'
  type: 'calc'
  arguments: CalcFunction
}
export type CalcFunction = {
  valueX: CSSUnitValue
  valueY: CSSUnitValue
  operand: CalcOperand
}
export type CSSUnitValue = {
  value: number
  unit: string
  themePath?: string
}
export type Dimension = CSSUnitValue | CSSFunctionCalc
export type GenericLength = '0'
export type Length = CSSUnitValue
// This isn't differentiated type-wise but it's good to keep track of
// what actually accepts % values
export type LengthPercentage = Length
export type ResponsiveLength = Length[]
export type CSSKeywordValue = {
  value: string
}

export type FunctionName = typeof functions[number]
export type CSSFunctionArgument = string | number
export type CSSFunction = {
  type: FunctionName
  arguments: CSSFunctionArgument[]
}
export type CSSFunctionURL = {
  type: 'url'
  arguments: [string]
}

export type Styles = CSS.PropertiesFallback

// TODO support [keyword value] values
export interface Position {
  x: Length
  y: Length
}

export const BOX_KEYWORDS = [
  'border-box',
  'padding-box',
  'content-box',
] as const
export type Box = typeof BOX_KEYWORDS[number]

export const SHAPE_BOX_KEYWORDS = [...BOX_KEYWORDS, 'margin-box'] as const
export type ShapeBox = typeof SHAPE_BOX_KEYWORDS[number]

export const GEOMETRY_BOX_KEYWORDS = [
  ...SHAPE_BOX_KEYWORDS,
  'fill-box',
  'stroke-box',
  'view-box',
] as const
export type GeometryBox = typeof GEOMETRY_BOX_KEYWORDS[number]

const primitives = [
  'keyword',
  'number',
  'integer',
  'percentage',
  'length',
  'time',
  'string',
  'color',
] as const
export type Primitive = typeof primitives[number]
export function isPrimitive(type: string): type is Primitive {
  return (primitives as readonly string[]).includes(type)
}

export interface ThemeValue {
  type: 'theme'
  path: string // theme path
  index: number
}

export interface ThemeNamedValue {
  type: 'theme'
  path: string
  key: string
}
