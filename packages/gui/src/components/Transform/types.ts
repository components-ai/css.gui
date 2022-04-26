import { Angle, Length } from '../../types/css'

export type Transform =
  | Matrix
  | Matrix3D
  | Perspective
  | Rotate
  | Rotate3D
  | Scale
  | Skew
  | Translate

interface Matrix {
  type: 'matrix'
  a: number
  b: number
  c: number
  d: number
  tx: number
  ty: number
}

interface Matrix3D {
  type: 'matrix3d'
  values: number[] // should be 16 length
}

interface Perspective {
  type: 'perspective'
  d: Length
}

interface Rotate {
  type: 'rotate' | 'rotateX' | 'rotateY' | 'rotateZ'
  a: Angle
}

interface Rotate3D {
  type: 'rotate3d'
  a: Angle
  // All these should be between 0 and 1
  x: number
  y: number
  z: number
}

interface Scale {
  type: 'scale' | 'scale3d' | 'scaleX' | 'scaleY' | 'scaleZ'
  // TODO apparently this might be allowed to be percentages?
  sx: number
  sy: number
  sz: number
}

interface Skew {
  type: 'skew' | 'skewX' | 'skewY'
  ax: Angle
  ay: Angle
}

interface Translate {
  type:
    | 'translate'
    | 'translate3d'
    | 'translateX'
    | 'transtlateY'
    | 'translateZ'
  tx: LengthPercentage
  ty: LengthPercentage
  tz: Length
}

// These are typed the same now, but we make the distinction that percentages aren't allowed
type LengthPercentage = Length
