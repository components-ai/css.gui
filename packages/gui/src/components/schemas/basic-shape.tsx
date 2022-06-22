import { getInputProps } from '../../lib/util'
import { LengthPercentage } from '../../types/css'
import { EditorPropsWithLabel } from '../../types/editor'
import { LengthInput } from '../inputs/LengthInput'
import { boxSideSchema } from './box-side'
import { listSchema } from './list'
import { functionSchema } from './function'
import { position } from './position'
import { keyword, length, lengthPercentage, string } from './primitives'
import { objectSchema } from './object'
import { joinSchemas } from './joinSchemas'

const shapeRadius = joinSchemas([
  keyword(['closest-side', 'farthest-side']),
  lengthPercentage(),
])

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
        itemSchema: objectSchema({
          fields: { x: length(), y: length() },
        }),
      }),
    },
  })
)

const path = functionSchema('path', string())

export const basicShape = joinSchemas([inset, circle, ellipse, polygon, path])
