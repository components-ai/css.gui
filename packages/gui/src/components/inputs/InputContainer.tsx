import { ReactNode } from 'react'
import { X } from 'react-feather'
import { EditorPropsWithLabel } from '../../types/editor'
import { Label } from '../primitives'
import { KeywordSelect } from '../primitives/KeywordSelect'
import IconButton from '../ui/IconButton'

interface Props<T, K> extends EditorPropsWithLabel<T, K> {
  stringify(value: T): string
  input: ReactNode
}

/**
 * Contains an input and decorates it with common input functionality
 * like keywords.
 */
export function InputContainer<T, K extends string = never>(
  props: Props<T, K>
) {
  const { value, onChange, onRemove, label, input, keywords = [] } = props
  const isKeyword = typeof value === 'string'
  return (
    <div>
      <div sx={{ display: 'flex', gap: 2 }}>
        <Label>{label}</Label>
        <div>
          {isKeyword && (
            <KeywordSelect<K>
              value={value as any}
              onChange={onChange}
              options={keywords}
            />
          )}
        </div>
        <div sx={{ ml: 'auto' }}>
          {onRemove && <DeleteButton onRemove={onRemove} />}
        </div>
      </div>
      {!isKeyword && input}
    </div>
  )
}

interface DeleteButtonProps {
  onRemove(): void
}
export const DeleteButton = ({ onRemove }: DeleteButtonProps) => {
  return (
    <IconButton
      sx={{
        cursor: 'pointer',
        color: 'muted',
        transition: '.2s color ease-in-out',
        ':hover': {
          color: 'text',
        },
      }}
      onClick={() => onRemove()}
    >
      <X size={14} strokeWidth={3} color="currentColor" />
    </IconButton>
  )
}
