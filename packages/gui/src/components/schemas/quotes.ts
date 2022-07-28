import { listSchema } from './list'
import { string } from './primitives'
import { tupleSchema } from './tuple'

export const quotes = listSchema({
  itemSchema: tupleSchema({
    itemSchema: string(),
    labels: ['open', 'close'],
    linkable: false,
    separator: ' ',
  }),
  separator: ' ',
})
