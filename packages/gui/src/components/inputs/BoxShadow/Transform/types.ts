import { Angle, Length } from '../../../../types/css'

export type Transform =
  | Matrix
  | Matrix3D
  | Perspective
  | Rotate
  | Rotate3D
  | Scale
  | Skew
  | Translate
export type TransformType = Transform['type']

export interface Matrix {
  type: 'matrix'
  a: number
  b: number
  c: number
  d: number
  tx: number
  ty: number
}

export interface Matrix3D {
  type: 'matrix3d'
  values: number[] // should be 16 length
}

export interface Perspective {
  type: 'perspective'
  d: Length
}

export interface Rotate {
  type: 'rotate' | 'rotateX' | 'rotateY' | 'rotateZ'
  a: Angle
}

export interface Rotate3D {
  type: 'rotate3d'
  a: Angle
  // All these should be between 0 and 1
  x: number
  y: number
  z: number
}

export interface Scale {
  type: 'scale' | 'scale3d' | 'scaleX' | 'scaleY' | 'scaleZ'
  // TODO apparently this might be allowed to be percentages?
  sx: number
  sy: number
  sz: number
}

export interface Skew {
  type: 'skew' | 'skewX' | 'skewY'
  ax: Angle
  ay: Angle
}

export interface Translate {
  type: 'translate' | 'translate3d' | 'translateX' | 'translateY' | 'translateZ'
  tx: LengthPercentage
  ty: LengthPercentage
  tz: Length
}

// These are typed the same now, but we make the distinction that percentages aren't allowed
type LengthPercentage = Length
