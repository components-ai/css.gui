import { SelectInput, TextInput } from '@compai/css-gui'
import { Element as ElementType } from './types'

type ElementProps = {
  element: ElementType
  onChange: (newElement: any) => void
}
export const ElementEditor = ({ element, onChange }: ElementProps) => {
  return (
    <>
      <SelectInput
        label="Element"
        value={element.name}
        onChange={(name: string) => onChange({ ...element, name })}
        options={['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'a']}
      />
      <TextInput
        label="Text"
        value={element.children || ''}
        onChange={(children: string) => onChange({ ...element, children })}
      />
    </>
  )
}
