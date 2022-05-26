import { Color } from '../../types/css'
import { SelectInput } from '../inputs/SelectInput'
import { ColorPopover } from '../primitives'
import { DataTypeSchema } from './data-type'

export const color: DataTypeSchema<Color> = {
  component: ColorPopover,
  stringify: (value) => value,
  defaultValue: 'transparent',
}

export function keywordSchema<T extends string>(
  options: readonly T[]
): { schema: DataTypeSchema<T>; props: any } {
  return {
    schema: {
      component: SelectInput as any,
      stringify: (value) => value,
      defaultValue: options[0],
    },
    props: { options },
  }
}

// export const keyword: DataTypeSchema<string> = {
//   component: SelectInput as any,
//   stringify: (value) => value,
//   // FIXME uh oh.
//   defaultValue: (props) => props.options[0],
// }
