import { CheckboxInput } from '../inputs/CheckboxInput'
import { listSchema } from './list'
import { objectSchema } from './object'
import { color, length } from './primitives'
import { DataTypeSchema } from './types'

const inset: DataTypeSchema<boolean> = {
  defaultValue: false,
  input: CheckboxInput,
  stringify: (value) => (value ? 'inset' : ''),
}

const singleBoxShadow = objectSchema({
  fields: {
    inset,
    color: color(),
    offsetX: length(),
    offsetY: length(),
    // TODO ensure this is positive
    blur: length(),
    spread: length(),
  },
})

export const boxShadow = listSchema({
  itemSchema: singleBoxShadow,
  thumbnail: Thumbnail,
})

function Thumbnail({ value }: { value: string }) {
  return (
    <div
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div sx={{ width: '1rem', height: '1rem', boxShadow: value }} />
    </div>
  )
}
