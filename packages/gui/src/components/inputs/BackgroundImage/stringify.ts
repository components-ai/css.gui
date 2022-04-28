import { stringifyFunction } from '../../../lib/stringify'
import { stringifyGradient } from '../Gradient/stringify'
import { BackgroundImage } from './types'

export function stringifyBackgroundImage(
  backgroundImage: BackgroundImage | BackgroundImage[]
) {
  if (Array.isArray(backgroundImage)) {
    return backgroundImage.map(stringifyEntry).join(', ')
  }
  return stringifyEntry(backgroundImage)
}

function stringifyEntry(backgroundImage: BackgroundImage) {
  const { type } = backgroundImage
  switch (type) {
    case 'gradient': {
      return stringifyGradient(backgroundImage.gradient)
    }
    case 'url':
    default:
      return stringifyFunction(type, backgroundImage.arguments)
  }
}
