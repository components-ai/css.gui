import { Color, LengthPercentage, Position } from '../../../types/css'
import { ImageSource } from '../ImageSource/types'

export interface Background {
  attachment: Attachment
  clip: Box | 'text'
  // TODO background color for final layer
  // color: Color
  image: ImageSource
  origin: Box
  position: Position
  repeat: RepeatStyle
  size: BgSize
}

// TODO cover | contain keywords
export interface BgSize {
  x: LengthPercentage
  y: LengthPercentage
}

export const boxKeywords = ['border-box', 'padding-box', 'content-box'] as const
type Box = typeof boxKeywords[number]

export interface RepeatStyle {
  x: Repeat
  y: Repeat
}

export const repeatKeywords = ['repeat', 'space', 'round', 'no-repeat'] as const
type Repeat = typeof repeatKeywords[number]

export const attachmentKeywords = ['scroll', 'fixed', 'local'] as const
type Attachment = typeof attachmentKeywords[number]
