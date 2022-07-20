export interface EditorProps<T, K = never> {
  value: T | K
  onChange(newValue: T | K): void
  onRemove?(): void
  ruleset?: any
  property?: string
}

export type EditorPropsWithLabel<T, K = never> = EditorProps<T, K> & {
  label: string
}
