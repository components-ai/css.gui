import { stringifyFunction } from '../../../lib/stringify'
import { stringifyGradient } from '../Gradient/stringify'
import { ImageSource } from './types'

export function stringifyImageSource(imageSource: ImageSource | ImageSource[]) {
  if (Array.isArray(imageSource)) {
    return imageSource.map(stringifyEntry).join(', ')
  }
  return stringifyEntry(imageSource)
}

function stringifyEntry(imageSource: ImageSource) {
  const { type } = imageSource
  switch (type) {
    case 'gradient': {
      return stringifyGradient(imageSource.gradient)
    }
    case 'url':
    default:
      return stringifyFunction(type, imageSource.arguments)
  }
}
