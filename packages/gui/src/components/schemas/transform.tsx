import { listSchema } from './list'
import { functionSchema } from './function'
import { optionsSchema } from './options'
import { angle, length, lengthPercentage, number } from './primitives'
import { tupleSchema } from './tuple'
import { objectSchema } from './object'
import { withKeywords } from './withKeywords'

const translate = functionSchema(
  'translate',
  tupleSchema({
    itemSchema: lengthPercentage(),
    labels: ['x', 'y'],
  })
)
const translateX = functionSchema('translateX', lengthPercentage())
const translateY = functionSchema('translateY', lengthPercentage())
const translateZ = functionSchema('translateZ', lengthPercentage())
const translate3d = functionSchema(
  'trnaslate3d',
  tupleSchema({
    // TODO 'z' axis should be  `length` only
    itemSchema: lengthPercentage(),
    labels: ['x', 'y', 'z'],
    linkable: false,
  })
)

const scale = functionSchema(
  'scale',
  tupleSchema({
    itemSchema: number(),
    labels: ['x', 'y'],
  })
)
const scaleX = functionSchema('scaleX', number())
const scaleY = functionSchema('scaleY', number())
const scaleZ = functionSchema('scaleZ', number())
const scale3d = functionSchema(
  'scale3d',
  tupleSchema({
    itemSchema: number(),
    labels: ['x', 'y', 'z'],
    linkable: false,
  })
)

const rotate = functionSchema('rotate', angle())
const rotateX = functionSchema('rotateX', angle())
const rotateY = functionSchema('rotateY', angle())
const rotateZ = functionSchema('rotateZ', angle())
const rotate3d = functionSchema(
  'rotate3d',
  objectSchema({
    fields: {
      value: tupleSchema({
        itemSchema: number(),
        labels: ['x', 'y', 'z'],
        linkable: false,
        separator: ', ',
      }),
      angle: angle(),
    },
  })
)

const skew = functionSchema(
  'skew',
  tupleSchema({
    itemSchema: angle(),
    labels: ['x', 'y'],
  })
)
const skewX = functionSchema('skewX', angle())
const skewY = functionSchema('skewY', angle())

// TODO restrict to first value
const perspective = functionSchema('perspective', length())

const matrix = functionSchema(
  'matrix',
  tupleSchema({
    itemSchema: number(),
    labels: ['a', 'b', 'c', 'd', 'tx', 'ty'],
    linkable: false,
  })
)

const matrix3d = functionSchema(
  'matrix3d',
  tupleSchema({
    itemSchema: number(),
    labels: [
      'a1',
      'b1',
      'c1',
      'd1',
      'a2',
      'b2',
      'c2',
      'd2',
      'a3',
      'b3',
      'c3',
      'd3',
      'a4',
      'b4',
      'c4',
      'd4',
    ],
    linkable: false,
  })
)

const singleTransform = optionsSchema({
  variants: {
    translate,
    translateX,
    translateY,
    translateZ,
    translate3d,
    scale,
    scaleX,
    scaleY,
    scaleZ,
    scale3d,
    rotate,
    rotateX,
    rotateY,
    rotateZ,
    rotate3d,
    skew,
    skewX,
    skewY,
    perspective,
    matrix,
    matrix3d,
  },
  getType(value) {
    return value.name as any
  },
})

export const transform = withKeywords(
  ['none'],
  listSchema({
    itemSchema: singleTransform,
    separator: ' ',
  })
)

export const transformOrigin = objectSchema({
  fields: {
    x: lengthPercentage({ keywords: ['left', 'center', 'right'] }),
    y: lengthPercentage({ keywords: ['top', 'center', 'bottom'] }),
    z: length(),
  },
})
