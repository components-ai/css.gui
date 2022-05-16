import { Color, Length } from '../../../types/css'

export interface TextShadow {
  offsetX: Length
  offsetY: Length
  blur: Length
  color: Color
}

export const DEFAULT_TEXT_SHADOW: TextShadow = {
  offsetX: { value: 0, unit: 'px' },
  offsetY: { value: 0, unit: 'px' },
  blur: { value: 0, unit: 'px' },
  color: 'transparent',
}
