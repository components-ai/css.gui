import * as Collapsible from '@radix-ui/react-collapsible'
import { BackgroundImage } from './types'
import { EditorProps } from '../../../types/editor'
import BackgroundImageContent, { Header } from './field'
import { Label } from '../../primitives'
import { useId } from 'react'

type Props = EditorProps<BackgroundImage[]>
export default function FilterPicker({ value, onChange }: Props) {
  const id = `${useId()}-backgroundImage`
  return (
    <>
      <Label htmlFor={id}>Background Image</Label>
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
          <BackgroundImageContent value={value} onChange={onChange} />
        </Collapsible.Content>
      </Collapsible.Root>
    </>
  )
}
