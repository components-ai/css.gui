export interface EditorProps<T> {
  value: T
  onChange(newValue: T): void
  label?: string
}

export type EditorPropsWithLabel<T> = EditorProps<T> & { label: string }
