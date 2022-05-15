export const initialStyles: any = {
  color: '#ff00ff',
  backgroundColor: '#000000',
  borderColor: 'goldenrod',
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
    color: '#333333',
    backgroundColor: '#ff00ff',
    borderColor: '#ffffff',
  },
  'focus': {
    color: '#333333',
    backgroundColor: '#ff00ff',
    borderColor: '#ffffff',
  },
  'visited': {
    color: '#333333',
    backgroundColor: '#ff00ff',
    borderColor: '#ffffff',
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
