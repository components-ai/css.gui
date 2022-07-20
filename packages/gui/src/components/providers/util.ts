import { cloneDeep, isNil, get, set as _set, unset, toPath } from 'lodash-es'
import { KeyArg, KeyPath, Recipe } from './types'
export { get }

export function joinPath(path1: KeyArg, path2: KeyArg): KeyPath {
  return [...toPath(path1), ...toPath(path2)]
}

export function parentPath(path: KeyPath): KeyPath {
  const parentPath = [...path]
  parentPath.pop()
  return parentPath
}

// lib/util's set and get functions don't handle the case
// of setting a nested path when parent paths don't exist,
// so we make our own functions for now
export function set(obj: any, key: KeyArg, value: any) {
  return _set(cloneDeep(obj), key, value)
}

export function remove(obj: any, key: KeyArg) {
  const copy = cloneDeep(obj)
  unset(copy, key)
  return copy
}

export function applyRecipe<V>(
  draft: object,
  field: KeyArg,
  recipe: Recipe<V>
) {
  if (typeof recipe === 'function') {
    const currentValue = get(draft, field)
    // Apply the recipe to the current value of the field
    const newValue = (recipe as any)(currentValue)
    // If it's a pure function, update the draft with the new value
    if (!isNil(newValue)) {
      _set(draft, field, newValue)
    }
    // Otherwise, assume it mutated the draft directly
  } else {
    // If received a value, just set that field in the draft
    _set(draft, field, recipe)
  }
}
