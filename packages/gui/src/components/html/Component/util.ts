import { ComponentData } from '../types'

export const mergeComponentAttributes = (value: ComponentData) => {
  const attributes = {
    ...(value.value.attributes || {}),
    ...(value.attributes || {}),
  }

  return attributes
}
