export const linquisticPseudoClasses = ['dir', 'lang'] as const
export const locationPseudoClasses = [
  'any-link',
  'link',
  'visited',
  'local-link',
  'target',
  'target-within',
  'scope',
] as const
export const userActionPseudoClasses = [
  'hover',
  'active',
  'focus',
  'focus-visible',
  'focus-within',
] as const
export const timeDimensionalPseudoClasses = [
  'current',
  'past',
  'future',
] as const
export const resourceStatePseudoClasses = ['playing', 'paused'] as const
export const inputPseudoClasses = [
  'autofill',
  'enabled',
  'disabled',
  'read-only',
  'read-write',
  'placeholder-shown',
  'default',
  'checked',
  'indeterminate',
  'blank',
  'valid',
  'invalid',
  'in-range',
  'out-of-range',
  'required',
  'optional',
  'user-invalid',
] as const
export const treeStructuralPseudoClasses = [
  'root',
  'empty',
  'nth-child',
  'nth-last-child',
  'first-child',
  'last-child',
  'only-child',
  'nth-of-type',
  'nth-last-of-type',
  'only-of-type',
] as const
export const pseudoClasses = [
  ...linquisticPseudoClasses,
  ...locationPseudoClasses,
  ...userActionPseudoClasses,
  ...timeDimensionalPseudoClasses,
  ...resourceStatePseudoClasses,
  ...inputPseudoClasses,
  ...treeStructuralPseudoClasses,
] as const
