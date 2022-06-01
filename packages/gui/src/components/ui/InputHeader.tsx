import { X } from 'react-feather'
import { EditorPropsWithLabel } from '../../types/editor'
import { Label } from '../primitives'
import IconButton from './IconButton'

type Props = Omit<EditorPropsWithLabel<any>, 'value' | 'onChange'>

export function InputHeader({ label, onRemove }: Props) {
  return (
    <div sx={{ display: 'flex' }}>
      <Label>{label}</Label>
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
