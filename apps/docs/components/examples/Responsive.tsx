import { useState } from 'react'
import {
  Length,
  LengthInput,
  ResponsiveInput,
  ResponsiveLength,
} from '@compai/css-gui'

export const ResponsiveExample = () => {
  const [value, setValue] = useState<any>({
    type: 'responsive',
    values: [
      {
        value: 16,
        unit: 'px',
      },
    ],
  })
  return (
    <div sx={{ display: 'flex', width: '100%', flexWrap: 'wrap' }}>
      <div sx={{ flexGrow: 1 }}>
        <ResponsiveInput
          value={value}
          // @ts-ignore
          onChange={setValue}
          // @ts-ignore
          Component={LengthInput}
        />
      </div>
      <pre
        sx={{
          mx: [1, 3, 4],
          px: [1, 3, 4],
          minWidth: 256,
          height: 128,
          overflowX: 'scroll',
          borderLeft: 'thin solid',
          borderColor: 'border',
        }}
      >
        {JSON.stringify(value, null, 2)}
      </pre>
    </div>
  )
}
