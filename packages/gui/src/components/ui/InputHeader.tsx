import { ReactNode } from 'react'
import { X } from 'react-feather'
import { EditorPropsWithLabel } from '../../types/editor'
import { Label } from '../primitives'
import IconButton from './IconButton'

interface Props
  extends Omit<EditorPropsWithLabel<any>, 'value' | 'onChange' | 'keywords'> {
  children?: ReactNode
}

export function InputHeader({ children, label, onRemove }: Props) {
  return (
    <div sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      <Label>{label}</Label>
      {children}
      <div sx={{ ml: 'auto' }}>
        {onRemove && <DeleteButton onRemove={onRemove} />}
      </div>
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
