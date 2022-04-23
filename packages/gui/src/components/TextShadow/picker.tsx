import * as Collapsible from '@radix-ui/react-collapsible'
import { TextShadow } from './types'
import { EditorProps } from '../editors/types'
import TextShadowField, { Header } from './field'
import { Label } from '../primitives'
import { useId } from 'react'

type Props = EditorProps<TextShadow[]>
export default function TextShadowPicker({ value, onChange }: Props) {
  const id = `${useId()}-text-shadow`
  return (
    <>
      <Label htmlFor={id}>Text shadow</Label>
      <Collapsible.Root id={id}>
        <Collapsible.Trigger
          sx={{
            cursor: 'pointer',
            width: '100%',
            background: 'none',
            color: 'text',
            border: 'none',
          }}
        >
          <Header value={value} />
        </Collapsible.Trigger>
        <Collapsible.Content
          sx={{
            my: 2,
            maxWidth: '32rem',
          }}
        >
          <TextShadowField value={value} onChange={onChange} />
        </Collapsible.Content>
      </Collapsible.Root>
    </>
  )
}
