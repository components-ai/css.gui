import { objectSchema } from './object'
import { keyword } from './primitives'

export const alignItems = keyword([
  'center',
  'start',
  'end',
  'flex-start',
  'flex-end',
  'normal',
  'stretch',
  'self-start',
  'self-end',
  'baseline',
  'first baseline',
  'last baseline',
  'safe center',
  'unsafe center',
  'safe right',
  'unsafe right',
  'safe end',
  'unsafe end',
  'safe self-end',
  'unsafe self-end',
  'safe flex-end',
  'unsafe flex-end',
])

export const justifyItems = keyword([
  'center',
  'start',
  'end',
  'flex-start',
  'flex-end',
  'normal',
  'stretch',
  'self-start',
  'self-end',
  'left',
  'right',
  'baseline',
  'first baseline',
  'last baseline',
  'safe center',
  'unsafe center',
  // TODO legacy values
])

export const placeItems = objectSchema({
  fields: {
    align: alignItems,
    justify: justifyItems,
  },
})

export const alignContent = keyword([
  'center',
  'start',
  'end',
  'flex-start',
  'flex-end',
  'normal',
  'baseline',
  'first baseline',
  'last baseline',
  'space-between',
  'space-around',
  'space-evenly',
  'stretch',
  'safe center',
  'unsafe center',
])

export const justifyContent = keyword([
  'start',
  'center',
  'end',
  'space-between',
  'space-around',
  'space-evenly',
  'flex-start',
  'flex-end',
  'left',
  'right',
  'normal',
  'stretch',
  'safe center',
  'unsafe center',
])

export const placeContent = objectSchema({
  fields: {
    align: alignContent,
    justify: justifyContent,
  },
})

export const alignSelf = keyword([
  'auto',
  'center',
  'start',
  'end',
  'flex-start',
  'flex-end',
  'normal',
  'stretch',
  'baseline',
  'first baseline',
  'last baseline',
  'space-between',
  'space-around',
  'space-evenly',
  'safe center',
  'unsafe center',
])

export const justifySelf = keyword([
  'normal',
  'stretch',
  'center',
  'start',
  'end',
  'flex-start',
  'flex-end',
  'self-start',
  'self-end',
  'left',
  'right',
  'baseline',
  'first baseline',
  'last baseline',
  'safe center',
  'unsafe center',
])

export const placeSelf = objectSchema({
  fields: {
    align: alignSelf,
    justify: justifySelf,
  },
})
