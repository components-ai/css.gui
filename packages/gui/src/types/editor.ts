export interface EditorProps<T, K = never> {
  value: T | K
  onChange(newValue: T | K): void
  /**
   * A list of keywords that are applicable to this input
   */
  keywords?: K[]
  /**
   * Indicates whether the input is a top-level input (ie. not a sub-input)
   * and indicates it should be populated with things like global keywords.
   */
  topLevel?: boolean
  onRemove?(): void
  reorder?: {
    onMoveUp?(): void
    onMoveDown?(): void
  }
  onRegenerate?(): void
}

export type EditorPropsWithLabel<T, K = never> = EditorProps<T, K> & {
  label: string
}
