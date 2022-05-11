import { Box, Position } from '../../../types/css'
import { BgSize } from '../BgSizeInput'
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

export interface RepeatStyle {
  x: Repeat
  y: Repeat
}

export const repeatKeywords = ['repeat', 'space', 'round', 'no-repeat'] as const
type Repeat = typeof repeatKeywords[number]

export const attachmentKeywords = ['scroll', 'fixed', 'local'] as const
type Attachment = typeof attachmentKeywords[number]
