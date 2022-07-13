import { ElementPath } from './types'

export const isSamePath = (
  path1: ElementPath | null,
  path2: ElementPath | null
) => {
  if (!path1 || !path2) {
    return false
  }

  return path1.join('-') === path2.join('-')
}
