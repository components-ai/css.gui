import { ReactNode } from 'react'
import { RefreshCw, X } from 'react-feather'
import { EditorPropsWithLabel } from '../../types/editor'
import { Label } from '../primitives'
import { useTheme } from '../providers/ThemeContext'
import IconButton from './IconButton'

interface Props extends Omit<EditorPropsWithLabel<any>, 'keywords'> {
  children?: ReactNode
  regenerate?(options: any): any
  onDrag?(): void
  onDragEnd?(): void
}

export function InputHeader({
  children,
  label,
  value,
  onChange,
  onRemove,
  onDrag,
  onDragEnd,
  regenerate,
  ruleset,
  property,
}: Props) {
  const theme = useTheme()
  return (
    <div
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {onDrag && (
        <div
          draggable
          onDrag={onDrag}
          onDragEnd={onDragEnd}
          sx={{ mr: 1, color: 'muted', cursor: 'grab', height: '10px', width: '10px' }}
        >
          <svg viewBox="0 0 10 10" width='100%' height='100%' fill='currentColor' sx={{ display: 'block'}}>
            <path d="M3,2 C2.44771525,2 2,1.55228475 2,1 C2,0.44771525 2.44771525,0 3,0 C3.55228475,0 4,0.44771525 4,1 C4,1.55228475 3.55228475,2 3,2 Z M3,6 C2.44771525,6 2,5.55228475 2,5 C2,4.44771525 2.44771525,4 3,4 C3.55228475,4 4,4.44771525 4,5 C4,5.55228475 3.55228475,6 3,6 Z M3,10 C2.44771525,10 2,9.55228475 2,9 C2,8.44771525 2.44771525,8 3,8 C3.55228475,8 4,8.44771525 4,9 C4,9.55228475 3.55228475,10 3,10 Z M7,2 C6.44771525,2 6,1.55228475 6,1 C6,0.44771525 6.44771525,0 7,0 C7.55228475,0 8,0.44771525 8,1 C8,1.55228475 7.55228475,2 7,2 Z M7,6 C6.44771525,6 6,5.55228475 6,5 C6,4.44771525 6.44771525,4 7,4 C7.55228475,4 8,4.44771525 8,5 C8,5.55228475 7.55228475,6 7,6 Z M7,10 C6.44771525,10 6,9.55228475 6,9 C6,8.44771525 6.44771525,8 7,8 C7.55228475,8 8,8.44771525 8,9 C8,9.55228475 7.55228475,10 7,10 Z" />
          </svg>
        </div>
      )}
      {label && <Label sx={{ mr: 3 }}>{label}</Label>}
      {children}
      <div sx={{ ml: 'auto', pl: 2, mr: 0, display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'space-between' }}>
        {regenerate && (
          <IconButton
            data-type="regen-button"
            title="Regenerate"
            sx={{ transition: 'opacity 150ms' }}
            onClick={() => {
              onChange(
                regenerate({ theme, previousValue: value, ruleset, property })
              )
            }}
          >
            <RefreshCw size={15} strokeWidth={2} />
          </IconButton>
        )}
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
    <IconButton onClick={() => onRemove()}>
      <X size={16} strokeWidth={3} color="currentColor" sx={{ display: 'block' }}/>
    </IconButton>
  )
}
