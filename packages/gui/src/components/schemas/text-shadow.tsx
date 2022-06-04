import { listSchema } from './list'
import { objectSchema } from './object'
import { color, length } from './primitives'

const singleTextShadow = objectSchema({
  fields: {
    color: color(),
    offsetX: length(),
    offsetY: length(),
    blur: length({ range: 'nonnegative' }),
  },
})

export const textShadow = listSchema({
  itemSchema: singleTextShadow,
  thumbnail: Thumbnail,
  keywords: ['none'],
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
      <div sx={{ textShadow: value, fontWeight: 'bold' }}>Aa</div>
    </div>
  )
}
