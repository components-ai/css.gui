import * as Collapsible from '@radix-ui/react-collapsible'
import { BoxShadow } from './types'
import { EditorProps } from '../editors/types'
import BoxShadowField from './field'
import { toCssValue } from './convert'
import { Label } from 'theme-ui'

type Props = EditorProps<BoxShadow[]>
export default function BoxShadowPicker({ value, onChange }: Props) {
  const style = toCssValue(value)
  return (
    <>
      <Label>Box shadow</Label>
      <Collapsible.Root>
        <Collapsible.Trigger
          sx={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            width: '100%',
            background: 'none',
            color: 'text',
            border: 'none',
          }}
        >
          <div
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div sx={{ width: '1rem', height: '1rem', boxShadow: style }} />
          </div>
          {style}
        </Collapsible.Trigger>
        <Collapsible.Content
          sx={{
            my: 2,
            p: 3,
            border: '1px solid',
            borderColor: 'border',
            borderRadius: '0.5rem',
            maxWidth: '32rem',
          }}
        >
          <BoxShadowField value={value} onChange={onChange} />
        </Collapsible.Content>
      </Collapsible.Root>
    </>
  )
}
