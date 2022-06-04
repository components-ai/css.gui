import { ReactNode } from 'react'
import { ChevronDown, ChevronUp, X } from 'react-feather'
import { EditorPropsWithLabel } from '../../types/editor'
import { Label } from '../primitives'
import IconButton from './IconButton'

interface Props
  extends Omit<EditorPropsWithLabel<any>, 'value' | 'onChange' | 'keywords'> {
  children?: ReactNode
}

export function InputHeader({ children, label, onRemove, reorder }: Props) {
  return (
    <div sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
      {label && <Label>{label}</Label>}
      {children}
      <div sx={{ ml: 'auto' }}>
        {onRemove && <DeleteButton onRemove={onRemove} />}
      </div>
      {reorder && (
        <div
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifySelf: 'right',
            alignSelf: 'center',
            gap: '-0.5rem',
          }}
        >
          <IconButton disabled={!reorder.onMoveUp} onClick={reorder.onMoveUp}>
            <ChevronUp size={16} />
          </IconButton>
          <IconButton
            disabled={!reorder.onMoveDown}
            onClick={reorder.onMoveDown}
          >
            <ChevronDown size={16} />
          </IconButton>
        </div>
      )}
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
        mb: 1,
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
