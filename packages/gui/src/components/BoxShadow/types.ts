import { Color, Length } from '../../types/css'
export interface BoxShadow {
  inset?: boolean
  offsetX: Length
  offsetY: Length
  spread: Length
  blur: Length
  color: Color
}
