import { image } from './image'
import { joinSchemas } from './joinSchemas'
import { listSchema } from './list'
import { keyword, string } from './primitives'

const quote = keyword(
  ['open-quote', 'close-quote', 'no-open-quote', 'no-close-quote'],
  { type: '<quote>' }
)

const contentEntry = joinSchemas(
  // 'string' needs to appear last because otherwise it'll clobber the keyword types
  // TODO counter() | counters()
  [image, quote, keyword(['contents']), string()],
  {
    type: '<content>',
    defaultType: 'string',
  }
)
const contentList = listSchema({ itemSchema: contentEntry })

// TODO element() function
// TODO '/ [alt text]' notation
export const content = joinSchemas([contentList, keyword(['normal', 'none'])])
