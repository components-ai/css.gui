import * as Collapsible from '@radix-ui/react-collapsible'
import { BoxShadow } from './types'
import { EditorProps } from '../../../types/editor'
import BoxShadowField, { Header } from './field'
import { Label } from '../../primitives'
import { useId } from 'react'

type Props = EditorProps<BoxShadow[]>
export default function BoxShadowPicker({ value, onChange }: Props) {
  const id = `${useId()}-box-shadow`
  return (
    <>
      <Label htmlFor={id}>Box shadow</Label>
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
          <BoxShadowField value={value} onChange={onChange} />
        </Collapsible.Content>
      </Collapsible.Root>
    </>
  )
}
