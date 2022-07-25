import { ComponentData, Slot } from '../types'

export const mergeComponentAttributes = (value: ComponentData) => {
  const attributes = {
    ...(value.value.attributes || {}),
    ...(value.attributes || {}),
  }

  return attributes
}

export const updateSlotForComponentInstance = (
  value: ComponentData,
  slotValue: Slot
) => {
  const props = value.props || {}
  return {
    ...value,
    props: {
      ...props,
      [slotValue.name]: slotValue.value,
    },
  }
}
