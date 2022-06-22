import { RegenOptions } from '../components/schemas/types'

export interface EditorProps<T, K = never> {
  value: T | K
  onChange(newValue: T | K): void
  /**
   * A list of keywords that are applicable to this input
   */
  keywords?: K[]
  onRemove?(): void
  reorder?: {
    onMoveUp?(): void
    onMoveDown?(): void
  }
  regenerate?(options: RegenOptions<T | K>): T | K
}

export type EditorPropsWithLabel<T, K = never> = EditorProps<T, K> & {
  label: string
}
