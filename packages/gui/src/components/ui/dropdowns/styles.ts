export const DROPDOWN_STYLES: any = {
  backgroundColor: 'background',
  color: 'text',
  borderRadius: 8,
  border: 'thin solid',
  borderColor: 'border',
  width: 256,
  py: 1,
  position: 'relative',
}

export const DROPDOWN_ITEM_STYLES: any = {
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

export const DROPDOWN_SEPARATOR_STYLES: any = {
  my: 1,
  borderTop: 'thin solid',
  borderColor: 'border',
}
