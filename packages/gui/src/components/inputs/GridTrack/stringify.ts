import { stringifyFunction } from '../../../lib/stringify'
import {
  stringifyTrackSize,
  stringifyTrackSizeList,
} from '../TrackSize/stringify'
import { GridTrack, TrackRepeat } from './types'

export function stringifyGridTrackList(trackList: GridTrack[]) {
  return trackList.map(stringifyGridTrack).join(' ')
}

export function stringifyGridTrack(track: GridTrack) {
  switch (track.type) {
    case 'repeat':
      return stringifyTrackRepeat(track)
    default:
      return stringifyTrackSize(track)
  }
}

function stringifyTrackRepeat(track: TrackRepeat) {
  const { type, count, trackList } = track
  return stringifyFunction(type, [count, stringifyTrackSizeList(trackList)])
}
