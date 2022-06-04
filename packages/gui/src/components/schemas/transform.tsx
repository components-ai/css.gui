import { listSchema } from './list'
import { objectSchema } from './object'
import { optionsSchema } from './options'
import { angle, length, lengthPercentage, number } from './primitives'
import { tupleSchema } from './tuple'

const translate = objectSchema({
  fields: {
    value: tupleSchema({
      itemSchema: lengthPercentage(),
      labels: ['x', 'y'],
      separator: ', ',
    }),
  },
})
const translateX = objectSchema({
  fields: { value: lengthPercentage() },
})
const translateY = objectSchema({
  fields: { value: lengthPercentage() },
})
const translateZ = objectSchema({
  fields: { value: length() },
})
const translate3d = objectSchema({
  fields: {
    value: tupleSchema({
      // TODO 'z' axis should be  `length` only
      itemSchema: lengthPercentage(),
      labels: ['x', 'y', 'z'],
      linkable: false,
      separator: ', ',
    }),
  },
})

const scale = objectSchema({
  fields: {
    value: tupleSchema({
      itemSchema: number(),
      labels: ['x', 'y'],
      separator: ', ',
    }),
  },
})
const scaleX = objectSchema({
  fields: { value: number() },
})
const scaleY = objectSchema({
  fields: { value: number() },
})
const scaleZ = objectSchema({
  fields: { value: number() },
})
const scale3d = objectSchema({
  fields: {
    value: tupleSchema({
      itemSchema: number(),
      labels: ['x', 'y', 'z'],
      linkable: false,
      separator: ', ',
    }),
  },
})

const rotate = objectSchema({
  fields: { value: angle() },
})
const rotateX = objectSchema({
  fields: { value: angle() },
})
const rotateY = objectSchema({
  fields: { value: angle() },
})
const rotateZ = objectSchema({
  fields: { value: angle() },
})
const rotate3d = objectSchema({
  fields: {
    value: tupleSchema({
      itemSchema: number(),
      labels: ['x', 'y', 'z'],
      linkable: false,
      separator: ', ',
    }),
    angle: angle(),
  },
  separator: ', ',
})

const skew = objectSchema({
  fields: {
    value: tupleSchema({
      itemSchema: angle(),
      labels: ['x', 'y'],
      separator: ', ',
    }),
  },
})
const skewX = objectSchema({
  fields: { value: angle() },
})
const skewY = objectSchema({
  fields: { value: angle() },
})

const perspective = objectSchema({
  fields: { value: length() },
})

const matrix = objectSchema({
  fields: {
    // TODO custom input
    value: tupleSchema({
      itemSchema: number(),
      labels: ['a', 'b', 'c', 'd', 'tx', 'ty'],
      linkable: false,
      separator: ', ',
    }),
  },
})

const matrix3d = objectSchema({
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
      separator: ', ',
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
  stringify: (variant, value) => `${variant}(${value})`,
})

export const transform = listSchema({
  itemSchema: singleTransform,
  separator: '',
})

export const transformOrigin = objectSchema({
  fields: {
    x: lengthPercentage({ keywords: ['left', 'center', 'right'] }),
    y: lengthPercentage({ keywords: ['top', 'center', 'bottom'] }),
    z: length(),
  },
})
