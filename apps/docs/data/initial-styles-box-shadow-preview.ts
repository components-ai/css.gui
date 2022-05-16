export const initialStyles: any = {
  boxShadow: [
    {
      inset: false,
      spread: { value: 8, unit: 'px' },
      blur: { value: 0, unit: 'px' },
      offsetX: { value: 0, unit: 'px' },
      offsetY: { value: 0, unit: 'px' },
      color: '#6465ff',
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
        color: '#f6e857',
      },
      {
        inset: false,
        spread: { value: 8, unit: 'px' },
        blur: { value: 0, unit: 'px' },
        offsetX: { value: -8, unit: 'px' },
        offsetY: { value: -8, unit: 'px' },
        color: '#6016ee',
      },
    ],
  }
}
