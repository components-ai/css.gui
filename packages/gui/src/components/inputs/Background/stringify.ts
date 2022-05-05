import { stringifyPosition, stringifyValues } from '../../../lib/stringify'
import { stringifyBgSize } from '../BgSizeInput'
import { stringifyImageSource } from '../ImageSource/stringify'
import { Background, RepeatStyle } from './types'

export function stringifyBackgroundList(backgrounds: Background[]) {
  return backgrounds.map(stringifyBackground).join(', ')
}

export function stringifyBackground(background: Background) {
  const { attachment, clip, image, origin, position, repeat, size } = background
  return stringifyValues([
    stringifyImageSource(image),
    stringifyPosition(position),
    `/ ${stringifyBgSize(size)}`,
    stringifyRepeatStyle(repeat),
    attachment,
    origin,
    clip,
  ])
}

export function stringifyRepeatStyle(repeat: RepeatStyle) {
  return `${repeat.x} ${repeat.y}`
}
