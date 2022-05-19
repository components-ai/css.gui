import { Editor } from '@compai/css-gui'
import { NavSectionTitle } from '../Nav'
import { Element } from './types'

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
        overflowY: 'auto',
        top: 0,
        right: 0,
        bottom: 0,
        order: [2, 1, 1],
      }}
    >
      <NavSectionTitle>Element</NavSectionTitle>
      {element.name}
      <NavSectionTitle>Styling</NavSectionTitle>
      <Editor styles={styles} onChange={onChange} showAddProperties />
    </section>
  )
}
