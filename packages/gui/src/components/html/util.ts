import { unified } from 'unified'
import { visit } from 'unist-util-visit'
import { ComponentData, ElementPath, Slot } from './types'

export const isSamePath = (
  path1: ElementPath | null,
  path2: ElementPath | null
) => {
  if (!path1 || !path2) {
    return false
  }

  return path1.join('-') === path2.join('-')
}

export const getSlots = (value: ComponentData) => {
  let slots: Slot[] = []
  unified()
    .use(() => (tree: any) => {
      visit(tree, 'slot', (node: any) => {
        slots.push(node)
      })
    })
    .runSync(value.value)

  return slots
}
