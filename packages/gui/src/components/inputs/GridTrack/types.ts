import { CSSUnitValue } from '../../../types/css'
import { TrackSize } from '../TrackSize/types'

export type GridTrack = TrackSize | TrackRepeat

// TODO track names
export interface TrackRepeat {
  type: 'repeat'
  count: number // TODO change to accept keywords
  trackList: TrackSize[]
}
