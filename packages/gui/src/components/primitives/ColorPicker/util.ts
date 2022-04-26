import { isNil } from 'lodash-es'
import * as culori from 'culori'

type Color = string

export function hasAlpha(color: string) {
  if (!isValidColor(color)) {
    return false
  }
  const { alpha = 1 } = culori.parse(color)
  return alpha !== 1
}

export function isValidColor(value: Color) {
  return !!culori.parse(value)
}

export function getColorMode(color: string) {
  if (color?.startsWith('#')) {
    return 'hex'
  } else if (color?.startsWith('rgb')) {
    return 'rgb'
  } else if (color?.startsWith('hsl')) {
    return 'hsl'
  } else if (color?.startsWith('color(display-p3')) {
    return 'p3'
  } else if (color?.startsWith('lab')) {
    return 'lab'
  } else if (color?.startsWith('lch')) {
    return 'lch'
  }
  return 'hex'
}

export function format(value: any, mode: string) {
  switch (mode) {
    case 'hex':
      if (isNil(value.alpha) || value.alpha === 1) {
        return culori.formatHex(value)
      } else {
        return culori.formatHex8(value)
      }
    case 'rgb':
      return culori.formatRgb(value)
    case 'hsl':
      return culori.formatHsl(value)
    case 'lab': {
      const { l, a, b, alpha } = culori.lab(value)
      return culori.formatCss({
        mode: 'lab',
        l: Math.round(l),
        a: round(a, 2),
        b: round(b, 2),
        alpha: round(alpha, 2),
      })
    }
    case 'lch': {
      const { l, c, h, alpha } = culori.lch(value)
      return culori.formatCss({
        mode: 'lch',
        l: Math.round(l),
        c: Math.round(c),
        h: Math.round(h),
        alpha: round(alpha, 2),
      })
    }
    case 'p3': {
      const { r, g, b, alpha } = culori.p3(value)
      return culori.formatCss({
        mode: 'p3',
        r: round(r, 2),
        b: round(b, 2),
        g: round(g, 2),
        alpha: round(alpha, 2),
      })
    }
  }
  return ''
}

export function round(num: number, precision: number) {
  return Math.round(num * 10 ** precision) / 10 ** precision
}

export function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(max, val))
}

/**
 * given `color` and the CSS styling block, generate a version of that block
 * that has fallbacks if color formats are not supported.
 */
export function withFallback(color: string, block: (color: string) => object) {
  if (getColorMode(color) === 'p3') {
    return {
      '@supports (color: color(display-p3 1 1 1))': {
        ...block(color),
      },
      // for fallback, calculate the nearest sRGB color
      ...block(culori.formatRgb(color)),
    }
  } else if (getColorMode(color) === 'lch') {
    return {
      '@supports (color: lch(0% 0 0))': {
        ...block(color),
      },
      // for fallback, calculate the nearest sRGB color
      ...block(culori.formatRgb(color)),
    }
  } else if (getColorMode(color) === 'lab') {
    return {
      '@supports (color: lab(0% 0 0))': {
        ...block(color),
      },
      // for fallback, calculate the nearest sRGB color
      ...block(culori.formatRgb(color)),
    }
  }
  // If it's not a special color mode, just use the color itself
  return block(color)
}
