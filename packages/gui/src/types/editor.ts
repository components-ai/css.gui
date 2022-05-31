export interface EditorProps<T> {
  value: T
  onChange(newValue: T): void
  /**
   * Indicates whether the input is a top-level input (ie. not a sub-input)
   * and indicates it should be populated with things like global keywords.
   */
  topLevel?: boolean
  onRemove?(): void
}

export type EditorPropsWithLabel<T> = EditorProps<T> & { label: string }
