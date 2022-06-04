import { GridLine, GridLineInput, stringifyGridLine } from '../inputs/GridLine'
import { DataTypeSchema } from './types'

const gridLine: DataTypeSchema<GridLine> = {
  input: GridLineInput,
  stringify: stringifyGridLine,
  defaultValue: { position: 0, ident: '' },
}

export const gridColumnStart = gridLine
export const gridRowStart = gridLine
export const gridColumnEnd = gridLine
export const gridRowEnd = gridLine

// TODO gridRow, gridColumn, gridArea
