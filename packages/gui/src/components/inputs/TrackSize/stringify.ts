import { stringifyFunction, stringifyPrimitive } from '../../../lib/stringify'
import { TrackSize } from './types'

export function stringifyTrackSizeList(trackSizeList: TrackSize[]) {
  return trackSizeList.map(stringifyTrackSize).join(' ')
}

export function stringifyTrackSize(trackSize: TrackSize) {
  switch (trackSize.type) {
    case 'breadth':
      return stringifyPrimitive(trackSize.value)
    case 'minmax':
      return stringifyFunction(trackSize.type, [trackSize.min, trackSize.max])
    case 'fit-content':
      return stringifyFunction(trackSize.type, [trackSize.value])
  }
}
