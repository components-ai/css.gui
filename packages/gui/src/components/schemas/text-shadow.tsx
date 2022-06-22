import { color } from './color'
import { joinSchemas } from './joinSchemas'
import { listSchema } from './list'
import { objectSchema } from './object'
import { keyword, length } from './primitives'

const singleTextShadow = objectSchema({
  fields: {
    color: color(),
    offsetX: length(),
    offsetY: length(),
    blur: length({ range: 'nonnegative' }),
  },
})

export const textShadow = joinSchemas([
  keyword(['none']),
  listSchema({ itemSchema: singleTextShadow }),
])

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
      <div sx={{ textShadow: value, fontWeight: 'bold' }}>Aa</div>
    </div>
  )
}
