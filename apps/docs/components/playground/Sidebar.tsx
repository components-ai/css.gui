import { HTMLAttributes } from 'react'
import { Editor, SelectInput, TextInput } from '@compai/css-gui'
import { Element } from './types'

interface SectionTitleProps extends HTMLAttributes<HTMLHeadingElement> {}
export const SectionTitle = (props: SectionTitleProps) => {
  return (
    <h3
      sx={{
        lineHeight: '1.25',
        fontWeight: 500,
        fontSize: 2,
        pt: [2, 3],
        pb: 1,
        m: 0,
      }}
      {...props}
    />
  )
}

type SidebarProps = {
  styles: any
  onChange: (newStyles: any) => void
  element: Element
  onElementChange: (newElement: any) => void
}
export const Sidebar = ({
  styles,
  onChange,
  element,
  onElementChange,
}: SidebarProps) => {
  return (
    <section
      sx={{
        minHeight: '100vh',
        height: '100%',
        borderLeftWidth: '1px',
        borderLeftStyle: 'solid',
        borderLeftColor: 'border',
        py: [2, 3],
        px: 2,
        overflowY: 'auto',
        top: 0,
        right: 0,
        bottom: 0,
        order: [2, 1, 1],
      }}
    >
      <SelectInput
        label="Element"
        value={element.name}
        onChange={(name: string) => onElementChange({ ...element, name })}
        options={['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'a']}
      />
      <TextInput
        label="Text"
        value={element.children}
        onChange={(children: string) =>
          onElementChange({ ...element, children })
        }
      />
      <SectionTitle>Styling</SectionTitle>
      <Editor styles={styles} onChange={onChange} showAddProperties />
    </section>
  )
}
