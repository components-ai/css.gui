import { GLOBAL_KEYWORDS } from './global-keywords'

type PropertyData = {
  type: string
  percentage?: boolean
  number?: boolean
  keywords: Array<string>
  minValue?: number
  maxValue?: number
}

export const getPropertyData = (property?: string): PropertyData | null => {
  const propertyData = properties[property || '']
  return propertyData ?? null
}

const properties: Record<string, PropertyData> = {
  borderWidth: {
    type: 'length',
    keywords: ['thin', 'medium', 'thick', ...GLOBAL_KEYWORDS],
  },
  fontSize: {
    type: 'length',
    percentage: true,
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
  fontStretch: {
    type: 'percentage',
    keywords: [
      'ultra-condensed',
      'extra-condensed',
      'condensed',
      'semi-condensed',
      'normal',
      'semi-expanded',
      'expanded',
      'extra-expanded',
      'ultra-expanded',
      ...GLOBAL_KEYWORDS,
    ],
    minValue: 50,
    maxValue: 200,
  },
  lineHeight: {
    type: 'length',
    percentage: true,
    number: true,
    keywords: ['normal', ...GLOBAL_KEYWORDS],
  },
  margin: {
    type: 'length',
    percentage: true,
    keywords: GLOBAL_KEYWORDS,
  },
  padding: {
    type: 'length',
    percentage: true,
    keywords: GLOBAL_KEYWORDS,
  },
}
