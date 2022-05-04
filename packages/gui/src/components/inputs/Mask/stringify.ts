import { stringifyPosition, stringifyValues } from '../../../lib/stringify'
import { stringifyRepeatStyle, stringifySize } from '../Background/stringify'
import { stringifyImageSource } from '../ImageSource/stringify'
import { Mask } from './types'

export function stringifyMaskList(maskList: Mask[]) {
  return maskList.map(stringifyMask).join(', ')
}

function stringifyMask(mask: Mask) {
  const { clip, image, origin, position, repeat, size, composite, mode } = mask
  return stringifyValues([
    stringifyImageSource(image),
    stringifyPosition(position),
    `/ ${stringifySize(size)}`,
    stringifyRepeatStyle(repeat),
    origin,
    clip,
    composite,
    mode,
  ])
}
