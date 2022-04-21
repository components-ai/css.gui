import * as CSS from 'csstype'

export type ColorObject = {
  id?: string
  value: string
  themePath?: string
}

export type Color = string

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
}
export const enum ThemeUnits {
  Theme = 'theme',
}

// Only use a subset for now to keep things simpler
export type LengthUnit =
  | FontRelativeLengthUnits.Em
  | FontRelativeLengthUnits.Rem
  | AbsoluteLengthUnits.Px
export type LengthPercentageUnit = LengthUnit | PercentageLengthUnits.Pct
export type FullLengthUnit =
  | FontRelativeLengthUnits.Em
  | FontRelativeLengthUnits.Rem
  | AbsoluteLengthUnits.Px
  | PercentageLengthUnits.Pct
  | UnitlessUnits.Number
  | ThemeUnits.Theme

export type CSSUnitValue = {
  value: number | string
  unit: string,
  themeId?: string
}
export type GenericLength = '0'
export type Length = CSSUnitValue | GenericLength
export type ResponsiveLength = Length[]
export type CSSKeywordValue = {
  value: string
}

export type Styles = CSS.PropertiesFallback
