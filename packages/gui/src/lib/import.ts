import { v4 as uuid } from 'uuid'
import { Color } from '../types/css'

type ColorGroupArray = Array<Color>
type ColorObject = {
  [name: string]: Color | ColorGroupArray
}

/**
 * Turn a system-ui color object into an internally compatible shape
 *
 * {
 *   gray: ['#000', '#111', '#999'],
 *   tomato: 'tomato'
 * }
 */
export const importColors = (colors: ColorObject) => {
  return Object.entries(colors).map(([name, group]) => {
    if (!Array.isArray(group)) {
      return {
        id: uuid(),
        name,
        colors: [
          {
            id: uuid(),
            value: group,
          },
        ],
      }
    }

    return {
      id: uuid(),
      name,
      colors: group.map((value) => {
        return {
          id: uuid(),
          value: value,
        }
      }),
    }
  })
}
