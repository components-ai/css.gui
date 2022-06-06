import { properties } from '../data/properties'

export function getDefaultValue(property: string) {
  const propertyDefinition = properties[property] ?? {}
  // If a default value is defined, return it
  return propertyDefinition.defaultValue
}
