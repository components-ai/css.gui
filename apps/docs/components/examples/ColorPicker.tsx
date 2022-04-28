import { useState } from 'react'
import { ColorPopover } from '@compai/css-gui'

export const ColorPickerExample = () => {
  const [color, setColor] = useState('tomato')

  return (
    <>
      <ColorPopover value={color} onChange={setColor}/>
      <p style={{ color }}>I am {color}!</p>
    </>
  )
}
