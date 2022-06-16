import { defaultBreakpoints } from '@theme-ui/css'
import { isEmpty } from 'lodash-es'
import { HtmlNode } from '../../components/html/types'
import { Styles } from '../../types/css'
import { Theme } from '../../types/theme'
import { stringifyUnit } from '../stringify'
import { isNestedSelectorWithSyntax } from '../util'
import { extractStyles } from './extract-styles'
import { stringifyCSSObject } from './stringify-css-object'
import { toCSSObject } from './to-css-object'

const DEFAULT_BREAKPOINTS_COUNT = defaultBreakpoints.length

const getStylesByBreakpoint = (obj: any, breakpoint: number): any => {
  return Object.entries(obj).reduce((acc: any, curr: [string, any]) => {
    const [key, value] = curr
    if (isNestedSelectorWithSyntax(key)) {
      const stylesByBreakpoint = getStylesByBreakpoint(value, breakpoint)

      if (isEmpty(stylesByBreakpoint)) {
        return acc
      }

      return {
        ...acc,
        [key]: getStylesByBreakpoint(value, breakpoint),
      }
    }

    if (breakpoint === 0) {
      return {
        ...acc,
        [key]: Array.isArray(value) ? value[0] : value,
      }
    }

    if (Array.isArray(value)) {
      return {
        ...acc,
        [key]: value[breakpoint] ?? null,
      }
    }

    return acc
  }, {})
}

const partitionStylesByBreakpoints = (
  obj: any,
  breakpointsCount: number
): any[] => {
  const byBreakpoints: any[] = Array(breakpointsCount).fill(null)

  return byBreakpoints.map((_: any, index: number) => {
    return getStylesByBreakpoint(obj, index)
  })
}

type CSSOptions = {
  selector?: string
  theme?: Theme
}
export const css = (
  styles: Styles,
  { theme, selector = '.css-gui-element' }: CSSOptions = {}
) => {
  const breakpointsCount =
    theme?.breakpoints?.length || DEFAULT_BREAKPOINTS_COUNT
  const obj: any = toCSSObject(styles, theme)
  const byBreakpoints = partitionStylesByBreakpoints(obj, breakpointsCount)

  const cssStrings = byBreakpoints
    .map((styles: any, index: number) => {
      if (!styles || isEmpty(styles)) {
        return null
      }

      const stylesForBreakpoint = stringifyCSSObject(styles, selector)

      if (index === 0) {
        return stylesForBreakpoint
      } else if (isEmpty(stylesForBreakpoint)) {
        return null
      } else {
        const themeBreakpoint = theme?.breakpoints?.[index]
        const breakpoint = themeBreakpoint
          ? stringifyUnit(themeBreakpoint)
          : defaultBreakpoints[index]

        return `@media screen (min-width: ${breakpoint}) {
          ${stylesForBreakpoint}
        }`
      }
    })
    .filter(Boolean)

  return cssStrings.join('\n\n')
}
