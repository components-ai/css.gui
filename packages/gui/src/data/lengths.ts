import { PercentageLengthUnits } from '../types/css'
import { GLOBAL_KEYWORDS } from './global-keywords'

export const properties = {
  fontSize: {
    [PercentageLengthUnits.Pct]: true,
    keywords: [
      'xx-small',
      'x-small',
      'small',
      'medium',
      'large',
      'x-large',
      'xx-large',
      'xxx-large',
      'smaller',
      'larger',
      ...GLOBAL_KEYWORDS,
    ],
  },
  margin: {
    [PercentageLengthUnits.Pct]: true,
    keywords: GLOBAL_KEYWORDS,
  },
  padding: {
    [PercentageLengthUnits.Pct]: true,
    keywords: GLOBAL_KEYWORDS,
  },
}
