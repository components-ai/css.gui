import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { MoreVertical, Trash } from 'react-feather'
import { DROPDOWN_ITEM_STYLES, DROPDOWN_STYLES } from './styles'

type FieldsetDropdownProps = {
  onRemove(): void
}
export const FieldsetDropdown = ({ onRemove }: FieldsetDropdownProps) => {
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
        <DropdownMenu.Item sx={DROPDOWN_ITEM_STYLES} onClick={onRemove}>
          <div
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Trash size={12} sx={{ color: 'muted', mr: 2 }} />{' '}
            <span>Delete group</span>
          </div>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
