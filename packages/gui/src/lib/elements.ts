import { elements, voidElements } from '../data/elements'

export const isElement = (str: string): boolean => {
  return !!elements.filter((el) => str === el).length
}

export const isVoidElement = (str: string): boolean => {
  return !!voidElements.filter((el) => str === el).length
}
