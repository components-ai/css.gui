import { Angle, Color, Length, NumberPercentage } from '../../types/css'

// TODO URLs
export type Filter = Blur | DropShadow | HueRotate | AmountFilter

export interface Blur {
  type: 'blur'
  radius: Length
}

export interface DropShadow {
  type: 'drop-shadow'
  offsetX: Length
  offsetY: Length
  blurRadius: Length
  color: Color
}

export interface HueRotate {
  type: 'hue-rotate'
  angle: Angle
}

// A filter with a single number-percentage amount
export interface AmountFilter {
  type:
    | 'brightness'
    | 'contrast'
    | 'grayscale'
    | 'invert'
    | 'opacity'
    | 'saturate'
    | 'sepia'
  amount: NumberPercentage
}
