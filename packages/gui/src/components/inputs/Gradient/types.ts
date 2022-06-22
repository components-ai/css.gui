import { Angle, Color, Position } from '../../../types/css'
import { ThemeColor } from '../../primitives/ColorPicker/PalettePicker'

interface BaseGradient {
  type: string
  stops: GradientStop[]
}

export interface GradientStop {
  color: Color | ThemeColor
  hinting: number // TODO units
}

export interface LinearGradient extends BaseGradient {
  type: 'linear' | 'repeating-linear'
  angle: Angle
}

export interface RadialGradient extends BaseGradient {
  type: 'radial' | 'repeating-radial'
  position: Position
  shape: 'circle' | 'ellipse'
}

export interface ConicGradient extends BaseGradient {
  type: 'conic' | 'repeating-conic'
  position: Position
  angle: Angle
}

export type Gradient = LinearGradient | RadialGradient | ConicGradient
