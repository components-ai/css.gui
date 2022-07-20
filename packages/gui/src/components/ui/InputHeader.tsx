import { ReactNode } from 'react'
import {
  AlignJustify,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  X,
} from 'react-feather'
import { EditorPropsWithLabel } from '../../types/editor'
import { Label } from '../primitives'
import { useTheme } from '../providers/ThemeContext'
import IconButton from './IconButton'

interface Props extends Omit<EditorPropsWithLabel<any>, 'keywords'> {
  children?: ReactNode
  regenerate?(options: any): any
  onDrag?(): void
  onDragEnd?(): void
  reorder?: {
    onMoveUp?(): void
    onMoveDown?(): void
  }
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
  reorder,
  ruleset,
}: Props) {
  const theme = useTheme()
  return (
    <div
      sx={{
        display: 'flex',
        gap: 1,
        alignItems: 'center',
      }}
    >
      {onDrag && (
        <div
          draggable
          onDrag={onDrag}
          onDragEnd={onDragEnd}
          sx={{ mt: 1, color: 'muted', cursor: 'grab' }}
        >
          <AlignJustify size={16} />
        </div>
      )}
      {label && <Label>{label}</Label>}
      {children}
      <div sx={{ ml: 'auto', display: 'flex', gap: 1, alignItems: 'center' }}>
        {regenerate && (
          <IconButton
            data-type="regen-button"
            title="regenerate"
            sx={{ transition: 'opacity 150ms' }}
            onClick={() => {
              onChange(regenerate({ theme, previousValue: value, ruleset }))
            }}
          >
            <RefreshCw size={12} />
          </IconButton>
        )}
        {onRemove && <DeleteButton onRemove={onRemove} />}
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
    </div>
  )
}

interface DeleteButtonProps {
  onRemove(): void
}
export const DeleteButton = ({ onRemove }: DeleteButtonProps) => {
  return (
    <IconButton onClick={() => onRemove()}>
      <X size={14} strokeWidth={3} color="currentColor" />
    </IconButton>
  )
}
