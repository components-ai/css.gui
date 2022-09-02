import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { Copy, Plus, MoreVertical, Trash } from 'react-feather'
import { DROPDOWN_ITEM_STYLES, DROPDOWN_STYLES } from './styles'
import IconButton from '../IconButton'

type NodeEditorDropdownProps = {
  onRemove(): void
  onWrap(): void
  onDuplicate(): void
}
export const NodeEditorDropdown = ({
  onRemove,
  onWrap,
  onDuplicate,
}: NodeEditorDropdownProps) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger
      sx={{
        p: 1,
        mr: 2,
        appearance: 'none',
        WebkitAppearance: 'none',
        background: 'backgroundOffset',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        color: 'muted',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'color .2s ease-in-out',
        ':hover': {
          color: 'text',
        },
        ':disabled': {
          opacity: '50%',
          cursor: 'initial',
        },
      }}
      >
        <MoreVertical size={15} />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content sx={DROPDOWN_STYLES}>
        <DropdownMenu.Item sx={DROPDOWN_ITEM_STYLES} onClick={onDuplicate}>
          <div
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Copy size={12} sx={{ color: 'muted', mr: 2 }} />{' '}
            <span>Duplicate</span>
          </div>
        </DropdownMenu.Item>
        <DropdownMenu.Item sx={DROPDOWN_ITEM_STYLES} onClick={onWrap}>
          <div
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Plus size={12} sx={{ color: 'muted', mr: 2 }} />{' '}
            <span>Add parent element</span>
          </div>
        </DropdownMenu.Item>
        <DropdownMenu.Item sx={DROPDOWN_ITEM_STYLES} onClick={onRemove}>
          <div
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Trash size={12} sx={{ color: 'muted', mr: 2 }} />{' '}
            <span>Remove</span>
          </div>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
