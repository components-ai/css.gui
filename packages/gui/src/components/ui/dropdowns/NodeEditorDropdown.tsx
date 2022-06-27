import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { Copy, Plus, MoreVertical, Trash } from 'react-feather'
import { DROPDOWN_ITEM_STYLES, DROPDOWN_STYLES } from './styles'

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
          all: 'unset',
          px: 3,
          lineHeight: 1,
          position: 'relative',
          top: '1px',
          color: 'muted',
        }}
      >
        <MoreVertical size={12} />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content sx={DROPDOWN_STYLES}>
        {false ? (
          <DropdownMenu.Item sx={{ display: 'none' }} onClick={onDuplicate}>
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
        ) : null}
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
