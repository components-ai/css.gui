import { properties } from '../data/properties'

export function getDefaultValue(property: string) {
  const propertyDefinition = properties[property] ?? {}
  // If a default value is defined, return it
  if (propertyDefinition.defaultValue) {
    return propertyDefinition.defaultValue
  }
  switch (propertyDefinition.input) {
    case 'keyword':
      return { value: propertyDefinition.keywords![0], unit: 'keyword' }
    case 'number':
    case 'integer':
      return { value: 0, unit: 'number' }
    case 'length':
      return { value: 0, unit: 'px' }
    case 'percentage':
      return { value: 0, unit: '%' }
    case 'time':
      return { value: 0, unit: 's' }
    case 'string':
      return { value: '', unit: 'string' }
    case 'color':
      return 'inherit'
    case 'position':
      return {
        x: { value: 0, unit: '%' },
        y: { value: 0, unit: '%' },
      }
  }
}
