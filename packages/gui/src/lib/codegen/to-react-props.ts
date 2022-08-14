import * as propInfo from 'property-information'
import { stringifySlotInProp } from './util'

const SCHEMA = 'html' as unknown as propInfo.Schema

type Props = Record<string, any>
export const toReactProps = ({ outerProps, ...props }: Props): Props => {
  return Object.entries(props).reduce((acc, curr) => {
    const [key, value] = curr

    // There are other "magic" properties that can be passed like
    // css/sx which cause property-information to error because
    // it only understands HTML spec-compliant attributes.
    try {
      const info = propInfo.find(SCHEMA, key)
      const propName = info.property || key

      return {
        [propName]: stringifySlotInProp(value, outerProps),
        ...acc,
      }
    } catch (e) {
      return {
        [key]: stringifySlotInProp(value, outerProps),
        ...acc,
      }
    }
  }, {})
}
