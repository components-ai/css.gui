import { PercentageLengthUnits } from '../types/css'
import { globalKeywords } from './global-keywords'

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
      ...globalKeywords,
    ],
  },
  margin: {
    [PercentageLengthUnits.Pct]: true,
    keywords: globalKeywords,
  },
  padding: {
    [PercentageLengthUnits.Pct]: true,
    keywords: globalKeywords,
  },
}
