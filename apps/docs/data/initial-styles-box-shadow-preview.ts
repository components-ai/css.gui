export const initialStyles: any = {
  boxShadow: [
    {
      inset: false,
      spread: { value: 8, unit: 'px' },
      blur: { value: 0, unit: 'px' },
      offsetX: { value: 0, unit: 'px' },
      offsetY: { value: 0, unit: 'px' },
      color: { value: '#6465ff' },
    },
  ],
  'hover': {
    boxShadow: [
      {
        inset: false,
        spread: { value: 8, unit: 'px' },
        blur: { value: 0, unit: 'px' },
        offsetX: { value: 8, unit: 'px' },
        offsetY: { value: 8, unit: 'px' },
        color: { value: '#f6e857'},
      },
      {
        inset: false,
        spread: { value: 8, unit: 'px' },
        blur: { value: 0, unit: 'px' },
        offsetX: { value: -8, unit: 'px' },
        offsetY: { value: -8, unit: 'px' },
        color: { value: '#6016ee' },
      },
    ],
  }
}
