import { elements } from '../data/elements'

export const isElement = (str: string): boolean => {
  const els = elements.filter((el) => str === el)
  console.log(els, str)
  return !!elements.filter((el) => str === el).length
}
