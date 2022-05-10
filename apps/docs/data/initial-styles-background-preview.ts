export const initialStyles: any = {
  background: [
    {
      image: {
        type: 'url',
        arguments: ['https://source.unsplash.com/random'],
      },
      position: {
        x: { value: 'center', unit: 'keyword' },
        y: { value: 'center', unit: 'keyword' },
      },
      repeat: { x: 'no-repeat', y: 'no-repeat' },
      size: {
        type: 'dimensions',
        x: { value: 100, unit: '%' },
        y: { value: 100, unit: '%' },
      },
      attachment: 'fixed',
      origin: 'border-box',
      clip: 'border-box',
    },
  ],
}
