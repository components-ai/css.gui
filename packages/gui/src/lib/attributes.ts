import { ATTRIBUTE_MAP, GLOBAL_ATTRIBUTES } from '../data/attributes'

export const getAttributesForElement = (element: string) => {
  return ATTRIBUTE_MAP[element] || GLOBAL_ATTRIBUTES
}
