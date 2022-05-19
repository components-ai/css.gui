import { HTMLAttributes } from 'react'
import { Editor } from '@compai/css-gui'
import { ElementEditor } from './ElementEditor'
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
      <div sx={{ px: 2, pb: 1 }}>
        <ElementEditor element={element} onChange={onElementChange} />
      </div>
      <div
        sx={{
          mt: 3,
          px: 2,
          borderTopStyle: 'solid',
          borderTopColor: 'border',
          borderTopWidth: 'thin',
        }}
      >
        <SectionTitle>Styling</SectionTitle>
        <Editor styles={styles} onChange={onChange} showAddProperties />
      </div>
    </section>
  )
}

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
