import { THEME_SCALES } from './constants'

export const isThemeable = (property?: string): boolean =>
  !!THEME_SCALES[property || '']
