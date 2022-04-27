import * as Collapsible from '@radix-ui/react-collapsible'
import { Transform } from './types'
import { EditorProps } from '../../types/editor'
import TransformContent, { Header } from './field'
import { Label } from '../primitives'
import { useId } from 'react'

type Props = EditorProps<Transform[]>
export default function TransformPicker({ value, onChange }: Props) {
  const id = `${useId()}-filter`
  return (
    <>
      <Label htmlFor={id}>Filter</Label>
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
          <TransformContent value={value} onChange={onChange} />
        </Collapsible.Content>
      </Collapsible.Root>
    </>
  )
}
