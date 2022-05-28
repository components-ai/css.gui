import { URLInput } from '../primitives/URLInput'
import { DataTypeSchema } from './compose'

type URL = string
export function url({
  defaultValue = 'https://unsplash.com/random',
}: { defaultValue?: URL } = {}): DataTypeSchema<URL> {
  return {
    input: URLInput,
    stringify: (value) => `url("${value}")`,
    defaultValue,
  }
}
