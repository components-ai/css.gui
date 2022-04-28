interface BaseGradient {
  type: string
  stops: GradientStop[]
}

export interface GradientStop {
  color: string
  hinting: number
}

export interface LinearGradient extends BaseGradient {
  type: 'linear' | 'repeating-linear'
  degrees: number
}

export interface RadialGradient extends BaseGradient {
  type: 'radial' | 'repeating-radial'
  locationX: number
  locationY: number
  shape: 'circle' | 'ellipse'
}

export interface ConicGradient extends BaseGradient {
  type: 'conic' | 'repeating-conic'
  locationX: number
  locationY: number
  degrees: number
}

export type Gradient = LinearGradient | RadialGradient | ConicGradient

export type GradientList = Gradient[]
