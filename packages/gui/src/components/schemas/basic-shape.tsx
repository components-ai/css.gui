import { stringifyUnit } from '../../lib/stringify'
import { getInputProps } from '../../lib/util'
import { LengthPercentage } from '../../types/css'
import { EditorPropsWithLabel } from '../../types/editor'
import { LengthInput } from '../inputs/LengthInput'
import { boxSideSchema } from './boxSide'
import { listSchema } from './list'
import { objectSchema } from './object'
import { optionsSchema } from './options'
import { position } from './position'
import { keyword, lengthPercentage, string } from './primitives'

const shapeRadius = lengthPercentage({
  keywords: ['closest-side', 'farthest-side'],
})

const inset = objectSchema({
  fields: {
    offset: boxSideSchema({
      itemSchema: lengthPercentage(),
    }),
    // TODO full border-radius syntax
    borderRadius: lengthPercentage(),
  },
  separator: ' round ',
})

const circle = objectSchema({
  fields: {
    radius: shapeRadius,
    position: position,
  },
  separator: ' at ',
})

const ellipse = objectSchema({
  fields: {
    rx: shapeRadius,
    ry: shapeRadius,
    position: position,
  },
  stringify: ({ rx, ry, position }) => `${rx} ${ry} at ${position}`,
})

export type Point = { x: LengthPercentage; y: LengthPercentage }
function PointInput(props: EditorPropsWithLabel<Point>) {
  return (
    <div sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      <LengthInput percentage {...getInputProps(props, 'x')} />
      <LengthInput percentage {...getInputProps(props, 'y')} />
    </div>
  )
}

const polygon = objectSchema({
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
      separator: ', ',
    }),
  },
  separator: ', ',
})

const path = objectSchema({
  fields: { path: string() },
})

export const basicShape = optionsSchema({
  variants: { inset, circle, ellipse, polygon, path },
  stringify: (variant, value) => `${variant}(${value})`,
})
