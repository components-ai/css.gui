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

export const enum ThemeUnits {
  Theme = 'theme',
}

// Only use a subset for now to keep things simpler
export type LengthUnit =
  | FontRelativeLengthUnits.Em
  | FontRelativeLengthUnits.Rem
  | AbsoluteLengthUnits.Px

export type LengthPercentageUnit = LengthUnit | PercentageLengthUnits.Pct

export interface Length {
  value: number
  unit: string
}

export type ResponsiveLength = Length[]

export interface CSSUnitValue {
  value: number
  unit: string
}

export interface CSSKeywordValue {
  value: string
}

export type Color = string
