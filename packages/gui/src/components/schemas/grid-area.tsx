import { GridLine, GridLineInput, stringifyGridLine } from '../inputs/GridLine'
import { DataTypeSchema } from './types'

const gridLine: DataTypeSchema<GridLine> = {
  type: '<grid-line>',
  input: GridLineInput,
  stringify: stringifyGridLine,
  defaultValue: { position: 0, ident: '' },
  validate: ((value: any) => {
    if (typeof value !== 'object') return false
    return (
      (!value.span || typeof value.span === 'boolean') &&
      typeof value.position === 'number' &&
      typeof value.ident === 'string'
    )
  }) as any,
}

export const gridColumnStart = gridLine
export const gridRowStart = gridLine
export const gridColumnEnd = gridLine
export const gridRowEnd = gridLine

// TODO gridRow, gridColumn, gridArea
