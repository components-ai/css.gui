import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { MoreVertical, Trash } from 'react-feather'
import { DROPDOWN_ITEM_STYLES, DROPDOWN_STYLES } from './styles'
import IconButton from '../IconButton'

type EditorDropdownProps = {
  onClearStyles(): void
}
export const EditorDropdown = ({ onClearStyles }: EditorDropdownProps) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger
        sx={{
          all: 'unset',
          lineHeight: 1,
          position: 'relative',
          color: 'muted',
        }}
      >
        <IconButton sx={{ ml: 2 }}>
          <MoreVertical size={16} />
        </IconButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content sx={DROPDOWN_STYLES}>
        <DropdownMenu.Item sx={DROPDOWN_ITEM_STYLES} onClick={onClearStyles}>
          <div
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Trash size={12} sx={{ color: 'muted', mr: 2 }} />{' '}
            <span>Clear all styles</span>
          </div>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
