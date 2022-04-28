import { Theme } from '@compai/css-gui'

export const defaultTheme: Theme = {
  fontSizes: [
    { id: '1', value: 16, unit: 'px' },
    { id: '2', value: 24, unit: 'px' },
    { id: '3', value: 32, unit: 'px' },
    { id: '4', value: 48, unit: 'px' },
    { id: '5', value: 64, unit: 'px' },
    { id: '6', value: 96, unit: 'px' },
  ],
  lineHeights: [
    { id: '1', value: 1, unit: 'number' },
    { id: '2', value: 1.25, unit: 'number' },
    { id: '3', value: 1.5, unit: 'number' },
  ],
  colors: [
    {
      id: '1',
      name: 'gray',
      colors: [
        { id: '2', value: '#000000' },
        { id: '3', value: '#1c1c1c' },
        { id: '4', value: '#303030' },
        { id: '5', value: '#474747' },
        { id: '6', value: '#5d5d5d' },
        { id: '7', value: '#757575' },
        { id: '8', value: '#8c8c8c' },
        { id: '9', value: '#a3a3a3' },
        { id: '10', value: '#bababa' },
        { id: '11', value: '#d1d1d1' },
        { id: '12', value: '#e8e8e8' },
        { id: '13', value: '#ffffff' },
      ],
    },
  ],
}
