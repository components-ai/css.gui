import { isEmpty, kebabCase } from 'lodash-es'
import { isCSSClass } from '../classes'
import { isElement } from '../elements'
import { addPseudoSyntax, hasPseudoSyntax, isPseudo } from '../pseudos'

export const objectToDecls = (obj: any): string => {
  return Object.entries(obj)
    .map(([key, value]: [string, any]) => {
      return `  ${kebabCase(key)}: ${value};`
    })
    .filter(Boolean)
    .join('\n')
}

const flattenCSSObject = (
  styles: any,
  selector: string
): Record<string, any> => {
  let cssDeclGroups: Record<string, any> = {}
  cssDeclGroups[selector] = {}

  Object.entries(styles).forEach(([key, value]: [string, any]) => {
    if (isElement(key)) {
      const fullSelector = selector + ' ' + key
      const flattenedGroups = flattenCSSObject(value, fullSelector)
      cssDeclGroups = {
        ...cssDeclGroups,
        ...flattenedGroups,
      }
      return
    } else if (isPseudo(key) || hasPseudoSyntax(key)) {
      const fullSelector = selector + addPseudoSyntax(key)
      const flattenedGroups = flattenCSSObject(value, fullSelector)
      cssDeclGroups = {
        ...cssDeclGroups,
        ...flattenedGroups,
      }
      return
    } else if (isCSSClass(key)) {
      const fullSelector = selector + ' ' + key
      const flattenedGroups = flattenCSSObject(value, fullSelector)
      cssDeclGroups = {
        ...cssDeclGroups,
        ...flattenedGroups,
      }
      return
    }

    cssDeclGroups[selector] = {
      ...cssDeclGroups[selector],
      [key]: value,
    }
  })

  return cssDeclGroups
}

export const stringifyCSSObject = (styles: any, selector: string): string => {
  const cssDeclGroups = flattenCSSObject(styles, selector)

  return Object.entries(cssDeclGroups)
    .map(([key, value]: [string, any]) => {
      if (isEmpty(value)) {
        return null
      }

      return `${key} {
${objectToDecls(value)}
}`
    })
    .filter(Boolean)
    .join('\n\n')
}
