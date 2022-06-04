import { listSchema } from './list'
import { functionSchema } from './function'
import { optionsSchema } from './options'
import { angle, length, lengthPercentage, number } from './primitives'
import { tupleSchema } from './tuple'
import { objectSchema } from './object'

const translate = functionSchema('translate', {
  fields: {
    value: tupleSchema({
      itemSchema: lengthPercentage(),
      labels: ['x', 'y'],
    }),
  },
})
const translateX = functionSchema('translateX', {
  fields: { value: lengthPercentage() },
})
const translateY = functionSchema('translateY', {
  fields: { value: lengthPercentage() },
})
const translateZ = functionSchema('translateZ', {
  fields: { value: length() },
})
const translate3d = functionSchema('trnaslate3d', {
  fields: {
    value: tupleSchema({
      // TODO 'z' axis should be  `length` only
      itemSchema: lengthPercentage(),
      labels: ['x', 'y', 'z'],
      linkable: false,
    }),
  },
})

const scale = functionSchema('scale', {
  fields: {
    value: tupleSchema({
      itemSchema: number(),
      labels: ['x', 'y'],
    }),
  },
})
const scaleX = functionSchema('scaleX', {
  fields: { value: number() },
})
const scaleY = functionSchema('scaleY', {
  fields: { value: number() },
})
const scaleZ = functionSchema('scaleZ', {
  fields: { value: number() },
})
const scale3d = functionSchema('scale3d', {
  fields: {
    value: tupleSchema({
      itemSchema: number(),
      labels: ['x', 'y', 'z'],
      linkable: false,
    }),
  },
})

const rotate = functionSchema('rotate', {
  fields: { value: angle() },
})
const rotateX = functionSchema('rotateX', {
  fields: { value: angle() },
})
const rotateY = functionSchema('rotateY', {
  fields: { value: angle() },
})
const rotateZ = functionSchema('rotateZ', {
  fields: { value: angle() },
})
const rotate3d = functionSchema('rotate3d', {
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

const skew = functionSchema('skew', {
  fields: {
    value: tupleSchema({
      itemSchema: angle(),
      labels: ['x', 'y'],
    }),
  },
})
const skewX = functionSchema('skewX', {
  fields: { value: angle() },
})
const skewY = functionSchema('skewY', {
  fields: { value: angle() },
})

const perspective = functionSchema('perspective', {
  fields: { value: length() },
})

const matrix = functionSchema('matrix', {
  fields: {
    // TODO custom input
    value: tupleSchema({
      itemSchema: number(),
      labels: ['a', 'b', 'c', 'd', 'tx', 'ty'],
      linkable: false,
    }),
  },
})

const matrix3d = functionSchema('matrix3d', {
  fields: {
    // TODO custom input
    value: tupleSchema({
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
    }),
  },
})

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
})

export const transform = listSchema({
  itemSchema: singleTransform,
  separator: ' ',
})

export const transformOrigin = objectSchema({
  fields: {
    x: lengthPercentage({ keywords: ['left', 'center', 'right'] }),
    y: lengthPercentage({ keywords: ['top', 'center', 'bottom'] }),
    z: length(),
  },
})
