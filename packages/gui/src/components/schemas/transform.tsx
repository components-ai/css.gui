import { listSchema } from './list'
import { functionSchema } from './function'
import { keyword, length, lengthPercentage, number } from './primitives'
import { tupleSchema } from './tuple'
import { objectSchema } from './object'
import { joinSchemas } from './joinSchemas'
import { angle } from './angle'
import { SchemaInput } from '../inputs/SchemaInput'
import { replace } from '../../lib/array'

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
  'translate3d',
  tupleSchema({
    // TODO 'z' axis should be  `length` only
    itemSchema: lengthPercentage(),
    labels: ['x', 'y', 'z'],
    linkable: false,
  })
)

const scaleNumber = number({ defaultValue: 1 })
const scale = functionSchema(
  'scale',
  tupleSchema({
    itemSchema: scaleNumber,
    labels: ['x', 'y'],
  })
)
const scaleX = functionSchema('scaleX', scaleNumber)
const scaleY = functionSchema('scaleY', scaleNumber)
const scaleZ = functionSchema('scaleZ', scaleNumber)
const scale3d = functionSchema(
  'scale3d',
  tupleSchema({
    itemSchema: scaleNumber,
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
    separator: ', ',
  })
)
const skewX = functionSchema('skewX', angle())
const skewY = functionSchema('skewY', angle())

// TODO restrict to first value
const perspective = functionSchema('perspective', length())

const matrixNumber = number()

const matrixLabels = ['a', 'b', 'c', 'd', 'tx', 'ty']
const matrix = functionSchema(
  'matrix',
  tupleSchema({
    itemSchema: number(),
    separator: ', ',
    labels: matrixLabels,
    linkable: false,
    defaultValue: [1, 0, 0, 1, 0, 0],
    input(props) {
      const { value, onChange } = props
      return (
        <div
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 3,
          }}
        >
          {[0, 1].flatMap((i) => {
            return [0, 1, 2].map((j) => {
              const index = 2 * j + i
              return (
                <SchemaInput
                  key={index}
                  schema={matrixNumber}
                  value={value[index]}
                  onChange={(newValue) => {
                    onChange(replace(value, index, newValue))
                  }}
                  label={matrixLabels[index]}
                />
              )
            })
          })}
        </div>
      )
    },
  })
)

const matrix3d = functionSchema(
  'matrix3d',
  tupleSchema({
    itemSchema: matrixNumber,
    separator: ',',
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
    defaultValue: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    linkable: false,
    input(props) {
      const { value, onChange } = props
      return (
        <div>
          {['a', 'b', 'c', 'd'].map((letter, i) => {
            return (
              <div sx={{ display: 'flex' }}>
                {[0, 1, 2, 3].map((j) => {
                  const index = 4 * i + j
                  return (
                    <SchemaInput
                      key={index}
                      schema={matrixNumber}
                      value={value[index]}
                      onChange={(newValue) => {
                        onChange(replace(value, index, newValue))
                      }}
                      label=""
                    />
                  )
                })}
              </div>
            )
          })}
        </div>
      )
    },
  })
)

const singleTransform = joinSchemas(
  [
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
  ],
  { type: 'transform' }
)

export const transform = joinSchemas([
  listSchema({
    itemSchema: singleTransform,
    separator: ' ',
  }),
  keyword(['none']),
])

export const transformOrigin = objectSchema({
  fields: {
    x: joinSchemas([keyword(['left', 'center', 'right']), lengthPercentage()]),
    y: joinSchemas([keyword(['top', 'center', 'bottom']), lengthPercentage()]),
    z: length(),
  },
})
