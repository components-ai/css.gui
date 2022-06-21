import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { MoreVertical, Trash } from 'react-feather'

const DROPDOWN_STYLES: any = {
  backgroundColor: 'background',
  color: 'text',
  borderRadius: 8,
  border: 'thin solid',
  borderColor: 'border',
  width: 256,
  py: 1,
  position: 'relative',
}

const DROPDOWN_ITEM_STYLES: any = {
  px: 3,
  py: 2,
  color: 'text',
  fontSize: [0, 1, 1],
  fontWeight: 500,
  lineHeight: 1,
  textDecoration: 'none',
  transition: '.25s color ease-in-out',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  ':hover': {
    outline: 'none',
    border: 'none',
    color: 'primary',
  },
}

const DROPDOWN_SEPARATOR_STYLES: any = {
  my: 1,
  borderTop: 'thin solid',
  borderColor: 'border',
}

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
