import { LengthPercentage } from '../../../types/css'

export type TrackSize = TrackBreadth | MinMax | FitContent

export interface TrackBreadth {
  type: 'breadth'
  value: LengthPercentage // + fr
}

export interface MinMax {
  type: 'minmax'
  min: LengthPercentage
  max: LengthPercentage
}

export interface FitContent {
  type: 'fit-content'
  value: LengthPercentage
}
