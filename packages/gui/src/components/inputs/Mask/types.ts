import { GeometryBox, Position } from '../../../types/css'
import { RepeatStyle } from '../Background/types'
import { BgSize } from '../BgSizeInput'
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
