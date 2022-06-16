import { stringifyUnit } from '../../lib/stringify'
import { getInputProps } from '../../lib/util'
import { LengthPercentage } from '../../types/css'
import { EditorPropsWithLabel } from '../../types/editor'
import { LengthInput } from '../inputs/LengthInput'
import { boxSideSchema } from './box-side'
import { listSchema } from './list'
import { functionSchema } from './function'
import { optionsSchema } from './options'
import { position } from './position'
import { keyword, lengthPercentage, string } from './primitives'
import { objectSchema } from './object'

const shapeRadius = lengthPercentage({
  keywords: ['closest-side', 'farthest-side'],
})

const inset = functionSchema(
  'inset',
  objectSchema({
    fields: {
      offset: boxSideSchema({
        itemSchema: lengthPercentage(),
      }),
      // TODO full border-radius syntax
      borderRadius: lengthPercentage(),
    },
    separator: ' round ',
  })
)

const circle = functionSchema(
  'circle',
  objectSchema({
    fields: {
      radius: shapeRadius,
      position: position,
    },
    separator: ' at ',
  })
)

const ellipse = functionSchema(
  'ellipse',
  objectSchema({
    fields: {
      rx: shapeRadius,
      ry: shapeRadius,
      position: position,
    },
    stringify: ({ rx, ry, position }) => `${rx} ${ry} at ${position}`,
  })
)

export type Point = { x: LengthPercentage; y: LengthPercentage }
function PointInput(props: EditorPropsWithLabel<Point>) {
  return (
    <div sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      <LengthInput percentage {...getInputProps(props, 'x')} />
      <LengthInput percentage {...getInputProps(props, 'y')} />
    </div>
  )
}

const polygon = functionSchema(
  'polygon',
  objectSchema({
    fields: {
      fillRule: keyword(['nonzero', 'evenodd']),
      points: listSchema({
        itemSchema: {
          input: PointInput,
          stringify: (point) =>
            `${stringifyUnit(point.x)} ${stringifyUnit(point.y)}`,
          defaultValue: {
            x: { value: 0, unit: 'px' },
            y: { value: 0, unit: 'px' },
          },
        },
      }),
    },
  })
)

const path = functionSchema('path', string())

export const basicShape = optionsSchema({
  variants: { inset, circle, ellipse, polygon, path },
  getType: (value) => value.name as any,
})
