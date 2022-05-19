export interface EditorProps<T> {
  value: T
  onChange(newValue: T): void
  onRemove?(): void
}

export type EditorPropsWithLabel<T> = EditorProps<T> & { label: string }
