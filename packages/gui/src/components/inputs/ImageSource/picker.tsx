import * as Collapsible from '@radix-ui/react-collapsible'
import { ImageSource } from './types'
import ImageSourceContent, { Header } from './field'
import { Label } from '../../primitives'
import { useId } from 'react'
import { EditorPropsWithLabel } from '../../../lib/util'

type Props = EditorPropsWithLabel<ImageSource[]>
export default function FilterPicker({
  value,
  onChange,
  label = 'Image Source',
}: Props) {
  const id = `${useId()}-imageSource`
  return (
    <>
      <Label htmlFor={id}>{label}</Label>
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
          <ImageSourceContent value={value} onChange={onChange} label={label} />
        </Collapsible.Content>
      </Collapsible.Root>
    </>
  )
}
