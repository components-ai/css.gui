import { elements, voidElements } from '../data/elements'

export const isElement = (str: string): boolean => {
  return !!elements.filter((el) => str === el).length
}

export const isVoidElement = (str: string): boolean => {
  return !!voidElements.filter((el) => str === el).length
}

const PROSE_ELEMENTS = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']
export const isProseElement = (str: string): boolean => {
  return PROSE_ELEMENTS.includes(str)
}
