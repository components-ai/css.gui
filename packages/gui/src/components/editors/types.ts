export interface EditorProps<T> {
  value?: T
  onChange(newValue: T): void
}
