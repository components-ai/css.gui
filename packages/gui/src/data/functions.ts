export const transformFunctions = [
  'matrix',
  'matrix3d',
  'perspective',
  'rotate',
  'rotate3d',
  'rotatex',
  'rotatey',
  'rotatez',
  'scale',
  'scale3d',
  'scalex',
  'scaley',
  'scalez',
  'skew',
  'skewx',
  'skewy',
  'skewz',
  'translate',
  'translate3d',
  'translatex',
  'translatey',
  'translatez',
] as const
export const mathFunctions = ['calc', 'clamp', 'max', 'min'] as const
export const filterFunctions = [
  'blur',
  'brightness',
  'contrast',
  'drop-shadow',
  'grayscale',
  'hue-rotate',
  'invert',
  'opacity',
  'saturate',
  'sepia',
] as const
export const colorFunctions = [
  'color',
  'color-mix',
  'color-contrast',
  'device-cmyk',
  'hsl',
  'hsla',
  'hwb',
  'lab',
  'lch',
  'rgb',
  'rgba',
] as const
export const imageFunctions = [
  'conic-gradient',
  'image',
  'image-set',
  'linear-gradient',
  'radial-gradient',
  'repeating-linear-gradient',
  'repeating-radial-gradient',
  'repeating-conic-gradient',
  'cross-fade',
  'element',
  'paint',
] as const
export const counterFunctions = ['counter', 'counters', 'symbols'] as const
export const shapeFunctions = [
  'circle',
  'ellipse',
  'inset',
  'polygon',
  'path',
] as const
export const referenceFunctions = ['attr', 'env', 'url', 'var'] as const
export const functions = [
  ...transformFunctions,
  ...mathFunctions,
  ...filterFunctions,
  ...colorFunctions,
  ...imageFunctions,
  ...counterFunctions,
  ...shapeFunctions,
  ...referenceFunctions,
] as const
