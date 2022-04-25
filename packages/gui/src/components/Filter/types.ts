import { Angle, Color, Length, NumberPercentage } from '../../types/css'

// TODO URLs
export type CSSFilter =
  | Blur
  | Brightness
  | Contrast
  | DropShadow
  | Grayscale
  | HueRotate
  | Invert
  | Opacity
  | Saturate
  | Sepia

interface Blur {
  type: 'blur'
  radius: Length
}

interface Brightness {
  type: 'brightness'
  amount: NumberPercentage
}

interface Contrast {
  type: 'contrast'
  amount: NumberPercentage
}

interface DropShadow {
  type: 'drop-shadow'
  offsetX: Length
  offsetY: Length
  blurRadius?: Length
  color?: Color
}

interface Grayscale {
  type: 'grayscale'
  amount: NumberPercentage
}

interface HueRotate {
  type: 'hue-rotate'
  angle: Angle
}

interface Invert {
  type: 'invert'
  amount: NumberPercentage
}

interface Opacity {
  type: 'opacity'
  amount: NumberPercentage
}

interface Saturate {
  type: 'saturate'
  amount: NumberPercentage
}

interface Sepia {
  type: 'sepia'
  amount: NumberPercentage
}
