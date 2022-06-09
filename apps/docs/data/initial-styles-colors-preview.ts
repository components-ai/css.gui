export const initialStyles: any = {
  color: { value: '#ff00ff' },
  backgroundColor: { value: '#000000' },
  borderColor: { value: 'goldenrod' },
  borderWidth: {
    value: '24',
    unit: 'px',
  },
  borderStyle: 'solid',
  fontSize: {
    value: 12,
    unit: 'rem',
  },
  'hover': {
    color: { value: '#333333' },
    backgroundColor: { value: '#ff00ff' },
    borderColor: { value: '#ffffff'},
  },
  'focus': {
    color: { value: '#333333' },
    backgroundColor: { value: '#ff00ff' },
    borderColor: { value: '#ffffff'},
  },
  'visited': {
    color: { value: '#333333' },
    backgroundColor: { value: '#ff00ff' },
    borderColor: { value: '#ffffff'},
  },
  transition: [
    {
      timingFunction: {
        type: 'cubic-bezier',
        p1: .16,
        p2: .67,
        p3: .83,
        p4: .67,
      },
      property: 'all',
      duration: { value: 250, unit: 'ms' },
      delay: { value: 0, unit: 'ms' },
    },
  ],
}
