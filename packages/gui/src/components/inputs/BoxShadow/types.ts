import { Color, Length } from '../../../types/css'
export interface BoxShadow {
  inset?: boolean
  offsetX: Length
  offsetY: Length
  spread: Length
  blur: Length
  color: Color
}

export const DEFAULT_BOX_SHADOW: BoxShadow = {
  offsetX: { value: 0, unit: 'px' },
  offsetY: { value: 0, unit: 'px' },
  spread: { value: 0, unit: 'px' },
  blur: { value: 0, unit: 'px' },
  color: 'transparent',
}
