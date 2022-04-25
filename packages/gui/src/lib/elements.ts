import { elements } from '../data/elements'

export const isElement = (str: string): boolean => {
  return !!elements.filter((el) => str).length
}
