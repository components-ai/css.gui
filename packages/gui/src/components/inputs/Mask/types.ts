import { Position } from '../../../types/css'
import { BgSize, boxKeywords, RepeatStyle } from '../Background/types'
import { ImageSource } from '../ImageSource/types'

export interface Mask {
  clip: GeometryBox | 'no-clip'
  composite: CompositeOperator
  image: ImageSource
  mode: MaskingMode
  origin: GeometryBox
  position: Position
  repeat: RepeatStyle
  size: BgSize
}

export const maskingModes = ['alpha', 'luminance', 'match-source'] as const
type MaskingMode = typeof maskingModes[number]

export const compositingOperators = [
  'add',
  'subtract',
  'intersect',
  'exclude',
] as const
type CompositeOperator = typeof compositingOperators[number]

export const geometryBoxKeywords = [
  ...boxKeywords,
  'margin-box',
  'fill-box',
  'stroke-box',
  'view-box',
] as const
type GeometryBox = typeof geometryBoxKeywords[number]
